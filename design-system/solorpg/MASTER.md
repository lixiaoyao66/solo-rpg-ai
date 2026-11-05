# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** SoloRPG - 单人AI跑团网站
**Generated:** 2026-11-05
**Category:** Gaming / RPG
**Style:** Nature Distilled (框架层) + Dark Mode OLED (内容层) 混合
**Reference:** 博德之门3、神界原罪2

---

## Global Rules

### Color Palette

#### 界面框架层（明亮 - Nature Distilled 变体）

| Role | Hex | CSS Variable | 用途 |
|------|-----|--------------|------|
| Background Primary | `#F5F1E8` | `--bg-primary` | 暖米色主背景 |
| Background Secondary | `#FFFFFF` | `--bg-secondary` | 纯白卡片背景 |
| Border | `#D4C9B8` | `--border-color` | 暖灰边框 |
| Text Primary | `#2C2416` | `--text-primary` | 深棕主文字 |
| Text Secondary | `#6B5D4F` | `--text-secondary` | 中棕次要文字 |
| Text Disabled | `#A89B8C` | `--text-disabled` | 浅棕禁用文字 |
| Button Primary | `#8B7355` | `--btn-primary` | 古铜色按钮 |
| Button Primary Hover | `#6B5540` | `--btn-primary-hover` | 深古铜悬停 |
| Button Primary Text | `#F5F1E8` | `--btn-primary-text` | 暖米色按钮文字 |
| Link | `#6B8E7B` | `--link-color` | 青绿色链接 |

#### 游戏内容层（暗黑 - Dark Mode OLED 变体）

| Role | Hex | CSS Variable | 用途 |
|------|-----|--------------|------|
| Dark Background | `#1A1612` | `--dark-bg` | 深棕黑主背景 |
| Dark Background Secondary | `#2A2420` | `--dark-bg-secondary` | 暗棕次要背景 |
| Dark Background Card | `#352E28` | `--dark-bg-card` | 稍亮卡片背景 |
| Dark Border | `#8B7355` | `--dark-border` | 古铜色边框 |
| Dark Text | `#E8DCC8` | `--dark-text` | 暖米白主文字 |
| Dark Text Secondary | `#A89B8C` | `--dark-text-secondary` | 浅棕次要文字 |

#### 高亮色

| Role | Hex | CSS Variable | 用途 |
|------|-----|--------------|------|
| Gold | `#D4AF37` | `--gold` | 金色高亮、重要信息 |
| Gold Hover | `#E5C158` | `--gold-hover` | 金色悬停 |
| Magic Blue | `#5B8DB8` | `--magic-blue` | 魔法蓝、法术效果 |
| Holy White | `#F0E6D2` | `--holy-white` | 神圣白、治愈效果 |

#### 强调色（通用）

| Role | Hex | CSS Variable | 用途 |
|------|-----|--------------|------|
| Success | `#5A9B6B` | `--success` | 森林绿，通过、增益 |
| Warning | `#C9A85C` | `--warning` | 暗金色，caution |
| Danger | `#A85C5C` | `--danger` | 暗红色，失败、减益 |
| Info | `#5B8DB8` | `--info` | 蓝色，中性信息 |

#### 骰子色彩

| Dice | Primary | Text |
|------|---------|------|
| d20 (关键) | `#D4AF37` | `#1A1612` |
| d12 | `#A85C5C` | `#FFFFFF` |
| d10 | `#5B8DB8` | `#FFFFFF` |
| d8 | `#5A9B6B` | `#FFFFFF` |
| d6 | `#8B7355` | `#FFFFFF` |
| d4 | `#6B5D4F` | `#FFFFFF` |

**Color Notes:** 温暖大地色调 + 金色点缀，框架明亮友好，内容区暗黑沉浸

### Typography

#### 字体组合：Classic Elegant 变体

- **Heading Font (界面)**: Inter
- **Body Font (界面)**: Inter
- **Heading Font (游戏)**: Noto Serif SC / Cinzel
- **Body Font (游戏)**: Noto Serif SC / Cinzel
- **Special Font**: MedievalSharp（咒语、古老文字）
- **Number Font**: Rajdhani（数值、骰子）
- **Mono Font**: JetBrains Mono（代码、日志）
- **Mood:** 界面现代清晰，游戏古典沉浸
- **Google Fonts:** [Inter + Noto Serif SC + Cinzel + Rajdhani + MedievalSharp + JetBrains Mono](https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Serif+SC:wght@400;700&family=Cinzel:wght@400;700&family=Rajdhani:wght@500;600;700&family=MedievalSharp&family=JetBrains+Mono:wght@400;500&display=swap)

