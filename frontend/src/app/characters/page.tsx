'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { charactersApi } from '@/lib/api';
import { RACES, CLASSES } from '@/data/dnd/rules';

interface Character {
  id: string;
  name: string;
  race: string;
  class: string;
  level: number;
  portrait_url?: string;
  created_at: string;
}

export default function CharactersPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCharacters();
  }, []);

  const loadCharacters = async () => {
    try {
      // TODO: 需要实现用户认证，暂时使用固定的 user_id
      const userId = '00000000-0000-0000-0000-000000000001';
      const response = await charactersApi.list();
      setCharacters(response.data);
    } catch (error) {
      console.error('加载角色列表失败:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="text-text-secondary">加载中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* 顶部导航 */}
      <header className="border-b border-border-color bg-bg-secondary">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="font-serif text-2xl font-bold text-text-primary hover:text-btn-primary transition-colors">
              SoloRPG
            </Link>
            <Link href="/characters/new">
              <button className="px-4 py-2 bg-btn-primary text-btn-primary-text rounded-lg font-semibold hover:bg-btn-primary-hover transition-colors">
                创建新角色
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* 主内容 */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        <h1 className="font-serif text-3xl font-bold text-text-primary mb-8">
          我的角色
        </h1>

        {characters.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">⚔️</div>
            <h2 className="text-2xl font-serif font-bold text-text-primary mb-2">
              还没有角色
            </h2>
            <p className="text-text-secondary mb-8">
              创建你的第一个角色，开始冒险之旅
            </p>
            <Link href="/characters/new">
              <button className="px-6 py-3 bg-btn-primary text-btn-primary-text rounded-lg font-semibold hover:bg-btn-primary-hover transition-colors">
                创建角色
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {characters.map((character) => (
              <Link key={character.id} href={`/characters/${character.id}`}>
                <div className="border border-border-color rounded-lg overflow-hidden bg-bg-secondary hover:border-btn-primary hover:shadow-lg transition-all cursor-pointer">
                  {/* 角色立绘 */}
                  <div className="aspect-square bg-dark-bg relative overflow-hidden">
                    {character.portrait_url ? (
                      <img
                        src={character.portrait_url}
                        alt={character.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-6xl text-dark-text-secondary">
                        ⚔️
                      </div>
                    )}
                  </div>

                  {/* 角色信息 */}
                  <div className="p-4">
                    <h3 className="font-serif text-xl font-bold text-text-primary mb-1">
                      {character.name}
                    </h3>
                    <div className="text-sm text-text-secondary">
                      {RACES[character.race]?.name || character.race} ·{' '}
                      {CLASSES[character.class]?.name || character.class} ·{' '}
                      等级 {character.level}
                    </div>
                    <div className="text-xs text-text-secondary mt-2">
                      创建于 {new Date(character.created_at).toLocaleDateString('zh-CN')}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
