'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { charactersApi } from '@/lib/api';
import { RACES, CLASSES, BACKGROUNDS } from '@/data/dnd/rules';

type CreationMode = 'manual' | 'random' | 'preset';

export default function CharacterCreationPage() {
  const [mode, setMode] = useState<CreationMode>('manual');
  const [step, setStep] = useState(1);

  // 角色数据
  const [characterData, setCharacterData] = useState({
    name: '',
    race: '',
    class: '',
    background: '',
    abilities: {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
    },
    skills: [] as string[],
    equipment: [] as string[],
    backstory: '',
    portraitUrl: '',
  });

  const totalSteps = 7;

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* 顶部导航 */}
      <header className="border-b border-border-color bg-bg-secondary">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="font-serif text-2xl font-bold text-text-primary">
              创建角色
            </h1>
            <button
              onClick={() => window.history.back()}
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              返回
            </button>
          </div>
        </div>
      </header>

      {/* 创建方式选择 */}
      <div className="border-b border-border-color bg-bg-secondary">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex gap-4">
            <button
              onClick={() => setMode('manual')}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                mode === 'manual'
                  ? 'bg-btn-primary text-btn-primary-text'
                  : 'border border-btn-primary text-btn-primary hover:bg-bg-primary'
              }`}
            >
              自建
            </button>
            <button
              onClick={() => setMode('random')}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                mode === 'random'
                  ? 'bg-btn-primary text-btn-primary-text'
                  : 'border border-btn-primary text-btn-primary hover:bg-bg-primary'
              }`}
            >
              随机生成
            </button>
            <button
              onClick={() => setMode('preset')}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                mode === 'preset'
                  ? 'bg-btn-primary text-btn-primary-text'
                  : 'border border-btn-primary text-btn-primary hover:bg-bg-primary'
              }`}
            >
              预设模板
            </button>
          </div>
        </div>
      </div>

      {/* 进度指示器 */}
      <div className="border-b border-border-color bg-bg-secondary">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center gap-2">
            {Array.from({ length: totalSteps }, (_, i) => i + 1).map((s) => (
              <div
                key={s}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  s <= step ? 'bg-btn-primary' : 'bg-border-color'
                }`}
              />
            ))}
          </div>
          <p className="mt-2 text-sm text-text-secondary">
            步骤 {step} / {totalSteps}
          </p>
        </div>
      </div>

      {/* 主内容区 */}
      <main className="mx-auto max-w-4xl px-6 py-8">
        {mode === 'manual' && (
          <ManualCreationContent
            step={step}
            characterData={characterData}
            setCharacterData={setCharacterData}
          />
        )}
        {mode === 'random' && <RandomCreationContent />}
        {mode === 'preset' && <PresetCreationContent />}

        {/* 导航按钮 */}
        {mode === 'manual' && (
          <div className="mt-8 flex justify-between">
            <button
              onClick={handlePrev}
              disabled={step === 1}
              className="px-6 py-2 border border-btn-primary text-btn-primary rounded-lg font-semibold hover:bg-bg-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              上一步
            </button>
            <button
              onClick={handleNext}
              disabled={step === totalSteps}
              className="px-6 py-2 bg-btn-primary text-btn-primary-text rounded-lg font-semibold hover:bg-btn-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {step === totalSteps ? '预览角色卡' : '下一步'}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

// ============ 自建模式内容组件 ============

function ManualCreationContent({
  step,
  characterData,
  setCharacterData,
}: {
  step: number;
  characterData: any;
  setCharacterData: (data: any) => void;
}) {
  switch (step) {
    case 1:
      return <Step1BasicInfo characterData={characterData} setCharacterData={setCharacterData} />;
    case 2:
      return <Step2Abilities characterData={characterData} setCharacterData={setCharacterData} />;
    case 3:
      return <Step3Skills characterData={characterData} setCharacterData={setCharacterData} />;
    case 4:
      return <Step4Equipment characterData={characterData} setCharacterData={setCharacterData} />;
    case 5:
      return <Step5Backstory characterData={characterData} setCharacterData={setCharacterData} />;
    case 6:
      return <Step6Portrait characterData={characterData} setCharacterData={setCharacterData} />;
    case 7:
      return <Step7Preview characterData={characterData} />;
    default:
      return null;
  }
}

// ============ 步骤 1：基本信息 ============

function Step1BasicInfo({ characterData, setCharacterData }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl font-bold text-text-primary">基本信息</h2>
        <p className="mt-2 text-text-secondary">选择你的种族、职业和背景</p>
      </div>

      {/* 角色名称 */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-2">
          角色名称
        </label>
        <input
          type="text"
          value={characterData.name}
          onChange={(e) => setCharacterData({ ...characterData, name: e.target.value })}
          placeholder="输入角色名称"
          className="w-full px-4 py-2 border border-border-color rounded-lg bg-bg-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-btn-primary"
        />
      </div>

      {/* 种族选择 */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-2">
          种族
        </label>
        <div className="grid grid-cols-2 gap-3">
          {Object.values(RACES).map((race) => (
            <button
              key={race.key}
              onClick={() => setCharacterData({ ...characterData, race: race.key })}
              className={`p-4 border rounded-lg text-left transition-colors ${
                characterData.race === race.key
                  ? 'border-btn-primary bg-bg-secondary ring-2 ring-btn-primary'
                  : 'border-border-color hover:border-btn-primary'
              }`}
            >
              <div className="font-semibold text-text-primary">{race.name}</div>
              <div className="text-xs text-text-secondary mt-1">{race.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 职业选择 */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-2">
          职业
        </label>
        <div className="grid grid-cols-2 gap-3">
          {Object.values(CLASSES).map((cls) => (
            <button
              key={cls.key}
              onClick={() => setCharacterData({ ...characterData, class: cls.key })}
              className={`p-4 border rounded-lg text-left transition-colors ${
                characterData.class === cls.key
                  ? 'border-btn-primary bg-bg-secondary ring-2 ring-btn-primary'
                  : 'border-border-color hover:border-btn-primary'
              }`}
            >
              <div className="font-semibold text-text-primary">{cls.name}</div>
              <div className="text-xs text-text-secondary mt-1">{cls.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 背景选择 */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-2">
          背景
        </label>
        <div className="grid grid-cols-2 gap-3">
          {Object.values(BACKGROUNDS).map((bg) => (
            <button
              key={bg.key}
              onClick={() => setCharacterData({ ...characterData, background: bg.key })}
              className={`p-4 border rounded-lg text-left transition-colors ${
                characterData.background === bg.key
                  ? 'border-btn-primary bg-bg-secondary ring-2 ring-btn-primary'
                  : 'border-border-color hover:border-btn-primary'
              }`}
            >
              <div className="font-semibold text-text-primary">{bg.name}</div>
              <div className="text-xs text-text-secondary mt-1">{bg.description}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============ 步骤 2：属性分配 ============

type AllocationMethod = 'standard' | 'pointbuy' | 'dice';

function Step2Abilities({ characterData, setCharacterData }: any) {
  const [method, setMethod] = useState<AllocationMethod>('standard');
  const abilities = characterData.abilities;

  const updateAbility = (key: string, value: number) => {
    setCharacterData({
      ...characterData,
      abilities: { ...abilities, [key]: value },
    });
  };

  const getModifier = (score: number) => Math.floor((score - 10) / 2);
  const formatMod = (mod: number) => (mod >= 0 ? `+${mod}` : `${mod}`);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl font-bold text-text-primary">属性分配</h2>
        <p className="mt-2 text-text-secondary">分配你的六项属性值</p>
      </div>

      {/* 分配方式 Tab */}
      <div className="flex gap-3">
        <button
          onClick={() => setMethod('standard')}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            method === 'standard'
              ? 'bg-btn-primary text-btn-primary-text'
              : 'border border-btn-primary text-btn-primary hover:bg-bg-primary'
          }`}
        >
          标准数组
        </button>
        <button
          onClick={() => setMethod('pointbuy')}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            method === 'pointbuy'
              ? 'bg-btn-primary text-btn-primary-text'
              : 'border border-btn-primary text-btn-primary hover:bg-bg-primary'
          }`}
        >
          购点法
        </button>
        <button
          onClick={() => setMethod('dice')}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            method === 'dice'
              ? 'bg-btn-primary text-btn-primary-text'
              : 'border border-btn-primary text-btn-primary hover:bg-bg-primary'
          }`}
        >
          掷骰法
        </button>
      </div>

      {/* 属性卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(abilities).map(([key, value]) => (
          <div key={key} className="p-4 border border-border-color rounded-lg bg-bg-secondary">
            <div className="text-sm font-semibold text-text-secondary">
              {key === 'strength' && '力量 STR'}
              {key === 'dexterity' && '敏捷 DEX'}
              {key === 'constitution' && '体质 CON'}
              {key === 'intelligence' && '智力 INT'}
              {key === 'wisdom' && '感知 WIS'}
              {key === 'charisma' && '魅力 CHA'}
            </div>
            <div className="flex items-center gap-3 mt-3">
              <button
                onClick={() => updateAbility(key, Math.max(3, (value as number) - 1))}
                className="w-8 h-8 flex items-center justify-center border border-border-color rounded hover:bg-bg-primary text-text-primary"
              >
                -
              </button>
              <div className="text-3xl font-bold text-text-primary font-mono w-12 text-center">
                {value as number}
              </div>
              <button
                onClick={() => updateAbility(key, Math.min(20, (value as number) + 1))}
                className="w-8 h-8 flex items-center justify-center border border-border-color rounded hover:bg-bg-primary text-text-primary"
              >
                +
              </button>
            </div>
            <div className="text-center mt-2">
              <span className="inline-block px-2 py-1 bg-dark-bg text-gold rounded text-sm font-mono">
                {formatMod(getModifier(value as number))}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 方法说明 */}
      <div className="p-4 border border-border-color rounded-lg bg-bg-secondary">
        {method === 'standard' && (
          <div>
            <h3 className="font-semibold text-text-primary">标准数组</h3>
            <p className="text-sm text-text-secondary mt-1">
              将 [15, 14, 13, 12, 10, 8] 分配给六项属性，每项只能用一次。
            </p>
          </div>
        )}
        {method === 'pointbuy' && (
          <div>
            <h3 className="font-semibold text-text-primary">购点法（27 点）</h3>
            <p className="text-sm text-text-secondary mt-1">
              从 8 点开始，用 27 点购买属性提升。8→14 每点成本递增，15 点成本为 9 点。
            </p>
          </div>
        )}
        {method === 'dice' && (
          <div>
            <h3 className="font-semibold text-text-primary">掷骰法（4d6 去最低）</h3>
            <p className="text-sm text-text-secondary mt-1">
              掷 4 个 d6，去掉最低值，剩余三个相加。为每项属性重复此过程。
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ============ 步骤 3：技能选择 ============

function Step3Skills({ characterData, setCharacterData }: any) {
  const { SKILLS, CLASSES, BACKGROUNDS, getProficiencyBonus } = require('@/data/dnd/rules');
  
  const selectedClass = characterData.class ? CLASSES[characterData.class] : null;
  const selectedBackground = characterData.background ? BACKGROUNDS[characterData.background] : null;
  const maxSkills = selectedClass?.skillCount || 2;
  const selectedSkills = characterData.skills || [];
  const backgroundSkills = selectedBackground?.skills || [];

  const toggleSkill = (skillKey: string) => {
    let newSkills;
    if (selectedSkills.includes(skillKey)) {
      newSkills = selectedSkills.filter((s: string) => s !== skillKey);
    } else {
      if (selectedSkills.length >= maxSkills) return;
      newSkills = [...selectedSkills, skillKey];
    }
    setCharacterData({ ...characterData, skills: newSkills });
  };

  const isSkillProficient = (skillKey: string) => {
    return selectedSkills.includes(skillKey) || backgroundSkills.includes(skillKey);
  };

  const getSkillBonus = (skillKey: string) => {
    const skill = SKILLS[skillKey];
    if (!skill) return 0;
    const abilityScore = characterData.abilities[skill.ability] || 10;
    const abilityMod = Math.floor((abilityScore - 10) / 2);
    const proficient = isSkillProficient(skillKey);
    const profBonus = getProficiencyBonus(1);
    return abilityMod + (proficient ? profBonus : 0);
  };

  const formatBonus = (bonus: number) => (bonus >= 0 ? `+${bonus}` : `${bonus}`);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl font-bold text-text-primary">技能选择</h2>
        <p className="mt-2 text-text-secondary">
          选择 {maxSkills} 项熟练技能（已选 {selectedSkills.length} 项）
        </p>
      </div>

      {selectedBackground && (
        <div className="p-4 border border-border-color rounded-lg bg-bg-secondary">
          <h3 className="font-semibold text-text-primary mb-2">
            背景熟练技能（{selectedBackground.name}）
          </h3>
          <div className="flex flex-wrap gap-2">
            {backgroundSkills.map((skillKey: string) => (
              <span
                key={skillKey}
                className="px-3 py-1 bg-gold/20 text-gold rounded-full text-sm"
              >
                {SKILLS[skillKey]?.name || skillKey}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {Object.values(SKILLS).map((skill: any) => {
          const proficient = isSkillProficient(skill.key);
          const bonus = getSkillBonus(skill.key);
          const canSelect = !proficient && selectedSkills.length < maxSkills;
          const isSelected = selectedSkills.includes(skill.key);
          const isBackground = backgroundSkills.includes(skill.key);

          return (
            <button
              key={skill.key}
              onClick={() => !isBackground && toggleSkill(skill.key)}
              disabled={isBackground || (!isSelected && !canSelect)}
              className={`p-3 border rounded-lg text-left transition-colors ${
                isBackground
                  ? 'border-gold bg-gold/10'
                  : isSelected
                  ? 'border-btn-primary bg-btn-primary/10'
                  : canSelect
                  ? 'border-border-color hover:border-btn-primary'
                  : 'border-border-color opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-text-primary">{skill.name}</div>
                  <div className="text-xs text-text-secondary">
                    {skill.ability === 'strength' && '力量'}
                    {skill.ability === 'dexterity' && '敏捷'}
                    {skill.ability === 'constitution' && '体质'}
                    {skill.ability === 'intelligence' && '智力'}
                    {skill.ability === 'wisdom' && '感知'}
                    {skill.ability === 'charisma' && '魅力'}
                  </div>
                </div>
                <div className="text-lg font-bold font-mono text-gold">
                  {formatBonus(bonus)}
                </div>
              </div>
              {isBackground && (
                <div className="text-xs text-gold mt-1">背景熟练</div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Step4Equipment({ characterData, setCharacterData }: any) {
  const { CLASSES } = require('@/data/dnd/rules');
  const selectedClass = characterData.class ? CLASSES[characterData.class] : null;
  const equipment = characterData.equipment || [];

  const toggleEquipment = (item: string) => {
    if (equipment.includes(item)) {
      setCharacterData({ ...characterData, equipment: equipment.filter((e: string) => e !== item) });
    } else {
      setCharacterData({ ...characterData, equipment: [...equipment, item] });
    }
  };

  // 简化的装备选项
  const equipmentOptions = [
    { key: 'chain_mail', name: '链甲', ac: 16, type: 'armor' },
    { key: 'leather_armor', name: '皮甲', ac: 11, type: 'armor' },
    { key: 'shield', name: '盾牌', acBonus: 2, type: 'shield' },
    { key: 'longsword', name: '长剑', damage: '1d8', type: 'weapon' },
    { key: 'shortbow', name: '短弓', damage: '1d6', type: 'weapon' },
    { key: 'quarterstaff', name: '木棍', damage: '1d6', type: 'weapon' },
    { key: 'dagger', name: '匕首', damage: '1d4', type: 'weapon' },
    { key: 'backpack', name: '背包', type: 'pack' },
    { key: 'bedroll', name: '睡袋', type: 'pack' },
    { key: 'rations', name: '口粮 (10 天)', type: 'pack' },
    { key: 'waterskin', name: '水袋', type: 'pack' },
    { key: 'rope', name: '麻绳 (50 尺)', type: 'pack' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl font-bold text-text-primary">装备选择</h2>
        <p className="mt-2 text-text-secondary">选择你的初始装备</p>
      </div>

      {/* 护甲 */}
      <div>
        <h3 className="font-semibold text-text-primary mb-3">护甲</h3>
        <div className="grid grid-cols-2 gap-3">
          {equipmentOptions
            .filter((e) => e.type === 'armor' || e.type === 'shield')
            .map((item) => (
              <button
                key={item.key}
                onClick={() => toggleEquipment(item.key)}
                className={`p-3 border rounded-lg text-left transition-colors ${
                  equipment.includes(item.key)
                    ? 'border-btn-primary bg-btn-primary/10'
                    : 'border-border-color hover:border-btn-primary'
                }`}
              >
                <div className="font-semibold text-text-primary">{item.name}</div>
                <div className="text-xs text-text-secondary mt-1">
                  {item.ac ? `AC ${item.ac}` : `AC +${item.acBonus}`}
                </div>
              </button>
            ))}
        </div>
      </div>

      {/* 武器 */}
      <div>
        <h3 className="font-semibold text-text-primary mb-3">武器</h3>
        <div className="grid grid-cols-2 gap-3">
          {equipmentOptions
            .filter((e) => e.type === 'weapon')
            .map((item) => (
              <button
                key={item.key}
                onClick={() => toggleEquipment(item.key)}
                className={`p-3 border rounded-lg text-left transition-colors ${
                  equipment.includes(item.key)
                    ? 'border-btn-primary bg-btn-primary/10'
                    : 'border-border-color hover:border-btn-primary'
                }`}
              >
                <div className="font-semibold text-text-primary">{item.name}</div>
                <div className="text-xs text-text-secondary mt-1">伤害：{item.damage}</div>
              </button>
            ))}
        </div>
      </div>

      {/* 背包物品 */}
      <div>
        <h3 className="font-semibold text-text-primary mb-3">背包物品</h3>
        <div className="grid grid-cols-2 gap-3">
          {equipmentOptions
            .filter((e) => e.type === 'pack')
            .map((item) => (
              <button
                key={item.key}
                onClick={() => toggleEquipment(item.key)}
                className={`p-3 border rounded-lg text-left transition-colors ${
                  equipment.includes(item.key)
                    ? 'border-btn-primary bg-btn-primary/10'
                    : 'border-border-color hover:border-btn-primary'
                }`}
              >
                <div className="font-semibold text-text-primary">{item.name}</div>
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}

function Step5Backstory({ characterData, setCharacterData }: any) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateBackstory = async () => {
    setIsGenerating(true);
    // TODO: 调用后端 API 生成背景故事
    setTimeout(() => {
      setCharacterData({
        ...characterData,
        backstory: '你出生在一个平凡的家庭，但从小就对冒险充满向往。一次偶然的机会，你遇到了一位老冒险者，他讲述了远方的神秘大陆和无尽的宝藏。从那时起，你决定踏上冒险之路，寻找属于自己的传奇...',
      });
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl font-bold text-text-primary">背景故事</h2>
        <p className="mt-2 text-text-secondary">为你的角色编写背景故事</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-text-primary mb-2">
          背景故事
        </label>
        <textarea
          value={characterData.backstory}
          onChange={(e) => setCharacterData({ ...characterData, backstory: e.target.value })}
          placeholder="描述你的角色的过去、动机和目标..."
          rows={8}
          className="w-full px-4 py-3 border border-border-color rounded-lg bg-bg-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-btn-primary resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-text-primary mb-2">
          性格特征
        </label>
        <input
          type="text"
          placeholder="例如：勇敢、好奇、正义感强"
          className="w-full px-4 py-2 border border-border-color rounded-lg bg-bg-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-btn-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-text-primary mb-2">
          理想
        </label>
        <input
          type="text"
          placeholder="例如：寻找失落的宝藏、保护弱小"
          className="w-full px-4 py-2 border border-border-color rounded-lg bg-bg-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-btn-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-text-primary mb-2">
          羁绊
        </label>
        <input
          type="text"
          placeholder="例如：家人、朋友、导师"
          className="w-full px-4 py-2 border border-border-color rounded-lg bg-bg-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-btn-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-text-primary mb-2">
          缺陷
        </label>
        <input
          type="text"
          placeholder="例如：冲动、贪婪、恐惧"
          className="w-full px-4 py-2 border border-border-color rounded-lg bg-bg-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-btn-primary"
        />
      </div>

      <button
        onClick={generateBackstory}
        disabled={isGenerating}
        className="w-full py-3 bg-gold text-dark-bg rounded-lg font-semibold hover:bg-gold-hover transition-colors disabled:opacity-50"
      >
        {isGenerating ? 'AI 生成中...' : 'AI 生成背景故事'}
      </button>
    </div>
  );
}

function Step6Portrait({ characterData, setCharacterData }: any) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePortrait = async () => {
    setIsGenerating(true);
    // TODO: 调用后端 API 生成 AI 立绘
    setTimeout(() => {
      setCharacterData({ ...characterData, portraitUrl: 'https://via.placeholder.com/200x200?text=AI+Portrait' });
      setIsGenerating(false);
    }, 2000);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // TODO: 上传到 Supabase Storage
      const url = URL.createObjectURL(file);
      setCharacterData({ ...characterData, portraitUrl: url });
    }
  };

  // 预设头像
  const presetPortraits = [
    { key: 'warrior1', url: 'https://via.placeholder.com/100x100?text=Warrior', label: '战士 1' },
    { key: 'mage1', url: 'https://via.placeholder.com/100x100?text=Mage', label: '法师 1' },
    { key: 'rogue1', url: 'https://via.placeholder.com/100x100?text=Rogue', label: '游荡者 1' },
    { key: 'cleric1', url: 'https://via.placeholder.com/100x100?text=Cleric', label: '牧师 1' },
    { key: 'ranger1', url: 'https://via.placeholder.com/100x100?text=Ranger', label: '游侠 1' },
    { key: 'elf1', url: 'https://via.placeholder.com/100x100?text=Elf', label: '精灵 1' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl font-bold text-text-primary">角色立绘</h2>
        <p className="mt-2 text-text-secondary">选择或生成角色头像</p>
      </div>

      {/* 当前立绘预览 */}
      {characterData.portraitUrl && (
        <div className="flex justify-center">
          <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-gold">
            <img
              src={characterData.portraitUrl}
              alt="角色立绘"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* AI 生成 */}
      <div>
        <button
          onClick={generatePortrait}
          disabled={isGenerating}
          className="w-full py-3 bg-gold text-dark-bg rounded-lg font-semibold hover:bg-gold-hover transition-colors disabled:opacity-50"
        >
          {isGenerating ? 'AI 生成中...' : 'AI 生成角色立绘'}
        </button>
      </div>

      {/* 上传 */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-2">
          上传自定义立绘
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="w-full px-4 py-2 border border-border-color rounded-lg bg-bg-secondary text-text-primary file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-btn-primary file:text-btn-primary-text hover:file:bg-btn-primary-hover"
        />
      </div>

      {/* 预设头像 */}
      <div>
        <h3 className="font-semibold text-text-primary mb-3">预设头像</h3>
        <div className="grid grid-cols-3 gap-3">
          {presetPortraits.map((portrait) => (
            <button
              key={portrait.key}
              onClick={() => setCharacterData({ ...characterData, portraitUrl: portrait.url })}
              className={`p-2 border rounded-lg transition-colors ${
                characterData.portraitUrl === portrait.url
                  ? 'border-gold ring-2 ring-gold'
                  : 'border-border-color hover:border-btn-primary'
              }`}
            >
              <img
                src={portrait.url}
                alt={portrait.label}
                className="w-full aspect-square object-cover rounded"
              />
              <div className="text-xs text-text-secondary mt-1 text-center">{portrait.label}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Step7Preview({ characterData }: any) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const { RACES, CLASSES, BACKGROUNDS, SKILLS, getAbilityModifier, formatModifier } = require('@/data/dnd/rules');

  const race = characterData.race ? RACES[characterData.race] : null;
  const cls = characterData.class ? CLASSES[characterData.class] : null;
  const background = characterData.background ? BACKGROUNDS[characterData.background] : null;

  // 计算战斗数据
  const conMod = characterData.abilities ? getAbilityModifier(characterData.abilities.constitution || 10) : 0;
  const dexMod = characterData.abilities ? getAbilityModifier(characterData.abilities.dexterity || 10) : 0;
  const hp = cls ? Math.max(cls.hitDie + conMod, 1) : 10;
  const ac = 10 + dexMod;
  const initiative = dexMod;
  const speed = race?.speed || 30;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // 准备提交数据
      const submitData = {
        name: characterData.name,
        race: characterData.race,
        class: characterData.class,
        level: 1,
        background: characterData.background,
        abilities: characterData.abilities,
        skills: characterData.skills?.reduce((acc: any, skillKey: string) => {
          acc[skillKey] = { proficient: true, modifier: 0 };
          return acc;
        }, {}),
        backstory: characterData.backstory,
        portrait_url: characterData.portraitUrl,
      };

      // 调用后端 API 保存角色
      const response = await charactersApi.create(submitData);
      console.log('角色保存成功:', response.data);
      alert('角色保存成功！');
      
      // 跳转到仪表板或角色详情页
      router.push('/characters');
    } catch (error) {
      console.error('保存角色失败:', error);
      alert('保存角色失败，请重试');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl font-bold text-text-primary">角色卡预览</h2>
        <p className="mt-2 text-text-secondary">确认你的角色信息</p>
      </div>

      {/* 角色卡 */}
      <div className="border-2 border-gold rounded-lg overflow-hidden bg-dark-bg">
        {/* 头部 */}
        <div className="bg-dark-bg-secondary p-6 border-b border-gold/30">
          <div className="flex items-center gap-4">
            {characterData.portraitUrl && (
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gold">
                <img
                  src={characterData.portraitUrl}
                  alt="角色立绘"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gold font-serif">
                {characterData.name || '未命名角色'}
              </h3>
              <div className="text-dark-text-secondary mt-1">
                {race?.name || '未知种族'} · {cls?.name || '未知职业'} · 等级 1
              </div>
              {background && (
                <div className="text-dark-text-secondary text-sm mt-1">
                  背景：{background.name}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 战斗数据 */}
        <div className="grid grid-cols-4 gap-4 p-4 border-b border-gold/20 bg-dark-bg-secondary/50">
          <div className="text-center">
            <div className="text-xs text-dark-text-secondary">HP</div>
            <div className="text-2xl font-bold text-gold font-mono">{hp}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-dark-text-secondary">AC</div>
            <div className="text-2xl font-bold text-gold font-mono">{ac}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-dark-text-secondary">先攻</div>
            <div className="text-2xl font-bold text-gold font-mono">{formatModifier(initiative)}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-dark-text-secondary">速度</div>
            <div className="text-2xl font-bold text-gold font-mono">{speed}ft</div>
          </div>
        </div>

        {/* 属性 */}
        <div className="p-4 border-b border-gold/20">
          <h4 className="text-sm font-semibold text-gold mb-3">属性</h4>
          <div className="grid grid-cols-6 gap-2">
            {characterData.abilities && Object.entries(characterData.abilities).map(([key, value]: [string, any]) => (
              <div key={key} className="text-center p-2 bg-dark-bg-secondary rounded">
                <div className="text-xs text-dark-text-secondary">
                  {key === 'strength' && 'STR'}
                  {key === 'dexterity' && 'DEX'}
                  {key === 'constitution' && 'CON'}
                  {key === 'intelligence' && 'INT'}
                  {key === 'wisdom' && 'WIS'}
                  {key === 'charisma' && 'CHA'}
                </div>
                <div className="text-lg font-bold text-dark-text font-mono">{value}</div>
                <div className="text-xs text-gold font-mono">{formatModifier(getAbilityModifier(value))}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 技能 */}
        {characterData.skills && characterData.skills.length > 0 && (
          <div className="p-4 border-b border-gold/20">
            <h4 className="text-sm font-semibold text-gold mb-3">熟练技能</h4>
            <div className="flex flex-wrap gap-2">
              {characterData.skills.map((skillKey: string) => (
                <span key={skillKey} className="px-2 py-1 bg-gold/20 text-gold rounded text-sm">
                  {SKILLS[skillKey]?.name || skillKey}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 背景故事 */}
        {characterData.backstory && (
          <div className="p-4">
            <h4 className="text-sm font-semibold text-gold mb-2">背景故事</h4>
            <p className="text-dark-text text-sm leading-relaxed">{characterData.backstory}</p>
          </div>
        )}
      </div>

      {/* 保存按钮 */}
      <div className="flex gap-4">
        <button
          onClick={() => window.history.back()}
          disabled={isSaving}
          className="flex-1 py-3 border border-btn-primary text-btn-primary rounded-lg font-semibold hover:bg-bg-primary transition-colors disabled:opacity-50"
        >
          返回修改
        </button>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex-1 py-3 bg-btn-primary text-btn-primary-text rounded-lg font-semibold hover:bg-btn-primary-hover transition-colors disabled:opacity-50"
        >
          {isSaving ? '保存中...' : '保存角色'}
        </button>
      </div>
    </div>
  );
}

// ============ 随机生成模式 ============

function RandomCreationContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl font-bold text-text-primary">随机生成角色</h2>
        <p className="mt-2 text-text-secondary">让 AI 为你生成一个完整的角色</p>
      </div>
      <div className="p-8 border border-border-color rounded-lg bg-bg-secondary text-center text-text-secondary">
        随机生成组件（待实现）
      </div>
    </div>
  );
}

// ============ 预设模板模式 ============

function PresetCreationContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl font-bold text-text-primary">预设模板</h2>
        <p className="mt-2 text-text-secondary">选择一个预设角色模板</p>
      </div>
      <div className="p-8 border border-border-color rounded-lg bg-bg-secondary text-center text-text-secondary">
        预设模板组件（待实现）
      </div>
    </div>
  );
}
