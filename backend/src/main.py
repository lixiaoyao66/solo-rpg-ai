from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.config import settings

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


@app.get("/")
async def root():
    return {"message": "SoloRPG API is running"}


@app.get("/health")
async def health_check():
    return {"status": "ok"}


# 路由注册（后续添加）
# from src.api import characters, campaigns, game
# app.include_router(characters.router, prefix="/api/characters", tags=["characters"])
# app.include_router(campaigns.router, prefix="/api/campaigns", tags=["campaigns"])
# app.include_router(game.router, prefix="/api/game", tags=["game"])
