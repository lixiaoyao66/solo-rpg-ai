# Design: Character Creation

## Context

项目使用 Next.js 14 + FastAPI + Supabase 技术栈。角色创建是 MVP 的核心功能，需要支持 DND 5e 规则的完整角色卡数据模型。当前数据库为空，需要新建 `characters` 表。前端需要新建角色创建页面和角色详情页面。

## Goals / Non-Goals

**Goals:**
- 实现三种角色创建方式（自建、随机生成、预设模板）
- 完整的 DND 5e 角色卡数据模型和规则验证
- 属性分配支持标准数组、购点法、掷骰法
- 自动计算战斗数据（HP、AC、先攻、速度）
- AI 辅助生成背景故事和角色立绘
- 角色卡预览和规则验证

**Non-Goals:**
- 角色升级系统（后续迭代）
- 多角色队伍管理（后续迭代）
- 角色导入/导出（后续迭代）
- 复杂的装备系统（仅初始装备）

## Decisions

### Decision 1: 角色数据存储结构

**选择**：使用 Supabase PostgreSQL 的 `characters` 表，采用扁平化 JSON 字段存储复杂数据。

**理由**：
- 角色卡的技能、法术、装备是嵌套结构，用 JSON 字段比多表关联更简单
- 查询模式主要是"读取整个角色卡"，不需要按技能/装备单独查询
- JSON 字段在 PostgreSQL 中支持索引和查询，性能足够

**替代方案**：
- 多表关联（characters, character_skills, character_spells, character_equipment）：查询复杂，JOIN 多，不采用
- 纯 JSON 文档数据库（如 MongoDB）：与项目技术栈不符，不采用

**表结构**：
```sql
CREATE TABLE characters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- 基础信息
  name VARCHAR(100) NOT NULL,
  race VARCHAR(50) NOT NULL,
  class VARCHAR(50) NOT NULL,
  level INTEGER DEFAULT 1,
  background TEXT,
  
  -- 基础属性（扁平化，便于查询和计算）
  strength INTEGER NOT NULL,
  dexterity INTEGER NOT NULL,
  constitution INTEGER NOT NULL,
  intelligence INTEGER NOT NULL,
  wisdom INTEGER NOT NULL,
  charisma INTEGER NOT NULL,
  
  -- 战斗数据
  hp_current INTEGER NOT NULL,
  hp_max INTEGER NOT NULL,
  ac INTEGER NOT NULL,
  initiative INTEGER,
  speed INTEGER NOT NULL,
  
  -- 技能和熟练（JSON）
  skills JSONB NOT NULL DEFAULT '{}',
  saving_throws JSONB NOT NULL DEFAULT '{}',
  
  -- 法术和能力（JSON）
  spells JSONB DEFAULT '[]',
  special_abilities JSONB DEFAULT '[]',
  
  -- 装备和背包（JSON）
  equipment JSONB DEFAULT '[]',
  inventory JSONB DEFAULT '[]',
  gold INTEGER DEFAULT 0,
  
  -- 状态
  conditions JSONB DEFAULT '[]',
  
  -- 背景故事
  backstory TEXT,
  personality TEXT,
  goals JSONB DEFAULT '[]',
  
  -- 立绘
  portrait_url TEXT,
  
  -- 元数据
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Decision 2: 前端状态管理

**选择**：使用 Zustand 管理角色创建表单状态。

**理由**：
- 角色创建表单状态复杂（多步骤、多字段、实时计算），需要集中管理
- Zustand 轻量、简单，适合中等复杂度状态
- 支持计算属性（如自动计算属性调整值、技能加值）

**替代方案**：
- React Context + useReducer：样板代码多，不采用
- Redux：过重，不采用
- 纯 useState：状态分散，不采用

### Decision 3: DND 规则数据管理

**选择**：在前端和后端各维护一份 DND 5e 规则数据（种族、职业、背景、技能列表），前端用于实时计算和验证，后端用于最终验证和数据生成。

**理由**：
- 前端需要实时计算属性调整值、技能加值、HP、AC 等，不能每次都请求后端
- 后端需要独立验证，防止前端篡改
- 规则数据相对稳定，可以硬编码在代码中

**数据结构**：
```typescript
// 前端：src/data/dnd/rules.ts
export const RACES = {
  human: { name: '人类', abilityBonuses: { all: 1 }, speed: 30, traits: [...] },
  elf: { name: '精灵', abilityBonuses: { dexterity: 2 }, speed: 30, traits: [...] },
  // ...
};

export const CLASSES = {
  fighter: { name: '战士', hitDie: 10, primaryAbility: 'strength', savingThrows: ['strength', 'constitution'], skills: [...], equipment: [...] },
  // ...
};

