delete from posts where seed_key = 'v0';
insert into posts (author_id, author_name, genre, kind, tier, body, seed_key, created_at, expires_at) values
('mio', '三島 澪', 'デザイン', '日記', 'member', '老舗洋菓子店さんのロゴ、最終案をお渡ししました。創業当時の看板の字をなぞるところから始めて、3週間。「昔のうちに戻ったみたい」という言葉が、いちばん嬉しかったです。', 'v0', now() - interval '12 minutes', now() - interval '12 minutes' + interval '480 minutes'),
('kenichi', '佐藤 健一', '写真', 'ポスト', 'guest', '来月の撮影枠、あと2件だけ空いています。店舗の内装撮影、メニュー撮影どちらも可。銀座・日本橋エリアは交通費なしで伺います。', 'v0', now() - interval '38 minutes', now() - interval '38 minutes' + interval '60 minutes'),
('misaki', '高橋 美咲', 'レッスン', '日記', 'member', '今日の生徒さんは、来月の海外赴任に備えての集中レッスン最終日。「英語で冗談が言えた」と笑って帰られました。教える側が元気をもらう日でした。', 'v0', now() - interval '60 minutes', now() - interval '60 minutes' + interval '480 minutes'),
('makoto', '中村 誠', 'コンサル', 'ポスト', 'guest', '小規模店舗の資金繰り相談、今月は残り1枠です。初回30分は無料で、現状の数字だけでも一緒に整理します。', 'v0', now() - interval '25 minutes', now() - interval '25 minutes' + interval '60 minutes'),
('mio', '三島 澪', 'デザイン', 'ポスト', 'member', 'ポートフォリオを更新しました。今年の制作実績3件を追加。ロゴ制作のご相談は、プロフィールのリンクからどうぞ。', 'v0', now() - interval '180 minutes', now() - interval '180 minutes' + interval '480 minutes'),
('yuka', '林 由香', 'ライティング', '日記', 'member', '老舗旅館さんのパンフレット原稿、入稿しました。女将さんの言葉をそのまま生かす編集にこだわって、削ったのは接続詞だけ。読み返して、自分でも旅に出たくなっています。', 'v0', now() - interval '300 minutes', now() - interval '300 minutes' + interval '480 minutes'),
(null, 'ゲストさん', 'レッスン', 'ポスト', 'guest', 'ゲスト投稿のテストです。この投稿は1時間で自動削除されます。', 'v0', now() - interval '5 minutes', now() - interval '5 minutes' + interval '60 minutes');
