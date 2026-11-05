# Proposal: Add Character Creation

## Why

角色创建是玩家进入跑团世界的第一步，直接影响用户体验和留存率。当前项目缺少角色创建功能，玩家无法开始游戏。需要实现完整的角色创建流程，支持自建和随机生成两种方式，让玩家快速创建符合 DND 5e 规则的角色卡。

## What Changes

- 新增角色创建页面（`/characters/new`），支持三种创建方式：自建、随机生成、预设模板
- 新增角色卡数据模型，包含基础属性、战斗数据、技能、法术、装备、背景故事
- 新增角色创建 API 端点（`POST /api/characters`）
- 新增随机角色生成 API 端点（`POST /api/characters/generate`）
- 新增角色列表页面（仪表板中的角色卡片展示）
- 新增角色详情页面（`/characters/[id]`），支持查看和编辑
- 集成 AI 生成角色立绘功能（可选）
- 集成预设头像库选择功能

## Capabilities

### New Capabilities

- `character-creation`: 角色创建系统，涵盖角色卡的数据模型、创建流程（自建/随机/预设）、属性计算、技能选择、装备分配、背景故事生成、立绘生成/选择

### Modified Capabilities

<!-- 无现有规格需要修改 -->

## Impact

### 前端
- 新增页面：`/characters/new`、`/characters/[id]`
- 新增组件：角色创建表单、属性分配器、技能选择器、种族/职业选择器、立绘选择器
- 修改页面：仪表板（添加角色卡片列表）

### 后端
- 新增 API：`POST /api/characters`、`POST /api/characters/generate`、`GET /api/characters`、`GET /api/characters/{id}`、`PUT /api/characters/{id}`、`DELETE /api/characters/{id}`
- 新增数据表：`characters`（Supabase PostgreSQL）
- 新增业务逻辑：DND 5e 属性计算、技能熟练加值、HP/AC 自动计算

### 依赖
- DND 5e 规则数据（种族、职业、背景、技能、法术列表）
- AI API（Claude/OpenAI）用于随机生成和立绘生成
- 预设头像库资源

### 数据库
- 新增 `characters` 表，包含角色卡所有字段
- 与 `users` 表关联（外键 `user_id`）
- 与 `campaigns` 表关联（角色可被多个战役使用）
