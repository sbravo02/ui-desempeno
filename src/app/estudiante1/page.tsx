"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// 🔹 Datos de demo (luego vendrán de la API)
const assignments = [
  { id: "eva-1", teacher: "Profa. Daniela Ríos", subject: "Matemáticas", due: "2025-09-30" },
  { id: "eva-2", teacher: "Profa. Daniela Ríos", subject: "Ciencias",    due: "2025-10-05" },
  { id: "eva-3", teacher: "Prof. Carlos Pérez",   subject: "Lengua",      due: "2025-10-07" },
  { id: "eva-4", teacher: "Prof. Carlos Pérez",   subject: "Matemáticas", due: "2025-10-10" },
];

// 🔁 Materias por profesor (si dicta varias, las unimos en subjects)
const subjectsByTeacher: Record<string, string[]> = {
  "Profa. Daniela Ríos": ["Matemáticas", "Ciencias"],
  "Prof. Carlos Pérez": ["Lengua", "Matemáticas"],
};

export default function StudentHomePage() {
  const studentName = "Estudiante Demo";

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Hola, {studentName}</h1>
        <p className="text-sm text-zinc-600">
          Tienes {assignments.length} evaluaciones pendientes de tus profesores.
        </p>
      </div>

      <div className="space-y-3">
        {assignments.map((a) => {
          const subjectsArr = subjectsByTeacher[a.teacher] ?? [a.subject];
          const subjectsParam =
            subjectsArr.length > 1 ? encodeURIComponent(subjectsArr.join("|")) : undefined;

          const href = `/estudiante/evaluacion?id=${encodeURIComponent(a.id)}&teacher=${encodeURIComponent(
            a.teacher
          )}&subject=${encodeURIComponent(a.subject)}${
            subjectsParam ? `&subjects=${subjectsParam}` : ""
          }`;

          return (
            <Card key={a.id} className="border rounded-2xl">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <div className="font-semibold">{a.teacher}</div>
                  <div className="text-sm text-zinc-500">
                    {a.subject} • Vence: {a.due}
                  </div>
                </div>

                {/* Si el profe dicta varias materias, la página de evaluación mostrará un selector */}
                <Link href={href}>
                  <Button>Empezar</Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
