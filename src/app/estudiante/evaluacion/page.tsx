"use client";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { Suspense, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type LikertQ = { id: string; text: string; kind: "likert" };
type McqQ   = { id: string; text: string; kind: "mcq"; options: string[] };
type Question = LikertQ | McqQ;

const PEDAGOGIC: LikertQ[] = [
  { id: "pg-1", text: "El docente es puntual.", kind: "likert" },
  { id: "pg-2", text: "Explica claramente los objetivos.", kind: "likert" },
  { id: "pg-3", text: "Usa estrategias didácticas adecuadas.", kind: "likert" },
];

function SUBJECT(subject: string): McqQ[] {
  const s = subject.toLowerCase();
  if (s === "matemáticas" || s === "matematicas") {
    return [
      { id: "m-1", kind: "mcq", text: "¿Cuál es la respuesta a esta ecuación? 2 + 3 = ?", options: ["5", "a", "1", "0"] },
      { id: "m-2", kind: "mcq", text: "¿Resultado de 4 × 0?", options: ["0", "4", "1", "a"] },
    ];
  }
  if (s === "ciencias") {
    return [
      { id: "c-1", kind: "mcq", text: "¿Cuál es el estado del agua a 100°C a nivel del mar?", options: ["Sólido", "Líquido", "Gas", "Plasma"] },
      { id: "c-2", kind: "mcq", text: "¿Cuál partícula tiene carga negativa?", options: ["Protón", "Neutrón", "Electrón", "Quark"] },
    ];
  }
  return [
    { id: "s-1", kind: "mcq", text: `Pregunta de opción múltiple para ${subject}`, options: ["Opción A", "Opción B", "Opción C", "Opción D"] },
  ];
}

export default function Page() {
  return (
    <Suspense fallback={<main className="p-6">Cargando…</main>}>
      <EvaluacionWizardInner />
    </Suspense>
  );
}

function EvaluacionWizardInner() {
  const params = useSearchParams();
  const router = useRouter();

  const evaluationId = params.get("id") ?? "";
  const teacher = params.get("teacher") ?? "";
  const subject = params.get("subject") ?? "";
  const step = Number(params.get("step") ?? "1") === 2 ? 2 : 1;

  const questions: Question[] = step === 1 ? PEDAGOGIC : SUBJECT(subject);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});

  const canSubmit = useMemo(() => {
    if (!questions.length) return false;
    return questions.every((q) => {
      const v = answers[q.id];
      if (q.kind === "likert") return typeof v === "number" && v >= 1 && v <= 5;
      return typeof v === "string" && v.length > 0; // mcq
    });
  }, [questions, answers]);

  function setLikert(qid: string, n: number) {
    setAnswers((a) => ({ ...a, [qid]: n }));
  }
  function setMcq(qid: string, opt: string) {
    setAnswers((a) => ({ ...a, [qid]: opt }));
  }

  function handleSubmit() {
    if (step === 1) {
      const next = new URLSearchParams(params.toString());
      next.set("step", "2");
      router.push(`/estudiante/evaluacion?${next.toString()}`);
    } else {
      router.push("/estudiante/gracias");
    }
  }

  if (!evaluationId || !teacher || !subject) {
    return <div className="p-6">Faltan parámetros de la evaluación.</div>;
  }

  const title = step === 1 ? "Preguntas Pedagógicas" : `Preguntas de ${subject}`;

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-4">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-sm text-zinc-600">
          Docente: {teacher} · Materia: {subject}
        </p>
      </div>

      <Card>
        <CardContent className="p-4 space-y-4">
          <ol className="space-y-4 list-decimal pl-6">
            {questions.map((q) => (
              <li key={q.id}>
                <div className="mb-2 font-medium">{q.text}</div>

                {q.kind === "likert" ? (
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((n) => (
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
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    {q.options.map((opt) => (
                      <label
                        key={opt}
                        className={`flex items-center gap-2 rounded-xl border p-2 cursor-pointer ${
                          answers[q.id] === opt ? "border-zinc-900" : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name={q.id}
                          value={opt}
                          checked={answers[q.id] === opt}
                          onChange={() => setMcq(q.id, opt)}
                          className="accent-black"
                        />
                        <span className="text-sm">{opt}</span>
                      </label>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ol>

          <div className="pt-2 flex justify-end gap-3">
            <Button variant="secondary" onClick={() => history.back()}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit} disabled={!canSubmit}>
              {step === 1 ? "Continuar a Materia →" : "Enviar evaluación"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
