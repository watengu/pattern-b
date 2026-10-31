import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PatternB Board | パターンB掲示板（公開テスト v0）",
  description:
    "リットリンク風プロフィール × ジャンル別スレッド掲示板。投稿は自動削除（ゲスト1時間／会員8時間）。サイト制作パッケージ パターンB の公開テスト版です。",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
