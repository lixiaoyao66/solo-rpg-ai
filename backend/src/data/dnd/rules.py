"""DND 5e 基础规则数据"""

# 种族数据
RACES = {
    "human": {
        "name": "人类",
        "ability_bonuses": {"all": 1},
        "speed": 30,
        "traits": ["额外语言"],
    },
    "elf": {
        "name": "精灵",
        "ability_bonuses": {"dexterity": 2},
        "speed": 30,
        "traits": ["黑暗视觉", "敏锐感官", "精灵血统", " trance"],
    },
    "dwarf": {
        "name": "矮人",
        "ability_bonuses": {"constitution": 2},
        "speed": 25,
        "traits": ["黑暗视觉", "矮人坚韧", "石匠直觉", "武器熟练"],
    },
    "halfling": {
        "name": "半身人",
        "ability_bonuses": {"dexterity": 2},
        "speed": 25,
        "traits": ["幸运", "勇敢", "灵活", "半身人语言"],
    },
    "dragonborn": {
        "name": "龙裔",
        "ability_bonuses": {"strength": 2, "charisma": 1},
        "speed": 30,
        "traits": ["龙脉血统", "吐息武器", "伤害抗性"],
    },
    "tiefling": {
        "name": "提夫林",
        "ability_bonuses": {"charisma": 2, "intelligence": 1},
        "speed": 30,
        "traits": ["地狱抗性", "黑暗视觉", "地狱遗产"],
    },
}

# 职业数据
CLASSES = {
    "fighter": {
        "name": "战士",
        "hit_die": 10,
        "primary_ability": "strength",
        "saving_throws": ["strength", "constitution"],
        "skill_choices": [
            "acrobatics", "animal_handling", "athletics", "history",
            "insight", "intimidation", "perception", "survival",
        ],
        "skill_count": 2,
        "starting_equipment": [
            {"option": "chain_mail", "ac": 16},
            {"option": "longsword_and_shield", "weapons": ["longsword"], "ac_bonus": 2},
        ],
    },
    "wizard": {
        "name": "法师",
        "hit_die": 6,
        "primary_ability": "intelligence",
        "saving_throws": ["intelligence", "wisdom"],
        "skill_choices": [
            "arcana", "history", "insight", "investigation",
            "medicine", "religion",
        ],
        "skill_count": 2,
        "starting_equipment": [
            {"option": "quarterstaff", "weapons": ["quarterstaff"]},
            {"option": "component_pouch", "type": "tool"},
        ],
    },
    "rogue": {
        "name": "游荡者",
        "hit_die": 8,
        "primary_ability": "dexterity",
        "saving_throws": ["dexterity", "intelligence"],
        "skill_choices": [
            "acrobatics", "athletics", "deception", "insight",
            "intimidation", "investigation", "perception",
            "performance", "persuasion", "sleight_of_hand", "stealth",
        ],
        "skill_count": 4,
        "starting_equipment": [
            {"option": "rapier", "weapons": ["rapier"]},
            {"option": "shortbow", "weapons": ["shortbow"]},
            {"option": "burglar_pack", "type": "pack"},
        ],
    },
    "cleric": {
        "name": "牧师",
        "hit_die": 8,
        "primary_ability": "wisdom",
        "saving_throws": ["wisdom", "charisma"],
        "skill_choices": [
            "history", "insight", "medicine", "persuasion", "religion",
        ],
        "skill_count": 2,
        "starting_equipment": [
            {"option": "mace", "weapons": ["mace"]},
            {"option": "scale_mail", "ac": 14},
            {"option": "shield", "ac_bonus": 2},
        ],
    },
    "ranger": {
        "name": "游侠",
        "hit_die": 10,
        "primary_ability": "dexterity",
        "saving_throws": ["strength", "dexterity"],
        "skill_choices": [
            "animal_handling", "athletics", "insight", "investigation",
            "nature", "perception", "stealth", "survival",
        ],
        "skill_count": 3,
        "starting_equipment": [
            {"option": "longbow", "weapons": ["longbow"]},
            {"option": "leather_armor", "ac": 11},
        ],
    },
}

