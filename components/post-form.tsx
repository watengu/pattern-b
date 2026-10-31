import { GENRES } from "@/lib/data";

export function PostForm({ defaultGenre }: { defaultGenre?: string }) {
  return (
    <section id="post-form" className="bd-form">
      <h2>ゲストで投稿する（1時間で自動削除）</h2>
      <form action="/api/posts" method="post">
        <div className="bd-form-row">
          <label>
            名前
            <input name="name" maxLength={20} placeholder="ゲストさん" />
          </label>
          <label>
            ジャンル
            <select name="genre" defaultValue={defaultGenre ?? GENRES[0]}>
              {GENRES.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </label>
          <label>
            種別
            <select name="kind" defaultValue="ポスト">
              <option value="ポスト">ポスト</option>
              <option value="日記">日記</option>
            </select>
          </label>
        </div>
        <label className="bd-form-body">
          本文（280文字まで）
          <textarea name="body" required maxLength={280} rows={3} placeholder="今の仕事のこと、空き枠のこと、日記のこと。" />
        </label>
        <button type="submit" className="bd-submit">
          投稿する（選んだジャンルのスレッドに流れます）
        </button>
      </form>
    </section>
  );
}
