import { BoardShell } from "@/components/board-ui";
import { PostForm } from "@/components/post-form";
import { getLivePosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function BoardPage() {
  const posts = await getLivePosts();
  return (
    <BoardShell
      active="すべて"
      posts={posts}
      heading={
        <>
          フリーランスの「今」が、
          <br />
          ジャンルごとに流れる掲示板。
        </>
      }
      sub="ポストと日記は、書いた人のジャンルのスレッドに流れます。投稿は自動で消えます（ゲストは1時間、ログイン会員は8時間）。気になる人を見つけたら、その人のプロフィールへ。"
    >
      <PostForm />
    </BoardShell>
  );
}
