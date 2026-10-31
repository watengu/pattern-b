import { sql } from "./db";

export type DbPost = {
  id: number;
  author_id: string | null;
  author_name: string;
  genre: string;
  kind: string;
  tier: "guest" | "member";
  body: string;
  created_at: string;
  expires_at: string;
};

function toIso(value: unknown): string {
  if (value instanceof Date) return value.toISOString();
  return String(value);
}

function normalize(row: Record<string, unknown>): DbPost {
  return {
    id: Number(row.id),
    author_id: (row.author_id as string | null) ?? null,
    author_name: String(row.author_name),
    genre: String(row.genre),
    kind: String(row.kind),
    tier: row.tier === "member" ? "member" : "guest",
    body: String(row.body),
    created_at: toIso(row.created_at),
    expires_at: toIso(row.expires_at),
  };
}

/** Live posts only: the TTL filter (expires_at > now) is the auto-delete rule. */
export async function getLivePosts(genre?: string): Promise<DbPost[]> {
  if (!sql) return [];
  try {
    const rows = genre
      ? await sql`select id, author_id, author_name, genre, kind, tier, body, created_at, expires_at
                  from posts where expires_at > now() and genre = ${genre}
                  order by created_at desc limit 100`
      : await sql`select id, author_id, author_name, genre, kind, tier, body, created_at, expires_at
                  from posts where expires_at > now()
                  order by created_at desc limit 100`;
    return (rows as Record<string, unknown>[]).map(normalize);
  } catch {
    return [];
  }
}

export async function getAuthorPosts(authorId: string): Promise<DbPost[]> {
  if (!sql) return [];
  try {
    const rows = await sql`select id, author_id, author_name, genre, kind, tier, body, created_at, expires_at
                from posts where expires_at > now() and author_id = ${authorId}
                order by created_at desc limit 100`;
    return (rows as Record<string, unknown>[]).map(normalize);
  } catch {
    return [];
  }
}

export async function createGuestPost(input: {
  authorName: string;
  genre: string;
  kind: string;
  body: string;
}): Promise<boolean> {
  if (!sql) return false;
  await sql`insert into posts (author_id, author_name, genre, kind, tier, body, expires_at)
            values (null, ${input.authorName}, ${input.genre}, ${input.kind}, 'guest', ${input.body},
                    now() + interval '60 minutes')`;
  return true;
}
