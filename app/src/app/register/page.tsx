"use client";

import { useState } from "react";
import { api } from "../lib/api";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    try {
      await api("/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      });
      router.push("/login");
    } catch (e: any) {
      setErr(e.message);
    }
  }

  return (
    <main style={{ padding: 24, maxWidth: 420 }}>
      <h1>Registrar</h1>
      <form onSubmit={submit}>
        <input placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
        <br /><br />
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br /><br />
        <input placeholder="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br /><br />
        <button type="submit">Criar conta</button>
      </form>
      {err && <p style={{ color: "crimson" }}>{err}</p>}
    </main>
  );
}