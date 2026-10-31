import { notFound } from "next/navigation";
import { BoardShell } from "@/components/board-ui";
import { PostForm } from "@/components/post-form";
import { GENRES } from "@/lib/data";
import { getLivePosts } from "@/lib/posts";

export const dynamic = "force-dynamic";
export const fetchCache = "default-no-store";

export default async function GenrePage({
  params,
}: {
  params: { genre: string };
}) {
  const decoded = decodeURIComponent(params.genre);
  if (!GENRES.includes(decoded)) notFound();
  const posts = await getLivePosts(decoded);
  return (
    <BoardShell
      active={decoded}
      posts={posts}
      heading={<>{decoded}スレッド</>}
      sub={`${decoded}ジャンルのフリーランスのポストと日記が、新しい順に流れます。投稿は自動で消えます（ゲスト1時間／会員8時間）。`}
    >
      <PostForm defaultGenre={decoded} />
    </BoardShell>
  );
}
