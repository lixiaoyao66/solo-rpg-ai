import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 界面框架层（明亮）
        'bg-primary': '#F5F1E8',
        'bg-secondary': '#FFFFFF',
        'border-color': '#D4C9B8',
        'text-primary': '#2C2416',
        'text-secondary': '#6B5D4F',
        'text-disabled': '#A89B8C',
        'btn-primary': '#8B7355',
        'btn-primary-hover': '#6B5540',
        'btn-primary-text': '#F5F1E8',
        'link-color': '#6B8E7B',
        // 游戏内容层（暗黑）
        'dark-bg': '#1A1612',
        'dark-bg-secondary': '#2A2420',
        'dark-bg-card': '#352E28',
        'dark-border': '#8B7355',
        'dark-text': '#E8DCC8',
        'dark-text-secondary': '#A89B8C',
        // 高亮色
        'gold': '#D4AF37',
        'gold-hover': '#E5C158',
        'magic-blue': '#5B8DB8',
        'holy-white': '#F0E6D2',
        // 强调色
        'success': '#5A9B6B',
        'warning': '#C9A85C',
        'danger': '#A85C5C',
        'info': '#5B8DB8',
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans SC', 'sans-serif'],
        serif: ['Cinzel', 'Noto Serif SC', 'serif'],
        fantasy: ['MedievalSharp', 'cursive'],
        mono: ['Rajdhani', 'monospace'],
        code: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
