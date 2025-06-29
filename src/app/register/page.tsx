"use client"

import { useState } from "react"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

  const handleRegister = async () => {
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password, name }),
    })

    if (res.ok) alert("Účet vytvořen")
    else alert("Registrace selhala")
  }

  return (
    <div>
      <h2>Registrace</h2>
      <input placeholder="Jméno" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Heslo" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Registrovat</button>
    </div>
  )
}
