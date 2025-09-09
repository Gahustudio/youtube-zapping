'use client';

import { useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<string[]>([]);
  const [idx, setIdx] = useState(0);

  const start = async () => {
    setLoading(true);
    const res = await fetch('/api/random');
    const data = await res.json();
    setList(data.videoIds ?? []);
    setLoading(false);
    setIdx(0);
  };

  const next = () => setIdx((i) => Math.min(i + 1, (list.length - 1)));

  return (
    <main style={{ padding: 24, fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ marginBottom: 8 }}>youtube-zapping (MVP)</h1>
      <p style={{ opacity: 0.8 }}>
        除外つきランダム再生の試作版。まずはミュートで再生します。
      </p>

      <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
        <button onClick={start} disabled={loading}
          style={{ fontSize: 16, padding: '10px 16px' }}>
          {loading ? '読み込み中…' : '再生スタート（ミュート）'}
        </button>
        <button onClick={next} disabled={!list.length}
          style={{ fontSize: 16, padding: '10px 16px' }}>
          次の動画へ
        </button>
      </div>

      <div style={{ marginTop: 24 }}>
        {!list.length ? (
          <div style={{ opacity: 0.6 }}>動画リスト未取得</div>
        ) : (
          <iframe
            key={list[idx]}
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${list[idx]}?autoplay=1&mute=1&rel=0`}
            title="YouTube video player"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            style={{ border: 0 }}
          />
        )}
      </div>
    </main>
  );
}