**CSS Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Serif+SC:wght@400;700&family=Cinzel:wght@400;700&family=Rajdhani:wght@500;600;700&family=MedievalSharp&family=JetBrains+Mono:wght@400;500&display=swap');
```

#### 字号系统

| Level | Size | Line Height | 用途 |
|-------|------|-------------|------|
| text-xs | 12px | 16px | 标签、注释 |
| text-sm | 14px | 20px | 次要文字、说明 |
| text-base | 16px | 24px | 正文默认 |
| text-lg | 18px | 28px | 小标题、强调 |
| text-xl | 20px | 28px | 卡片标题 |
| text-2xl | 24px | 32px | 页面标题 |
| text-3xl | 30px | 36px | 大标题 |
| text-4xl | 36px | 40px | 英雄区标题 |

#### 字重规范

| Weight | Value | 用途 |
|--------|-------|------|
| Regular | 400 | 正文默认 |
| Medium | 500 | 次要强调 |
| SemiBold | 600 | 标题、按钮 |
| Bold | 700 | 重要标题、数值 |

### Spacing Variables

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | `4px` | 紧凑元素间 |
| `--space-2` | `8px` | 相关元素间 |
| `--space-3` | `12px` | 小组件内 |
| `--space-4` | `16px` | 默认间距 |
| `--space-5` | `20px` | 卡片内边距 |
| `--space-6` | `24px` | 区块间距 |
| `--space-8` | `32px` | 大区块间距 |
| `--space-10` | `40px` | 页面级间距 |
| `--space-12` | `48px` | 英雄区间距 |
| `--space-16` | `64px` | 超大间距 |

**Layout:**
- 页面边距：24px（移动端 16px）
- 导航栏高度：64px
- 侧边栏宽度：280px
- 底部状态栏高度：48px
- 内容区最大宽度：1200px

### Shadow Depths

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 2px 8px rgba(44, 36, 22, 0.08)` | 信息卡片 |
| `--shadow-md` | `0 4px 12px rgba(0, 0, 0, 0.15)` | 按钮悬停 |
| `--shadow-lg` | `0 4px 16px rgba(0, 0, 0, 0.3)` | 游戏卡片 |
| `--shadow-gold` | `0 4px 12px rgba(212, 175, 55, 0.3)` | 金色高亮 |

---

## Component Specs

### Buttons

```css
/* Primary Button - 古铜色 */
.btn-primary {
  background: #8B7355;
  color: #F5F1E8;
  border: 1px solid #6B5540;
  border-radius: 6px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}
.btn-primary:hover {
  background: #6B5540;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(139, 115, 85, 0.3);
}

/* Secondary Button - 透明边框 */
.btn-secondary {
  background: transparent;
  color: #8B7355;
  border: 1px solid #8B7355;
  border-radius: 6px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}
.btn-secondary:hover {
  background: #F5F1E8;
}

/* Danger Button */
.btn-danger {
  background: #A85C5C;
  color: #FFFFFF;
  border: 1px solid #8B4545;
}
.btn-danger:hover {
  background: #8B4545;
}
```

### Cards

```css
/* 信息卡片（明亮层） */
.card-light {
  background: #FFFFFF;
  border: 1px solid #D4C9B8;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(44, 36, 22, 0.08);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.card-light:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(44, 36, 22, 0.1);
}

/* 游戏卡片（暗黑层） */
.card-dark {
  background: #2A2420;
  border: 1px solid #8B7355;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}
```

### Inputs

```css
.input {
  background: #FFFFFF;
  border: 1px solid #D4C9B8;
  border-radius: 6px;
  padding: 12px 16px;
  font-size: 16px;
  color: #2C2416;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}
.input:focus {
  border-color: #8B7355;
  box-shadow: 0 0 0 3px rgba(139, 115, 85, 0.1);
  outline: none;
}
.input::placeholder {
  color: #A89B8C;
}
```

### Message Bubbles (对话气泡)

```css
/* AI/DM 消息 */
.message-dm {
  background: #2A2420;
  border-left: 3px solid #D4AF37;
  border-radius: 10px;
  padding: 16px 20px;
  color: #E8DCC8;
  font-size: 15px;
  line-height: 1.7;
}

/* 玩家消息 */
.message-player {
  background: rgba(245, 241, 232, 0.08);
  border-left: 3px solid #5A9B6B;
  border-radius: 10px;
  padding: 16px 20px;
  color: #E8DCC8;
  font-size: 15px;
  line-height: 1.7;
}

/* 系统消息 */
.message-system {
  background: transparent;
  border: 1px dashed #8B7355;
  border-radius: 8px;
  padding: 12px 16px;
  color: #A89B8C;
  font-style: italic;
  text-align: center;
  font-size: 13px;
}
```

