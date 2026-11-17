import { notFound } from "next/navigation";
import { BoardNotices, BoardShell, SortBar } from "@/components/board-ui";
import { PostForm } from "@/components/post-form";
import { GENRES } from "@/lib/data";
import { getLivePosts, type PostSort } from "@/lib/posts";

export const dynamic = "force-dynamic";
export const fetchCache = "default-no-store";

export default async function GenrePage({
  params,
  searchParams,
}: {
  params: { genre: string };
  searchParams?: { sort?: string; view?: string };
}) {
  const decoded = decodeURIComponent(params.genre);
  if (!GENRES.includes(decoded)) notFound();
  const sort: PostSort = searchParams?.sort === "expiry" ? "expiry" : "new";
  const view = searchParams?.view === "catalog" ? "catalog" : "list";
  const posts = await getLivePosts(decoded, sort);
  return (
    <BoardShell
      active={decoded}
      posts={posts}
      layout={view}
      heading={<>{decoded}スレッド</>}
      sub={`${decoded}ジャンルのフリーランスのポストと日記が流れます。書くときは、まずこのページの上のフォームから。投稿は自動で消えます（ゲスト1時間／会員8時間）。`}
    >
      <PostForm fixedGenre={decoded} />
      <BoardNotices />
      <SortBar genre={decoded} sort={sort} view={view} />
    </BoardShell>
  );
}
