import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-bg-primary">
      <h1 className="text-5xl font-bold font-serif text-text-primary">
        SoloRPG
      </h1>
      <p className="mt-4 text-xl text-text-secondary">
        AI 驱动的单人 DND 跑团平台
      </p>
      <div className="mt-12 flex gap-4">
        <Link href="/characters/new">
          <button className="px-8 py-4 bg-btn-primary text-btn-primary-text rounded-lg font-semibold hover:bg-btn-primary-hover transition-colors text-lg">
            开始冒险
          </button>
        </Link>
        <Link href="/characters">
          <button className="px-8 py-4 border border-btn-primary text-btn-primary rounded-lg font-semibold hover:bg-bg-primary transition-colors text-lg">
            我的角色
          </button>
        </Link>
      </div>
      
      <div className="mt-16 max-w-2xl text-center text-text-secondary">
        <h2 className="text-2xl font-serif font-bold text-text-primary mb-4">
          踏上你的传奇之旅
        </h2>
        <p className="leading-relaxed">
          在 SoloRPG 中，AI 将担任你的地下城主（DM），引导你完成精彩的冒险。
          创建你的角色，探索神秘的地牢，与强大的怪物战斗，书写属于你的传奇故事。
        </p>
      </div>
    </main>
  );
}
