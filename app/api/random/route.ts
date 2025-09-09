import { NextResponse } from "next/server";

// まずは固定IDで動作確認（後でData APIに差し替え）
const seed = [
  "dQw4w9WgXcQ", // 動作確認用
  "M7lc1UVf-VE",
  "DLzxrzFCyOs"
];

export async function GET() {
  // シャッフルして返す（超簡易）
  const shuffled = [...seed].sort(() => Math.random() - 0.5);
  return NextResponse.json({ videoIds: shuffled });
}

