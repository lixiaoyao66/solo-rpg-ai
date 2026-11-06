"""角色 API 路由"""
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID, uuid4

from src.models.character import CharacterCreate, CharacterResponse, RandomCharacterRequest
from src.models.character_db import CharacterDB
from src.database import get_db
from src.data.dnd.rules import get_ability_modifier, calculate_hp, calculate_ac

router = APIRouter()


@router.post("/", response_model=CharacterResponse)
async def create_character(character: CharacterCreate, db: Session = Depends(get_db)):
    """创建新角色"""
    # 1. 计算战斗数据
    con_mod = get_ability_modifier(character.abilities.constitution)
    dex_mod = get_ability_modifier(character.abilities.dexterity)
    
    # 从职业数据获取生命骰（这里简化处理，实际需要从职业数据查询）
    hit_die = 8  # 默认 d8
    hp_max = calculate_hp(hit_die, con_mod, character.level)
    ac = calculate_ac([], dex_mod)  # 默认无甲
    initiative = dex_mod
    speed = 30  # 默认速度
    
    combat_data = {
        "hp_current": hp_max,
        "hp_max": hp_max,
        "ac": ac,
        "initiative": initiative,
        "speed": speed,
    }
    
    # 2. 创建数据库记录
    db_character = CharacterDB(
        id=uuid4(),
        user_id=uuid4(),  # TODO: 从认证中获取真实用户 ID
        name=character.name,
        race=character.race,
        char_class=character.char_class,
        level=character.level,
        background=character.background,
        abilities=character.abilities.dict(),
        combat=combat_data,
        skills=character.skills.dict() if character.skills else None,
        backstory=character.backstory,
        personality=character.personality,
        goals=character.goals,
        portrait_url=character.portrait_url,
    )
    
    # 3. 保存到数据库
    db.add(db_character)
    db.commit()
    db.refresh(db_character)
    
    # 4. 返回角色数据
    return CharacterResponse(**db_character.to_dict())


@router.get("/", response_model=List[CharacterResponse])
async def list_characters(user_id: UUID, db: Session = Depends(get_db)):
    """获取用户的角色列表"""
    characters = db.query(CharacterDB).filter(CharacterDB.user_id == user_id).all()
    return [CharacterResponse(**char.to_dict()) for char in characters]


@router.get("/{character_id}", response_model=CharacterResponse)
async def get_character(character_id: UUID, db: Session = Depends(get_db)):
    """获取角色详情"""
    character = db.query(CharacterDB).filter(CharacterDB.id == character_id).first()
    if not character:
        raise HTTPException(status_code=404, detail="Character not found")
    return CharacterResponse(**character.to_dict())


@router.put("/{character_id}", response_model=CharacterResponse)
async def update_character(character_id: UUID, character: CharacterCreate, db: Session = Depends(get_db)):
    """更新角色"""
    db_character = db.query(CharacterDB).filter(CharacterDB.id == character_id).first()
    if not db_character:
        raise HTTPException(status_code=404, detail="Character not found")
    
    # 计算战斗数据
    con_mod = get_ability_modifier(character.abilities.constitution)
    dex_mod = get_ability_modifier(character.abilities.dexterity)
    hit_die = 8
    hp_max = calculate_hp(hit_die, con_mod, character.level)
    ac = calculate_base_ac(10, dex_mod)
    initiative = dex_mod
    speed = 30
    
    combat_data = {
        "hp_current": hp_max,
        "hp_max": hp_max,
        "ac": ac,
        "initiative": initiative,
        "speed": speed,
    }
    
    # 更新字段
    db_character.name = character.name
    db_character.race = character.race
    db_character.char_class = character.char_class
    db_character.level = character.level
    db_character.background = character.background
    db_character.abilities = character.abilities.dict()
    db_character.combat = combat_data
    db_character.skills = character.skills.dict() if character.skills else None
    db_character.backstory = character.backstory
    db_character.personality = character.personality
    db_character.goals = character.goals
    db_character.portrait_url = character.portrait_url
    
    db.commit()
    db.refresh(db_character)
    
    return CharacterResponse(**db_character.to_dict())


@router.delete("/{character_id}")
async def delete_character(character_id: UUID, db: Session = Depends(get_db)):
    """删除角色"""
    db_character = db.query(CharacterDB).filter(CharacterDB.id == character_id).first()
    if not db_character:
        raise HTTPException(status_code=404, detail="Character not found")
    
    db.delete(db_character)
    db.commit()
    return {"message": "Character deleted successfully"}


@router.post("/generate", response_model=CharacterResponse)
async def generate_random_character(request: RandomCharacterRequest):
    """随机生成角色"""
    # TODO: 实现随机角色生成逻辑
    # 1. 根据偏好选择种族/职业/背景
    # 2. 分配属性（标准数组）
    # 3. 选择技能和装备
    # 4. 计算战斗数据
    # 5. 调用 AI 生成背景故事
    # 6. 返回完整角色数据
    raise HTTPException(status_code=501, detail="Not implemented yet")
