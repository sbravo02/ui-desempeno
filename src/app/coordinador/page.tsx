"use client";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function CoordinadorHome(){
  const tiles = [
    { href: "/coordinador/evaluar",          title: "Evaluar profesores",  desc: "" },
    { href: "/coordinador/informe-profesor", title: "Informe de profesor",  desc: "" },
    { href: "/coordinador/informe-final",    title: "Informe final",        desc: "" },
  ] as const;

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Panel del Coordinador</h1>
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tiles.map(t => (
          <Link key={t.href} href={t.href}>
            <Card className="border rounded-2xl hover:shadow-md">
              <CardContent className="p-4">
                <h2 className="font-semibold">{t.title}</h2>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>
    </main>
  );
}
