export const dynamic = "force-dynamic";
export const revalidate = 0;

import { Suspense } from "react";
import EvaluacionClient from "./client";

export default function Page() {
  return (
    <Suspense fallback={<main className="p-6">Cargando…</main>}>
      <EvaluacionClient />
    </Suspense>
  );
}
