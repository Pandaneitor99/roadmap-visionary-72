import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Sparkles, TrendingUp, TrendingDown, Wrench, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { okrs } from "@/data/initiatives";

const sections = [
  { id: 1, title: "Visión estratégica", short: "Visión" },
  { id: 2, title: "North Star y métricas clave", short: "North Star" },
  { id: 3, title: "Base de usuarios y MRR", short: "Usuarios & MRR" },
  { id: 4, title: "Resultados del período", short: "Resultados" },
  { id: 5, title: "Diagnóstico y oportunidades", short: "Diagnóstico" },
  { id: 6, title: "Próximos pasos", short: "Próximos pasos" },
];

const ALEGRA_GREEN = "#00B386";

export default function RoadmapReview() {
  const [current, setCurrent] = useState(0);

  const goPrev = useCallback(() => setCurrent((c) => Math.max(0, c - 1)), []);
  const goNext = useCallback(
    () => setCurrent((c) => Math.min(sections.length - 1, c + 1)),
    [],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "PageDown") goNext();
      if (e.key === "ArrowLeft" || e.key === "PageUp") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  const section = sections[current];

  return (
    <div className="-m-6 min-h-[calc(100vh-3.5rem)] bg-gradient-to-br from-white via-neutral-50 to-emerald-50/30 font-sans">
      {/* Top index */}
      <div className="sticky top-14 z-10 border-b border-neutral-200/70 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-6 py-3">
          {sections.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrent(idx)}
              className={cn(
                "group flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-all",
                idx === current
                  ? "text-white shadow-sm"
                  : "text-neutral-600 hover:bg-neutral-100",
              )}
              style={idx === current ? { backgroundColor: ALEGRA_GREEN } : undefined}
            >
              <span
                className={cn(
                  "flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold",
                  idx === current
                    ? "bg-white/25 text-white"
                    : "bg-neutral-200 text-neutral-700",
                )}
              >
                {s.id}
              </span>
              <span className="hidden sm:inline">{s.short}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Slide content */}
      <div className="mx-auto max-w-7xl px-6 py-10 md:py-14">
        {/* Section header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: ALEGRA_GREEN }}
            >
              Sección {section.id} de {sections.length}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
              {section.title}
            </h1>
          </div>
        </div>

        {/* Slide body */}
        <div className="min-h-[60vh]">
          {current === 0 ? (
            <Section1 />
          ) : current === 3 ? (
            <Section4 />
          ) : (
            <PlaceholderSection title={section.title} />
          )}
        </div>

        {/* Navigation footer */}
        <div className="mt-12 flex items-center justify-between border-t border-neutral-200 pt-6">
          <Button
            variant="outline"
            onClick={goPrev}
            disabled={current === 0}
            className="gap-2 border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50"
          >
            <ChevronLeft className="h-4 w-4" />
            Anterior
          </Button>

          <div className="flex items-center gap-1.5">
            {sections.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  idx === current ? "w-8" : "w-1.5 bg-neutral-300 hover:bg-neutral-400",
                )}
                style={idx === current ? { backgroundColor: ALEGRA_GREEN } : undefined}
                aria-label={`Ir a sección ${idx + 1}`}
              />
            ))}
          </div>

          <Button
            onClick={goNext}
            disabled={current === sections.length - 1}
            className="gap-2 text-white hover:opacity-90"
            style={{ backgroundColor: ALEGRA_GREEN }}
          >
            Siguiente
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function Section1() {
  return (
    <div className="space-y-10">
      {/* Vision block */}
      <div
        className="relative overflow-hidden rounded-2xl border border-emerald-100 bg-white p-8 shadow-sm md:p-12"
        style={{
          backgroundImage:
            "radial-gradient(circle at 100% 0%, rgba(0,179,134,0.08), transparent 50%)",
        }}
      >
        <div
          className="absolute left-0 top-0 h-full w-1.5"
          style={{ backgroundColor: ALEGRA_GREEN }}
        />
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" style={{ color: ALEGRA_GREEN }} />
          <span
            className="text-xs font-semibold uppercase tracking-[0.18em]"
            style={{ color: ALEGRA_GREEN }}
          >
            Visión
          </span>
        </div>
        <p className="mt-4 text-2xl font-semibold leading-snug text-neutral-900 md:text-3xl">
          "Convertir la App de Alegra en el centro operativo móvil imprescindible
          de la Pyme y el centro de control móvil en tiempo real del contador,
          donde las decisiones y flujos críticos se resuelven en segundos."
        </p>
        <p className="mt-6 max-w-4xl text-sm leading-relaxed text-neutral-600 md:text-base">
          La app no compite con la web. La web es donde vive la complejidad; la
          app es donde vive la inmediatez. Cuando un emprendedor está frente a
          un cliente y necesita facturar, no debería pensar — debería actuar.
          Cuando un contador necesita validar el estado de negocios en
          movimiento, no debería esperar — debería controlar. Ese es el estándar
          que nos imponemos.
        </p>
      </div>

      {/* Two cards */}
      <div className="grid gap-5 md:grid-cols-2">
        <div className="group rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
          <div
            className="inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white"
            style={{ backgroundColor: ALEGRA_GREEN }}
          >
            Para la Pyme
          </div>
          <h3 className="mt-4 text-xl font-bold text-neutral-900">
            Centro operativo
          </h3>
          <p className="mt-2 text-sm text-neutral-600">Ejecución inmediata</p>
        </div>
        <div className="group rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
          <div className="inline-flex rounded-full bg-neutral-900 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
            Para el contador
          </div>
          <h3 className="mt-4 text-xl font-bold text-neutral-900">
            Centro de control
          </h3>
          <p className="mt-2 text-sm text-neutral-600">Control y validación</p>
        </div>
      </div>

      {/* Trade-offs table */}
      <div>
        <h2 className="mb-4 text-lg font-bold text-neutral-900">
          Trade-offs estratégicos
        </h2>
        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="border-b border-neutral-200 bg-neutral-50 px-5 py-3 text-xs font-bold uppercase tracking-wider text-neutral-600 md:border-b md:border-r">
              Elegimos
            </div>
            <div className="border-b border-neutral-200 bg-neutral-50 px-5 py-3 text-xs font-bold uppercase tracking-wider text-neutral-600 md:border-b md:border-r">
              En lugar de
            </div>
            <div className="border-b border-neutral-200 bg-neutral-50 px-5 py-3 text-xs font-bold uppercase tracking-wider text-neutral-600 md:border-b">
              Porqué
            </div>

            {/* Row 1 */}
            <TradeoffCell>Profundizar los flujos críticos existentes</TradeoffCell>
            <TradeoffCell>Agregar nuevas funcionalidades complejas</TradeoffCell>
            <TradeoffCell last>
              El 57% de las acciones ocurren en Factura de Venta — mejorar lo
              que ya existe tiene más impacto que expandir.
            </TradeoffCell>

            {/* Row 2 */}
            <TradeoffCell>Complemento estratégico de la web</TradeoffCell>
            <TradeoffCell>Paridad total con la web</TradeoffCell>
            <TradeoffCell last>
              La web es el sistema de gestión profunda; intentar copiarla en
              móvil crearía una app confusa e imposible de mantener.
            </TradeoffCell>

            {/* Row 3 - Highlighted */}
            <TradeoffCell highlighted>
              Retención y Adopción de usuarios actuales
            </TradeoffCell>
            <TradeoffCell highlighted>Adquisición de nuevos usuarios</TradeoffCell>
            <TradeoffCell highlighted last>
              Solo el 22% del total de usuarios pagos web obtiene valor real de
              la app.
            </TradeoffCell>
          </div>
        </div>
      </div>
    </div>
  );
}

function TradeoffCell({
  children,
  last,
  highlighted,
}: {
  children: React.ReactNode;
  last?: boolean;
  highlighted?: boolean;
}) {
  return (
    <div
      className={cn(
        "border-b border-neutral-200 px-5 py-4 text-sm text-neutral-700 last:border-b-0 md:border-b",
        !last && "md:border-r",
        highlighted && "bg-emerald-50/60 font-medium text-neutral-900",
      )}
      style={
        highlighted
          ? { boxShadow: `inset 3px 0 0 ${ALEGRA_GREEN}` }
          : undefined
      }
    >
      {children}
    </div>
  );
}

function PlaceholderSection({ title }: { title: string }) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-neutral-200 bg-white/60 p-12 text-center">
      <div
        className="flex h-16 w-16 items-center justify-center rounded-full"
        style={{ backgroundColor: `${ALEGRA_GREEN}15` }}
      >
        <Sparkles className="h-7 w-7" style={{ color: ALEGRA_GREEN }} />
      </div>
      <h3 className="mt-6 text-2xl font-bold text-neutral-900">{title}</h3>
      <p className="mt-2 text-sm text-neutral-500">Contenido próximamente</p>
    </div>
  );
}