export const SKILLS = {
  acrobatics: { ability: 'dexterity' },
  arcana: { ability: 'intelligence' },
  // ...
};
```

### Decision 4: 随机角色生成实现

**选择**：后端使用 Python 实现随机生成逻辑，调用 Claude API 生成背景故事。

**理由**：
- 随机生成需要遵循 DND 5e 规则，Python 后端更容易维护规则逻辑
- 背景故事生成需要 AI，Claude API 叙事质量高
- 前端只负责展示和交互，不处理复杂生成逻辑

**实现方案**：
```python
# 后端：src/services/character_generator.py
import random
from data.dnd import RACES, CLASSES, BACKGROUNDS

def generate_random_character(preferences: dict = None) -> dict:
    race = preferences.get('race') or random.choice(list(RACES.keys()))
    char_class = preferences.get('class') or random.choice(list(CLASSES.keys()))
    background = preferences.get('background') or random.choice(list(BACKGROUNDS.keys()))
    
    # 使用标准数组分配属性
    abilities = assign_standard_array()
    
    # 应用种族加值
    apply_race_bonuses(abilities, race)
    
    # 选择技能和装备
    skills = select_skills(char_class, background)
    equipment = select_equipment(char_class)
    
    # 计算战斗数据
    combat = calculate_combat_stats(abilities, race, char_class, equipment)
    
    # 调用 AI 生成背景故事
    backstory = generate_backstory_with_ai(race, char_class, background)
    
    return {
        'race': race,
        'class': char_class,
        'background': background,
        'abilities': abilities,
        'skills': skills,
        'equipment': equipment,
        'combat': combat,
        'backstory': backstory,
    }
```

### Decision 5: 属性分配器 UI 设计

**选择**：三种分配方式用 Tab 切换，每种方式有独立的 UI 组件。

**理由**：
- 三种方式交互差异大，共用 UI 会复杂
- Tab 切换清晰，用户容易理解
- 每种方式可以独立优化体验

**组件设计**：
- `StandardArrayAllocator`：拖拽或点击分配 6 个值到 6 个属性
- `PointBuyAllocator`：滑块或 +/- 按钮调整属性值，实时显示剩余点数
- `DiceRoller`：模拟掷骰动画，显示 4d6 结果，高亮最低值

### Decision 6: 角色立绘生成

**选择**：使用 DALL-E 3 API 生成角色立绘，同时提供预设头像库作为备选。

**理由**：
- DALL-E 3 质量高，适合奇幻风格
- 生成速度慢（10-30 秒），需要异步处理和加载状态
- 预设头像库可以即时显示，提升用户体验

**实现方案**：
- 前端：点击"AI 生成" → 显示加载动画 → 轮询后端状态 → 显示结果
- 后端：调用 DALL-E 3 API → 保存图片到 Supabase Storage → 返回 URL
- 预设头像：静态资源，按种族/职业分类，前端直接加载

## Risks / Trade-offs

### Risk 1: DND 规则复杂性
**风险**：DND 5e 规则复杂，子职业、专长、多职业等可能超出 MVP 范围。
**缓解**：MVP 只支持基础职业（不含子职业），不含专长和多职业。在 UI 中明确标注"MVP 版本"。

### Risk 2: AI 生成质量不稳定
**风险**：AI 生成的背景故事和立绘可能不符合用户期望。
**缓解**：提供"重新生成"按钮，允许用户编辑 AI 生成的内容。预设头像库作为备选。

### Risk 3: 前端规则验证与后端不一致
**风险**：前端和后端的规则数据可能不同步，导致验证结果不一致。
**缓解**：规则数据从同一源文件生成（如 JSON），前端和后端各维护一份但保持同步。后端做最终验证。

### Risk 4: 角色创建流程过长
**风险**：完整的角色创建可能需要 10-15 分钟，用户可能中途放弃。
**缓解**：提供"随机生成"快速开始，提供"预设模板"简化流程。支持保存草稿（后续迭代）。

### Trade-off 1: JSON 字段 vs 多表关联
**权衡**：JSON 字段查询灵活性不如多表关联，但角色创建和读取场景下性能足够。
**接受原因**：MVP 阶段简单优先，后续如有复杂查询需求可重构。

### Trade-off 2: 前端硬编码规则数据 vs 动态加载
**权衡**：硬编码规则数据更新不便，但减少后端依赖，提升响应速度。
**接受原因**：DND 5e 规则相对稳定，更新频率低。前端实时计算需求高，硬编码更合适。

## Migration Plan

### 部署步骤
1. 创建 Supabase `characters` 表
2. 部署后端 API（角色 CRUD、随机生成）
3. 部署前端页面（角色创建、角色详情）
4. 更新仪表板页面（添加角色列表）

### 回滚策略
- 数据库：`characters` 表独立，回滚只需删除表（无数据时）
- 后端：API 端点独立，回滚只需删除端点
- 前端：新页面独立路由，回滚只需隐藏入口

## Open Questions

无。
