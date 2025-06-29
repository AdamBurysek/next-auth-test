import bcrypt from "bcrypt";
import { pool } from "./db";

export async function createUser(
  email: string,
  name: string,
  password: string,
) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `INSERT INTO users (email, name, password) VALUES ($1, $2, $3) RETURNING *`,
    [email, name, hashedPassword],
  );

  return result.rows[0];
}

// GET USER BY EMAIL – Najde uživatele podle e-mailu
export async function getUserByEmail(email: string) {
  const result = await pool.query(
    `SELECT * FROM users WHERE email = $1 LIMIT 1`,
    [email],
  );
  return result.rows[0] || null;
}
