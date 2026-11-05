export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold font-serif text-text-primary">
        SoloRPG
      </h1>
      <p className="mt-4 text-lg text-text-secondary">
        AI 驱动的单人 DND 跑团平台
      </p>
      <div className="mt-8 flex gap-4">
        <button className="px-6 py-3 bg-btn-primary text-btn-primary-text rounded-lg font-semibold hover:bg-btn-primary-hover transition-colors">
          开始冒险
        </button>
        <button className="px-6 py-3 border border-btn-primary text-btn-primary rounded-lg font-semibold hover:bg-bg-primary transition-colors">
          了解更多
        </button>
      </div>
    </main>
  );
}
