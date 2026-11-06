// DND 5e 基础规则数据（前端版本）

// ============ 类型定义 ============

export type AbilityKey = 'strength' | 'dexterity' | 'constitution' | 'intelligence' | 'wisdom' | 'charisma';

export type SkillKey = 
  | 'acrobatics' | 'animal_handling' | 'arcana' | 'athletics' | 'deception'
  | 'history' | 'insight' | 'intimidation' | 'investigation' | 'medicine'
  | 'nature' | 'perception' | 'performance' | 'persuasion' | 'religion'
  | 'sleight_of_hand' | 'stealth' | 'survival';

export interface AbilityBonuses {
  all?: number;
  strength?: number;
  dexterity?: number;
  constitution?: number;
  intelligence?: number;
  wisdom?: number;
  charisma?: number;
}

export interface Race {
  key: string;
  name: string;
  abilityBonuses: AbilityBonuses;
  speed: number;
  traits: string[];
  description: string;
}

export interface ClassData {
  key: string;
  name: string;
  hitDie: number;
  primaryAbility: AbilityKey;
  savingThrows: AbilityKey[];
  skillChoices: SkillKey[];
  skillCount: number;
  description: string;
  features: string[];
}

export interface Background {
  key: string;
  name: string;
  skills: SkillKey[];
  languages?: number;
  tools?: string[];
  equipment: string[];
  feature: string;
  description: string;
}

export interface Skill {
  key: SkillKey;
  name: string;
  ability: AbilityKey;
}

// ============ 种族数据 ============

export const RACES: Record<string, Race> = {
  human: {
    key: 'human',
    name: '人类',
    abilityBonuses: { all: 1 },
    speed: 30,
    traits: ['额外语言'],
    description: '人类是最常见的种族，适应力强，野心勃勃。',
  },
  elf: {
    key: 'elf',
    name: '精灵',
    abilityBonuses: { dexterity: 2 },
    speed: 30,
    traits: ['黑暗视觉 (60 尺)', '敏锐感官', '精灵血统', 'Trance（不需要睡眠）'],
    description: '精灵是魔法种族，拥有敏锐的感官和对自然魔法的亲和力。',
  },
  dwarf: {
    key: 'dwarf',
    name: '矮人',
    abilityBonuses: { constitution: 2 },
    speed: 25,
    traits: ['黑暗视觉 (60 尺)', '矮人坚韧（毒素抗性）', '石匠直觉', '武器熟练'],
    description: '矮人强壮坚韧，以采矿和锻造技艺闻名。',
  },
  halfling: {
    key: 'halfling',
    name: '半身人',
    abilityBonuses: { dexterity: 2 },
    speed: 25,
    traits: ['幸运（重掷 1）', '勇敢（对抗恐惧优势）', '灵活（穿越大体型生物空间）'],
    description: '半身人小巧灵活，乐观开朗，擅长隐匿和潜行。',
  },
  dragonborn: {
    key: 'dragonborn',
    name: '龙裔',
    abilityBonuses: { strength: 2, charisma: 1 },
    speed: 30,
    traits: ['龙脉血统（选择龙种）', '吐息武器', '伤害抗性'],
    description: '龙裔拥有龙族血统，以荣誉和力量为傲。',
  },
  tiefling: {
    key: 'tiefling',
    name: '提夫林',
    abilityBonuses: { charisma: 2, intelligence: 1 },
    speed: 30,
    traits: ['地狱抗性（火焰抗性）', '黑暗视觉 (60 尺)', '地狱遗产（奇术法术）'],
    description: '提夫林拥有恶魔血统，外表独特，常被误解。',
  },
};

// ============ 职业数据 ============

