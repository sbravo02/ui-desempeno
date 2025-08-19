"use client";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { Suspense, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type LikertQ = { id: string; text: string };
const PEDAGOGICAS: LikertQ[] = [
  { id: "pg-1", text: "El docente es puntual." },
  { id: "pg-2", text: "Explica claramente los objetivos." },
  { id: "pg-3", text: "Usa estrategias didácticas adecuadas." },
  { id: "pg-4", text: "Promueve la participación estudiantil." },
  { id: "pg-5", text: "Gestiona adecuadamente el tiempo de clase." },
];

export default function Page() {
  return (
    <Suspense fallback={<main className="p-6">Cargando…</main>}>
      <EvaluarFormInner />
    </Suspense>
  );
}

function EvaluarFormInner() {
  const params = useSearchParams();
  const router = useRouter();
  const prof = params.get("prof") || "";
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const canSubmit = useMemo(
    () => PEDAGOGICAS.every(q => (answers[q.id] ?? 0) >= 1 && (answers[q.id] ?? 0) <= 5),
    [answers]
  );

  function setLikert(qid: string, n: number) {
    setAnswers(a => ({ ...a, [qid]: n }));
  }

  function handleSubmit() {
    router.push("/coordinador/gracias");
  }

  if (!prof) {
    return <main className="p-6">Falta el parámetro del profesor.</main>;
  }

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Evaluación pedagógica</h1>
        <p className="text-sm text-zinc-600">Profesor: {prof}</p>
      </div>

      <Card>
        <CardContent className="p-4 space-y-4">
          <ol className="space-y-3 list-decimal pl-6">
            {PEDAGOGICAS.map(q => (
              <li key={q.id}>
                <div className="mb-1 font-medium">{q.text}</div>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(n => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setLikert(q.id, n)}
                      aria-pressed={answers[q.id] === n}
                      className={`px-3 py-1 rounded-xl border text-sm ${
                        answers[q.id] === n ? "bg-zinc-900 text-white" : "bg-white"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </li>
            ))}
          </ol>

          <div className="pt-2 flex justify-end gap-3">
            <Button variant="secondary" onClick={() => history.back()}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit} disabled={!canSubmit}>
              Enviar
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
