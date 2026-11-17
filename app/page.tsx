import Link from "next/link";
import { Avatar, BoardHead } from "@/components/board-ui";
import { AUTHORS, GENRES } from "@/lib/data";
import { getLivePosts } from "@/lib/posts";

export const dynamic = "force-dynamic";
export const fetchCache = "default-no-store";

export default async function IndexPage() {
  const posts = await getLivePosts();
  const counts = new Map<string, number>();
  for (const p of posts) counts.set(p.genre, (counts.get(p.genre) ?? 0) + 1);
  return (
    <main className="bd">
      <BoardHead hidePost />
      <div className="wrap">
        <div className="bd-hero">
          <h1>
            投稿は消える。
            <br />
            だから、今の仕事だけが並ぶ。
          </h1>
          <p>
            トップは目次だけです。ジャンルを選んで板に入ると、そのジャンルの「今」の投稿と、書くためのフォームがあります。投稿は自動で消えます（ゲストは1時間、ログイン会員は8時間）。
          </p>
        </div>

        <div className="bd-index">
          {GENRES.map((g) => {
            const rep = AUTHORS.find((a) => a.genre === g);
            const n = counts.get(g) ?? 0;
            return (
              <Link key={g} href={`/board/${encodeURIComponent(g)}`} className="bd-index-cell">
                <div className="bd-index-genre">{g}</div>
                {rep && (
                  <div className="bd-index-rep">
                    <Avatar name={rep.name} color={rep.color} size={40} />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13.5 }}>{rep.name}</div>
                      <div style={{ fontSize: 12, color: "rgba(20,22,28,0.55)" }}>{rep.title}</div>
                    </div>
                  </div>
                )}
                <div className="bd-index-meta">
                  <span>{n > 0 ? `いま${n}件` : "いまは静かです"}</span>
                  <span className="bd-index-go">板に入る →</span>
                </div>
              </Link>
            );
          })}
        </div>

        <p className="bd-index-note">
          トップでは投稿は読めません。書けません。まず、行き先を選んでください。各板の最上部に投稿フォームがあります。
        </p>

        <footer className="bd-footer">
          PatternB Board（仮称） — サイト制作パッケージ「パターンB（掲示板型）」の公開テスト版 v0。人物は架空のサンプルです。投稿は自動削除されます（ゲスト1時間／会員8時間）。
        </footer>
      </div>
    </main>
  );
}
