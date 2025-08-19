"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// 👉 Datos de demo (front-only)
const assignments = [
  { id: "eva-1", teacher: "Profa. Daniela Ríos", subject: "Matemáticas", due: "2025-09-30" },
  { id: "eva-2", teacher: "Profa. Daniela Ríos", subject: "Ciencias",    due: "2025-10-05" },
  { id: "eva-3", teacher: "Prof. Carlos Pérez",   subject: "Lengua",      due: "2025-10-07" },
  { id: "eva-4", teacher: "Prof. Carlos Pérez",   subject: "Matemáticas", due: "2025-10-10" },
];

function groupByTeacher(list: typeof assignments){
  const map = new Map<string, typeof assignments>();
  for (const a of list){
    if (!map.has(a.teacher)) map.set(a.teacher, []);
    map.get(a.teacher)!.push(a);
  }
  return Array.from(map.entries()).map(([teacher, items]) => ({ teacher, items }));
}

export default function StudentHomePage(){
  const studentName = "Estudiante Demo";
  const grouped = useMemo(() => groupByTeacher(assignments), []);
  const [open, setOpen] = useState<Record<string, boolean>>({});

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Hola, {studentName}</h1>
        <p className="text-sm text-zinc-600">Tienes {assignments.length} evaluaciones pendientes.</p>
      </div>

      <div className="space-y-3">
        {grouped.map(({ teacher, items }) => (
          <Card key={teacher} className="border rounded-2xl">
            <CardContent className="p-4">
              <button
                className="w-full text-left flex items-center justify-between"
                onClick={() => setOpen(o => ({ ...o, [teacher]: !o[teacher] }))}
                aria-expanded={!!open[teacher]}
              >
                <span className="font-semibold">{teacher}</span>
                <span className="text-xs text-zinc-500">{items.length} materia{items.length>1?"s":""}</span>
              </button>

              {open[teacher] && (
                <div className="mt-3 space-y-2">
                  {items.map(item => {
                    const href = `/estudiante/evaluacion?id=${encodeURIComponent(item.id)}&teacher=${encodeURIComponent(teacher)}&subject=${encodeURIComponent(item.subject)}&step=1`;
                    return (
                      <div key={item.id} className="flex items-center justify-between rounded-xl border p-3">
                        <div className="text-sm">
                          <div className="font-medium">{item.subject}</div>
                          <div className="text-zinc-500">Vence: {item.due}</div>
                        </div>
                        <Link href={href}><Button>Empezar</Button></Link>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
