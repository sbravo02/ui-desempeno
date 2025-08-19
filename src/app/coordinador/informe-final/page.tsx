"use client";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Row = { docente: string; planCapacitacion: boolean };

const DATA: Record<string, Row[]> = {
  "2025": [
    { docente: "Ríos, Daniela", planCapacitacion: true },
    { docente: "Pérez, Carlos", planCapacitacion: false },
    { docente: "Gómez, Ana", planCapacitacion: true },
    { docente: "Herrera, Luis", planCapacitacion: false },
  ],
  "2024": [
    { docente: "Ríos, Daniela", planCapacitacion: true },
    { docente: "Pérez, Carlos", planCapacitacion: true },
    { docente: "Gómez, Ana", planCapacitacion: false },
    { docente: "Herrera, Luis", planCapacitacion: false },
  ],
};

function toCSV(rows: Row[]): string {
  const header = "Docente,Plan de capacitación\n";
  const lines = rows.map(r => `${r.docente},${r.planCapacitacion ? "Sí" : "No"}`).join("\n");
  return header + lines + "\n";
}

export default function InformeFinalPage(){
  function downloadCSV(year: string){
    const rows = DATA[year] || [];
    const csv = toCSV(rows);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `informe_final_${year}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Informe final</h1>
        <Link href="/coordinador" className="text-sm underline">← Volver</Link>
      </header>

      {Object.entries(DATA).map(([year, rows]) => (
        <Card key={year} className="border rounded-2xl">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Año lectivo {year}</h2>
              <Button onClick={() => downloadCSV(year)}>Descargar informe</Button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left border-b">
                    <th className="py-2 pr-4">Docente</th>
                    <th className="py-2">Plan de capacitación</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, idx) => (
                    <tr key={idx} className="border-b last:border-0">
                      <td className="py-2 pr-4">{r.docente}</td>
                      <td className="py-2">{r.planCapacitacion ? "Sí" : "No"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ))}
    </main>
  );
}
