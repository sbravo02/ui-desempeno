"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CoordinadorLoginPage(){
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent){
    e.preventDefault();
    if (!email || !pass){
      setError("Por favor completa correo y contraseña.");
      return;
    }
    // Front-only: simulamos login y navegamos al menú principal
    sessionStorage.setItem("coord_email", email);
    router.push("/coordinador");
  }

  return (
    <main className="min-h-screen grid place-items-center p-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm border rounded-2xl p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center">Coordinador – Login</h1>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="space-y-2">
          <label className="block text-sm">Correo</label>
          <input
            className="w-full border rounded-xl p-2"
            type="email"
            placeholder="coordinador@demo.com"
            value={email}
            onChange={e=>setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm">Contraseña</label>
          <input
            className="w-full border rounded-xl p-2"
            type="password"
            placeholder="••••••••"
            value={pass}
            onChange={e=>setPass(e.target.value)}
            required
          />
        </div>
        <div className="pt-2">
          <button type="submit" className="inline-flex items-center justify-center w-full rounded-xl border px-4 py-2 hover:bg-zinc-50">
            Ingresar
          </button>
        </div>
        <p className="text-center text-xs text-zinc-500">* Demo visual (sin autenticación real)</p>
      </form>
    </main>
  );
}
