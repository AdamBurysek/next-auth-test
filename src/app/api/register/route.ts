import { createUser, getUserByEmail } from "@/lib/users";

export async function POST(req: Request) {
  const { email, password, name } = await req.json();

  const exists = await getUserByEmail(email);
  if (exists) return new Response("Uživatel už existuje", { status: 400 });

  await createUser(email, name, password);

  return new Response("Vytvořeno", { status: 200 });
}