### Dice Buttons

```css
.dice-btn {
  width: 44px;
  height: 44px;
  border-radius: 8px;
  border: 2px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Rajdhani', sans-serif;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}
.dice-btn:hover {
  transform: translateY(-2px);
}
.dice-btn.d20 {
  background: linear-gradient(135deg, #D4AF37, #B8941F);
  color: #1A1612;
  border-color: #8B7355;
}
.dice-btn.d20:hover {
  box-shadow: 0 4px 12px rgba(212, 175, 55, 0.4);
}
```

### HP Progress Bar

```css
.hp-bar {
  height: 8px;
  background: #352E28;
  border-radius: 4px;
  overflow: hidden;
}
.hp-bar-fill.healthy {
  background: linear-gradient(90deg, #5A9B6B, #7AB88A);
}
.hp-bar-fill.warning {
  background: linear-gradient(90deg, #C9A85C, #D4B86C);
}
.hp-bar-fill.danger {
  background: linear-gradient(90deg, #A85C5C, #B86C6C);
}
```

### Status Tags

```css
.tag-buff {
  background: rgba(90, 155, 107, 0.15);
  color: #5A9B6B;
  border: 1px solid rgba(90, 155, 107, 0.3);
  padding: 2px 10px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
}
.tag-debuff {
  background: rgba(168, 92, 92, 0.15);
  color: #A85C5C;
  border: 1px solid rgba(168, 92, 92, 0.3);
  padding: 2px 10px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
}
```

### Modals

```css
.modal-overlay {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}
.modal {
  background: #FFFFFF;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);
  max-width: 500px;
  width: 90%;
}
```

---

## Style Guidelines

**Style:** Nature Distilled (框架) + Dark Mode OLED (内容) 混合

**Keywords:** warm, earthy, parchment, dark fantasy, gold accents, immersive, clean framework

**Best For:** RPG games, fantasy adventures, interactive storytelling, game dashboards

**Key Effects:**
- 按钮悬停：translateY(-1px) + box-shadow, 150ms
- 卡片出现：opacity 0→1 + translateY(10px→0), 300ms
- 骰子投掷：rotate 0→360deg, 500ms
- 场景图加载：opacity 0→1 + blur(10px→0), 800ms
- 消息出现：opacity 0→1 + translateX(-10px→0), 250ms

### Page Pattern

**Pattern Name:** Hero + Features + CTA

- **Conversion Strategy:** Deep CTA placement. For CTA label text, verify at least 4.5:1 against the button fill. Keep focus and component boundaries independently visible. Disable hero parallax under reduced motion.
- **CTA Placement:** Hero (sticky) + Bottom
- **Section Order:** Hero with headline/image > Value prop > Key features (3-5) > CTA section > Footer

---

## Anti-Patterns (Do NOT Use)

- ❌ **Emojis as icons** — Use SVG icons (Heroicons, Lucide)
- ❌ **Missing cursor:pointer** — All clickable elements must have cursor:pointer
- ❌ **Layout-shifting hovers** — Avoid scale transforms that shift layout
- ❌ **Low contrast text** — Maintain 4.5:1 minimum contrast ratio
- ❌ **Instant state changes** — Always use transitions (150-300ms)
- ❌ **Invisible focus states** — Focus states must be visible for a11y
- ❌ **Pure black on dark background** — Use warm dark tones (#1A1612)
- ❌ **Pure white on light background** — Use warm white (#F5F1E8)
- ❌ **More than 3 accent colors simultaneously**
- ❌ **Red for success, green for failure**
- ❌ **Mixing serif and sans-serif at same hierarchy level**
- ❌ **Body text smaller than 14px**
- ❌ **Excessive animations** — Keep it restrained

---

## Responsive Breakpoints

| Name | Breakpoint | 说明 |
|------|-----------|------|
| sm | 640px | 大手机 |
| md | 768px | 平板 |
| lg | 1024px | 小桌面 |
| xl | 1280px | 标准桌面 |
| 2xl | 1536px | 大桌面 |

### Layout Adaptation
- **Desktop (≥1024px)**: 三栏布局（侧边栏 + 游戏区 + 状态面板）
- **Tablet (768-1023px)**: 两栏布局，侧边栏可收起
- **Mobile (<768px)**: 单栏布局，侧边栏隐藏，状态面板底部抽屉

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] No emojis used as icons (use SVG: Heroicons/Lucide instead)
- [ ] All icons from consistent icon set
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Dark mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind fixed navbars
- [ ] No horizontal scroll on mobile
- [ ] Long text reflows without clipping
- [ ] Chip/tag collections wrap or use +n disclosure
- [ ] Badge meaning not reliant on color alone