export const CLASSES: Record<string, ClassData> = {
  fighter: {
    key: 'fighter',
    name: '战士',
    hitDie: 10,
    primaryAbility: 'strength',
    savingThrows: ['strength', 'constitution'],
    skillChoices: ['acrobatics', 'animal_handling', 'athletics', 'history', 'insight', 'intimidation', 'perception', 'survival'],
    skillCount: 2,
    description: '精通各种武器和护甲的战争大师。',
    features: ['战斗风格', '行动如潮（2 次/长休）', '第二风（1d10+ 战士等级 HP）'],
  },
  wizard: {
    key: 'wizard',
    name: '法师',
    hitDie: 6,
    primaryAbility: 'intelligence',
    savingThrows: ['intelligence', 'wisdom'],
    skillChoices: ['arcana', 'history', 'insight', 'investigation', 'medicine', 'religion'],
    skillCount: 2,
    description: '通过研究掌握奥术魔法的学者。',
    features: ['奥术恢复', '法术书', '仪式施法'],
  },
  rogue: {
    key: 'rogue',
    name: '游荡者',
    hitDie: 8,
    primaryAbility: 'dexterity',
    savingThrows: ['dexterity', 'intelligence'],
    skillChoices: ['acrobatics', 'athletics', 'deception', 'insight', 'intimidation', 'investigation', 'perception', 'performance', 'persuasion', 'sleight_of_hand', 'stealth'],
    skillCount: 4,
    description: '擅长隐匿、陷阱和精准打击的专家。',
    features: ['偷袭（1d6）', '盗贼语言', '专家熟练（2 项技能翻倍）'],
  },
  cleric: {
    key: 'cleric',
    name: '牧师',
    hitDie: 8,
    primaryAbility: 'wisdom',
    savingThrows: ['wisdom', 'charisma'],
    skillChoices: ['history', 'insight', 'medicine', 'persuasion', 'religion'],
    skillCount: 2,
    description: '神圣魔法的引导者，神祇的凡人代表。',
    features: ['神圣领域', '引导神力（2 次/长休）', '法术施法'],
  },
  ranger: {
    key: 'ranger',
    name: '游侠',
    hitDie: 10,
    primaryAbility: 'dexterity',
    savingThrows: ['strength', 'dexterity'],
    skillChoices: ['animal_handling', 'athletics', 'insight', 'investigation', 'nature', 'perception', 'stealth', 'survival'],
    skillCount: 3,
    description: '荒野的守护者，擅长追踪和远程战斗。',
    features: ['宿敌', '自然探索者', '法术施法'],
  },
};

// ============ 背景数据 ============

export const BACKGROUNDS: Record<string, Background> = {
  acolyte: {
    key: 'acolyte',
    name: '侍僧',
    skills: ['insight', 'religion'],
    languages: 2,
    equipment: ['holy_symbol', 'prayer_book', 'incense', 'vestments'],
    feature: '庇护所：可以在神殿获得免费食宿',
    description: '在神殿中侍奉神祇的修行者。',
  },
  criminal: {
    key: 'criminal',
    name: '罪犯',
    skills: ['deception', 'stealth'],
    tools: ['thieves_tools', 'gaming_set'],
    equipment: ['crowbar', 'dark_clothes'],
    feature: '犯罪联络人：可以获取非法情报和物品',
    description: '有着犯罪过去的人，熟悉地下世界。',
  },
  folk_hero: {
    key: 'folk_hero',
    name: '民间英雄',
    skills: ['animal_handling', 'survival'],
    tools: ['artisan_tools', 'vehicles_land'],
    equipment: ['iron_pot', 'common_clothes', 'shovel'],
    feature: '乡村好客：平民会为你提供庇护',
    description: '出身平凡但做过英雄事迹的人。',
  },
  sage: {
    key: 'sage',
    name: '学者',
    skills: ['arcana', 'history'],
    languages: 2,
    equipment: ['ink_bottle', 'quill', 'knife', 'letter_from_colleague'],
    feature: '研究者：如果你不知道某条信息，你知道在哪里可以找到',
    description: '毕生追求知识的研究者。',
  },
  soldier: {
    key: 'soldier',
    name: '士兵',
    skills: ['athletics', 'intimidation'],
    tools: ['gaming_set', 'vehicles_land'],
    equipment: ['insignia', 'trophy', 'common_clothes'],
    feature: '军衔：可以命令低阶士兵，获得军事组织尊重',
    description: '经历过战争的老兵。',
  },
  outlander: {
    key: 'outlander',
    name: '流浪者',
    skills: ['athletics', 'survival'],
    languages: 1,
    tools: ['musical_instrument'],
    equipment: ['staff', 'hunting_trap', 'traveler_clothes'],
    feature: '流浪者：可以记住去过的地方的地形，为小队提供食物和水',
    description: '来自荒野边缘的流浪者。',
  },
};

