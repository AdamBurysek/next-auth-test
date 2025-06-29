import { Pool } from "pg";
import bcrypt from "bcrypt";

// Database connection
const pool = new Pool({
  user: process.env.DATABASE_USER,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST || "localhost",
  port: Number(process.env.DATABASE_PORT) || 5432,
});

export async function createUser(
  email: string,
  name: string,
  password: string
) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `INSERT INTO users (email, name, password) VALUES ($1, $2, $3) RETURNING *`,
    [email, name, hashedPassword]
  );

  return result.rows[0];
}

// GET USER BY EMAIL – Najde uživatele podle e-mailu
export async function getUserByEmail(email: string) {
  const result = await pool.query(
    `SELECT * FROM users WHERE email = $1 LIMIT 1`,
    [email]
  );
  return result.rows[0] || null;
}
