import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SoloRPG - 单人 AI 跑团",
  description: "AI 驱动的单人 DND 跑团平台",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  );
}