// ============ 技能数据 ============

export const SKILLS: Record<SkillKey, Skill> = {
  acrobatics: { key: 'acrobatics', name: '杂技', ability: 'dexterity' },
  animal_handling: { key: 'animal_handling', name: '驯兽', ability: 'wisdom' },
  arcana: { key: 'arcana', name: '奥术', ability: 'intelligence' },
  athletics: { key: 'athletics', name: '运动', ability: 'strength' },
  deception: { key: 'deception', name: '欺瞒', ability: 'charisma' },
  history: { key: 'history', name: '历史', ability: 'intelligence' },
  insight: { key: 'insight', name: '洞察', ability: 'wisdom' },
  intimidation: { key: 'intimidation', name: '威吓', ability: 'charisma' },
  investigation: { key: 'investigation', name: '调查', ability: 'intelligence' },
  medicine: { key: 'medicine', name: '医药', ability: 'wisdom' },
  nature: { key: 'nature', name: '自然', ability: 'intelligence' },
  perception: { key: 'perception', name: '察觉', ability: 'wisdom' },
  performance: { key: 'performance', name: '表演', ability: 'charisma' },
  persuasion: { key: 'persuasion', name: '游说', ability: 'charisma' },
  religion: { key: 'religion', name: '宗教', ability: 'intelligence' },
  sleight_of_hand: { key: 'sleight_of_hand', name: '巧手', ability: 'dexterity' },
  stealth: { key: 'stealth', name: '隐匿', ability: 'dexterity' },
  survival: { key: 'survival', name: '求生', ability: 'wisdom' },
};

// ============ 属性名称映射 ============

export const ABILITY_NAMES: Record<AbilityKey, string> = {
  strength: '力量',
  dexterity: '敏捷',
  constitution: '体质',
  intelligence: '智力',
  wisdom: '感知',
  charisma: '魅力',
};

// ============ 计算函数 ============

/**
 * 计算属性调整值：(属性值 - 10) / 2 向下取整
 */
export function getAbilityModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

/**
 * 格式化调整值显示（+2, -1 等）
 */
export function formatModifier(mod: number): string {
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

/**
 * 计算 HP（1 级）：生命骰最大值 + 体质调整值（至少为 1）
 */
export function calculateHP(hitDie: number, constitutionMod: number): number {
  return Math.max(hitDie + constitutionMod, 1);
}

/**
 * 计算 AC（无护甲）：10 + 敏捷调整值
 */
export function calculateBaseAC(dexterityMod: number): number {
  return 10 + dexterityMod;
}

/**
 * 计算技能加值：属性调整值 + 熟练加值（如熟练）
 */
export function calculateSkillBonus(
  abilityScore: number,
  isProficient: boolean,
  level: number = 1
): number {
  const abilityMod = getAbilityModifier(abilityScore);
  const proficiencyBonus = level >= 5 ? 3 : level >= 9 ? 4 : level >= 13 ? 5 : level >= 17 ? 6 : 2;
  return abilityMod + (isProficient ? proficiencyBonus : 0);
}

/**
 * 获取熟练加值（基于等级）
 */
export function getProficiencyBonus(level: number): number {
  if (level >= 17) return 6;
  if (level >= 13) return 5;
  if (level >= 9) return 4;
  if (level >= 5) return 3;
  return 2;
}

// ============ 属性分配常量 ============

/** 标准数组 */
export const STANDARD_ARRAY = [15, 14, 13, 12, 10, 8];

/** 购点法成本表 */
export const POINT_BUY_COSTS: Record<number, number> = {
  8: 0,
  9: 1,
  10: 2,
  11: 3,
  12: 4,
  13: 5,
  14: 7,
  15: 9,
};

/** 购点法预算 */
export const POINT_BUY_BUDGET = 27;

/** 属性值范围 */
export const ABILITY_MIN = 3;
export const ABILITY_MAX = 20;
