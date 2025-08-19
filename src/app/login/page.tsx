"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function StudentLoginPage() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 🔐 Demo: valida que haya algo escrito
    if (!user || !pass) {
      alert("Por favor ingresa usuario y contraseña.");
      setLoading(false);
      return;
    }

    // Aquí luego llamarías a tu API /auth/login
    // Si todo OK, redirige al “home” del estudiante:
    router.push(`/estudiante`);
  };

  return (
    <main className="min-h-[70vh] grid place-items-center p-6">
      <Card className="w-full max-w-md">
        <CardContent className="p-6 space-y-4">
          <div>
            <h1 className="text-xl font-bold">Ingreso de Estudiante</h1>
            <p className="text-sm text-zinc-600">
              Usa tu usuario y clave para responder las evaluaciones de tus profesores.
            </p>
          </div>
          <form onSubmit={onSubmit} className="space-y-3">
            <div>
              <label className="text-sm block mb-1">Usuario (ID estudiante)</label>
              <Input
                placeholder="Ej. 102349"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm block mb-1">Contraseña</label>
              <Input
                type="password"
                placeholder="••••••"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Ingresando..." : "Ingresar"}
            </Button>
          </form>
          <p className="text-xs text-zinc-500">
            ¿Olvidaste tu clave? Comunícate con coordinación académica.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
