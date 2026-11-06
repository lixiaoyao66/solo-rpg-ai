"""角色 SQLAlchemy ORM 模型"""
from sqlalchemy import Column, String, Integer, DateTime, JSON, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import uuid
from datetime import datetime

from src.database import Base


class CharacterDB(Base):
    """角色数据库模型"""
    __tablename__ = "characters"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), nullable=False, index=True)
    
    # 基本信息
    name = Column(String(100), nullable=False)
    race = Column(String(50), nullable=False)
    char_class = Column(String(50), nullable=False)
    level = Column(Integer, default=1, nullable=False)
    background = Column(String(50))
    
    # 属性（JSON 存储）
    abilities = Column(JSON, nullable=False)
    
    # 战斗数据（JSON 存储）
    combat = Column(JSON, nullable=False)
    
    # 技能（JSON 存储）
    skills = Column(JSON)
    
    # 装备和物品（JSON 存储）
    equipment = Column(JSON)
    inventory = Column(JSON)
    gold = Column(Integer, default=0)
    
    # 背景故事
    backstory = Column(Text)
    personality = Column(Text)
    goals = Column(JSON)
    
    # 立绘
    portrait_url = Column(Text)
    
    # 时间戳
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

    def to_dict(self):
        """转换为字典"""
        return {
            "id": str(self.id),
            "user_id": str(self.user_id),
            "name": self.name,
            "race": self.race,
            "class": self.char_class,
            "level": self.level,
            "background": self.background,
            "abilities": self.abilities,
            "combat": self.combat,
            "skills": self.skills,
            "equipment": self.equipment,
            "inventory": self.inventory,
            "gold": self.gold,
            "backstory": self.backstory,
            "personality": self.personality,
            "goals": self.goals,
            "portrait_url": self.portrait_url,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }
