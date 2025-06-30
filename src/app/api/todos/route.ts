import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Neautorizováno" }, { status: 401 });
  }

  try {
    const result = await pool.query(
      `SELECT id, text, completed, created_at
       FROM todos
       WHERE email = $1
       ORDER BY created_at DESC`,
      [session.user.email],
    );

    return NextResponse.json(result.rows);
  } catch (err) {
    console.error("DB SELECT error:", err);
    return NextResponse.json(
      { error: "Chyba při načítání todos" },
      { status: 500 },
    );
  }
}

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
