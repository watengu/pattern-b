import Link from "next/link";
import { notFound } from "next/navigation";
import { Avatar, BoardHead, PostCard } from "@/components/board-ui";
import { authorById } from "@/lib/data";
import { getAuthorPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";
export const fetchCache = "default-no-store";

export default async function ProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const a = authorById(params.id);
  if (!a) notFound();
  const posts = await getAuthorPosts(a.id);
  const now = new Date();
  const links: { label: string; href: string; primary?: boolean }[] = [
    { label: "仕事の相談をする", href: "#", primary: true },
    { label: `${a.genre}スレッドを見る`, href: `/board/${encodeURIComponent(a.genre)}` },
    { label: "実績・ポートフォリオ", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "X（旧Twitter）", href: "#" },
    { label: "掲示板トップへ", href: "/" },
  ];
  return (
    <main className="bd" style={{ minHeight: "100vh" }}>
      <BoardHead />
      <div className="wrap" style={{ maxWidth: 560 }}>
        <div style={{ textAlign: "center", padding: "44px 0 8px" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Avatar name={a.name} color={a.color} size={110} />
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 700, marginTop: 16 }}>{a.name}</h1>
          <p style={{ fontSize: 13, color: "#c4502e", fontWeight: 700, letterSpacing: "0.14em" }}>
            {a.title} ・ {a.genre}
          </p>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.9,
              color: "rgba(20,22,28,0.75)",
              marginTop: 12,
              textAlign: "left",
            }}
          >
            {a.bio}
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, margin: "22px 0 8px" }}>
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              style={{
                display: "block",
                textAlign: "center",
                padding: "14px 18px",
                borderRadius: 999,
                fontSize: 14.5,
                fontWeight: 700,
                textDecoration: "none",
                background: l.primary ? "#c4502e" : "#fff",
                color: l.primary ? "#fff" : "#14161c",
                border: l.primary ? "1.5px solid #c4502e" : "1.5px solid rgba(20,22,28,0.25)",
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <h2 style={{ fontSize: 17, margin: "34px 0 14px" }}>ポストと日記（消えるまでの分だけ表示）</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, paddingBottom: 56 }}>
          {posts.map((p) => (
            <PostCard key={p.id} post={p} now={now} />
          ))}
          {posts.length === 0 && <p>いま表示できる投稿はありません。</p>}
        </div>

        <footer className="bd-footer">
          PatternB Board（仮称）のプロフィール — 公開テスト版 v0。人物は架空のものです。
        </footer>
      </div>
    </main>
  );
}
