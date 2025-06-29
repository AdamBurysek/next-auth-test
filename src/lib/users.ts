import bcrypt from "bcrypt"

type User = {
  id: string
  email: string
  name: string
  hashedPassword: string
}

// TODO: use a database
const users: User[] = []

export async function createUser(email: string, name: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = { id: Date.now().toString(), email, name, hashedPassword }
  users.push(user)
  return user
}

export async function getUserByEmail(email: string) {
  return users.find(user => user.email === email)
}
