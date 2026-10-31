import Link from "next/link";
import { GENRES, authorById, ageLabel, remaining } from "@/lib/data";
import type { DbPost } from "@/lib/posts";

export function BoardHead() {
  return (
    <header className="bd-head">
      <div className="bd-head-in">
        <Link href="/" className="bd-logo">
          PatternB <span>Board</span>
        </Link>
        <a className="bd-post" href="#post-form">
          投稿する
        </a>
      </div>
    </header>
  );
}

export function GenreChips({ active }: { active: string }) {
  const all = ["すべて", ...GENRES];
  return (
    <div className="bd-chips">
      {all.map((g) => {
        const href = g === "すべて" ? "/" : `/board/${encodeURIComponent(g)}`;
        const isOn = active === g;
        return (
          <Link key={g} href={href} className={isOn ? "bd-chip on" : "bd-chip"}>
            {g}
          </Link>
        );
      })}
    </div>
  );
}

export function Avatar({ name, color, size }: { name: string; color: string; size: number }) {
  return (
    <div
      aria-hidden
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: Math.round(size * 0.42),
        flexShrink: 0,
      }}
    >
      {name.slice(0, 1)}
    </div>
  );
}

export function PostCard({ post, now }: { post: DbPost; now: Date }) {
  const a = authorById(post.author_id);
  const color = a?.color ?? "#666";
  const rem = remaining(post.expires_at, now);
  return (
    <article className="bd-card-post">
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {a ? (
          <Link href={`/profile/${a.id}`} style={{ flexShrink: 0 }}>
            <Avatar name={a.name} color={color} size={46} />
          </Link>
        ) : (
          <Avatar name={post.author_name} color={color} size={46} />
        )}
        <div style={{ flex: 1 }}>
          {a ? (
            <Link href={`/profile/${a.id}`} style={{ fontWeight: 700, fontSize: 15, color: "inherit", textDecoration: "none" }}>
              {post.author_name}
            </Link>
          ) : (
            <span style={{ fontWeight: 700, fontSize: 15 }}>{post.author_name}</span>
          )}
          <div style={{ fontSize: 12, color: "rgba(20,22,28,0.55)" }}>
            <Link href={`/board/${encodeURIComponent(post.genre)}`} style={{ color: "inherit" }}>
              {post.genre}スレッド
            </Link>
            ・{ageLabel(post.created_at, now)}・No.{post.id}
            <span
              style={{
                marginLeft: 8,
                fontWeight: 700,
                color: post.tier === "member" ? "#2c4a73" : "#8a5a1d",
              }}
            >
              {post.tier === "member" ? "会員" : "ゲスト"}
            </span>
          </div>
        </div>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            padding: "4px 10px",
            borderRadius: 999,
            background: post.kind === "日記" ? "#f3e7d7" : "#e8edf5",
            color: post.kind === "日記" ? "#8a5a1d" : "#2c4a73",
          }}
        >
          {post.kind}
        </span>
      </div>
      <p style={{ fontSize: 14.5, lineHeight: 1.95, marginTop: 12, whiteSpace: "pre-wrap" }}>{post.body}</p>
      <div
        style={{
          marginTop: 10,
          fontSize: 12,
          fontWeight: 700,
          color: rem.urgent ? "#c0392b" : "rgba(20,22,28,0.45)",
        }}
      >
        {rem.label}で自動削除{post.tier === "guest" ? "（ゲスト投稿：1時間）" : "（会員投稿：8時間）"}
      </div>
    </article>
  );
}

export function BoardShell({
  active,
  posts,
  heading,
  sub,
  children,
}: {
  active: string;
  posts: DbPost[];
  heading: React.ReactNode;
  sub: string;
  children?: React.ReactNode;
}) {
  const now = new Date();
  return (
    <main className="bd">
      <BoardHead />
      <div className="wrap">
        <div className="bd-hero">
          <h1>{heading}</h1>
          <p>{sub}</p>
          <GenreChips active={active} />
        </div>
        {children}
        <div style={{ display: "flex", flexDirection: "column", gap: 14, paddingBottom: 56, marginTop: 18 }}>
          {posts.map((p) => (
            <PostCard key={p.id} post={p} now={now} />
          ))}
          {posts.length === 0 && <p>いま表示できる投稿はありません（投稿は時間で自動削除されます）。</p>}
        </div>
        <footer className="bd-footer">
          PatternB Board（仮称） — サイト制作パッケージ「パターンB（掲示板型）」の公開テスト版 v0。人物は架空のサンプルです。投稿は自動削除されます（ゲスト1時間／会員8時間）。
        </footer>
      </div>
    </main>
  );
}
