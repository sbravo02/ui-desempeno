"use client";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PROFESORES = [
  { id: "p1", nombre: "Profa. Daniela Ríos" },
  { id: "p2", nombre: "Prof. Carlos Pérez" },
  { id: "p3", nombre: "Profa. Ana Gómez" },
  { id: "p4", nombre: "Prof. Luis Herrera" },
];

export default function EvaluarProfesoresPage(){
  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Evaluar profesores</h1>
        <Link href="/coordinador" className="text-sm underline">← Volver</Link>
      </header>

      <div className="space-y-3">
        {PROFESORES.map(p => {
          const href = `/coordinador/evaluar/form?prof=${encodeURIComponent(p.nombre)}&step=1`;
          return (
            <Card key={p.id} className="border rounded-2xl">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="font-medium">{p.nombre}</div>
                <Link href={href}><Button>Evaluar</Button></Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
