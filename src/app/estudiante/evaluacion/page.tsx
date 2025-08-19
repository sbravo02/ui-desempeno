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
  if (subject.toLowerCase() === "matemáticas") {
    return [
      { id: "m-1", kind: "mcq", text: "¿Cuál es la respuesta a esta ecuación? 2 + 3 = ?", options: ["5","a","1","0"] },
      { id: "m-2", kind: "mcq", text: "¿Resultado de 4 × 0?", options: ["0","4","1","a"] },
    ];
  }
  if (subject.toLowerCase() === "ciencias") {
    return [
      { id: "c-1", kind: "mcq", text: "¿Cuál es el estado del agua a 100°C a nivel del mar?", options: ["Sólido","Líquido","Gas","Plasma"] },
      { id: "c-2", kind: "mcq", text: "¿Cuál partícula tiene carga negativa?", options: ["Protón","Neutrón","Electrón","Quark"] },
    ];
  }
  return [
    { id: "s-1", kind: "mcq", text: `Pregunta de opción múltiple para ${subject}`, options: ["Opción A","Opción B","Opción C","Opción D"] },
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
  const teacher      = params.get("teacher") ?? "";
  const subject      = params.get("subject") ?? "";
  const step         = Number(params.get("step") ?? "1") === 2 ? 2 : 1;

  const questions: Question[] = step === 1 ? PEDAGOGIC : SUBJECT(subject);

  const [answers, setAnswers] = useState<Record<string, string | number>>({});

  const canSubmit = useMemo(() => {
    if (!questions.length) return false;
    return questions.every((q) => {
      const v = answers
