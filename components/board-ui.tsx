import Link from "next/link";
import { GENRES, authorById, ageLabel, remaining } from "@/lib/data";
import type { DbPost } from "@/lib/posts";

export function BoardHead({ hidePost }: { hidePost?: boolean }) {
  return (
    <header className="bd-head">
      <div className="bd-head-in">
        <Link href="/" className="bd-logo">
          PatternB <span>Board</span>
        </Link>
        {!hidePost && (
          <a className="bd-post" href="#post-form">
            投稿する
          </a>
        )}
      </div>
    </header>
  );
}

export function BoardNotices() {
  return (
    <div className="bd-notices">
      <p>・投稿は自動で消えます（ゲスト1時間／ログイン会員8時間）。残り時間は各投稿に表示されます。</p>
      <p>・会員の投稿は、その人のプロフィールに紐づきます。名前からプロフィールへ進めます。</p>
      <p>・並び替えは「新順／残り時間順」、見た目は「カタログ」にも切り替えられます。</p>
    </div>
  );
}

export function SortBar({
  genre,
  sort,
  view,
}: {
  genre: string;
  sort: "new" | "expiry";
  view: "list" | "catalog";
}) {
  const base = `/board/${encodeURIComponent(genre)}`;
  const href = (s: "new" | "expiry", v: "list" | "catalog") => {
    const q = new URLSearchParams();
    if (s !== "new") q.set("sort", s);
    if (v !== "list") q.set("view", v);
    const qs = q.toString();
    return qs ? `${base}?${qs}` : base;
  };
  return (
    <nav className="bd-sortbar" aria-label="並び替えと表示">
      <Link href={href("new", view)} className={sort === "new" ? "on" : undefined}>
        新順
      </Link>
      <span aria-hidden>｜</span>
      <Link href={href("expiry", view)} className={sort === "expiry" ? "on" : undefined}>
        残り時間順
      </Link>
      <span aria-hidden>｜</span>
      <Link href={href(sort, view === "catalog" ? "list" : "catalog")} className={view === "catalog" ? "on" : undefined}>
        {view === "catalog" ? "リスト表示" : "カタログ"}
      </Link>
    </nav>
  );
}

export function PostTile({ post, now }: { post: DbPost; now: Date }) {
  const a = authorById(post.author_id);
  const color = a?.color ?? "#666";
  const rem = remaining(post.expires_at, now);
  return (
    <article className="bd-tile">
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Avatar name={a?.name ?? post.author_name} color={color} size={38} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 13.5, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {post.author_name}
          </div>
          <div style={{ fontSize: 11.5, color: "rgba(20,22,28,0.55)" }}>
            {post.genre}・{ageLabel(post.created_at, now)}・No.{post.id}
          </div>
        </div>
      </div>
      <p className="bd-tile-body">{post.body}</p>
      <div style={{ fontSize: 11.5, fontWeight: 700, color: rem.urgent ? "#c0392b" : "rgba(20,22,28,0.45)" }}>
        {rem.label}で自動削除{post.tier === "guest" ? "（ゲスト投稿：1時間）" : "（会員投稿：8時間）"}
      </div>
    </article>
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
  layout = "list",
}: {
  active: string;
  posts: DbPost[];
  heading: React.ReactNode;
  sub: string;
  children?: React.ReactNode;
  layout?: "list" | "catalog";
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
        {layout === "catalog" ? (
          <div className="bd-catalog">
            {posts.map((p) => (
              <PostTile key={p.id} post={p} now={now} />
            ))}
            {posts.length === 0 && <p>いま表示できる投稿はありません（投稿は時間で自動削除されます）。</p>}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 14, paddingBottom: 56, marginTop: 18 }}>
            {posts.map((p) => (
              <PostCard key={p.id} post={p} now={now} />
            ))}
            {posts.length === 0 && <p>いま表示できる投稿はありません（投稿は時間で自動削除されます）。</p>}
          </div>
        )}
        <footer className="bd-footer">
          PatternB Board（仮称） — サイト制作パッケージ「パターンB（掲示板型）」の公開テスト版 v0。人物は架空のサンプルです。投稿は自動削除されます（ゲスト1時間／会員8時間）。
        </footer>
      </div>
    </main>
  );
}
