"use client";
import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MOCK_PEDAGOGICAS = [
  { id: "pg-1", pregunta: "Puntualidad", puntaje: 4.4 },
  { id: "pg-2", pregunta: "Claridad de objetivos", puntaje: 4.1 },
  { id: "pg-3", pregunta: "Estrategias didácticas", puntaje: 4.2 },
  { id: "pg-4", pregunta: "Participación estudiantil", puntaje: 4.0 },
  { id: "pg-5", pregunta: "Gestión del tiempo", puntaje: 4.3 },
];

const MOCK_MATERIAS = [
  { materia: "Matemáticas", promedio: 4.2 },
  { materia: "Ciencias", promedio: 4.1 },
  { materia: "Lengua", promedio: 4.0 },
];

export default function InformeProfesorPage(){
  const [apellido, setApellido] = useState("");
  const [periodo, setPeriodo] = useState("2025-1");
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent){
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Informe de profesor</h1>
        <Link href="/coordinador" className="text-sm underline">← Volver</Link>
      </header>

      <form onSubmit={onSubmit} className="grid sm:grid-cols-3 gap-3 items-end border rounded-2xl p-4">
        <div className="space-y-1 sm:col-span-1">
          <label className="block text-sm">Apellido del profesor</label>
          <input className="w-full border rounded-xl p-2" value={apellido} onChange={e=>setApellido(e.target.value)} placeholder="Ej: Ríos" />
        </div>
        <div className="space-y-1 sm:col-span-1">
          <label className="block text-sm">Período</label>
          <select className="w-full border rounded-xl p-2" value={periodo} onChange={e=>setPeriodo(e.target.value)}>
            <option value="2025-1">2025 - Semestre 1</option>
            <option value="2025-2">2025 - Semestre 2</option>
            <option value="2024-1">2024 - Semestre 1</option>
            <option value="2024-2">2024 - Semestre 2</option>
          </select>
        </div>
        <div className="sm:col-span-1">
          <Button type="submit" className="w-full">Buscar</Button>
        </div>
      </form>

      {submitted && (
        <section className="space-y-6">
          <Card>
            <CardContent className="p-4">
              <h2 className="font-semibold mb-3">Puntuaciones en preguntas pedagógicas</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="py-2 pr-4">Pregunta</th>
                      <th className="py-2">Puntaje</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_PEDAGOGICAS.map(r => (
                      <tr key={r.id} className="border-b last:border-0">
                        <td className="py-2 pr-4">{r.pregunta}</td>
                        <td className="py-2">{r.puntaje.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h2 className="font-semibold mb-3">Promedios por materia (según estudiantes)</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="py-2 pr-4">Materia</th>
                      <th className="py-2">Promedio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_MATERIAS.map(r => (
                      <tr key={r.materia} className="border-b last:border-0">
                        <td className="py-2 pr-4">{r.materia}</td>
                        <td className="py-2">{r.promedio.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>
      )}
    </main>
  );
}