# 背景数据
BACKGROUNDS = {
    "acolyte": {
        "name": "侍僧",
        "skills": ["insight", "religion"],
        "languages": 2,
        "equipment": ["holy_symbol", "prayer_book", "incense", "vestments"],
        "feature": "庇护所",
    },
    "criminal": {
        "name": "罪犯",
        "skills": ["deception", "stealth"],
        "tools": ["thieves_tools", "gaming_set"],
        "equipment": ["crowbar", "dark_clothes"],
        "feature": " criminal_contact",
    },
    "folk_hero": {
        "name": "民间英雄",
        "skills": ["animal_handling", "survival"],
        "tools": ["artisan_tools", "vehicles_land"],
        "equipment": ["iron_pot", "common_clothes", "shovel"],
        "feature": "rustic_hospitality",
    },
    "sage": {
        "name": "学者",
        "skills": ["arcana", "history"],
        "languages": 2,
        "equipment": ["ink_bottle", "quill", "knife", "letter_from_colleague"],
        "feature": "researcher",
    },
    "soldier": {
        "name": "士兵",
        "skills": ["athletics", "intimidation"],
        "tools": ["gaming_set", "vehicles_land"],
        "equipment": ["insignia", "trophy", "common_clothes"],
        "feature": "military_rank",
    },
    "outlander": {
        "name": "流浪者",
        "skills": ["athletics", "survival"],
        "languages": 1,
        "tools": ["musical_instrument"],
        "equipment": ["staff", "hunting_trap", "traveler_clothes"],
        "feature": "wanderer",
    },
}

# 技能数据
SKILLS = {
    "acrobatics": {"ability": "dexterity", "name": "杂技"},
    "animal_handling": {"ability": "wisdom", "name": "驯兽"},
    "arcana": {"ability": "intelligence", "name": "奥术"},
    "athletics": {"ability": "strength", "name": "运动"},
    "deception": {"ability": "charisma", "name": "欺瞒"},
    "history": {"ability": "intelligence", "name": "历史"},
    "insight": {"ability": "wisdom", "name": "洞察"},
    "intimidation": {"ability": "charisma", "name": "威吓"},
    "investigation": {"ability": "intelligence", "name": "调查"},
    "medicine": {"ability": "wisdom", "name": "医药"},
    "nature": {"ability": "intelligence", "name": "自然"},
    "perception": {"ability": "wisdom", "name": "察觉"},
    "performance": {"ability": "charisma", "name": "表演"},
    "persuasion": {"ability": "charisma", "name": "游说"},
    "religion": {"ability": "intelligence", "name": "宗教"},
    "sleight_of_hand": {"ability": "dexterity", "name": "巧手"},
    "stealth": {"ability": "dexterity", "name": "隐匿"},
    "survival": {"ability": "wisdom", "name": "求生"},
}

# 属性调整值计算
def get_ability_modifier(score: int) -> int:
    """计算属性调整值：(属性值 - 10) / 2 向下取整"""
    return (score - 10) // 2


# 标准数组
STANDARD_ARRAY = [15, 14, 13, 12, 10, 8]

# 购点法成本表
POINT_BUY_COSTS = {
    8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9,
}
POINT_BUY_BUDGET = 27


def calculate_hp(hit_die: int, constitution_mod: int, level: int = 1) -> int:
    """计算 HP：生命骰最大值 + 体质调整值（至少为 1）"""
    hp = hit_die + constitution_mod
    return max(hp, 1)


def calculate_ac(equipment: list, dexterity_mod: int) -> int:
    """计算 AC（简化版）"""
    base_ac = 10 + dexterity_mod
    # TODO: 根据装备类型计算 AC
    return base_ac
