import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db"; // připojení k databázi

export async function POST(req: NextRequest) {
  const { id, text, completed, createdAt, email } = await req.json();

  try {
    await pool.query(
      `INSERT INTO todos (id, email, text, completed, created_at)
       VALUES ($1, $2, $3, $4, $5)`,
      [id, email, text, completed, createdAt],
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DB insert error:", err);
    return NextResponse.json(
      { error: "Failed to insert todo" },
      { status: 500 },
    );
  }
}
