"""角色数据模型"""
from pydantic import BaseModel, Field
from typing import Optional, Dict, List
from datetime import datetime
from uuid import UUID


class Abilities(BaseModel):
    strength: int = Field(ge=3, le=20)
    dexterity: int = Field(ge=3, le=20)
    constitution: int = Field(ge=3, le=20)
    intelligence: int = Field(ge=3, le=20)
    wisdom: int = Field(ge=3, le=20)
    charisma: int = Field(ge=3, le=20)


class CombatStats(BaseModel):
    hp_current: int
    hp_max: int
    ac: int
    initiative: int
    speed: int


class SkillProficiency(BaseModel):
    proficient: bool = False
    modifier: int = 0


class CharacterCreate(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    race: str
    char_class: str = Field(alias="class")
    level: int = Field(default=1, ge=1, le=20)
    background: Optional[str] = None
    abilities: Abilities
    skills: Optional[Dict[str, SkillProficiency]] = None
    backstory: Optional[str] = None
    personality: Optional[str] = None
    goals: Optional[List[str]] = None
    portrait_url: Optional[str] = None

    class Config:
        populate_by_name = True


class CharacterResponse(BaseModel):
    id: UUID
    user_id: UUID
    name: str
    race: str
    char_class: str = Field(alias="class")
    level: int
    background: Optional[str] = None
    abilities: Abilities
    combat: CombatStats
    skills: Optional[Dict[str, SkillProficiency]] = None
    spells: Optional[List] = None
    special_abilities: Optional[List] = None
    equipment: Optional[List] = None
    inventory: Optional[List] = None
    gold: int = 0
    conditions: Optional[List[str]] = None
    backstory: Optional[str] = None
    personality: Optional[str] = None
    goals: Optional[List[str]] = None
    portrait_url: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        populate_by_name = True


class RandomCharacterRequest(BaseModel):
    race: Optional[str] = None
    char_class: Optional[str] = Field(default=None, alias="class")
    background: Optional[str] = None

    class Config:
        populate_by_name = True
