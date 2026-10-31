import { NextResponse } from "next/server";
import { GENRES } from "@/lib/data";
import { createGuestPost } from "@/lib/posts";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const form = await req.formData();
  const nameRaw = String(form.get("name") ?? "").trim();
  const genre = String(form.get("genre") ?? "");
  const kind = String(form.get("kind") ?? "ポスト");
  const body = String(form.get("body") ?? "").trim();

  const back = (path: string) => NextResponse.redirect(new URL(path, req.url), 303);

  if (!GENRES.includes(genre) || body.length === 0 || body.length > 280) {
    return back("/");
  }
  const authorName = (nameRaw || "ゲストさん").slice(0, 20);
  const safeKind = kind === "日記" ? "日記" : "ポスト";

  try {
    const ok = await createGuestPost({ authorName, genre, kind: safeKind, body });
    if (!ok) return back("/");
  } catch {
    return back("/");
  }
  return back(`/board/${encodeURIComponent(genre)}`);
}
