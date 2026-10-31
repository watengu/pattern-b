export type Tier = "member" | "guest";

export type Author = {
  id: string;
  name: string;
  genre: string;
  title: string;
  color: string;
  bio: string;
  tier: Tier;
};

/** Auto-delete TTL in minutes: guest (no login) = 60, member = 480. */
export const TTL_MINUTES: Record<Tier, number> = {
  guest: 60,
  member: 480,
};

export const GENRES = ["デザイン", "写真", "レッスン", "コンサル", "ライティング"];

export const AUTHORS: Author[] = [
  {
    id: "mio",
    name: "三島 澪",
    genre: "デザイン",
    title: "ブランドデザイナー",
    color: "#c4502e",
    bio: "小さなブランドの「らしさ」を、ロゴと写真とサイトで形にするフリーランスデザイナー。銀座拠点。",
    tier: "member",
  },
  {
    id: "kenichi",
    name: "佐藤 健一",
    genre: "写真",
    title: "フォトグラファー",
    color: "#2c4a73",
    bio: "店舗・料理・人物撮影。銀座、日本橋エリア専門。",
    tier: "guest",
  },
  {
    id: "misaki",
    name: "高橋 美咲",
    genre: "レッスン",
    title: "英会話講師",
    color: "#3f7a52",
    bio: "赴任前・接客英語の集中レッスン。オンライン可。",
    tier: "member",
  },
  {
    id: "makoto",
    name: "中村 誠",
    genre: "コンサル",
    title: "経営コンサルタント",
    color: "#8a5a1d",
    bio: "小規模店舗の資金繰りと数字の整理。初回相談30分無料。",
    tier: "guest",
  },
  {
    id: "yuka",
    name: "林 由香",
    genre: "ライティング",
    title: "ライター・編集者",
    color: "#6d4a7a",
    bio: "老舗・旅館・職人の言葉を生かす編集と原稿。",
    tier: "member",
  },
];

export function authorById(id: string | null): Author | null {
  if (!id) return null;
  return AUTHORS.find((a) => a.id === id) ?? null;
}

export function ageLabel(createdAt: string, now: Date): string {
  const min = Math.max(0, Math.floor((now.getTime() - new Date(createdAt).getTime()) / 60000));
  if (min < 1) return "たった今";
  if (min < 60) return `${min}分前`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m === 0 ? `${h}時間前` : `${h}時間${m}分前`;
}

export function remaining(expiresAt: string, now: Date): { minutes: number; label: string; urgent: boolean } {
  const left = Math.max(0, Math.floor((new Date(expiresAt).getTime() - now.getTime()) / 60000));
  if (left < 60) return { minutes: left, label: `あと${left}分`, urgent: left <= 30 };
  const h = Math.floor(left / 60);
  const m = left % 60;
  return {
    minutes: left,
    label: m === 0 ? `あと${h}時間` : `あと${h}時間${m}分`,
    urgent: false,
  };
}
