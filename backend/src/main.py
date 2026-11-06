from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.config import settings
from src.database import init_db

app = FastAPI(
    title="SoloRPG API",
    description="AI 驱动的单人 DND 跑团平台 API",
    version="0.1.0",
)

# CORS 配置
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event():
    """应用启动时初始化数据库"""
    init_db()


@app.get("/")
async def root():
    return {"message": "SoloRPG API is running"}


@app.get("/health")
async def health_check():
    return {"status": "ok"}


# 路由注册
from src.api import characters
app.include_router(characters.router, prefix="/api/characters", tags=["characters"])
# app.include_router(campaigns.router, prefix="/api/campaigns", tags=["campaigns"])
# app.include_router(game.router, prefix="/api/game", tags=["game"])
