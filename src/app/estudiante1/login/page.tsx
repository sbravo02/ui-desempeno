"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function StudentLoginPage() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !pass) return alert("Ingresa usuario y contraseña.");
    window.location.href = "/estudiante"; // demo: redirige a home estudiante
  };

  return (
    <main className="min-h-[70vh] grid place-items-center p-6">
      <Card className="w-full max-w-md">
        <CardContent className="p-6 space-y-4">
          <h1 className="text-xl font-bold">Ingreso de Estudiante</h1>
          <p className="text-sm text-zinc-600">
            Usa tu usuario y clave para responder las evaluaciones.
          </p>
          <form onSubmit={onSubmit} className="space-y-3">
            <div>
              <label className="text-sm block mb-1">Usuario (ID)</label>
              <Input value={user} onChange={(e) => setUser(e.target.value)} placeholder="Ej. 102349" />
            </div>
            <div>
              <label className="text-sm block mb-1">Contraseña</label>
              <Input type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="••••••" />
            </div>
            <Button type="submit" className="w-full">Ingresar</Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
