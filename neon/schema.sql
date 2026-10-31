create table if not exists posts (
  id bigint generated always as identity primary key,
  author_id text,
  author_name text not null,
  genre text not null,
  kind text not null default 'ポスト',
  tier text not null default 'guest' check (tier in ('guest', 'member')),
  body text not null,
  seed_key text,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null
);
create index if not exists posts_expires_idx on posts (expires_at);
create index if not exists posts_genre_idx on posts (genre, created_at desc);
create index if not exists posts_author_idx on posts (author_id, created_at desc);
