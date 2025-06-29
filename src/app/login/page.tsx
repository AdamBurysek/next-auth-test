"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = async () => {
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    })

    if (res?.ok) router.push("/")
    else alert("Neplatné údaje")
  }

  return (
    <div>
      <h2>Přihlášení</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Heslo" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Přihlásit</button>
    </div>
  )
}
