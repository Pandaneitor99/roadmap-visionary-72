import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, Sparkles, TrendingUp, TrendingDown, Wrench, ClipboardList, Star, ExternalLink, Users, AlertTriangle, Heart, Target, Lightbulb, Bug, LogIn, Headphones, UserPlus, Info } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { okrs } from "@/data/initiatives";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LabelList,
} from "recharts";

import { initiativeDetailMap } from "../q2-2026/initiativeDetails";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import agendaAppMockup from "@/assets/agenda-app-mockup.png";


const sections = [
  { id: "agenda" as const, title: "Agenda", short: "Agenda" },
  { id: 1, title: "Visión estratégica", short: "Visión" },
  { id: 2, title: "North Star y métricas clave", short: "North Star" },
  { id: 3, title: "Base de usuarios y MRR", short: "Usuarios & MRR" },
  { id: 4, title: "Comportamiento de usuarios", short: "Comportamiento" },
  { id: 5, title: "Resultados del período", short: "Resultados" },
  { id: 6, title: "Issues", short: "Issues" },
  { id: 7, title: "Funnel", short: "Funnel" },
  { id: 8, title: "Diagnóstico y oportunidades", short: "Diagnóstico" },
];

const ALEGRA_GREEN = "#00B386";

export default function RoadmapReviewQ32026() {
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
              {typeof s.id === "number" && (
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
              )}
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
            {typeof section.id === "number" ? (
              <p
                className="text-xs font-semibold uppercase tracking-[0.2em]"
                style={{ color: ALEGRA_GREEN }}
              >
                Sección {section.id} de {sections.length - 1}
              </p>
            ) : (
              <p
                className="text-xs font-semibold uppercase tracking-[0.2em]"
                style={{ color: ALEGRA_GREEN }}
              >
                Roadmap Review · Q3 2026
              </p>
            )}
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
              {section.title}
            </h1>
          </div>
        </div>

        {/* Slide body */}
        <div className="min-h-[60vh]">
          {current === 0 ? (
            <SectionAgenda />
          ) : current === 1 ? (
            <Section1 />
          ) : current === 2 ? (
            <Section2 />
          ) : current === 3 ? (
            <Section3 />
          ) : current === 4 ? (
            <SectionComportamiento />
          ) : current === 5 ? (
            <Section4 />
          ) : current === 6 ? (
            <SectionIssues />
          ) : current === 7 ? (
            <SectionFunnel />
          ) : current === 8 ? (
            <Section5 />
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
      {/* Vision block + filosofía embebida */}
      <div
        className="relative overflow-hidden rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm md:p-6"
        style={{
          backgroundImage:
            "radial-gradient(circle at 100% 0%, rgba(0,179,134,0.08), transparent 50%)",
        }}
      >
        <div
          className="absolute left-0 top-0 h-full w-1.5"
          style={{ backgroundColor: ALEGRA_GREEN }}
        />

        {/* Aviso movido a la sección Agenda */}

        {/* Imagen de fondo eliminada */}

        <div className="relative">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" style={{ color: ALEGRA_GREEN }} />
            <span
              className="text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ color: ALEGRA_GREEN }}
            >
              Visión
            </span>
          </div>
          <p className="mt-3 text-xl font-semibold leading-snug text-neutral-900 md:text-2xl">
            "Convertir la App de Alegra en el centro operativo móvil imprescindible de la Pyme<br />
            y el centro de control móvil en tiempo real del contador,<br />
            donde las decisiones y flujos críticos se resuelven en segundos."
          </p>
        </div>

        {/* Filosofía — tarjetas pequeñas embebidas */}
        <div className="relative mt-5 grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-neutral-200/80 bg-white/80 p-4 backdrop-blur-sm">
            <div
              className="inline-flex rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white"
              style={{ backgroundColor: ALEGRA_GREEN }}
            >
              Principio
            </div>
            <h4 className="mt-2 text-sm font-bold leading-snug text-neutral-900">
              La app no compite con la web
            </h4>
            <p className="mt-1 text-xs leading-relaxed text-neutral-600">
              La <strong>web</strong> vive la <strong>complejidad</strong>; la{" "}
              <strong>app</strong> vive la <strong>inmediatez</strong>.
            </p>
          </div>
          <div className="rounded-xl border border-neutral-200/80 bg-white/80 p-4 backdrop-blur-sm">
            <div
              className="inline-flex rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white"
              style={{ backgroundColor: "#FF6B00" }}
            >
              Pyme
            </div>
            <h4 className="mt-2 text-sm font-bold leading-snug text-neutral-900">
              Frente al cliente: actuar, no pensar
            </h4>
            <p className="mt-1 text-xs leading-relaxed text-neutral-600">
              Cuando el emprendedor está frente al cliente y necesita facturar,
              debería <strong>actuar</strong>, no pensar.
            </p>
          </div>
          <div className="rounded-xl border border-neutral-200/80 bg-white/80 p-4 backdrop-blur-sm">
            <div className="inline-flex rounded-full bg-neutral-900 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
              Contador
            </div>
            <h4 className="mt-2 text-sm font-bold leading-snug text-neutral-900">
              En movimiento: controlar, no esperar
            </h4>
            <p className="mt-1 text-xs leading-relaxed text-neutral-600">
              El contador debería <strong>controlar</strong> el estado de los
              negocios en tiempo real, no esperar.
            </p>
          </div>
        </div>
      </div>

      {/* Two cards: roles */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="group rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
          <div
            className="inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white"
            style={{ backgroundColor: ALEGRA_GREEN }}
          >
            Para la Pyme
          </div>
          <h3 className="mt-3 text-lg font-bold text-neutral-900">
            Centro operativo mobile
          </h3>
          <p className="mt-1 text-sm text-neutral-600">Ejecución inmediata</p>
        </div>
        <div className="group rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
          <div className="inline-flex rounded-full bg-neutral-900 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
            Para el contador
          </div>
          <h3 className="mt-3 text-lg font-bold text-neutral-900">
            Centro de control mobile
          </h3>
          <p className="mt-1 text-sm text-neutral-600">Control y validación</p>
        </div>
      </div>

      {/* Segmentos Objetivo */}
      <SegmentosObjetivo />

      {/* Trade-offs table — colapsable */}
      <Collapsible className="group/collap">
        <CollapsibleTrigger className="flex w-full items-center justify-between rounded-xl border border-neutral-200 bg-white px-5 py-3 text-left shadow-sm transition hover:bg-neutral-50">
          <h2 className="text-lg font-bold text-neutral-900">Trade-offs estratégicos</h2>
          <ChevronDown className="h-4 w-4 text-neutral-500 transition-transform group-data-[state=open]/collap:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="mt-3 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="border-b border-neutral-200 bg-neutral-50 px-5 py-3 text-xs font-bold uppercase tracking-wider text-neutral-600 md:border-b md:border-r">
                Elegimos
              </div>
              <div className="border-b border-neutral-200 bg-neutral-50 px-5 py-3 text-xs font-bold uppercase tracking-wider text-neutral-600 md:border-b md:border-r">
                En lugar de
              </div>
              <div className="border-b border-neutral-200 bg-neutral-50 px-5 py-3 text-xs font-bold uppercase tracking-wider text-neutral-600 md:border-b">
                Por qué
              </div>

              {/* Row 1 */}
              <TradeoffCell>Profundizar los flujos críticos existentes y creación de funcionalidad esenciales básicas</TradeoffCell>
              <TradeoffCell>Agregar nuevas funcionalidades complejas o procesos complejos</TradeoffCell>
              <TradeoffCell last>
                El 90% de las acciones gira en torno a los ingresos y gastos, mejorar lo que ya existe tiene más impacto que expandir en funcionalidades segmento específico.
              </TradeoffCell>

              {/* Row 2 */}
              <TradeoffCell>Complemento estratégico de la web</TradeoffCell>
              <TradeoffCell>Paridad total con la web</TradeoffCell>
              <TradeoffCell last>
                La web es el sistema de gestión profunda; intentar copiarla en
                móvil crearía una app confusa e imposible de mantener.
              </TradeoffCell>

              {/* Row 3 */}
              <TradeoffCell>
                Retención y Adopción de usuarios actuales
              </TradeoffCell>
              <TradeoffCell>Adquisición de nuevos usuarios</TradeoffCell>
              <TradeoffCell last>
                Solo el 22% del total de usuarios pagos web obtiene valor real de
                la app.
              </TradeoffCell>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

// === Segmentos Objetivo (interactivo) ===

type Segmento = {
  id: string;
  nombre: string;
  badge: string;
  tamano: string;
  dolor: string;
  impacto: string;
  alternativa: string;
  prioridad: "Máxima" | "Alta" | "Media";
  color: string;
  problema: string;
  costos: string[];
  valor: string;
};

const segmentos: Segmento[] = [
  {
    id: "base",
    nombre: "Pyme Mobile First",
    badge: "Móvil-first",
    tamano: "~28% del MAC (~2,484 usuarios)",
    dolor: "Muy alto",
    impacto: "Engagement / Adquisición",
    alternativa: "Web Alegra cuando tiene PC",
    prioridad: "Máxima",
    color: ALEGRA_GREEN,
    problema:
      "Su herramienta central — la app — tiene funcionalidades faltantes dentro de los módulos, funcionalidades de core web faltantes, falta de información en la factura de venta (especialmente al agregar productos) y cuando algo falla no tiene alternativa inmediata.",
    costos: [
      "Pierde trazabilidad de ventas y problemas contables al no poder facturar frente al cliente.",
      "Negocio y cliente frustrado al no contar con la información y documentos importantes.",
      "No conocer cuánto le deben ni quién le debe.",
      "Alta concentración de riesgo de churn.",
    ],
    valor:
      "Facturar en ≤90 segundos, descargarlo y compartirlo con el cliente al frente. Saber de un vistazo que el negocio está al día. Tener un control completo de la venta y del gasto.",
  },
  {
    id: "contador",
    nombre: "Contador",
    badge: "Sub-servido",
    tamano: "~3% del MAC (~266 usuarios)",
    dolor: "Medio",
    impacto: "Adopción",
    alternativa: "Reportes en web, llamadas al cliente",
    prioridad: "Alta",
    color: "#7C3AED",
    problema:
      "No tiene un panel de control móvil real. Para saber el estado de los negocios de sus clientes, necesita el PC. Las alertas, validaciones y aprobaciones no llegan al celular de forma estructurada.",
    costos: [
      "Dependencia total del escritorio para supervisión básica.",
      "No puede supervisar múltiples empresas simultáneamente en movimiento.",
      "El tiempo de respuesta a sus clientes crece, afectando la calidad del servicio.",
    ],
    valor:
      "Panel de control en el bolsillo. Estado de los negocios de sus clientes en segundos. Validaciones y alertas que llegan sin buscarlas.",
  },
  {
    id: "sos",
    nombre: "Pyme Web First",
    badge: "Web-first",
    tamano: "~69% del MAC (~6,045 usuarios)",
    dolor: "Medio",
    impacto: "Adopción",
    alternativa: "Vuelve al PC, pierde la venta",
    prioridad: "Media",
    color: "#FF6B00",
    problema:
      "No tiene una razón poderosa para cambiar su hábito. La app se percibe como 'más limitada y complicada que la web'. Cuando la necesita (está fuera del computador), la experiencia lo decepciona y refuerza el comportamiento de volver al PC.",
    costos: [
      "Pierde la oportunidad de facturar o consultar estado al instante — depende del PC.",
      "Costos de re-trabajo al tener que ir al PC para registrar lo que no puede hacer en la app.",
      "Baja percepción de utilidad de la app y pensamiento negativo hacia la marca.",
      "Baja concentración de riesgo de churn.",
    ],
    valor:
      "Visibilidad y descubrimiento de la app dentro del ecosistema Alegra. Una primera experiencia que muestre el valor inmediato de tener la app a la mano.",
  },
];

function SegmentosObjetivo() {
  const [selected, setSelected] = useState<string>("base");
  const seg = segmentos.find((s) => s.id === selected)!;

  return (
    <div>
      <h2 className="mb-2 text-lg font-bold text-neutral-900">Segmentos objetivo</h2>
      <p className="mb-5 text-sm text-neutral-600">
        Selecciona un segmento para ver sus dolores y el valor que creamos.
      </p>

      {/* Tabla resumen */}
      <div className="mb-6 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
        <div className="grid grid-cols-12 border-b border-neutral-200 bg-neutral-50 px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-neutral-600">
          <div className="col-span-3">Segmento</div>
          <div className="col-span-3">Tamaño</div>
          <div className="col-span-2">Nivel de dolor</div>
          <div className="col-span-2">Impacto</div>
          <div className="col-span-2 text-right">Prioridad</div>
        </div>
        {segmentos.map((s) => {
          const active = s.id === selected;
          // Fondo claro: web-first → naranja claro, móvil-first → verde claro, otros → tono propio
          const bgTint =
            s.badge === "Web-first"
              ? "rgba(255,107,0,0.08)"
              : s.badge === "Móvil-first"
                ? "rgba(0,179,134,0.08)"
                : `${s.color}10`;
          return (
            <button
              key={s.id}
              onClick={() => setSelected(s.id)}
              className={cn(
                "grid w-full grid-cols-12 items-center border-b border-neutral-100 px-5 py-3 text-left text-xs transition-all last:border-b-0 hover:bg-neutral-50",
              )}
              style={
                active
                  ? { backgroundColor: bgTint, boxShadow: `inset 3px 0 0 ${s.color}` }
                  : undefined
              }
            >
              <div className="col-span-3 font-semibold text-neutral-900">
                {s.nombre}
                <span className="ml-2 text-[10px] font-medium text-neutral-500">
                  {s.badge}
                </span>
              </div>
              <div className="col-span-3 text-neutral-600">{s.tamano}</div>
              <div className="col-span-2 text-neutral-600">{s.dolor}</div>
              <div className="col-span-2 text-neutral-600">{s.impacto}</div>
              <div className="col-span-2 text-right">
                <span
                  className="inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold uppercase text-white"
                  style={{
                    backgroundColor:
                      s.prioridad === "Máxima"
                        ? "#EF4444"
                        : s.prioridad === "Alta"
                          ? "#FF6B00"
                          : "#F59E0B",
                  }}
                >
                  {s.prioridad}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Cards de segmentos clickeables */}
      <div className="mb-6 grid gap-3 md:grid-cols-3">
        {segmentos.map((s) => {
          const active = s.id === selected;
          return (
            <button
              key={s.id}
              onClick={() => setSelected(s.id)}
              className={cn(
                "rounded-xl border p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-md",
                active
                  ? "border-2 shadow-md"
                  : "border-neutral-200 bg-white shadow-sm",
              )}
              style={
                active
                  ? { borderColor: s.color, backgroundColor: `${s.color}08` }
                  : undefined
              }
            >
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" style={{ color: s.color }} />
                <span
                  className="text-[10px] font-bold uppercase tracking-wider"
                  style={{ color: s.color }}
                >
                  {s.badge}
                </span>
              </div>
              <h3 className="mt-2 text-sm font-bold text-neutral-900">{s.nombre}</h3>
              <p className="mt-1 text-[11px] text-neutral-500">{s.tamano}</p>
            </button>
          );
        })}
      </div>

      {/* Detalle: Dolores y Valor Creado */}
      <div className="grid gap-5 md:grid-cols-2">
        {/* Dolor / Problema */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-orange-500" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600">
              Dolor · {seg.nombre}
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-neutral-800">
            {seg.problema}
          </p>
          <p className="mt-5 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
            Costo actual del problema
          </p>
          <ul className="mt-2 space-y-2">
            {seg.costos.map((c, i) => (
              <li
                key={i}
                className="flex gap-2 text-xs leading-relaxed text-neutral-600"
              >
                <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-orange-400" />
                {c}
              </li>
            ))}
          </ul>
        </div>

        {/* Valor creado */}
        <div
          className="rounded-2xl border bg-white p-6 shadow-sm"
          style={{ borderColor: `${seg.color}40` }}
        >
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4" style={{ color: seg.color }} />
            <span
              className="text-[10px] font-bold uppercase tracking-wider"
              style={{ color: seg.color }}
            >
              Valor que creamos
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-neutral-800">
            {seg.valor}
          </p>
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

// === Sección 2: North Star (MAC - Tendencia) ===

// Chart rg181rta — MAC (Usuarios Pagos) comparación año contra año, Ene–Jun.
const macTrendData = [
  { month: "Ene", y2026: 7186, y2025: 6681 },
  { month: "Feb", y2026: 7225, y2025: 6544 },
  { month: "Mar", y2026: 7643, y2025: 6517 },
  { month: "Abr", y2026: 8241, y2025: 6325 },
  { month: "May", y2026: 8854, y2025: 6475 },
  { month: "Jun", y2026: 8785, y2025: 6434 },
];

// Variación por país: Jun '26 vs Jun '25 (chart gxbjwfwt, comparación año contra año)
const countryVariation = [
  { country: "Colombia", current: 5571, prev: 4210, color: ALEGRA_GREEN },
  { country: "República Dominicana", current: 1317, prev: 992, color: "#0066FF" },
  { country: "México", current: 874, prev: 522, color: "#FF6B00" },
  { country: "Costa Rica", current: 313, prev: 164, color: "#06B6D4" },
];

function SideMetricCard({
  label,
  value,
  delta,
  color,
  highlight,
  compareLabel = "vs Oct '25",
}: {
  label: string;
  value: number;
  delta: number;
  color: string;
  highlight?: boolean;
  compareLabel?: string;
}) {
  const up = delta >= 0;
  return (
    <div
      className={cn(
        "rounded-2xl border bg-white p-4 shadow-sm transition-all",
        highlight && "ring-2 ring-emerald-100",
      )}
      style={{ borderLeft: `4px solid ${color}` }}
    >
      <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
        {label}
      </p>
      <p className="mt-1.5 text-2xl font-bold text-neutral-900">
        {value.toLocaleString("es-CO")}
      </p>
      <p
        className={cn(
          "mt-1 flex items-center gap-1 text-xs font-bold",
          up ? "text-emerald-600" : "text-red-600",
        )}
      >
        {up ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
        {up ? "+" : ""}
        {delta.toFixed(1)}%
        <span className="ml-1 text-[10px] font-medium text-neutral-500">{compareLabel}</span>
      </p>
    </div>
  );
}

function Section2() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const last = macTrendData[macTrendData.length - 1];
  const deltaPct = (((last.y2026 - last.y2025) / last.y2025) * 100).toFixed(1);

  return (
    <div className="space-y-8">
      {/* North Star definition */}
      <div
        className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm"
        style={{ borderLeft: `4px solid ${ALEGRA_GREEN}` }}
      >
        <div className="flex items-start gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
            style={{ backgroundColor: `${ALEGRA_GREEN}15` }}
          >
            <Star className="h-5 w-5" style={{ color: ALEGRA_GREEN }} />
          </div>
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: ALEGRA_GREEN }}
            >
              North Star Metric
            </p>
            <h2 className="mt-1 text-2xl font-bold text-neutral-900">
              Monthly Active Customers (MAC)
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">
              Usuarios pagos únicos que ejecutan al menos una acción de valor en la app cada mes.
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {[
                { label: "Facturas", isNew: false },
                { label: "Cotizar", isNew: false },
                { label: "Contactos", isNew: false },
                { label: "Items", isNew: false },
                { label: "Remisiones", isNew: false },
                { label: "Pagos", isNew: false },
                { label: "Reportes", isNew: false },
                { label: "Búsquedas", isNew: false },
                { label: "Gráficos", isNew: false },
              ].map((action) => (
                <span
                  key={action.label}
                  className="relative inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium text-neutral-700"
                  style={{
                    borderColor: `${ALEGRA_GREEN}40`,
                    backgroundColor: `${ALEGRA_GREEN}08`,
                  }}
                >
                  {action.label}
                  {action.isNew && (
                    <span
                      className="ml-1.5 rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white"
                      style={{ backgroundColor: ALEGRA_GREEN }}
                    >
                      Nuevo
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MAC Trend Chart + side cards */}
      <div className="grid gap-6 lg:grid-cols-4">
        <div className="rounded-2xl border border-neutral-200 bg-white px-6 pt-4 pb-6 shadow-sm md:px-8 md:pt-5 md:pb-7 lg:col-span-3">
          <div className="mb-3 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-neutral-900">MAC — Tendencia</h3>
              <p className="mt-0.5 text-xs text-neutral-500">
                Ene–Jun · Usuarios Pagos · 2026 vs 2025
              </p>
            </div>
          </div>

          <div className="mb-4 flex items-center justify-end gap-3 flex-wrap">
            <a
              href="https://app.amplitude.com/analytics/alegra/chart/rg181rta"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-medium text-neutral-500 hover:text-neutral-900"
            >
              Ver en Amplitude
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <div className="h-[360px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={macTrendData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis
                  dataKey="month"
                  stroke="#6b7280"
                  tick={{ fontSize: 12 }}
                  axisLine={{ stroke: "#e5e7eb" }}
                  tickLine={false}
                />
                <YAxis
                  stroke="#6b7280"
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => v.toLocaleString("es-CO")}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid #e5e7eb",
                    fontSize: 12,
                  }}
                  formatter={(v: number) => v.toLocaleString("es-CO")}
                />
                <Legend
                  iconType="circle"
                  wrapperStyle={{ fontSize: 12, paddingTop: 12 }}
                />
                <Line
                  type="monotone"
                  dataKey="y2026"
                  name="2026"
                  stroke={ALEGRA_GREEN}
                  strokeWidth={3}
                  dot={{ r: 4, fill: ALEGRA_GREEN }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="y2025"
                  name="2025"
                  stroke="#94a3b8"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card lateral: MAC actual (Jun 2026) */}
        <div className="flex flex-col gap-4 lg:col-span-1">
          <SideMetricCard
            label="MAC actual"
            value={last.y2026}
            delta={Number(deltaPct)}
            color={ALEGRA_GREEN}
            highlight
            compareLabel="vs Jun '25"
          />
        </div>
      </div>

      {/* Variación por país: Jun '26 vs Jun '25 — clic para filtrar la línea */}
      <div>
        <div className="mb-3 flex items-center justify-between gap-3">
          <h3 className="text-base font-bold text-neutral-900">
            MAC por país — Jun '26 vs Jun '25
          </h3>
          {selectedCountry && (
            <button
              onClick={() => setSelectedCountry(null)}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-700 shadow-sm transition-all hover:border-neutral-400 hover:bg-neutral-50 hover:text-neutral-900"
            >
              Limpiar filtros
              <span className="text-neutral-400">✕</span>
            </button>
          )}
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {countryVariation.map((c) => {
            const delta = ((c.current - c.prev) / c.prev) * 100;
            const isUp = delta >= 0;
            const isActive = selectedCountry === c.country;
            return (
              <button
                key={c.country}
                onClick={() =>
                  setSelectedCountry(isActive ? null : c.country)
                }
                className={cn(
                  "rounded-2xl border bg-white px-4 py-3 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md",
                  isActive
                    ? "border-neutral-900 ring-2 ring-neutral-900/10"
                    : "border-neutral-200",
                )}
                style={{ borderTop: `3px solid ${c.color}` }}
              >
                <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                  {c.country}
                </p>
                <div className="mt-1 flex items-baseline justify-between gap-2">
                  <p className="text-2xl font-bold text-neutral-900">
                    {c.current.toLocaleString("es-CO")}
                  </p>
                  <p
                    className={cn(
                      "flex items-center gap-1 text-xs font-bold",
                      isUp ? "text-emerald-600" : "text-red-600",
                    )}
                  >
                    {isUp ? (
                      <TrendingUp className="h-3.5 w-3.5" />
                    ) : (
                      <TrendingDown className="h-3.5 w-3.5" />
                    )}
                    {isUp ? "+" : ""}
                    {delta.toFixed(1)}%
                  </p>
                </div>
                <p className="mt-0.5 text-[10px] font-medium text-neutral-400">vs Jun '25</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* MAC por país: Line + Pie */}
      <MacPorPais selectedCountry={selectedCountry} />

      {/* Tasa de Adopción */}
      <TasaAdopcion />

      {/* % Participación de App */}
      <ParticipacionApp />
    </div>
  );
}

// === MAC por país (Line + Pie) ===

const trendMonths = ["Ene", "Feb", "Mar", "Abr", "May", "Jun"];

// Chart gxbjwfwt — MAC por país, comparación año contra año (2026 vs 2025).
const countryTrend: Record<string, { "2026": number[]; "2025": number[] }> = {
  Colombia: { "2026": [4660, 4718, 4926, 5336, 5678, 5571], "2025": [4368, 4318, 4237, 4201, 4265, 4210] },
  "República Dominicana": { "2026": [1034, 1050, 1140, 1198, 1326, 1317], "2025": [1075, 1022, 1051, 962, 1004, 992] },
  México: { "2026": [630, 632, 708, 757, 816, 874], "2025": [475, 469, 484, 437, 482, 522] },
  "Costa Rica": { "2026": [213, 218, 222, 251, 296, 313], "2025": [147, 149, 156, 143, 154, 164] },
};

// Vista por defecto: los 4 países (serie 2026).
const macLinePerCountry = trendMonths.map((month, i) => ({
  month,
  Colombia: countryTrend.Colombia["2026"][i],
  "República Dominicana": countryTrend["República Dominicana"]["2026"][i],
  México: countryTrend.México["2026"][i],
  "Costa Rica": countryTrend["Costa Rica"]["2026"][i],
}));

const macPieData = [
  { name: "Colombia", value: 5132, color: ALEGRA_GREEN },
  { name: "República Dominicana", value: 1199, color: "#0066FF" },
  { name: "México", value: 728, color: "#FF6B00" },
  { name: "Panamá", value: 278, color: "#7C3AED" },
  { name: "Costa Rica", value: 235, color: "#06B6D4" },
  { name: "Argentina", value: 189, color: "#F59E0B" },
  { name: "Perú", value: 90, color: "#EC4899" },
  { name: "Otros", value: 152, color: "#9CA3AF" },
];

const macPieTotal = macPieData.reduce((s, d) => s + d.value, 0);

function MacPorPais({ selectedCountry }: { selectedCountry?: string | null }) {
  const countryColors: Record<string, string> = {
    Colombia: ALEGRA_GREEN,
    "República Dominicana": "#0066FF",
    México: "#FF6B00",
    "Costa Rica": "#06B6D4",
  };
  const allCountries = ["Colombia", "República Dominicana", "México", "Costa Rica"];
  const isCountrySelected = Boolean(selectedCountry && allCountries.includes(selectedCountry));

  // Con país seleccionado, comparamos 2026 vs el mismo periodo del año pasado (2025).
  const chartData = isCountrySelected
    ? trendMonths.map((month, i) => ({
        month,
        "2026": countryTrend[selectedCountry!]["2026"][i],
        "2025": countryTrend[selectedCountry!]["2025"][i],
      }))
    : macLinePerCountry;

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      {/* Line per country */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm lg:col-span-3">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-neutral-900">MAC — Tendencia por país</h3>
            <p className="mt-1 text-xs text-neutral-500">
              Ene–Jun ·{" "}
              {isCountrySelected ? `${selectedCountry}: 2026 vs 2025` : "Top 4 países por volumen"}
            </p>
          </div>
          <a
            href="https://app.amplitude.com/analytics/alegra/chart/gxbjwfwt"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] font-medium text-neutral-500 hover:text-neutral-900"
          >
            Amplitude <ExternalLink className="h-3 w-3" />
          </a>
        </div>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="month" stroke="#6b7280" tick={{ fontSize: 11 }} axisLine={{ stroke: "#e5e7eb" }} tickLine={false} />
              <YAxis stroke="#6b7280" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
              {isCountrySelected ? (
                <>
                  <Line
                    type="monotone"
                    dataKey="2026"
                    name={`${selectedCountry} 2026`}
                    stroke={countryColors[selectedCountry!]}
                    strokeWidth={3}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="2025"
                    name={`${selectedCountry} 2025`}
                    stroke="#94a3b8"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ r: 3 }}
                  />
                </>
              ) : (
                allCountries.map((c) => (
                  <Line
                    key={c}
                    type="monotone"
                    dataKey={c}
                    stroke={countryColors[c]}
                    strokeWidth={c === "Colombia" ? 3 : 2}
                    dot={{ r: 3 }}
                  />
                ))
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie per country */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm lg:col-span-2">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-neutral-900">MAC — Distribución por país</h3>
            <p className="mt-1 text-xs text-neutral-500">
              Marzo 2026{selectedCountry ? ` · ${selectedCountry}` : ""}
            </p>
          </div>
          <a
            href="https://app.amplitude.com/analytics/alegra/chart/0ixf9ww7"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] font-medium text-neutral-500 hover:text-neutral-900"
          >
            Amplitude <ExternalLink className="h-3 w-3" />
          </a>
        </div>
        <div className="relative h-[220px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={macPieData} dataKey="value" nameKey="name" innerRadius={45} outerRadius={85} paddingAngle={2}>
                {macPieData.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={entry.color}
                    fillOpacity={selectedCountry && entry.name !== selectedCountry ? 0.2 : 1}
                    stroke={selectedCountry === entry.name ? "#111827" : "#fff"}
                    strokeWidth={selectedCountry === entry.name ? 2 : 1}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }}
                formatter={(v: number) => `${v.toLocaleString("es-CO")} (${((v / macPieTotal) * 100).toFixed(1)}%)`}
              />
            </PieChart>
          </ResponsiveContainer>
          {selectedCountry && macPieData.some((d) => d.name === selectedCountry) && (
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                {selectedCountry}
              </span>
              <span className="text-xl font-bold text-neutral-900">
                {((macPieData.find((x) => x.name === selectedCountry)!.value / macPieTotal) * 100).toFixed(0)}%
              </span>
            </div>
          )}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1 text-[11px]">
          {macPieData.slice(0, 6).map((d) => (
            <div
              key={d.name}
              className={cn("flex items-center gap-1.5", selectedCountry && d.name !== selectedCountry && "opacity-40")}
            >
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: d.color }} />
              <span className="text-neutral-600">{d.name}</span>
              <span className="ml-auto font-semibold text-neutral-900">
                {((d.value / macPieTotal) * 100).toFixed(0)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// === Tasa de Adopción ===

// Adopción (entran) = chart 5vlf3f1x · Real (acciones) = chart hqcerbqk. Series Ene–Jun '26.
const adoptionMonths = ["Ene", "Feb", "Mar", "Abr", "May", "Jun"];
const countryAdoption = [
  { country: "Colombia", color: ALEGRA_GREEN, adopcion: [27.8, 26.3, 27.1, 26.3, 26.4, 25.7], real: [18.9, 18.3, 18.7, 19.8, 21.1, 20.7] },
  { country: "Rep. Dominicana", color: "#0066FF", adopcion: [52.0, 49.8, 51.0, 51.0, 50.4, 48.5], real: [36.2, 35.4, 37.4, 38.6, 40.3, 39.5] },
  { country: "México", color: "#FF6B00", adopcion: [31.3, 29.9, 31.1, 31.7, 31.1, 31.3], real: [19.9, 19.4, 21.5, 22.5, 23.3, 24.0] },
  { country: "Costa Rica", color: "#06B6D4", adopcion: [42.4, 38.8, 37.5, 40.3, 41.6, 43.0], real: [27.6, 26.7, 25.5, 29.5, 32.7, 34.1] },
];

// Evolución mensual % usuarios pagos activos (Ene → Jun '26) - chart rbp5ch2z
// adopcion = Ingresan a la app (WAU/Pagos) · real = Realizan una acción (WAC/Pagos)
const adopcionMensualSeries = [
  { month: "Ene", adopcion: 31.8, real: 21.6 },
  { month: "Feb", adopcion: 30.1, real: 20.8 },
  { month: "Mar", adopcion: 30.8, real: 21.6 },
  { month: "Abr", adopcion: 30.2, real: 22.7 },
  { month: "May", adopcion: 30.3, real: 24.1 },
  { month: "Jun", adopcion: 29.7, real: 23.9 },
];

function AdoptionMetricRow({
  label,
  labelColor,
  value,
  base,
}: {
  label: string;
  labelColor: string;
  value: number;
  base: number;
}) {
  const delta = ((value - base) / base) * 100;
  const up = delta >= 0;
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: labelColor }}>
        {label}
      </p>
      <div className="mt-0.5 flex items-baseline justify-between gap-1">
        <p className="text-xl font-bold text-neutral-900">{value.toFixed(1)}%</p>
        <span
          className={cn(
            "flex items-center gap-0.5 text-[11px] font-bold",
            up ? "text-emerald-600" : "text-red-600",
          )}
        >
          {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          {up ? "+" : ""}{delta.toFixed(1)}%
        </span>
      </div>
    </div>
  );
}

function TasaAdopcion() {
  // Chart rbp5ch2z (Ene → Jun '26). Valores actuales = Junio; delta = Jun vs Ene.
  const adopcionLast = adopcionMensualSeries[adopcionMensualSeries.length - 1];
  const adopcionFirst = adopcionMensualSeries[0];
  const tasaAdopcion = adopcionLast.adopcion; // MAU APP / MAC WEB (Ingresan)
  const tasaReal = adopcionLast.real; // MAC APP / MAC WEB (Realizan)
  const deltaAdopcion = ((adopcionLast.adopcion - adopcionFirst.adopcion) / adopcionFirst.adopcion) * 100;
  const deltaReal = ((adopcionLast.real - adopcionFirst.real) / adopcionFirst.real) * 100;
  const upAdopcion = deltaAdopcion >= 0;
  const upReal = deltaReal >= 0;

  // Filtro por card KPI: controla la evolución mensual y la barra global.
  const [metricFilter, setMetricFilter] = useState<"both" | "adopcion" | "real">("both");
  const showAdopcionMetric = metricFilter !== "real";
  const showRealMetric = metricFilter !== "adopcion";

  // Filtros del bloque "por país": card seleccionada + tab de métrica del gráfico de línea.
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [metricTab, setMetricTab] = useState<"adopcion" | "real">("adopcion");
  const lastOf = (a: number[]) => a[a.length - 1];
  const selected = countryAdoption.find((c) => c.country === selectedCountry) ?? null;

  // Filtrado por país (cards): controla las barras por país y el gráfico de evolución.
  const metricCountries = selected ? [selected] : countryAdoption;
  const lineData = adoptionMonths.map((month, i) => {
    const row: Record<string, number | string> = { month };
    metricCountries.forEach((c) => { row[c.country] = c[metricTab][i]; });
    return row;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-neutral-900">Tasa de Adopción</h3>
          <p className="mt-1 text-sm text-neutral-600">
            % de <strong>usuarios pagos web activos</strong> que entran a la app y/o realizan acciones de valor.
          </p>
        </div>
        {metricFilter !== "both" && (
          <button
            onClick={() => setMetricFilter("both")}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-700 shadow-sm transition-all hover:border-neutral-400 hover:bg-neutral-50 hover:text-neutral-900"
          >
            Limpiar filtro <span className="text-neutral-400">✕</span>
          </button>
        )}
      </div>

      {/* KPIs — clic para filtrar la evolución mensual y la barra global */}
      <div className="grid gap-4 md:grid-cols-2">
        <button
          onClick={() => setMetricFilter(metricFilter === "adopcion" ? "both" : "adopcion")}
          className={cn(
            "rounded-2xl border bg-white p-4 text-left shadow-sm transition-all hover:shadow-md",
            metricFilter === "adopcion" ? "ring-2 ring-offset-1" : "",
          )}
          style={{ borderLeft: `4px solid #0066FF`, ["--tw-ring-color" as any]: "#0066FF" }}
        >
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4" style={{ color: "#0066FF" }} />
            <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#0066FF" }}>
              Tasa de Adopción
            </span>
          </div>
          <p className="mt-1 text-[11px] text-neutral-500">MAU APP / MAC WEB</p>
          <div className="mt-2 flex items-baseline justify-between gap-2 flex-wrap">
            <p className="text-3xl font-bold text-neutral-900">{tasaAdopcion.toFixed(1)}%</p>
            <p
              className={cn(
                "flex items-center gap-1 text-sm font-bold",
                upAdopcion ? "text-emerald-600" : "text-red-600",
              )}
            >
              {upAdopcion ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              {upAdopcion ? "+" : ""}{deltaAdopcion.toFixed(1)}%
              <span className="ml-1 text-[10px] font-medium text-neutral-500">vs Ene '26</span>
            </p>
          </div>
          <p className="mt-1.5 text-[11px] text-neutral-500">
            % de <strong>usuarios pagos web activos</strong> que entran a la app cada mes (Junio 2026).
          </p>
        </button>

        <button
          onClick={() => setMetricFilter(metricFilter === "real" ? "both" : "real")}
          className={cn(
            "rounded-2xl border bg-white p-4 text-left shadow-sm transition-all hover:shadow-md",
            metricFilter === "real" ? "ring-2 ring-offset-1" : "",
          )}
          style={{ borderLeft: `4px solid ${ALEGRA_GREEN}`, ["--tw-ring-color" as any]: ALEGRA_GREEN }}
        >
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4" style={{ color: ALEGRA_GREEN }} />
            <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: ALEGRA_GREEN }}>
              Tasa de Adopción Real
            </span>
          </div>
          <p className="mt-1 text-[11px] text-neutral-500">MAC APP / MAC WEB</p>
          <div className="mt-2 flex items-baseline justify-between gap-2 flex-wrap">
            <p className="text-3xl font-bold text-neutral-900">{tasaReal.toFixed(1)}%</p>
            <p
              className={cn(
                "flex items-center gap-1 text-sm font-bold",
                upReal ? "text-emerald-600" : "text-red-600",
              )}
            >
              {upReal ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              {upReal ? "+" : ""}{deltaReal.toFixed(1)}%
              <span className="ml-1 text-[10px] font-medium text-neutral-500">vs Ene '26</span>
            </p>
          </div>
          <p className="mt-1.5 text-[11px] text-neutral-500">
            % de <strong>usuarios pagos web activos</strong> que realizan al menos una acción de valor en la app (Junio 2026).
          </p>
        </button>
      </div>

      {/* Evolución mensual */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-neutral-900">
              % Usuarios pagos activos que entran a la app o realizan una acción
            </h4>
            <p className="mt-0.5 text-xs text-neutral-500">
              Evolución mensual · Ene → Jun '26
            </p>
          </div>
          <a
            href="https://app.amplitude.com/analytics/alegra/chart/rbp5ch2z"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] font-medium text-neutral-500 hover:text-neutral-900"
          >
            Amplitude <ExternalLink className="h-3 w-3" />
          </a>
        </div>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={adopcionMensualSeries} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="month" stroke="#6b7280" tick={{ fontSize: 11 }} axisLine={{ stroke: "#e5e7eb" }} tickLine={false} />
              <YAxis stroke="#6b7280" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 40]} tickFormatter={(v) => `${v}%`} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }} formatter={(v: number) => `${v.toFixed(1)}%`} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
              {showAdopcionMetric && <Line type="monotone" dataKey="adopcion" name="Tasa de Adopción (entran)" stroke="#0066FF" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />}
              {showRealMetric && <Line type="monotone" dataKey="real" name="Tasa de Adopción Real (acciones)" stroke={ALEGRA_GREEN} strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Progress bar general (global) */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-neutral-900">
              Tasa de Adopción global — Junio 2026
            </h4>
            <p className="mt-0.5 text-xs text-neutral-500">
              % de usuarios pagos activos que entran a la app o realizan una acción
            </p>
          </div>
          <a
            href="https://app.amplitude.com/analytics/alegra/chart/rbp5ch2z"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] font-medium text-neutral-500 hover:text-neutral-900"
          >
            Amplitude <ExternalLink className="h-3 w-3" />
          </a>
        </div>
        <div className="relative h-8 w-full overflow-hidden rounded-full bg-neutral-100">
          {showAdopcionMetric && (
            <div
              className="absolute left-0 top-0 h-full rounded-full transition-all"
              style={{ width: `${tasaAdopcion}%`, backgroundColor: "#0066FF" }}
            />
          )}
          {showRealMetric && (
            <div
              className="absolute left-0 top-0 h-full rounded-full transition-all"
              style={{ width: `${tasaReal}%`, backgroundColor: ALEGRA_GREEN }}
            />
          )}
          {showRealMetric && (
            <span
              className="absolute top-1/2 -translate-y-1/2 text-[11px] font-bold text-white"
              style={{ left: `calc(${tasaReal}% - 38px)` }}
            >
              {tasaReal.toFixed(1)}%
            </span>
          )}
          {showAdopcionMetric && (
            <span
              className="absolute top-1/2 -translate-y-1/2 text-[11px] font-bold text-white"
              style={{ left: `calc(${tasaAdopcion}% - 42px)` }}
            >
              {tasaAdopcion.toFixed(1)}%
            </span>
          )}
        </div>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[11px]">
          <div className={cn("flex items-center gap-1.5", !showRealMetric && "opacity-40")}>
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: ALEGRA_GREEN }} />
            <span className="font-semibold text-neutral-700">Tasa de Adopción Real</span>
            <span className="text-neutral-500">(MAC APP / MAC WEB)</span>
          </div>
          <div className={cn("flex items-center gap-1.5", !showAdopcionMetric && "opacity-40")}>
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#0066FF" }} />
            <span className="font-semibold text-neutral-700">Tasa de Adopción</span>
            <span className="text-neutral-500">(MAU APP / MAC WEB)</span>
          </div>
        </div>
      </div>

      {/* === Tasa de adopción por país === */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-bold text-neutral-900">Tasa de adopción por país</h3>
        <div className="flex items-center gap-3">
          <div className="inline-flex rounded-lg border border-neutral-200 bg-neutral-50 p-1">
            <button
              onClick={() => setMetricTab("adopcion")}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-semibold transition-all",
                metricTab === "adopcion" ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500 hover:text-neutral-700",
              )}
            >
              Adopción
            </button>
            <button
              onClick={() => setMetricTab("real")}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-semibold transition-all",
                metricTab === "real" ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500 hover:text-neutral-700",
              )}
            >
              Real
            </button>
          </div>
          {selectedCountry && (
            <button
              onClick={() => setSelectedCountry(null)}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-700 shadow-sm transition-all hover:border-neutral-400 hover:bg-neutral-50 hover:text-neutral-900"
            >
              Limpiar filtros <span className="text-neutral-400">✕</span>
            </button>
          )}
        </div>
      </div>
      <p className="-mt-3 text-xs text-neutral-500">
        Clic en un país para filtrar el gráfico por país y la evolución.
      </p>

      {/* Cards por país (filtros) — Junio 2026 vs Enero '26 */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {countryAdoption.map((c) => {
          const isActive = selectedCountry === c.country;
          return (
            <button
              key={c.country}
              onClick={() => setSelectedCountry(isActive ? null : c.country)}
              className={cn(
                "rounded-2xl border bg-white px-4 py-3 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md",
                isActive ? "border-neutral-900 ring-2 ring-neutral-900/10" : "border-neutral-200",
              )}
              style={{ borderTop: `3px solid ${c.color}` }}
            >
              <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                {c.country}
              </p>
              <div className="mt-2">
                {metricTab === "adopcion" ? (
                  <AdoptionMetricRow label="Adopción" labelColor="#0066FF" value={lastOf(c.adopcion)} base={c.adopcion[0]} />
                ) : (
                  <AdoptionMetricRow label="Adopción Real" labelColor={ALEGRA_GREEN} value={lastOf(c.real)} base={c.real[0]} />
                )}
              </div>
              <p className="mt-2 text-[9px] font-medium text-neutral-400">vs Ene '26</p>
            </button>
          );
        })}
      </div>

      {/* Barras por país (filtrado por card) */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-neutral-900">
              % Usuarios pagos activos por país
            </h4>
            <p className="mt-0.5 text-xs text-neutral-500">
              Junio 2026 · {metricTab === "adopcion" ? "Tasa de Adopción (entran a la app)" : "Tasa Real (acciones de valor)"}{selectedCountry ? ` · ${selectedCountry}` : ""}
            </p>
          </div>
          <a
            href={metricTab === "adopcion" ? "https://app.amplitude.com/analytics/alegra/chart/5vlf3f1x" : "https://app.amplitude.com/analytics/alegra/chart/hqcerbqk"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] font-medium hover:underline"
            style={{ color: metricTab === "adopcion" ? "#0066FF" : ALEGRA_GREEN }}
          >
            {metricTab === "adopcion" ? "Adopción" : "Real"} <ExternalLink className="h-3 w-3" />
          </a>
        </div>
        <div className="space-y-3">
          {metricCountries.map((c) => {
            const val = metricTab === "adopcion" ? lastOf(c.adopcion) : lastOf(c.real);
            const barColor = metricTab === "adopcion" ? "#0066FF" : ALEGRA_GREEN;
            const barLabel = metricTab === "adopcion" ? "Adopción" : "Real";
            return (
              <div key={c.country}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="font-medium text-neutral-700">{c.country}</span>
                  <span style={{ color: barColor }}>
                    {barLabel} <strong>{val.toFixed(1)}%</strong>
                  </span>
                </div>
                <div className="relative h-5 w-full overflow-hidden rounded-full bg-neutral-100">
                  <div
                    className="absolute left-0 top-0 h-full rounded-full"
                    style={{ width: `${Math.min(val, 100)}%`, backgroundColor: barColor }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Gráfico de línea por país con tabs Adopción / Real (filtrado por card) */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h4 className="text-sm font-bold text-neutral-900">
              Evolución por país — {metricTab === "adopcion" ? "Adopción" : "Adopción Real"}
            </h4>
            <p className="mt-0.5 text-xs text-neutral-500">
              Ene → Jun '26 · {selectedCountry ?? "Todos los países"}
            </p>
          </div>
          <a
            href={metricTab === "adopcion" ? "https://app.amplitude.com/analytics/alegra/chart/5vlf3f1x" : "https://app.amplitude.com/analytics/alegra/chart/hqcerbqk"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] font-medium text-neutral-500 hover:text-neutral-900"
          >
            Amplitude <ExternalLink className="h-3 w-3" />
          </a>
        </div>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="month" stroke="#6b7280" tick={{ fontSize: 11 }} axisLine={{ stroke: "#e5e7eb" }} tickLine={false} />
              <YAxis stroke="#6b7280" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }} formatter={(v: number) => `${v.toFixed(1)}%`} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
              {metricCountries.map((c) => (
                <Line
                  key={c.country}
                  type="monotone"
                  dataKey={c.country}
                  stroke={c.color}
                  strokeWidth={c.country === "Colombia" ? 3 : 2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// === % Participación de App ===

// Series reales de Amplitude (Ene → Jun '26)
// facturas: hltxo7ij · cotizaciones: ndgvmi3v · remisiones: eosl7cg8
const facturasParticipSeries = [
  { m: "Ene", v: 7.25 },
  { m: "Feb", v: 7.20 },
  { m: "Mar", v: 7.49 },
  { m: "Abr", v: 6.93 },
  { m: "May", v: 6.79 },
  { m: "Jun", v: 6.75 },
];
const cotizacionesParticipSeries = [
  { m: "Ene", v: 13.63 },
  { m: "Feb", v: 14.14 },
  { m: "Mar", v: 15.10 },
  { m: "Abr", v: 14.47 },
  { m: "May", v: 14.61 },
  { m: "Jun", v: 14.12 },
];
const remisionesParticipSeries = [
  { m: "Ene", v: 6.53 },
  { m: "Feb", v: 6.07 },
  { m: "Mar", v: 6.45 },
  { m: "Abr", v: 9.15 },
  { m: "May", v: 9.51 },
  { m: "Jun", v: 8.76 },
];

function MiniSparkline({
  data,
  color,
}: {
  data: { m: string; v: number }[];
  color: string;
}) {
  return (
    <div className="h-10 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 4, right: 2, left: 2, bottom: 4 }}>
          <Tooltip
            contentStyle={{
              borderRadius: 6,
              border: "1px solid #e5e7eb",
              fontSize: 10,
              padding: "2px 6px",
            }}
            formatter={(v: number) => `${v.toFixed(2)}%`}
            labelFormatter={(l) => l as string}
          />
          <Line
            type="monotone"
            dataKey="v"
            stroke={color}
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function ParticipacionApp() {
  const items = [
    {
      label: "Facturas de venta",
      color: ALEGRA_GREEN,
      desc: "% de facturas totales (web + app) creadas desde la app móvil",
      series: facturasParticipSeries,
      chartUrl: "https://app.amplitude.com/analytics/alegra/chart/hltxo7ij",
    },
    {
      label: "Cotizaciones",
      color: "#0066FF",
      desc: "% de cotizaciones totales (web + app) creadas desde la app móvil",
      series: cotizacionesParticipSeries,
      chartUrl: "https://app.amplitude.com/analytics/alegra/chart/ndgvmi3v",
    },
    {
      label: "Remisiones",
      color: "#FF6B00",
      desc: "% de remisiones totales (web + app) creadas desde la app móvil",
      series: remisionesParticipSeries,
      chartUrl: "https://app.amplitude.com/analytics/alegra/chart/eosl7cg8",
    },
  ];

  return (
    <div>
      <h3 className="mb-1 text-base font-bold text-neutral-900">
        % de participación de app
      </h3>
      <p className="mb-4 text-xs text-neutral-500">
        Calculado con los <strong>eventos de AC</strong> (Acciones Críticas): documentos creados desde la app móvil sobre el total (web + app).
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => {
          // Valor actual = último mes (Junio); comparación vs enero.
          const value = it.series[it.series.length - 1].v;
          const firstValue = it.series[0].v;
          const delta = ((value - firstValue) / firstValue) * 100;
          const isUp = delta >= 0;
          return (
            <div
              key={it.label}
              className="rounded-2xl border bg-white p-6 shadow-sm"
              style={{ borderLeft: `4px solid ${it.color}` }}
            >
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4" style={{ color: it.color }} />
                <span
                  className="text-[10px] font-bold uppercase tracking-wider"
                  style={{ color: it.color }}
                >
                  {it.label}
                </span>
              </div>
              <p className="mt-2 text-xs text-neutral-500">{it.desc}</p>
              <p className="mt-3 text-4xl font-bold text-neutral-900">
                {value.toLocaleString("es-CO")}%
              </p>
              <p
                className={cn(
                  "mt-1 flex items-center gap-1 text-sm font-bold",
                  isUp ? "text-emerald-600" : "text-red-600",
                )}
              >
                {isUp ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                {isUp ? "+" : ""}{delta.toFixed(2)}%
                <span className="ml-1 text-[11px] font-medium text-neutral-500">vs Ene '26</span>
              </p>

              {/* Mini sparkline (solo línea) */}
              <div className="mt-3 border-t border-neutral-100 pt-2">
                <MiniSparkline data={it.series} color={it.color} />
                <div className="mt-1 flex items-center justify-between text-[10px] text-neutral-400">
                  <span>{it.series[0].m}</span>
                  <a
                    href={it.chartUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-neutral-700"
                  >
                    Amplitude ↗
                  </a>
                  <span>{it.series[it.series.length - 1].m}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


// === ICP: Pyme (emprendedor + independiente) / Contador ===
// Tendencia total = chart tkmdv3fe · Distribución = 8sxb4139 · Por país = zpmj4y3x. Ene → Jun '26.
const icpTrend = [
  { month: "Ene", PYME: 6147, CONTADOR: 183 },
  { month: "Feb", PYME: 6228, CONTADOR: 169 },
  { month: "Mar", PYME: 6568, CONTADOR: 201 },
  { month: "Abr", PYME: 7163, CONTADOR: 205 },
  { month: "May", PYME: 7676, CONTADOR: 245 },
  { month: "Jun", PYME: 7603, CONTADOR: 266 },
];

type IcpPerCountry = {
  country: string;
  short: string;
  color: string;
  PYME: { month: string; v: number }[];
  CONTADOR: { month: string; v: number }[];
};
const icpMonths = ["Ene", "Feb", "Mar", "Abr", "May", "Jun"];
const toIcpSeries = (vals: number[]) => vals.map((v, i) => ({ month: icpMonths[i], v }));
const icpPerCountry: IcpPerCountry[] = [
  {
    country: "Colombia",
    short: "CO",
    color: ALEGRA_GREEN,
    PYME: toIcpSeries([4057, 4141, 4318, 4715, 5010, 4914]),
    CONTADOR: toIcpSeries([96, 93, 103, 107, 129, 139]),
  },
  {
    country: "México",
    short: "MX",
    color: "#FF6B00",
    PYME: toIcpSeries([497, 499, 546, 596, 646, 681]),
    CONTADOR: toIcpSeries([24, 20, 29, 28, 35, 41]),
  },
  {
    country: "Costa Rica",
    short: "CR",
    color: "#06B6D4",
    PYME: toIcpSeries([171, 180, 182, 215, 245, 262]),
    CONTADOR: toIcpSeries([12, 9, 7, 8, 12, 12]),
  },
  {
    country: "Rep. Dominicana",
    short: "DOM",
    color: "#0066FF",
    PYME: toIcpSeries([853, 871, 936, 1008, 1115, 1103]),
    CONTADOR: toIcpSeries([43, 44, 55, 52, 57, 65]),
  },
];

const icpPieData = [
  { name: "PYME", value: 7603, color: ALEGRA_GREEN },
  { name: "CONTADOR", value: 266, color: "#FF6B00" },
];
const icpPieTotal = icpPieData.reduce((s, d) => s + d.value, 0);

function IcpView() {
  // Chips de perfil (controlan cards y gráfico de detalle) + país seleccionado.
  const [segment, setSegment] = useState<"both" | "PYME" | "CONTADOR">("both");
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  // Filtro del gráfico principal por card (Pyme / Contador).
  const [mainFilter, setMainFilter] = useState<"both" | "PYME" | "CONTADOR">("both");
  const showMainPyme = mainFilter === "both" || mainFilter === "PYME";
  const showMainContador = mainFilter === "both" || mainFilter === "CONTADOR";

  const last = icpTrend[icpTrend.length - 1];
  const first = icpTrend[0];
  const pymeDelta = (((last.PYME - first.PYME) / first.PYME) * 100).toFixed(1);
  const contadorDelta = (((last.CONTADOR - first.CONTADOR) / first.CONTADOR) * 100).toFixed(1);
  const pymeUp = Number(pymeDelta) >= 0;
  const contadorUp = Number(contadorDelta) >= 0;

  const showPyme = segment === "both" || segment === "PYME";
  const showContador = segment === "both" || segment === "CONTADOR";

  // Gráfico de detalle: agregado total (sin país) o series del país seleccionado.
  const filteredSeriesData = (() => {
    if (selectedCountry) {
      const c = icpPerCountry.find((p) => p.country === selectedCountry);
      if (!c) return icpTrend;
      return c.PYME.map((row, i) => ({ month: row.month, PYME: c.PYME[i].v, CONTADOR: c.CONTADOR[i].v }));
    }
    return icpTrend;
  })();

  return (
    <div className="space-y-10">
      {/* Tendencia por ICP (principal) + Distribución */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm md:p-8 lg:col-span-2">
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-neutral-900">
                MAC — Tendencia por ICP
              </h3>
              <p className="mt-1 text-xs text-neutral-500">
                Ene → Jun '26 · Pyme (emprendedor + independiente) vs Contador
              </p>
            </div>
            <div className="flex items-center gap-3">
              {mainFilter !== "both" && (
                <button
                  onClick={() => setMainFilter("both")}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-700 shadow-sm transition-all hover:border-neutral-400 hover:bg-neutral-50 hover:text-neutral-900"
                >
                  Limpiar filtro <span className="text-neutral-400">✕</span>
                </button>
              )}
              <a
                href="https://app.amplitude.com/analytics/alegra/chart/tkmdv3fe"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[11px] font-medium text-neutral-500 hover:text-neutral-900"
              >
                Amplitude <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <button
              onClick={() => setMainFilter(mainFilter === "PYME" ? "both" : "PYME")}
              className={cn(
                "rounded-xl border bg-white p-4 text-left transition-all hover:shadow-sm",
                mainFilter === "PYME" ? "ring-2 ring-offset-1" : "",
              )}
              style={{ borderLeft: `4px solid ${ALEGRA_GREEN}`, ["--tw-ring-color" as any]: ALEGRA_GREEN }}
            >
              <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">MAC Pyme</p>
              <p className="mt-1 text-2xl font-bold text-neutral-900">{last.PYME.toLocaleString("es-CO")}</p>
              <p className={cn("mt-1 flex items-center gap-1 text-xs font-bold", pymeUp ? "text-emerald-600" : "text-red-600")}>
                {pymeUp ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                {pymeUp ? "+" : ""}{pymeDelta}% vs Ene '26
              </p>
            </button>
            <button
              onClick={() => setMainFilter(mainFilter === "CONTADOR" ? "both" : "CONTADOR")}
              className={cn(
                "rounded-xl border bg-white p-4 text-left transition-all hover:shadow-sm",
                mainFilter === "CONTADOR" ? "ring-2 ring-offset-1" : "",
              )}
              style={{ borderLeft: `4px solid #FF6B00`, ["--tw-ring-color" as any]: "#FF6B00" }}
            >
              <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">MAC Contador</p>
              <p className="mt-1 text-2xl font-bold text-neutral-900">{last.CONTADOR.toLocaleString("es-CO")}</p>
              <p className={cn("mt-1 flex items-center gap-1 text-xs font-bold", contadorUp ? "text-emerald-600" : "text-red-600")}>
                {contadorUp ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                {contadorUp ? "+" : ""}{contadorDelta}% vs Ene '26
              </p>
            </button>
          </div>
          <div className="mt-6 h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={icpTrend} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="month" stroke="#6b7280" tick={{ fontSize: 12 }} axisLine={{ stroke: "#e5e7eb" }} tickLine={false} />
                <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => v.toLocaleString("es-CO")} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }} formatter={(v: number) => v.toLocaleString("es-CO")} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
                {showMainPyme && <Line type="monotone" dataKey="PYME" name="Pyme" stroke={ALEGRA_GREEN} strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />}
                {showMainContador && <Line type="monotone" dataKey="CONTADOR" name="Contador" stroke="#FF6B00" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribución */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-neutral-900">Distribución por ICP</h3>
              <p className="mt-1 text-xs text-neutral-500">Junio 2026</p>
            </div>
            <a
              href="https://app.amplitude.com/analytics/alegra/chart/8sxb4139"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[11px] font-medium text-neutral-500 hover:text-neutral-900"
            >
              Amplitude <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={icpPieData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={95} paddingAngle={3} label={(e: any) => `${e.name}: ${((e.value / icpPieTotal) * 100).toFixed(0)}%`}>
                  {icpPieData.map((e) => (
                    <Cell key={e.name} fill={e.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }}
                  formatter={(v: number) => `${v.toLocaleString("es-CO")} (${((v / icpPieTotal) * 100).toFixed(1)}%)`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-3 text-xs">
            {icpPieData.map((d) => (
              <div key={d.name} className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: d.color }} />
                <span className="font-semibold text-neutral-900">{d.name}</span>
                <span className="ml-auto text-neutral-600">{d.value.toLocaleString("es-CO")}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detalle por país */}
      <div>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-baseline gap-3">
            <h3 className="text-lg font-bold text-neutral-900">Detalle por país</h3>
            <span className="text-xs text-neutral-500">
              Click en una card para filtrar el gráfico de abajo
            </span>
          </div>
          <div className="flex items-center gap-3">
            {selectedCountry && (
              <button
                onClick={() => setSelectedCountry(null)}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-700 shadow-sm transition-all hover:border-neutral-400 hover:bg-neutral-50 hover:text-neutral-900"
              >
                Limpiar filtros <span className="text-neutral-400">✕</span>
              </button>
            )}
            <div className="inline-flex rounded-lg border border-neutral-200 bg-neutral-50 p-1">
              {([
                { id: "both", label: "Todos" },
                { id: "PYME", label: "Pyme" },
                { id: "CONTADOR", label: "Contador" },
              ] as const).map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSegment(opt.id)}
                  className={cn(
                    "rounded-md px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider transition-all",
                    segment === opt.id
                      ? "bg-white text-neutral-900 shadow-sm"
                      : "text-neutral-500 hover:text-neutral-700",
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {icpPerCountry.map((c) => {
            const seriesForCard = c.PYME.map((row, i) => {
              if (segment === "PYME") return row.v;
              if (segment === "CONTADOR") return c.CONTADOR[i].v;
              return row.v + c.CONTADOR[i].v;
            });
            const lastV = seriesForCard[seriesForCard.length - 1];
            const firstV = seriesForCard[0];
            const delta = ((lastV - firstV) / firstV) * 100;
            const up = delta >= 0;
            const isActive = selectedCountry === c.country;
            return (
              <button
                key={c.country}
                onClick={() => setSelectedCountry(isActive ? null : c.country)}
                className={cn(
                  "group rounded-2xl border bg-white px-4 py-3 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md",
                  isActive ? "ring-2 ring-offset-2" : "border-neutral-200",
                )}
                style={isActive ? { borderColor: c.color, ["--tw-ring-color" as any]: c.color } : { borderTop: `3px solid ${c.color}` }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                    {segment === "both" ? "Pyme + Contador" : segment === "PYME" ? "Pyme" : "Contador"}
                  </span>
                  {isActive && (
                    <span className="text-[10px] font-bold uppercase text-neutral-500">activo</span>
                  )}
                </div>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <span
                    className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white"
                    style={{ backgroundColor: c.color }}
                  >
                    {c.short}
                  </span>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 truncate">
                    {c.country}
                  </p>
                </div>
                <div className="mt-1.5 flex items-baseline justify-between gap-2">
                  <p className="text-2xl font-bold text-neutral-900">
                    {lastV.toLocaleString("es-CO")}
                  </p>
                  <p className={cn("flex items-center gap-1 text-xs font-bold", up ? "text-emerald-600" : "text-red-600")}>
                    {up ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                    {up ? "+" : ""}{delta.toFixed(1)}%
                  </p>
                </div>
                <p className="mt-0.5 text-[10px] font-medium text-neutral-400">vs Ene '26</p>
              </button>
            );
          })}
        </div>

        {/* Gráfico filtrado por segmento + país */}
        <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-neutral-900">
                MAC filtrado
                {selectedCountry && (
                  <span className="ml-2 text-xs font-medium text-neutral-500">· {selectedCountry}</span>
                )}
              </h3>
              <p className="mt-1 text-xs text-neutral-500">
                Filtra por perfil y país. Sin selección: agregado total.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://app.amplitude.com/analytics/alegra/chart/zpmj4y3x"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[11px] font-medium text-neutral-500 hover:text-neutral-900"
              >
                Amplitude <ExternalLink className="h-3 w-3" />
              </a>
              {selectedCountry && (
                <button
                  onClick={() => setSelectedCountry(null)}
                  className="text-[11px] font-semibold text-neutral-500 hover:text-neutral-900 underline"
                >
                  Limpiar país ✕
                </button>
              )}
            </div>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={filteredSeriesData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="month" stroke="#6b7280" tick={{ fontSize: 12 }} axisLine={{ stroke: "#e5e7eb" }} tickLine={false} />
                <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => v.toLocaleString("es-CO")} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }} formatter={(v: number) => v.toLocaleString("es-CO")} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
                {showPyme && (
                  <Line type="monotone" dataKey="PYME" name="Pyme" stroke={ALEGRA_GREEN} strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                )}
                {showContador && (
                  <Line type="monotone" dataKey="CONTADOR" name="Contador" stroke="#FF6B00" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section3() {
  const [tab, setTab] = useState<"negocio" | "icp" | "baseSos">("negocio");

  return (
    <div className="space-y-8">
      {/* Header bloque */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
            style={{ backgroundColor: `${ALEGRA_GREEN}15` }}
          >
            <Users className="h-5 w-5" style={{ color: ALEGRA_GREEN }} />
          </div>
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: ALEGRA_GREEN }}
            >
              Segmentación de usuarios
            </p>
            <h2 className="mt-1 text-2xl font-bold text-neutral-900">
              Base de usuarios
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              Analizamos a los usuarios pagos activos en la app desde dos lentes complementarios: por <strong>tipo de negocio</strong> (Core / Lite) y por <strong>comportamiento</strong> (Mobile First / Web First).
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="inline-flex flex-wrap rounded-lg border border-neutral-200 bg-neutral-50 p-1">
        <button
          onClick={() => setTab("negocio")}
          className={cn(
            "rounded-md px-4 py-2 text-xs font-semibold transition-all",
            tab === "negocio"
              ? "bg-white text-neutral-900 shadow-sm"
              : "text-neutral-500 hover:text-neutral-700",
          )}
        >
          CORE y LITE
        </button>
        <button
          onClick={() => setTab("icp")}
          className={cn(
            "rounded-md px-4 py-2 text-xs font-semibold transition-all",
            tab === "icp"
              ? "bg-white text-neutral-900 shadow-sm"
              : "text-neutral-500 hover:text-neutral-700",
          )}
        >
          ICP
        </button>
        <button
          onClick={() => setTab("baseSos")}
          className={cn(
            "rounded-md px-4 py-2 text-xs font-semibold transition-all",
            tab === "baseSos"
              ? "bg-white text-neutral-900 shadow-sm"
              : "text-neutral-500 hover:text-neutral-700",
          )}
        >
          Mobile First · Web First
        </button>
      </div>

      {tab === "baseSos" ? <BaseSosView /> : tab === "icp" ? <IcpView /> : <NegocioView />}
    </div>
  );
}

function BaseSosView() {
  return (
    <div className="space-y-8">
      {/* Cards SOS / BASE con % */}
      <div className="grid gap-5 md:grid-cols-2">
        {/* SOS */}
        <div
          className="relative overflow-hidden rounded-2xl border bg-white p-6 shadow-sm"
          style={{ borderTop: `4px solid #FF6B00` }}
        >
          <div className="flex items-start justify-between">
            <div>
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white"
                style={{ backgroundColor: "#FF6B00" }}
              >
                <AlertTriangle className="h-3 w-3" /> Web First
              </span>
              <h3 className="mt-3 text-xl font-bold text-neutral-900">
                Utilizan la app para una emergencia
              </h3>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold" style={{ color: "#FF6B00" }}>
                72%
              </p>
              <p className="text-[10px] uppercase tracking-wider text-neutral-500">
                de usuarios
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-neutral-700">
            Usuario que utiliza la <strong>web el +90%</strong> del tiempo y el restante utilizan la <strong>app para casos de emergencia</strong> con clientes, <strong>cuando no tienen el computador</strong> a la mano, o cuando quiere <strong>ver su estado del negocio</strong> de manera rápida.
          </p>
        </div>

        {/* BASE */}
        <div
          className="relative overflow-hidden rounded-2xl border bg-white p-6 shadow-sm"
          style={{ borderTop: `4px solid ${ALEGRA_GREEN}` }}
        >
          <div className="flex items-start justify-between">
            <div>
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white"
                style={{ backgroundColor: ALEGRA_GREEN }}
              >
                <Star className="h-3 w-3" /> Mobile First
              </span>
              <h3 className="mt-3 text-xl font-bold text-neutral-900">
                Utilizan la app como su principal herramienta
              </h3>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold" style={{ color: ALEGRA_GREEN }}>
                28%
              </p>
              <p className="text-[10px] uppercase tracking-wider text-neutral-500">
                de usuarios
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-neutral-700">
            Es un usuario que utiliza la <strong>app el 90%</strong> del tiempo para <strong>crear facturas</strong> y compartirlas, y llevar una <strong>leve gestión de su negocio</strong>. El % restante utiliza web para funcionalidades que sólo están en web.
          </p>
        </div>
      </div>

      {/* Cluster + Distribución por país (lado a lado) */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ClustersBubbles />
        </div>
        <BaseSosPorPais />
      </div>

      {/* MRR BASE - aporte real */}
      <MrrBaseSection />

    </div>
  );
}

// === MRR BASE — Q4-2025 vs Q1-2026 ===
const mrrBaseComparison = [
  { plan: "Core", q4: 32717, q1: 36733, variation: 12.27 },
  { plan: "Lite", q4: 39514, q1: 42455, variation: 7.44 },
];
const mrrBaseTotalVar = 9.63;
const mrrMixQ1 = [
  { name: "Core", value: 46.39, color: "#0066FF" },
  { name: "Lite", value: 53.61, color: "rgb(48,171,169)" },
];
const mrrMixVariation = [
  { plan: "Core", q4: 45.30, q1: 46.39, delta: 2.41 },
  { plan: "Lite", q4: 54.70, q1: 53.61, delta: -2.00 },
];

function MrrKpi({
  label,
  value,
  sub,
  delta,
  accent,
}: {
  label: string;
  value: string;
  sub?: string;
  delta?: number;
  accent: string;
}) {
  const positive = (delta ?? 0) >= 0;
  return (
    <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white px-4 py-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
      <div className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: accent }} />
      <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">{label}</p>
      <div className="mt-1.5 flex items-baseline justify-between gap-2 flex-wrap">
        <p className="text-2xl font-bold text-neutral-900">{value}</p>
        {typeof delta === "number" && (
          <div
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold",
              positive ? "bg-[#00C853]/10 text-[#00785A]" : "bg-[#FF6B00]/10 text-[#FF6B00]"
            )}
          >
            {positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {positive ? "+" : ""}
            {delta.toFixed(2)}%
          </div>
        )}
      </div>
      {sub && <p className="mt-0.5 text-[11px] text-neutral-500">{sub}</p>}
    </div>
  );
}

function MrrBaseSection() {
  return (
    <div>
      <div className="mb-5 flex items-baseline gap-3 flex-wrap">
        <h3 className="text-lg font-bold text-neutral-900">MRR BASE</h3>
        <span className="text-xs text-neutral-500">
          Aporte de MRR de los usuarios BASE — usan la app como su sistema principal, si la app cerrara dejarían de pagar
        </span>
      </div>

      {/* KPI hero cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MrrKpi label="MRR Total · Q1-2026" value="$79,189" sub="Promedio mensual" delta={mrrBaseTotalVar} accent="#00C853" />
        <MrrKpi label="MRR Total · Q4-2025" value="$72,231" sub="Promedio mensual" accent="#94A3B8" />
        <MrrKpi label="MRR Core · Q1-2026" value="$36,733" sub="46.39% del total" delta={12.27} accent="#0066FF" />
        <MrrKpi label="MRR Lite · Q1-2026" value="$42,455" sub="53.61% del total" delta={7.44} accent="rgb(48,171,169)" />
      </div>

      {/* Charts row */}
      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        {/* Comparativa Q4 vs Q1 */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm lg:col-span-3">
          <div className="flex items-baseline justify-between flex-wrap gap-2">
            <div>
              <h4 className="text-base font-bold text-neutral-900">Promedio MRR · Q4-2025 vs Q1-2026</h4>
              <p className="mt-1 text-xs text-neutral-500">Aporte mensual en USD por tipo de plan</p>
            </div>
            <div className="inline-flex items-center gap-1 rounded-full bg-[#00C853]/10 px-3 py-1 text-xs font-bold text-[#00785A]">
              <TrendingUp className="h-3 w-3" /> +9.63% total
            </div>
          </div>
          <div className="mt-4 h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mrrBaseComparison} margin={{ top: 24, right: 16, left: 8, bottom: 8 }} barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                <XAxis dataKey="plan" tick={{ fontSize: 12, fill: "#475569", fontWeight: 600 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip cursor={{ fill: "rgba(0,0,0,0.03)" }} formatter={(v: number) => `$${v.toLocaleString()}`} contentStyle={{ borderRadius: 12, border: "1px solid #E5E7EB", fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} iconType="circle" />
                <Bar dataKey="q4" name="Q4-2025" fill="#CBD5E1" radius={[8, 8, 0, 0]}>
                  <LabelList dataKey="q4" position="top" formatter={(v: number) => `$${v.toLocaleString()}`} style={{ fontSize: 11, fill: "#64748B", fontWeight: 600 }} />
                </Bar>
                <Bar dataKey="q1" name="Q1-2026" fill="#0066FF" radius={[8, 8, 0, 0]}>
                  <LabelList dataKey="q1" position="top" formatter={(v: number) => `$${v.toLocaleString()}`} style={{ fontSize: 11, fill: "#0066FF", fontWeight: 700 }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-3">
            {mrrBaseComparison.map((row) => (
              <div key={row.plan} className="flex items-center justify-between rounded-lg bg-neutral-50 px-3 py-2">
                <span className="text-xs font-semibold text-neutral-700">Variación {row.plan}</span>
                <span className="text-sm font-bold text-[#00C853]">+{row.variation}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mix Core / Lite */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm lg:col-span-2">
          <h4 className="text-base font-bold text-neutral-900">Mix MRR · Q1-2026</h4>
          <p className="mt-1 text-xs text-neutral-500">Distribución Core vs Lite del MRR BASE</p>
          <div className="relative mt-2 h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={mrrMixQ1} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={3} stroke="none">
                  {mrrMixQ1.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => `${v}%`} contentStyle={{ borderRadius: 12, border: "1px solid #E5E7EB", fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">Total Q1</span>
              <span className="text-lg font-bold text-neutral-900">$79.2k</span>
            </div>
          </div>
          <div className="space-y-2">
            {mrrMixVariation.map((row) => {
              const positive = row.delta >= 0;
              const color = row.plan === "Core" ? "#0066FF" : "rgb(48,171,169)";
              return (
                <div key={row.plan} className="flex items-center justify-between rounded-lg border border-neutral-100 px-3 py-2">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
                    <span className="text-xs font-semibold text-neutral-700">{row.plan}</span>
                    <span className="text-[11px] text-neutral-400">{row.q4}% → {row.q1}%</span>
                  </div>
                  <span className={cn("inline-flex items-center gap-1 text-xs font-bold", positive ? "text-[#00C853]" : "text-[#FF6B00]")}>
                    {positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {positive ? "+" : ""}
                    {row.delta}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Distribución por tipo de plan — BASE */}
      <PlanDistributionCard
        title="Distribución por tipo de plan · BASE"
        total={2787}
        data={planDistributionBaseSos}
      />
    </div>
  );
}

// === Distribución por tipo de plan ===
const planDistributionBaseSos = [
  { plan: "EMPRENDEDOR", count: 1166, pct: 41.84 },
  { plan: "PYME", count: 1051, pct: 37.71 },
  { plan: "PRO", count: 409, pct: 14.68 },
  { plan: "PLUS", count: 121, pct: 4.34 },
  { plan: "PREMIUM", count: 15, pct: 0.54 },
  { plan: "Plan Tienda", count: 13, pct: 0.47 },
  { plan: "Plan Standard", count: 7, pct: 0.25 },
  { plan: "Plan Starter", count: 3, pct: 0.11 },
  { plan: "MultiRFC Contado", count: 1, pct: 0.04 },
  { plan: "MultiCuenta Contado", count: 1, pct: 0.04 },
];

const planDistributionCoreLite = [
  { plan: "PYME", count: 2955, pct: 36.16 },
  { plan: "EMPRENDEDOR", count: 2423, pct: 29.65 },
  { plan: "PRO", count: 1747, pct: 21.38 },
  { plan: "PLUS", count: 788, pct: 9.64 },
  { plan: "PREMIUM", count: 167, pct: 2.04 },
  { plan: "Plan Tienda", count: 63, pct: 0.77 },
  { plan: "Plan Standard", count: 8, pct: 0.10 },
  { plan: "MultiCuenta Contado", count: 6, pct: 0.07 },
  { plan: "MultiRFC Contado", count: 6, pct: 0.07 },
  { plan: "Plan Starter", count: 7, pct: 0.09 },
  { plan: "Solo facturación E", count: 1, pct: 0.01 },
  { plan: "Plan Empresarial", count: 1, pct: 0.01 },
  { plan: "Plan básico", count: 1, pct: 0.01 },
];

const PLAN_COLORS = ["#0066FF", "rgb(48,171,169)", "#00C853", "#FF6B00", "#9333EA", "#F59E0B", "#EC4899", "#14B8A6", "#6366F1", "#84CC16", "#EF4444", "#0EA5E9", "#A855F7"];

function PlanDistributionCard({ title, subtitle, total, data }: { title: string; subtitle?: string; total: number; data: { plan: string; count: number; pct: number }[] }) {
  const maxPct = Math.max(...data.map((d) => d.pct));
  return (
    <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h4 className="text-base font-bold text-neutral-900">{title}</h4>
          {subtitle && <p className="mt-1 text-xs text-neutral-500">{subtitle}</p>}
        </div>
        <span className="text-xs font-semibold text-neutral-600">Total: {total.toLocaleString("es-CO")} usuarios</span>
      </div>
      <div className="mt-5 grid gap-6 lg:grid-cols-5">
        {/* Donut */}
        <div className="relative h-[240px] lg:col-span-2">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="pct" nameKey="plan" innerRadius={60} outerRadius={95} paddingAngle={2} stroke="none">
                {data.map((entry, i) => (
                  <Cell key={entry.plan} fill={PLAN_COLORS[i % PLAN_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(v: number, _n, p: any) => [`${v}% · ${p.payload.count.toLocaleString("es-CO")}`, p.payload.plan]}
                contentStyle={{ borderRadius: 12, border: "1px solid #E5E7EB", fontSize: 12 }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">Planes</span>
            <span className="text-lg font-bold text-neutral-900">{data.length}</span>
          </div>
        </div>
        {/* Lista barras */}
        <div className="space-y-2 lg:col-span-3">
          {data.map((row, i) => {
            const color = PLAN_COLORS[i % PLAN_COLORS.length];
            const widthPct = (row.pct / maxPct) * 100;
            return (
              <div key={row.plan} className="flex items-center gap-3">
                <span className="w-40 shrink-0 text-xs font-semibold text-neutral-700">{row.plan}</span>
                <div className="relative h-5 flex-1 rounded-md bg-neutral-100">
                  <div className="h-full rounded-md transition-all" style={{ width: `${widthPct}%`, backgroundColor: color }} />
                </div>
                <span className="w-24 shrink-0 text-right text-xs tabular-nums text-neutral-600">
                  {row.count.toLocaleString("es-CO")}
                </span>
                <span className="w-14 shrink-0 text-right text-xs font-bold tabular-nums text-neutral-900">{row.pct}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Distribución BASE / SOS por país (Junio 2026) - chart gdz0z6pc
// BASE = Cohort Mobile App Top Users · SOS = Cohort App Mobile SOS
const baseSosPorPaisData = [
  { country: "Colombia", short: "CO", BASE: 34, SOS: 66 },
  { country: "México", short: "MX", BASE: 18, SOS: 82 },
  { country: "Costa Rica", short: "CR", BASE: 20, SOS: 80 },
  { country: "Rep. Dominicana", short: "DOM", BASE: 18, SOS: 82 },
];

function BaseSosPorPais() {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-neutral-900">
            Distribución por país
          </h3>
          <p className="mt-1 text-xs text-neutral-500">% Mobile First vs Web First · Junio 2026</p>
        </div>
        <a
          href="https://app.amplitude.com/analytics/alegra/chart/gdz0z6pc"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[11px] font-medium text-neutral-500 hover:text-neutral-900"
        >
          Amplitude <ExternalLink className="h-3 w-3" />
        </a>
      </div>
      <div className="mt-4 space-y-3">
        {baseSosPorPaisData.map((c) => (
          <div key={c.country}>
            <div className="mb-1 flex items-center justify-between text-[11px]">
              <span className="font-semibold text-neutral-900">{c.country}</span>
              <span className="text-neutral-500">
                <span style={{ color: ALEGRA_GREEN }} className="font-bold">{c.BASE}%</span>
                <span className="mx-1 text-neutral-300">·</span>
                <span style={{ color: "#FF6B00" }} className="font-bold">{c.SOS}%</span>
              </span>
            </div>
            <div className="flex h-3 w-full overflow-hidden rounded-full bg-neutral-100">
              <div
                className="h-full"
                style={{ width: `${c.BASE}%`, backgroundColor: ALEGRA_GREEN }}
              />
              <div
                className="h-full"
                style={{ width: `${c.SOS}%`, backgroundColor: "#FF6B00" }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-center gap-4 text-[11px]">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: ALEGRA_GREEN }} />
          <span className="font-semibold text-neutral-700">Mobile First</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#FF6B00" }} />
          <span className="font-semibold text-neutral-700">Web First</span>
        </span>
      </div>
    </div>
  );
}

// === General: Q1 vs Q2 · Adopción y engagement por funcionalidad ===
const mesesQ = ["Ene", "Feb", "Mar", "Abr", "May", "Jun"];

// Adopción por funcionalidad — Q1 (chart yn056fo0, Marzo) vs Q2 (chart ptw2jzb4, Junio) '26
const adopcionQ1Q2Data = [
  { event: "Crear factura", Q1: 57.8, Q2: 58.8 },
  { event: "Buscar factura", Q1: 39.8, Q2: 39.9 },
  { event: "Ver gráfico de ventas", Q1: 31.4, Q2: 30.0 },
  { event: "Crear contacto", Q1: 27.8, Q2: 29.2 },
  { event: "Crear cotización", Q1: 27.8, Q2: 27.0 },
  { event: "Crear ítem", Q1: 22.5, Q2: 23.2 },
  { event: "Cuentas por cobrar", Q1: 15.5, Q2: 14.0 },
  { event: "Crear remisión", Q1: 3.6, Q2: 3.8 },
  { event: "Crear factura de proveedor", Q1: 2.7, Q2: 2.8 },
];

// Evolución mensual % adopción por funcionalidad (chart am4dj5wu, Ene → Jun '26)
const funcionalidadesMensual: MonthlyAdoptionSeries[] = [
  { num: 1, label: "Crear factura",              series: zip(mesesQ, [57.4, 57.9, 57.7, 57.3, 57.5, 58.6]) },
  { num: 2, label: "Buscar factura",             series: zip(mesesQ, [37.8, 37.4, 39.7, 38.1, 40.2, 39.8]) },
  { num: 6, label: "Ver gráfico de ventas",      series: zip(mesesQ, [31.5, 31.1, 31.3, 30.1, 30.4, 29.8]) },
  { num: 3, label: "Crear contacto",             series: zip(mesesQ, [28.1, 28.7, 27.7, 28.0, 29.2, 29.1]) },
  { num: 4, label: "Crear cotización",           series: zip(mesesQ, [27.4, 27.6, 27.7, 27.5, 27.8, 26.9]) },
  { num: 5, label: "Crear ítem",                 series: zip(mesesQ, [21.9, 22.7, 22.5, 22.4, 22.9, 23.1]) },
  { num: 7, label: "Cuentas por cobrar",         series: zip(mesesQ, [16.0, 15.2, 15.4, 15.0, 15.3, 13.9]) },
  { num: 8, label: "Crear remisión",             series: zip(mesesQ, [3.5, 3.6, 3.5, 3.7, 3.9, 3.8]) },
  { num: 9, label: "Crear factura de proveedor", series: zip(mesesQ, [2.9, 2.6, 2.7, 2.7, 2.8, 2.8]) },
];

// Engagement por funcionalidad (%MAU vs frecuencia) — Q1 (h7txos8w) y Q2 (q0wts3d9)
const engagementQ1General: EngagementEvent[] = [
  { num: 1, label: "Crear factura", adoption: 55.1, frequency: 25.7 },
  { num: 2, label: "Buscar factura", adoption: 32.4, frequency: 20.6 },
  { num: 3, label: "Crear contacto", adoption: 26.5, frequency: 7.0 },
  { num: 4, label: "Crear cotización", adoption: 26.5, frequency: 17.0 },
  { num: 5, label: "Crear ítem", adoption: 21.5, frequency: 8.0 },
  { num: 6, label: "Ver gráfico de ventas", adoption: 26.7, frequency: 8.2 },
  { num: 8, label: "Crear remisión", adoption: 3.4, frequency: 29.4 },
  { num: 9, label: "Crear factura de proveedor", adoption: 2.5, frequency: 9.7 },
  { num: 10, label: "Crear gasto", adoption: 2.1, frequency: 8.8 },
];
const engagementQ2General: EngagementEvent[] = [
  { num: 1, label: "Crear factura", adoption: 51.5, frequency: 22.6 },
  { num: 2, label: "Buscar factura", adoption: 31.2, frequency: 17.4 },
  { num: 3, label: "Crear contacto", adoption: 25.6, frequency: 5.5 },
  { num: 4, label: "Crear cotización", adoption: 23.7, frequency: 16.2 },
  { num: 5, label: "Crear ítem", adoption: 20.3, frequency: 7.4 },
  { num: 6, label: "Ver gráfico de ventas", adoption: 23.8, frequency: 8.7 },
  { num: 8, label: "Crear remisión", adoption: 3.3, frequency: 37.8 },
  { num: 9, label: "Crear factura de proveedor", adoption: 2.5, frequency: 7.6 },
  { num: 10, label: "Crear gasto", adoption: 2.0, frequency: 8.6 },
];

const generalFeatures = [
  "Crear factura",
  "Buscar factura",
  "Ver gráfico de ventas",
  "Crear contacto",
  "Crear cotización",
  "Crear ítem",
  "Cuentas por cobrar",
  "Crear remisión",
  "Crear factura de proveedor",
  "Crear gasto",
];

// === Uso (usuario único y eventos totales) por funcionalidad ===
// Filtros más importantes · datos reales de Amplitude (Ene → Jun '26)
const usoFeatures = ["Crear factura", "Crear contacto", "Crear cotización", "Crear ítem", "Crear remisión"];
const usoNumberFmt = (v: number) => v.toLocaleString("es-CO");

// General — Uso por usuario único (chart am4dj5wu)
const usoUnicoGeneral: Record<string, number[]> = {
  "Crear factura":    [4059, 4112, 4344, 4367, 4462, 4523],
  "Crear contacto":   [1984, 2040, 2089, 2135, 2269, 2247],
  "Crear cotización": [1940, 1962, 2086, 2093, 2155, 2079],
  "Crear ítem":       [1550, 1614, 1692, 1703, 1777, 1786],
  "Crear remisión":   [251, 257, 267, 284, 304, 292],
};
// General — Uso por eventos totales (chart wm943spe)
const usoTotalGeneral: Record<string, number[]> = {
  "Crear factura":    [98440, 101148, 111560, 101693, 104121, 102432],
  "Crear contacto":   [12204, 13084, 14715, 13417, 13688, 12275],
  "Crear cotización": [28536, 31704, 35449, 33033, 34260, 33661],
  "Crear ítem":       [12079, 13182, 13611, 14169, 13637, 13224],
  "Crear remisión":   [7112, 6987, 7844, 10989, 12128, 11027],
};
// Core/Lite — Uso por usuario único (chart p3r1xdm6)
const usoUnicoCoreLite: { CORE: Record<string, number[]>; LITE: Record<string, number[]> } = {
  CORE: {
    "Crear factura":    [1378, 1381, 1585, 1578, 1545, 1594],
    "Crear contacto":   [644, 670, 715, 703, 766, 749],
    "Crear cotización": [854, 878, 961, 972, 1004, 966],
    "Crear ítem":       [423, 475, 542, 508, 570, 519],
    "Crear remisión":   [154, 152, 152, 175, 181, 171],
  },
  LITE: {
    "Crear factura":    [2671, 2736, 2952, 2801, 2917, 2909],
    "Crear contacto":   [1322, 1355, 1411, 1423, 1491, 1485],
    "Crear cotización": [1075, 1087, 1234, 1119, 1151, 1103],
    "Crear ítem":       [1105, 1125, 1181, 1181, 1198, 1237],
    "Crear remisión":   [97, 107, 123, 109, 121, 120],
  },
};
// Core/Lite — Uso por eventos totales (chart tzgr6hf6)
const usoTotalCoreLite: { CORE: Record<string, number[]>; LITE: Record<string, number[]> } = {
  CORE: {
    "Crear factura":    [64682, 63030, 72388, 66734, 67713, 66876],
    "Crear contacto":   [6191, 7152, 7691, 7157, 6851, 6023],
    "Crear cotización": [19822, 23189, 26097, 24832, 25320, 25174],
    "Crear ítem":       [3281, 3776, 3997, 3800, 3940, 3822],
    "Crear remisión":   [6165, 5890, 6720, 9883, 11062, 9952],
  },
  LITE: {
    "Crear factura":    [33289, 36926, 38643, 34626, 36088, 35140],
    "Crear contacto":   [5906, 5835, 6838, 6214, 6723, 6063],
    "Crear cotización": [8659, 8478, 9329, 8160, 8847, 8402],
    "Crear ítem":       [8380, 9116, 9498, 10260, 9395, 9099],
    "Crear remisión":   [947, 1097, 1120, 1102, 1063, 1071],
  },
};

// Variación vs el primer dato de una serie
function deltaVsFirst(first: number, last: number) {
  if (!first) return 0;
  return ((last - first) / first) * 100;
}

// Card compacta de variación (primer dato → último)
function VariationCard({ label, first, last, fmt, color }: {
  label: string; first: number; last: number; fmt: (v: number) => string; color?: string;
}) {
  const d = deltaVsFirst(first, last);
  const up = d >= 0;
  return (
    <div className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50/70 px-3 py-2">
      {color && <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: color }} />}
      <div className="min-w-0">
        <p className="truncate text-[10px] font-bold uppercase tracking-wider text-neutral-500">{label}</p>
        <p className="text-xs text-neutral-600">{fmt(first)} → <span className="font-bold text-neutral-900">{fmt(last)}</span></p>
      </div>
      <span className={cn("ml-auto inline-flex shrink-0 items-center gap-1 text-xs font-bold", up ? "text-emerald-600" : "text-red-600")}>
        {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
        {up ? "+" : ""}{d.toFixed(1)}%
      </span>
    </div>
  );
}

// Tooltip que además del valor muestra la variación vs el primer dato de cada serie
function DeltaTooltip({ active, payload, label, firsts, fmt }: {
  active?: boolean; payload?: any[]; label?: string;
  firsts: Record<string, number>; fmt: (v: number) => string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-neutral-200 bg-white px-3 py-2 shadow-sm">
      <p className="mb-1 text-xs font-semibold text-neutral-700">{label}</p>
      <div className="space-y-0.5">
        {payload.map((p) => {
          const first = firsts[p.dataKey] ?? p.value;
          const d = deltaVsFirst(first, p.value);
          return (
            <div key={p.dataKey} className="flex items-center gap-2 text-xs">
              <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: p.color }} />
              <span className="text-neutral-600">{p.name ?? p.dataKey}</span>
              <span className="ml-auto font-bold text-neutral-900">{fmt(p.value)}</span>
              <span className={cn("shrink-0 font-semibold", d >= 0 ? "text-emerald-600" : "text-red-600")}>
                {d >= 0 ? "+" : ""}{d.toFixed(1)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Chips Adopción / Uso
function AdopcionUsoChips({ view, onChange }: { view: "adopcion" | "uso"; onChange: (v: "adopcion" | "uso") => void }) {
  return (
    <div className="inline-flex rounded-lg border border-neutral-200 bg-neutral-50 p-1">
      {(["adopcion", "uso"] as const).map((v) => (
        <button
          key={v}
          onClick={() => onChange(v)}
          className={cn(
            "rounded-md px-5 py-2 text-xs font-semibold transition-all",
            view === v ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500 hover:text-neutral-700",
          )}
        >
          {v === "adopcion" ? "Adopción" : "Uso"}
        </button>
      ))}
    </div>
  );
}

// Chart de uso (General): una línea por funcionalidad
function UsoFeatureChart({ title, subtitle, url, dataByFeature, active }: {
  title: string; subtitle: string; url: string;
  dataByFeature: Record<string, number[]>; active: string | null;
}) {
  const feats = active ? usoFeatures.filter((f) => f === active) : usoFeatures;
  const rows = mesesQ.map((m, i) => {
    const row: Record<string, string | number> = { month: m };
    feats.forEach((f) => { row[f] = dataByFeature[f][i]; });
    return row;
  });
  const firsts: Record<string, number> = {};
  feats.forEach((f) => { firsts[f] = dataByFeature[f][0]; });
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white px-6 pt-5 pb-2 shadow-sm">
      <div className="mb-2 flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h4 className="text-base font-bold text-neutral-900">{title}</h4>
          <p className="mt-0.5 text-xs text-neutral-500">{subtitle}</p>
        </div>
        <AmplitudeLink href={url} />
      </div>
      {active && (
        <div className="mb-3 max-w-xs">
          <VariationCard
            label={active}
            first={dataByFeature[active][0]}
            last={dataByFeature[active][dataByFeature[active].length - 1]}
            fmt={usoNumberFmt}
            color={colorForEvent(active)}
          />
        </div>
      )}
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={rows} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis dataKey="month" stroke="#6b7280" tick={{ fontSize: 11 }} axisLine={{ stroke: "#e5e7eb" }} tickLine={false} />
            <YAxis stroke="#6b7280" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={usoNumberFmt} width={48} />
            <Tooltip content={(p) => <DeltaTooltip {...(p as any)} firsts={firsts} fmt={usoNumberFmt} />} />
            <Legend iconType="circle" wrapperStyle={{ fontSize: 10, paddingTop: 8 }} />
            {feats.map((f) => (
              <Line key={f} type="monotone" dataKey={f} stroke={colorForEvent(f)} strokeWidth={feats.length === 1 ? 3 : 2} dot={{ r: feats.length === 1 ? 4 : 2 }} activeDot={{ r: 6 }} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Chart de uso (Core/Lite): CORE vs LITE, suma sobre las funcionalidades seleccionadas
function UsoCoreLiteChart({ title, subtitle, url, data, active }: {
  title: string; subtitle: string; url: string;
  data: { CORE: Record<string, number[]>; LITE: Record<string, number[]> }; active: string | null;
}) {
  const feats = active ? [active] : usoFeatures;
  const rows = mesesQ.map((m, i) => ({
    month: m,
    CORE: feats.reduce((s, f) => s + data.CORE[f][i], 0),
    LITE: feats.reduce((s, f) => s + data.LITE[f][i], 0),
  }));
  const firsts = { CORE: rows[0].CORE, LITE: rows[0].LITE };
  const lasts = rows[rows.length - 1];
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white px-6 pt-5 pb-2 shadow-sm">
      <div className="mb-2 flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h4 className="text-base font-bold text-neutral-900">{title}</h4>
          <p className="mt-0.5 text-xs text-neutral-500">{subtitle} · {active ?? "Todas las funcionalidades"}</p>
        </div>
        <AmplitudeLink href={url} />
      </div>
      <div className="mb-3 grid gap-2 sm:grid-cols-2">
        <VariationCard label="Core" first={firsts.CORE} last={lasts.CORE} fmt={usoNumberFmt} color={ALEGRA_GREEN} />
        <VariationCard label="Lite" first={firsts.LITE} last={lasts.LITE} fmt={usoNumberFmt} color="#FF6B00" />
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={rows} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis dataKey="month" stroke="#6b7280" tick={{ fontSize: 11 }} axisLine={{ stroke: "#e5e7eb" }} tickLine={false} />
            <YAxis stroke="#6b7280" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={usoNumberFmt} width={48} />
            <Tooltip content={(p) => <DeltaTooltip {...(p as any)} firsts={firsts} fmt={usoNumberFmt} />} />
            <Legend iconType="circle" wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
            <Line type="monotone" dataKey="CORE" name="Core" stroke={ALEGRA_GREEN} strokeWidth={3} dot={{ r: 3 }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="LITE" name="Lite" stroke="#FF6B00" strokeWidth={3} dot={{ r: 3 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function ComportamientoGeneralView() {
  const [view, setView] = useState<"adopcion" | "uso">("adopcion");
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [usoFeature, setUsoFeature] = useState<string | null>(null);

  const barData = activeFeature ? adopcionQ1Q2Data.filter((d) => d.event === activeFeature) : adopcionQ1Q2Data;
  const mensualSeries = activeFeature ? funcionalidadesMensual.filter((s) => s.label === activeFeature) : funcionalidadesMensual;
  const mensualRows = mesesQ.map((m, i) => {
    const row: Record<string, string | number> = { month: m };
    mensualSeries.forEach((s) => { row[s.label] = s.series[i].pct; });
    return row;
  });
  const mensualFirsts: Record<string, number> = {};
  mensualSeries.forEach((s) => { mensualFirsts[s.label] = s.series[0].pct; });
  const pctFmt1 = (v: number) => `${Number(v).toFixed(1)}%`;
  const engQ1 = activeFeature ? engagementQ1General.filter((e) => e.label === activeFeature) : engagementQ1General;
  const engQ2 = activeFeature ? engagementQ2General.filter((e) => e.label === activeFeature) : engagementQ2General;

  return (
    <div className="space-y-6">
      <AdopcionUsoChips view={view} onChange={setView} />

      {view === "uso" ? (
        <div className="space-y-6">
          <FeatureTagFilter
            features={usoFeatures}
            active={usoFeature}
            onChange={setUsoFeature}
            description="Filtra los charts de uso por funcionalidad."
          />
          <UsoFeatureChart
            title="Uso por usuario único"
            subtitle="Usuarios únicos por funcionalidad · Ene → Jun '26"
            url="https://app.amplitude.com/analytics/alegra/chart/am4dj5wu?linkingDashboardId=js3lbrd0&sharingId=rJY0OQs4"
            dataByFeature={usoUnicoGeneral}
            active={usoFeature}
          />
          <UsoFeatureChart
            title="Uso por eventos totales"
            subtitle="Eventos totales por funcionalidad · Ene → Jun '26"
            url="https://app.amplitude.com/analytics/alegra/chart/wm943spe?linkingDashboardId=js3lbrd0&sharingId=NHVjYnUZ"
            dataByFeature={usoTotalGeneral}
            active={usoFeature}
          />
        </div>
      ) : (
      <div className="space-y-6">
      <FeatureTagFilter
        features={generalFeatures}
        active={activeFeature}
        onChange={setActiveFeature}
        description="Filtra todas las gráficas por funcionalidad."
      />

      {/* Adopción por funcionalidad — Q1 vs Q2 */}
      <div className="rounded-2xl border border-neutral-200 bg-white px-6 pt-5 pb-2 shadow-sm">
        <div className="mb-2 flex items-start justify-between gap-3 flex-wrap">
          <div>
            <h4 className="text-base font-bold text-neutral-900">
              Adopción por funcionalidad — Q1 vs Q2
            </h4>
            <p className="mt-0.5 text-xs text-neutral-500">
              % de adopción por funcionalidad · Q1 (Marzo) vs Q2 (Junio) 2026
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://app.amplitude.com/analytics/alegra/chart/yn056fo0" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[11px] font-medium text-neutral-500 hover:text-neutral-900">
              Q1 <ExternalLink className="h-3 w-3" />
            </a>
            <a href="https://app.amplitude.com/analytics/alegra/chart/ptw2jzb4" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[11px] font-medium hover:underline" style={{ color: ALEGRA_GREEN }}>
              Q2 <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
        {activeFeature && barData[0] && (
          <div className="mb-3 max-w-xs">
            <VariationCard
              label={`${activeFeature} · Q1 → Q2`}
              first={barData[0].Q1}
              last={barData[0].Q2}
              fmt={pctFmt1}
              color={ALEGRA_GREEN}
            />
          </div>
        )}
        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="event" stroke="#6b7280" tick={{ fontSize: 10 }} interval={0} angle={-30} textAnchor="end" height={70} />
              <YAxis stroke="#6b7280" tick={{ fontSize: 10 }} tickFormatter={(v) => `${v}%`} />
              <Tooltip content={(p: any) => {
                if (!p.active || !p.payload?.length) return null;
                const q1 = p.payload.find((x: any) => x.dataKey === "Q1")?.value;
                const q2 = p.payload.find((x: any) => x.dataKey === "Q2")?.value;
                const d = deltaVsFirst(q1, q2);
                return (
                  <div className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-xs shadow-sm">
                    <p className="mb-1 font-semibold text-neutral-700">{p.label}</p>
                    <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: "#CBD5E1" }} /><span className="text-neutral-600">Q1 (Mar)</span><span className="ml-auto font-bold text-neutral-900">{q1?.toFixed(1)}%</span></div>
                    <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: ALEGRA_GREEN }} /><span className="text-neutral-600">Q2 (Jun)</span><span className="ml-auto font-bold text-neutral-900">{q2?.toFixed(1)}%</span></div>
                    <div className={cn("mt-1 font-semibold", d >= 0 ? "text-emerald-600" : "text-red-600")}>{d >= 0 ? "+" : ""}{d.toFixed(1)}% Q2 vs Q1</div>
                  </div>
                );
              }} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 11, paddingTop: 0 }} />
              <Bar dataKey="Q1" name="Q1 (Mar)" fill="#CBD5E1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Q2" name="Q2 (Jun)" fill={ALEGRA_GREEN} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Evolución mensual por funcionalidad */}
      <div className="rounded-2xl border border-neutral-200 bg-white px-6 pt-5 pb-2 shadow-sm">
        <div className="mb-2 flex items-start justify-between gap-3 flex-wrap">
          <div>
            <h4 className="text-base font-bold text-neutral-900">
              Funcionalidades — % adopción mensual
            </h4>
            <p className="mt-0.5 text-xs text-neutral-500">
              % de usuarios activos por funcionalidad · Ene → Jun '26
            </p>
          </div>
          <a href="https://app.amplitude.com/analytics/alegra/chart/am4dj5wu" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[11px] font-medium text-neutral-500 hover:text-neutral-900">
            Amplitude <ExternalLink className="h-3 w-3" />
          </a>
        </div>
        {activeFeature && (
          <div className="mb-3 max-w-xs">
            <VariationCard
              label={activeFeature}
              first={mensualFirsts[activeFeature]}
              last={mensualSeries[0].series[mensualSeries[0].series.length - 1].pct}
              fmt={pctFmt1}
              color={colorForEvent(activeFeature)}
            />
          </div>
        )}
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mensualRows} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="month" stroke="#6b7280" tick={{ fontSize: 11 }} axisLine={{ stroke: "#e5e7eb" }} tickLine={false} />
              <YAxis stroke="#6b7280" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
              <Tooltip content={(p) => <DeltaTooltip {...(p as any)} firsts={mensualFirsts} fmt={pctFmt1} />} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 10, paddingTop: 8 }} />
              {mensualSeries.map((s) => (
                <Line
                  key={s.label}
                  type="monotone"
                  dataKey={s.label}
                  stroke={colorForEvent(s.label)}
                  strokeWidth={mensualSeries.length === 1 ? 3 : 2}
                  dot={{ r: mensualSeries.length === 1 ? 4 : 2 }}
                  activeDot={{ r: 6 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Engagement por funcionalidad — Q1 vs Q2 */}
      <div className="grid gap-6 xl:grid-cols-2">
        <EngagementScatterSegment
          segment="Q1 · Marzo"
          events={engQ1}
          accent="#94A3B8"
          chartUrl="https://app.amplitude.com/analytics/alegra/chart/h7txos8w"
        />
        <EngagementScatterSegment
          segment="Q2 · Junio"
          events={engQ2}
          accent={ALEGRA_GREEN}
          chartUrl="https://app.amplitude.com/analytics/alegra/chart/q0wts3d9"
        />
      </div>
      </div>
      )}
    </div>
  );
}

function SectionComportamiento() {
  const [tab, setTab] = useState<"general" | "coreLite" | "baseSos">("general");

  return (
    <div className="space-y-8">
      {/* Header bloque */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
            style={{ backgroundColor: `${ALEGRA_GREEN}15` }}
          >
            <Star className="h-5 w-5" style={{ color: ALEGRA_GREEN }} />
          </div>
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: ALEGRA_GREEN }}
            >
              Adopción y engagement
            </p>
            <h2 className="mt-1 text-2xl font-bold text-neutral-900">
              Comportamiento de usuarios
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              Cómo se relacionan los usuarios con las funcionalidades de la app, segmentado por <strong>Negocio (Core / Lite)</strong> y por <strong>Comportamiento (Mobile First / Web First)</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="inline-flex flex-wrap rounded-lg border border-neutral-200 bg-neutral-50 p-1">
        <button
          onClick={() => setTab("general")}
          className={cn(
            "rounded-md px-4 py-2 text-xs font-semibold transition-all",
            tab === "general"
              ? "bg-white text-neutral-900 shadow-sm"
              : "text-neutral-500 hover:text-neutral-700",
          )}
        >
          General
        </button>
        <button
          onClick={() => setTab("coreLite")}
          className={cn(
            "rounded-md px-4 py-2 text-xs font-semibold transition-all",
            tab === "coreLite"
              ? "bg-white text-neutral-900 shadow-sm"
              : "text-neutral-500 hover:text-neutral-700",
          )}
        >
          CORE y LITE
        </button>
        <button
          onClick={() => setTab("baseSos")}
          className={cn(
            "rounded-md px-4 py-2 text-xs font-semibold transition-all",
            tab === "baseSos"
              ? "bg-white text-neutral-900 shadow-sm"
              : "text-neutral-500 hover:text-neutral-700",
          )}
        >
          Mobile First · Web First
        </button>
      </div>

      {tab === "general" ? (
        <ComportamientoGeneralView />
      ) : tab === "coreLite" ? (
        <ComportamientoCoreLiteView />
      ) : (
        <ComportamientoBaseSosView />
      )}
    </div>
  );
}

// Componente reutilizable: filtro de tags por funcionalidad
function FeatureTagFilter({
  features,
  active,
  onChange,
  description,
}: {
  features: string[];
  active: string | null;
  onChange: (label: string | null) => void;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h4 className="text-sm font-bold text-neutral-900">
            Filtrar por funcionalidad
          </h4>
          <p className="mt-0.5 text-xs text-neutral-500">{description}</p>
        </div>
        {active && (
          <button
            onClick={() => onChange(null)}
            className="rounded-full border border-neutral-300 px-3 py-1 text-[11px] font-medium text-neutral-600 hover:bg-neutral-50"
          >
            Limpiar filtro
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {features.map((label) => {
          const isActive = active === label;
          const c = colorForEvent(label);
          return (
            <button
              key={label}
              onClick={() => onChange(isActive ? null : label)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium transition-all",
                isActive
                  ? "text-white shadow-sm"
                  : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300",
              )}
              style={
                isActive
                  ? { backgroundColor: c, borderColor: c }
                  : { borderLeftColor: c, borderLeftWidth: 3 }
              }
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: isActive ? "rgba(255,255,255,0.9)" : c }}
              />
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ComportamientoCoreLiteView() {
  const [view, setView] = useState<"adopcion" | "uso">("adopcion");
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [usoFeature, setUsoFeature] = useState<string | null>(null);
  const coreLiteFeatures = adopcionCoreLiteData.map((d) => d.event);

  const filteredCoreEvents = activeFeature
    ? coreEvents.filter((e) => e.label === activeFeature)
    : coreEvents;
  const filteredLiteEvents = activeFeature
    ? liteEvents.filter((e) => e.label === activeFeature)
    : liteEvents;
  const barData = activeFeature
    ? adopcionCoreLiteData.filter((d) => d.event === activeFeature)
    : adopcionCoreLiteData;

  return (
    <div className="space-y-6">
      <AdopcionUsoChips view={view} onChange={setView} />

      {view === "uso" ? (
        <div className="space-y-6">
          <FeatureTagFilter
            features={usoFeatures}
            active={usoFeature}
            onChange={setUsoFeature}
            description="Filtra los charts de uso por funcionalidad."
          />
          <UsoCoreLiteChart
            title="Uso por usuario único"
            subtitle="Usuarios únicos · CORE vs LITE · Ene → Jun '26"
            url="https://app.amplitude.com/analytics/alegra/chart/p3r1xdm6?linkingDashboardId=pfrft6zo&sharingId=IZt_IfX2"
            data={usoUnicoCoreLite}
            active={usoFeature}
          />
          <UsoCoreLiteChart
            title="Uso por eventos totales"
            subtitle="Eventos totales · CORE vs LITE · Ene → Jun '26"
            url="https://app.amplitude.com/analytics/alegra/chart/tzgr6hf6?linkingDashboardId=pfrft6zo&sharingId=3fOi-vLG"
            data={usoTotalCoreLite}
            active={usoFeature}
          />
        </div>
      ) : (
      <div className="space-y-6">
      <FeatureTagFilter
        features={coreLiteFeatures}
        active={activeFeature}
        onChange={setActiveFeature}
        description="Filtra las gráficas de adopción por funcionalidad."
      />

      {/* Adopción funcionalidades CORE vs LITE - barras VERTICALES */}
      <div className="rounded-2xl border border-neutral-200 bg-white px-6 pt-5 pb-2 shadow-sm">
        <div className="mb-2 flex items-start justify-between gap-3 flex-wrap">
          <div>
            <h4 className="text-base font-bold text-neutral-900">
              Adopción funcionalidades — Uniques Mensual CORE vs LITE
            </h4>
            <p className="mt-0.5 text-xs text-neutral-500">
              % de adopción por funcionalidad · Junio 2026
            </p>
          </div>
          <AmplitudeLink href="https://app.amplitude.com/analytics/alegra/chart/g3xjg09o?linkingDashboardId=pfrft6zo&source=dashboard" />
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis
                dataKey="event"
                stroke="#6b7280"
                tick={{ fontSize: 10 }}
                interval={0}
                angle={-30}
                textAnchor="end"
                height={60}
              />
              <YAxis
                stroke="#6b7280"
                tick={{ fontSize: 10 }}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }}
                formatter={(v: number) => `${v.toFixed(1)}%`}
              />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 11, paddingTop: 0 }} />
              <Bar dataKey="CORE" fill={ALEGRA_GREEN} radius={[4, 4, 0, 0]} />
              <Bar dataKey="LITE" fill="#FF6B00" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Funcionalidades — Uniques Mensual % CORE & LITE */}
      <FuncionalidadesUniquesShared
        core={coreMonthlyAdoption}
        lite={liteMonthlyAdoption}
        active={activeFeature}
        onChangeActive={setActiveFeature}
        hideTags
      />

      {/* Engagement scatter CORE / LITE */}
      <div className="grid gap-6 xl:grid-cols-2">
        <EngagementScatterSegment
          segment="CORE"
          events={filteredCoreEvents}
          accent={ALEGRA_GREEN}
          chartUrl="https://app.amplitude.com/analytics/alegra/chart/8bsh2x62"
        />
        <EngagementScatterSegment
          segment="LITE"
          events={filteredLiteEvents}
          accent="#FF6B00"
          chartUrl="https://app.amplitude.com/analytics/alegra/chart/jtbzs8ce"
        />
      </div>
      </div>
      )}
    </div>
  );
}

function ComportamientoBaseSosView() {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  const allFeatures = Array.from(
    new Set([
      ...baseEvents.map((e) => e.label),
      ...sosEvents.map((e) => e.label),
      ...adopcionBaseSosData.map((d) => d.event),
    ]),
  );

  const filteredAdopcion = activeFeature
    ? adopcionBaseSosData.filter((d) => d.event === activeFeature)
    : adopcionBaseSosData;
  const filteredBase = activeFeature
    ? baseEvents.filter((e) => e.label === activeFeature)
    : baseEvents;
  const filteredSos = activeFeature
    ? sosEvents.filter((e) => e.label === activeFeature)
    : sosEvents;

  const visibleBaseMonthly = activeFeature ? baseMonthlyAdoption.filter((s) => s.label === activeFeature) : baseMonthlyAdoption;
  const visibleSosMonthly = activeFeature ? sosMonthlyAdoption.filter((s) => s.label === activeFeature) : sosMonthlyAdoption;
  const toMonthlyRows = (series: MonthlyAdoptionSeries[]) =>
    months7.map((m, i) => {
      const row: Record<string, string | number> = { month: m };
      series.forEach((s) => { row[s.label] = s.series[i]?.pct ?? 0; });
      return row;
    });

  return (
    <div className="space-y-6">
      <FeatureTagFilter
        features={allFeatures}
        active={activeFeature}
        onChange={setActiveFeature}
        description="Selecciona un tag para filtrar los gráficos de adopción y engagement Mobile First / Web First"
      />

      {/* Adopción funcionalidades Mobile First vs Web First */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="mb-3 flex items-start justify-between gap-3 flex-wrap">
          <div>
            <h4 className="text-base font-bold text-neutral-900">
              Adopción funcionalidades — Uniques Mensual Mobile First vs Web First
            </h4>
            <p className="mt-1 text-xs text-neutral-500">
              % de adopción por funcionalidad · Junio 2026 · Cohort Mobile First vs Cohort Web First
            </p>
          </div>
          <a
            href="https://app.amplitude.com/analytics/alegra/chart/aq7o241v"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] font-medium text-neutral-500 hover:text-neutral-900"
          >
            Amplitude <ExternalLink className="h-3 w-3" />
          </a>
        </div>
        <div className="h-[360px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={filteredAdopcion} layout="vertical" margin={{ top: 5, right: 16, left: 130, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
              <XAxis type="number" stroke="#6b7280" tick={{ fontSize: 10 }} tickFormatter={(v) => `${v}%`} />
              <YAxis dataKey="event" type="category" stroke="#6b7280" tick={{ fontSize: 10 }} width={130} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }} formatter={(v: number) => `${v.toFixed(1)}%`} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 11, paddingTop: 4 }} />
              <Bar dataKey="BASE" name="Mobile First" fill={ALEGRA_GREEN} radius={[0, 4, 4, 0]} />
              <Bar dataKey="SOS" name="Web First" fill="#FF6B00" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Funcionalidades — Uniques Mensual Mobile First / Web First */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="mb-3 flex items-start justify-between gap-3 flex-wrap">
          <div>
            <h4 className="text-base font-bold text-neutral-900">
              Funcionalidades — Uniques Mensual Mobile First vs Web First
            </h4>
            <p className="mt-1 text-xs text-neutral-500">
              % de adopción mensual por funcionalidad · Ene → Jul '26
            </p>
          </div>
          <a
            href="https://app.amplitude.com/analytics/alegra/chart/aq7o241v/edit/8b1x1p75"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] font-medium text-neutral-500 hover:text-neutral-900"
          >
            Amplitude <ExternalLink className="h-3 w-3" />
          </a>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <UniquesPctChart segment="Mobile First" accent={ALEGRA_GREEN} data={toMonthlyRows(visibleBaseMonthly)} series={visibleBaseMonthly} />
          <UniquesPctChart segment="Web First" accent="#FF6B00" data={toMonthlyRows(visibleSosMonthly)} series={visibleSosMonthly} />
        </div>
      </div>

      {/* Engagement scatter BASE / SOS */}
      <div className="grid gap-6 xl:grid-cols-2">
        <EngagementScatterSegment
          segment="Mobile First"
          events={filteredBase}
          accent={ALEGRA_GREEN}
          chartUrl="https://app.amplitude.com/analytics/alegra/chart/no1u7db2"
        />
        <EngagementScatterSegment
          segment="Web First"
          events={filteredSos}
          accent="#FF6B00"
          chartUrl="https://app.amplitude.com/analytics/alegra/chart/ezbhdx9r"
        />
      </div>
    </div>
  );
}

// === Negocio: Core / Lite ===

// Chart wy27awa1 (MAC Tendencia Core y Lite), Ene → Jun '26.
const macCoreLiteTrend = [
  { month: "Ene", CORE: 4209, LITE: 2957 },
  { month: "Feb", CORE: 4242, LITE: 2980 },
  { month: "Mar", CORE: 4713, LITE: 3324 },
  { month: "Abr", CORE: 4646, LITE: 3618 },
  { month: "May", CORE: 5039, LITE: 3820 },
  { month: "Jun", CORE: 4970, LITE: 3792 },
];

// MAC por país (CORE / LITE) — Ene → Jun '26. Fuente: chart jgmbk3gb.
type CoreLitePerCountry = {
  country: string;
  short: string;
  color: string;
  CORE: { month: string; v: number }[];
  LITE: { month: string; v: number }[];
};
const coreLiteMonths = ["Ene", "Feb", "Mar", "Abr", "May", "Jun"];
const toSeries = (vals: number[]) => vals.map((v, i) => ({ month: coreLiteMonths[i], v }));
const macCoreLitePerCountry: CoreLitePerCountry[] = [
  {
    country: "Colombia",
    short: "CO",
    color: ALEGRA_GREEN,
    CORE: toSeries([2672, 2738, 3005, 2978, 3166, 3075]),
    LITE: toSeries([1931, 1944, 2104, 2312, 2454, 2400]),
  },
  {
    country: "México",
    short: "MX",
    color: "#FF6B00",
    CORE: toSeries([352, 360, 419, 412, 454, 485]),
    LITE: toSeries([269, 258, 318, 349, 351, 379]),
  },
  {
    country: "Costa Rica",
    short: "CR",
    color: "#06B6D4",
    CORE: toSeries([112, 120, 129, 137, 169, 176]),
    LITE: toSeries([102, 95, 101, 116, 125, 137]),
  },
  {
    country: "Rep. Dominicana",
    short: "DOM",
    color: "#0066FF",
    CORE: toSeries([620, 619, 711, 687, 773, 757]),
    LITE: toSeries([394, 420, 489, 498, 535, 546]),
  },
];

const corePieData = [
  { name: "CORE", value: 4970, color: ALEGRA_GREEN },
  { name: "LITE", value: 3792, color: "#FF6B00" },
];
const corePieTotal = corePieData.reduce((s, d) => s + d.value, 0);

// Engagement por funcionalidad — CORE y LITE (Adopción %MAU vs Frecuencia)
type EngagementEvent = {
  num: number;
  label: string;
  adoption: number; // % MAU
  frequency: number; // avg perform
};
// Datos reales Amplitude (Junio 2026) — charts 8bsh2x62 (CORE) y jtbzs8ce (LITE)
const coreEvents: EngagementEvent[] = [
  { num: 1, label: "Crear factura", adoption: 36.5, frequency: 51.1 },
  { num: 2, label: "Buscar factura", adoption: 32.9, frequency: 29.5 },
  { num: 4, label: "Crear cotización", adoption: 22.5, frequency: 34.7 },
  { num: 6, label: "Ver gráfico de ventas", adoption: 18.0, frequency: 11.6 },
  { num: 3, label: "Crear contacto", adoption: 17.5, frequency: 8.9 },
  { num: 5, label: "Crear ítem", adoption: 11.5, frequency: 7.4 },
  { num: 8, label: "Crear remisión", adoption: 3.8, frequency: 74.6 },
  { num: 9, label: "Crear factura de proveedor", adoption: 2.4, frequency: 9.5 },
  { num: 10, label: "Crear gasto", adoption: 1.2, frequency: 13.5 },
];
const liteEvents: EngagementEvent[] = [
  { num: 1, label: "Crear factura", adoption: 47.4, frequency: 14.8 },
  { num: 3, label: "Crear contacto", adoption: 23.5, frequency: 4.5 },
  { num: 2, label: "Buscar factura", adoption: 20.3, frequency: 11.3 },
  { num: 5, label: "Crear ítem", adoption: 18.7, frequency: 7.4 },
  { num: 4, label: "Crear cotización", adoption: 18.6, frequency: 9.2 },
  { num: 6, label: "Ver gráfico de ventas", adoption: 12.7, frequency: 10.4 },
  { num: 8, label: "Crear remisión", adoption: 1.8, frequency: 11.4 },
  { num: 9, label: "Crear factura de proveedor", adoption: 1.5, frequency: 7.7 },
  { num: 10, label: "Crear gasto", adoption: 1.3, frequency: 10.0 },
];

// Paleta compartida por evento (mismo color en CORE/LITE y BASE/SOS para la misma funcionalidad)
const eventColorMap: Record<string, string> = {
  "Crear factura": "#0066FF",
  "Buscar factura": "#00B386",
  "Ver gráfico de ventas": "#FF6B00",
  "Crear cotización": "#8B5CF6",
  "Crear contacto": "#EC4899",
  "Crear ítem": "#F59E0B",
  "Crear remisión": "#06B6D4",
  "Crear factura de proveedor": "#EF4444",
  "Crear gasto": "#84CC16",
  "Cuentas por cobrar": "#14B8A6",
};
const colorForEvent = (label: string) => eventColorMap[label] ?? "#737373";

// Numeración global por funcionalidad — para que el mismo número represente la misma
// feature (y mismo color) en CORE/LITE y BASE/SOS.
const eventNumberMap: Record<string, number> = {
  "Crear factura": 1,
  "Buscar factura": 2,
  "Crear contacto": 3,
  "Crear cotización": 4,
  "Crear ítem": 5,
  "Ver gráfico de ventas": 6,
  "Cuentas por cobrar": 7,
  "Crear remisión": 8,
  "Crear factura de proveedor": 9,
  "Crear gasto": 10,
};
const numberForEvent = (label: string) => eventNumberMap[label] ?? 0;

// Adopción CORE vs LITE — Uniques Mensual (chart g3xjg09o, Junio 2026)
const adopcionCoreLiteData = [
  { event: "Crear factura", CORE: 49.2, LITE: 65.8 },
  { event: "Buscar factura", CORE: 50.4, LITE: 32.3 },
  { event: "Ver gráfico de ventas", CORE: 33.3, LITE: 27.2 },
  { event: "Crear contacto", CORE: 23.1, LITE: 33.6 },
  { event: "Crear cotización", CORE: 29.8, LITE: 24.9 },
  { event: "Crear ítem", CORE: 16.0, LITE: 28.0 },
  { event: "Cuentas por cobrar", CORE: 18.1, LITE: 10.8 },
  { event: "Crear remisión", CORE: 5.3, LITE: 2.7 },
  { event: "Crear factura de proveedor", CORE: 3.3, LITE: 2.4 },
];

// Adopción mensual % por evento — Series reales Amplitude (Oct '25 → Mar '26)
// Formula: % usuarios únicos del evento / MAC del segmento × 100
type MonthlyAdoptionSeries = { label: string; num: number; series: { month: string; pct: number }[] };

const months6 = ["Ene", "Feb", "Mar", "Abr", "May", "Jun"];
// Mobile First / Web First llegan hasta Julio (chart aq7o241v/edit/8b1x1p75).
const months7 = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul"];

// % Uniques mensual CORE (chart 3jd1mc2p, Ene → Jun '26)
const coreMonthlyAdoption: MonthlyAdoptionSeries[] = [
  { num: 1, label: "Crear factura",              series: zip(months6, [47.4, 47.1, 48.5, 47.8, 46.9, 49.0]) },
  { num: 2, label: "Buscar factura",             series: zip(months6, [47.4, 46.4, 47.4, 47.3, 49.5, 50.2]) },
  { num: 6, label: "Ver gráfico de ventas",      series: zip(months6, [35.4, 34.8, 33.8, 32.9, 33.2, 33.2]) },
  { num: 4, label: "Crear cotización",           series: zip(months6, [29.4, 30.0, 29.4, 29.5, 30.5, 29.7]) },
  { num: 3, label: "Crear contacto",             series: zip(months6, [22.2, 22.9, 21.9, 21.3, 23.2, 23.0]) },
  { num: 5, label: "Crear ítem",                 series: zip(months6, [14.6, 16.2, 16.6, 15.4, 17.3, 15.9]) },
  { num: 7, label: "Cuentas por cobrar",         series: zip(months6, [21.5, 19.8, 19.1, 18.6, 19.6, 18.0]) },
  { num: 8, label: "Crear remisión",             series: zip(months6, [5.3, 5.2, 4.6, 5.3, 5.5, 5.3]) },
  { num: 9, label: "Crear factura de proveedor", series: zip(months6, [3.2, 2.9, 3.3, 3.3, 3.1, 3.3]) },
];

// % Uniques mensual LITE (chart 3jd1mc2p, Ene → Jun '26)
const liteMonthlyAdoption: MonthlyAdoptionSeries[] = [
  { num: 1, label: "Crear factura",              series: zip(months6, [64.5, 65.6, 63.6, 64.6, 65.4, 65.5]) },
  { num: 3, label: "Crear contacto",             series: zip(months6, [31.9, 32.5, 30.4, 32.8, 33.4, 33.5]) },
  { num: 2, label: "Buscar factura",             series: zip(months6, [31.1, 31.0, 32.8, 30.9, 33.3, 32.2]) },
  { num: 6, label: "Ver gráfico de ventas",      series: zip(months6, [28.3, 28.0, 27.4, 27.5, 27.8, 27.1]) },
  { num: 5, label: "Crear ítem",                 series: zip(months6, [26.7, 27.0, 25.4, 27.2, 26.8, 27.9]) },
  { num: 4, label: "Crear cotización",           series: zip(months6, [25.9, 26.1, 26.6, 25.8, 25.8, 24.8]) },
  { num: 7, label: "Cuentas por cobrar",         series: zip(months6, [12.1, 11.7, 12.0, 12.1, 11.8, 10.8]) },
  { num: 8, label: "Crear remisión",             series: zip(months6, [2.3, 2.6, 2.6, 2.5, 2.7, 2.7]) },
  { num: 9, label: "Crear factura de proveedor", series: zip(months6, [2.7, 2.4, 2.1, 2.3, 2.4, 2.4]) },
];

function zip(months: string[], vals: number[]): { month: string; pct: number }[] {
  return months.map((m, i) => ({ month: m, pct: vals[i] }));
}

// === Comportamiento BASE / SOS — datos reales Amplitude ===

// Adopción funcionalidades BASE vs SOS - chart aq7o241v (Junio 2026)
const adopcionBaseSosData = [
  { event: "Crear factura", BASE: 91.5, SOS: 43.0 },
  { event: "Buscar factura", BASE: 32.7, SOS: 41.7 },
  { event: "Crear contacto", BASE: 50.4, SOS: 19.7 },
  { event: "Crear ítem", BASE: 39.7, SOS: 15.7 },
  { event: "Ver gráfico de ventas", BASE: 19.5, SOS: 34.6 },
  { event: "Crear cotización", BASE: 26.6, SOS: 27.1 },
  { event: "Cuentas por cobrar", BASE: 7.6, SOS: 16.9 },
  { event: "Crear remisión", BASE: 2.8, SOS: 4.2 },
  { event: "Crear factura de proveedor", BASE: 2.9, SOS: 2.7 },
];

// Engagement BASE - chart no1u7db2 (Mar 2026)
const baseEvents: EngagementEvent[] = [
  { num: 1, label: "Crear factura", adoption: 76.0, frequency: 41.2 },
  { num: 3, label: "Crear contacto", adoption: 41.8, frequency: 9.0 },
  { num: 5, label: "Crear ítem", adoption: 35.4, frequency: 10.3 },
  { num: 4, label: "Crear cotización", adoption: 28.7, frequency: 15.9 },
  { num: 2, label: "Buscar factura", adoption: 29.1, frequency: 32.4 },
  { num: 6, label: "Ver gráfico de ventas", adoption: 26.0, frequency: 12.3 },
  { num: 9, label: "Crear factura de proveedor", adoption: 3.1, frequency: 16.1 },
  { num: 8, label: "Crear remisión", adoption: 3.2, frequency: 30.4 },
  { num: 10, label: "Crear gasto", adoption: 2.4, frequency: 12.9 },
];

// Engagement SOS - chart ezbhdx9r (Mar 2026)
const sosEvents: EngagementEvent[] = [
  { num: 1, label: "Crear factura", adoption: 43.9, frequency: 10.5 },
  { num: 2, label: "Buscar factura", adoption: 36.4, frequency: 14.6 },
  { num: 4, label: "Crear cotización", adoption: 27.3, frequency: 17.9 },
  { num: 6, label: "Ver gráfico de ventas", adoption: 29.4, frequency: 6.1 },
  { num: 3, label: "Crear contacto", adoption: 18.7, frequency: 4.3 },
  { num: 5, label: "Crear ítem", adoption: 14.2, frequency: 5.5 },
  { num: 8, label: "Crear remisión", adoption: 4.0, frequency: 26.4 },
  { num: 9, label: "Crear factura de proveedor", adoption: 2.4, frequency: 4.8 },
  { num: 10, label: "Crear gasto", adoption: 2.2, frequency: 5.9 },
];

// % Uniques mensual BASE / SOS (chart aq7o241v/edit/8b1x1p75, Ene → Jul '26)
const baseMonthlyAdoption: MonthlyAdoptionSeries[] = [
  { num: 1, label: "Crear factura",              series: zip(months7, [90.9, 90.6, 91.8, 91.2, 91.5, 91.5, 91.9]) },
  { num: 3, label: "Crear contacto",             series: zip(months7, [49.7, 48.3, 50.0, 48.5, 51.9, 50.4, 51.1]) },
  { num: 5, label: "Crear ítem",                 series: zip(months7, [38.6, 38.5, 38.5, 39.2, 39.0, 39.7, 39.0]) },
  { num: 2, label: "Buscar factura",             series: zip(months7, [31.7, 31.7, 33.8, 33.0, 34.5, 32.7, 33.6]) },
  { num: 4, label: "Crear cotización",           series: zip(months7, [27.5, 26.9, 28.9, 27.6, 28.5, 26.6, 28.9]) },
  { num: 6, label: "Ver gráfico de ventas",      series: zip(months7, [20.2, 21.0, 21.4, 20.7, 19.7, 19.5, 23.0]) },
  { num: 7, label: "Cuentas por cobrar",         series: zip(months7, [8.2, 8.0, 8.0, 8.5, 8.4, 7.6, 7.5]) },
  { num: 9, label: "Crear factura de proveedor", series: zip(months7, [2.4, 2.3, 2.3, 2.4, 2.5, 2.9, 2.4]) },
  { num: 8, label: "Crear remisión",             series: zip(months7, [2.8, 2.7, 3.0, 3.3, 3.5, 2.8, 3.1]) },
];
const sosMonthlyAdoption: MonthlyAdoptionSeries[] = [
  { num: 1, label: "Crear factura",              series: zip(months7, [49.3, 48.8, 48.0, 46.8, 46.0, 43.0, 48.3]) },
  { num: 2, label: "Buscar factura",             series: zip(months7, [45.4, 43.9, 46.4, 45.5, 47.6, 41.7, 44.7]) },
  { num: 6, label: "Ver gráfico de ventas",      series: zip(months7, [37.0, 34.8, 34.9, 34.6, 36.1, 34.6, 35.5]) },
  { num: 4, label: "Crear cotización",           series: zip(months7, [35.4, 35.5, 34.9, 34.5, 32.8, 27.1, 34.4]) },
  { num: 3, label: "Crear contacto",             series: zip(months7, [22.7, 23.6, 22.1, 22.6, 22.0, 19.7, 23.6]) },
  { num: 7, label: "Cuentas por cobrar",         series: zip(months7, [20.7, 19.0, 19.2, 19.2, 19.6, 16.9, 17.0]) },
  { num: 5, label: "Crear ítem",                 series: zip(months7, [17.6, 18.9, 19.1, 17.8, 19.1, 15.7, 17.5]) },
  { num: 8, label: "Crear remisión",             series: zip(months7, [5.3, 5.2, 5.1, 5.3, 5.2, 4.2, 5.4]) },
  { num: 9, label: "Crear factura de proveedor", series: zip(months7, [4.0, 3.6, 3.5, 3.5, 3.3, 2.7, 2.7]) },
];

function NegocioView() {
  // Filtro de segmento que controla SOLO el gráfico de detalle por país (no el principal)
  const [segment, setSegment] = useState<"both" | "CORE" | "LITE">("both");
  // País seleccionado para resaltar línea en el gráfico de detalle (null = ver todos)
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const last = macCoreLiteTrend[macCoreLiteTrend.length - 1];
  const first = macCoreLiteTrend[0];
  const coreDelta = (((last.CORE - first.CORE) / first.CORE) * 100).toFixed(1);
  const liteDelta = (((last.LITE - first.LITE) / first.LITE) * 100).toFixed(1);
  const coreUp = Number(coreDelta) >= 0;
  const liteUp = Number(liteDelta) >= 0;

  const showCore = segment === "both" || segment === "CORE";
  const showLite = segment === "both" || segment === "LITE";

  // Filtro del gráfico principal por card (Core / Lite).
  const [mainFilter, setMainFilter] = useState<"both" | "CORE" | "LITE">("both");
  const showMainCore = mainFilter === "both" || mainFilter === "CORE";
  const showMainLite = mainFilter === "both" || mainFilter === "LITE";

  // Datos para el gráfico filtrado (debajo de las cards de país)
  // Si no hay país seleccionado: muestra el agregado total CORE/LITE
  // Si hay país: muestra las series de ese país
  const filteredSeriesData = (() => {
    if (selectedCountry) {
      const c = macCoreLitePerCountry.find((p) => p.country === selectedCountry);
      if (!c) return macCoreLiteTrend;
      return c.CORE.map((row, i) => ({
        month: row.month,
        CORE: c.CORE[i].v,
        LITE: c.LITE[i].v,
      }));
    }
    return macCoreLiteTrend;
  })();

  return (
    <div className="space-y-10">
      {/* MAC Trend Core/Lite (principal, sin filtro) + Distribución (al lado) */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Tendencia */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm md:p-8 lg:col-span-2">
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-neutral-900">
                MAC — Tendencia CORE y LITE
              </h3>
              <p className="mt-1 text-xs text-neutral-500">
                Ene → Jun '26 · Usuarios pagos activos por tipo de negocio
              </p>
            </div>
            <div className="flex items-center gap-3">
              {mainFilter !== "both" && (
                <button
                  onClick={() => setMainFilter("both")}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-700 shadow-sm transition-all hover:border-neutral-400 hover:bg-neutral-50 hover:text-neutral-900"
                >
                  Limpiar filtro <span className="text-neutral-400">✕</span>
                </button>
              )}
              <a
                href="https://app.amplitude.com/analytics/alegra/chart/wy27awa1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[11px] font-medium text-neutral-500 hover:text-neutral-900"
              >
                Amplitude <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <button
              onClick={() => setMainFilter(mainFilter === "CORE" ? "both" : "CORE")}
              className={cn(
                "rounded-xl border bg-white p-4 text-left transition-all hover:shadow-sm",
                mainFilter === "CORE" ? "ring-2 ring-offset-1" : "",
              )}
              style={{ borderLeft: `4px solid ${ALEGRA_GREEN}`, ["--tw-ring-color" as any]: ALEGRA_GREEN }}
            >
              <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                MAC Core
              </p>
              <p className="mt-1 text-2xl font-bold text-neutral-900">
                {last.CORE.toLocaleString("es-CO")}
              </p>
              <p
                className={cn(
                  "mt-1 flex items-center gap-1 text-xs font-bold",
                  coreUp ? "text-emerald-600" : "text-red-600",
                )}
              >
                {coreUp ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                {coreUp ? "+" : ""}{coreDelta}% vs Ene '26
              </p>
            </button>
            <button
              onClick={() => setMainFilter(mainFilter === "LITE" ? "both" : "LITE")}
              className={cn(
                "rounded-xl border bg-white p-4 text-left transition-all hover:shadow-sm",
                mainFilter === "LITE" ? "ring-2 ring-offset-1" : "",
              )}
              style={{ borderLeft: `4px solid #FF6B00`, ["--tw-ring-color" as any]: "#FF6B00" }}
            >
              <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                MAC Lite
              </p>
              <p className="mt-1 text-2xl font-bold text-neutral-900">
                {last.LITE.toLocaleString("es-CO")}
              </p>
              <p
                className={cn(
                  "mt-1 flex items-center gap-1 text-xs font-bold",
                  liteUp ? "text-emerald-600" : "text-red-600",
                )}
              >
                {liteUp ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                {liteUp ? "+" : ""}{liteDelta}% vs Ene '26
              </p>
            </button>
          </div>

          <div className="mt-6 h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={macCoreLiteTrend} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="month" stroke="#6b7280" tick={{ fontSize: 12 }} axisLine={{ stroke: "#e5e7eb" }} tickLine={false} />
                <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => v.toLocaleString("es-CO")} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }} formatter={(v: number) => v.toLocaleString("es-CO")} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
                {showMainCore && <Line type="monotone" dataKey="CORE" name="Core" stroke={ALEGRA_GREEN} strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />}
                {showMainLite && <Line type="monotone" dataKey="LITE" name="Lite" stroke="#FF6B00" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />}
              </LineChart>
            </ResponsiveContainer>
          </div>

        </div>

        {/* Distribución al lado */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h3 className="text-base font-bold text-neutral-900">
            Distribución CORE vs LITE
          </h3>
          <p className="mt-1 text-xs text-neutral-500">Junio 2026</p>
          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={corePieData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={95} paddingAngle={3} label={(e: any) => `${e.name}: ${((e.value / corePieTotal) * 100).toFixed(0)}%`}>
                  {corePieData.map((e) => (
                    <Cell key={e.name} fill={e.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }}
                  formatter={(v: number) => `${v.toLocaleString("es-CO")} (${((v / corePieTotal) * 100).toFixed(1)}%)`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-3 text-xs">
            {corePieData.map((d) => (
              <div key={d.name} className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: d.color }} />
                <span className="font-semibold text-neutral-900">{d.name}</span>
                <span className="ml-auto text-neutral-600">
                  {d.value.toLocaleString("es-CO")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* === Cards por país: variación vs Oct === */}
      <div>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-baseline gap-3">
            <h3 className="text-lg font-bold text-neutral-900">Detalle por país</h3>
            <span className="text-xs text-neutral-500">
              Click en una card para filtrar el gráfico de abajo
            </span>
          </div>
          <div className="flex items-center gap-3">
            {selectedCountry && (
              <button
                onClick={() => setSelectedCountry(null)}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-700 shadow-sm transition-all hover:border-neutral-400 hover:bg-neutral-50 hover:text-neutral-900"
              >
                Limpiar filtros <span className="text-neutral-400">✕</span>
              </button>
            )}
            <div className="inline-flex rounded-lg border border-neutral-200 bg-neutral-50 p-1">
              {([
                { id: "both", label: "Todos" },
                { id: "LITE", label: "Lite" },
                { id: "CORE", label: "Core" },
              ] as const).map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSegment(opt.id)}
                  className={cn(
                    "rounded-md px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider transition-all",
                    segment === opt.id
                      ? "bg-white text-neutral-900 shadow-sm"
                      : "text-neutral-500 hover:text-neutral-700",
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {macCoreLitePerCountry.map((c) => {
            // Sumar según segmento
            const seriesForCard = c.CORE.map((row, i) => {
              if (segment === "CORE") return row.v;
              if (segment === "LITE") return c.LITE[i].v;
              return row.v + c.LITE[i].v;
            });
            const lastV = seriesForCard[seriesForCard.length - 1];
            const firstV = seriesForCard[0];
            const delta = ((lastV - firstV) / firstV) * 100;
            const up = delta >= 0;
            const isActive = selectedCountry === c.country;
            return (
              <button
                key={c.country}
                onClick={() => setSelectedCountry(isActive ? null : c.country)}
                className={cn(
                  "group rounded-2xl border bg-white px-4 py-3 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md",
                  isActive ? "ring-2 ring-offset-2" : "border-neutral-200",
                )}
                style={isActive ? { borderColor: c.color, ["--tw-ring-color" as any]: c.color } : { borderTop: `3px solid ${c.color}` }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                    {segment === "both" ? "Core + Lite" : segment}
                  </span>
                  {isActive && (
                    <span className="text-[10px] font-bold uppercase text-neutral-500">activo</span>
                  )}
                </div>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <span
                    className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white"
                    style={{ backgroundColor: c.color }}
                  >
                    {c.short}
                  </span>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 truncate">
                    {c.country}
                  </p>
                </div>
                <div className="mt-1.5 flex items-baseline justify-between gap-2">
                  <p className="text-2xl font-bold text-neutral-900">
                    {lastV.toLocaleString("es-CO")}
                  </p>
                  <p
                    className={cn(
                      "flex items-center gap-1 text-xs font-bold",
                      up ? "text-emerald-600" : "text-red-600",
                    )}
                  >
                    {up ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                    {up ? "+" : ""}{delta.toFixed(1)}%
                  </p>
                </div>
                <p className="mt-0.5 text-[10px] font-medium text-neutral-400">vs Ene '26</p>
              </button>
            );
          })}
        </div>

        {/* Gráfico filtrado por segmento + país (debajo de las cards) */}
        <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-neutral-900">
                MAC filtrado
                {selectedCountry && (
                  <span className="ml-2 text-xs font-medium text-neutral-500">· {selectedCountry}</span>
                )}
              </h3>
              <p className="mt-1 text-xs text-neutral-500">
                Filtra por segmento y país. Sin selección: agregado total.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://app.amplitude.com/analytics/alegra/chart/jgmbk3gb"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[11px] font-medium text-neutral-500 hover:text-neutral-900"
              >
                Amplitude <ExternalLink className="h-3 w-3" />
              </a>
              {selectedCountry && (
                <button
                  onClick={() => setSelectedCountry(null)}
                  className="text-[11px] font-semibold text-neutral-500 hover:text-neutral-900 underline"
                >
                  Limpiar país ✕
                </button>
              )}
            </div>
          </div>

          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={filteredSeriesData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="month" stroke="#6b7280" tick={{ fontSize: 12 }} axisLine={{ stroke: "#e5e7eb" }} tickLine={false} />
                <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => v.toLocaleString("es-CO")} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }} formatter={(v: number) => v.toLocaleString("es-CO")} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
                {showCore && (
                  <Line type="monotone" dataKey="CORE" stroke={ALEGRA_GREEN} strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                )}
                {showLite && (
                  <Line type="monotone" dataKey="LITE" stroke="#FF6B00" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>

        </div>
      </div>

      {/* === MRR Total Core / Lite === */}
      <MrrTotalSection />

    </div>
  );
}

// === MRR TOTAL — Q4-2025 vs Q1-2026 (Core + Lite, todos los usuarios pagos) ===
const mrrTotalComparison = [
  { plan: "Core", q4: 186256, q1: 210741, variation: 13.15 },
  { plan: "Lite", q4: 108340, q1: 118355, variation: 9.24 },
];
const mrrTotalVar = 11.71;
const mrrTotalMixQ1 = [
  { name: "Core", value: 64.04, color: "#0066FF" },
  { name: "Lite", value: 35.96, color: "rgb(48,171,169)" },
];
const mrrTotalMixVariation = [
  { plan: "Core", q4: 63.22, q1: 64.04, delta: 1.28 },
  { plan: "Lite", q4: 36.78, q1: 35.96, delta: -2.21 },
];

function MrrTotalSection() {
  return (
    <div>
      <div className="mb-5 flex items-baseline gap-3 flex-wrap">
        <h3 className="text-lg font-bold text-neutral-900">MRR Total · Core y Lite</h3>
        <span className="text-xs text-neutral-500">
          Ingreso recurrente mensual de todos los usuarios pagos por tipo de negocio
        </span>
      </div>

      {/* KPI hero cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MrrKpi label="MRR Total · Q1-2026" value="$329,095" sub="Promedio mensual" delta={mrrTotalVar} accent="#00C853" />
        <MrrKpi label="MRR Total · Q4-2025" value="$294,595" sub="Promedio mensual" accent="#94A3B8" />
        <MrrKpi label="MRR Core · Q1-2026" value="$210,741" sub="64.04% del total" delta={13.15} accent="#0066FF" />
        <MrrKpi label="MRR Lite · Q1-2026" value="$118,355" sub="35.96% del total" delta={9.24} accent="rgb(48,171,169)" />
      </div>

      {/* Charts row */}
      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        {/* Comparativa Q4 vs Q1 */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm lg:col-span-3">
          <div className="flex items-baseline justify-between flex-wrap gap-2">
            <div>
              <h4 className="text-base font-bold text-neutral-900">Promedio MRR · Q4-2025 vs Q1-2026</h4>
              <p className="mt-1 text-xs text-neutral-500">Aporte mensual en USD por tipo de plan</p>
            </div>
            <div className="inline-flex items-center gap-1 rounded-full bg-[#00C853]/10 px-3 py-1 text-xs font-bold text-[#00785A]">
              <TrendingUp className="h-3 w-3" /> +{mrrTotalVar}% total
            </div>
          </div>
          <div className="mt-4 h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mrrTotalComparison} margin={{ top: 24, right: 16, left: 8, bottom: 8 }} barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                <XAxis dataKey="plan" tick={{ fontSize: 12, fill: "#475569", fontWeight: 600 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip cursor={{ fill: "rgba(0,0,0,0.03)" }} formatter={(v: number) => `$${v.toLocaleString()}`} contentStyle={{ borderRadius: 12, border: "1px solid #E5E7EB", fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} iconType="circle" />
                <Bar dataKey="q4" name="Q4-2025" fill="#CBD5E1" radius={[8, 8, 0, 0]}>
                  <LabelList dataKey="q4" position="top" formatter={(v: number) => `$${(v / 1000).toFixed(1)}k`} style={{ fontSize: 11, fill: "#64748B", fontWeight: 600 }} />
                </Bar>
                <Bar dataKey="q1" name="Q1-2026" fill="#0066FF" radius={[8, 8, 0, 0]}>
                  <LabelList dataKey="q1" position="top" formatter={(v: number) => `$${(v / 1000).toFixed(1)}k`} style={{ fontSize: 11, fill: "#0066FF", fontWeight: 700 }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-3">
            {mrrTotalComparison.map((row) => (
              <div key={row.plan} className="flex items-center justify-between rounded-lg bg-neutral-50 px-3 py-2">
                <span className="text-xs font-semibold text-neutral-700">Variación {row.plan}</span>
                <span className="text-sm font-bold text-[#00C853]">+{row.variation}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mix Core / Lite */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm lg:col-span-2">
          <h4 className="text-base font-bold text-neutral-900">Mix MRR · Q1-2026</h4>
          <p className="mt-1 text-xs text-neutral-500">Distribución Core vs Lite del MRR Total</p>
          <div className="relative mt-2 h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={mrrTotalMixQ1} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={3} stroke="none">
                  {mrrTotalMixQ1.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => `${v}%`} contentStyle={{ borderRadius: 12, border: "1px solid #E5E7EB", fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">Total Q1</span>
              <span className="text-lg font-bold text-neutral-900">$329k</span>
            </div>
          </div>
          <div className="space-y-2">
            {mrrTotalMixVariation.map((row) => {
              const positive = row.delta >= 0;
              const color = row.plan === "Core" ? "#0066FF" : "rgb(48,171,169)";
              return (
                <div key={row.plan} className="flex items-center justify-between rounded-lg border border-neutral-100 px-3 py-2">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
                    <span className="text-xs font-semibold text-neutral-700">{row.plan}</span>
                    <span className="text-[11px] text-neutral-400">{row.q4}% → {row.q1}%</span>
                  </div>
                  <span className={cn("inline-flex items-center gap-1 text-xs font-bold", positive ? "text-[#00C853]" : "text-[#FF6B00]")}>
                    {positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {positive ? "+" : ""}
                    {row.delta}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Distribución por tipo de plan */}
      <PlanDistributionCard
        title="Distribución por tipo de plan"
        total={8173}
        data={planDistributionCoreLite}
      />
    </div>
  );
}

// (Comportamiento Core/Lite movido a ComportamientoUnifiedView en la pestaña "Comportamiento")

function FuncionalidadesUniquesShared({
  core,
  lite,
  active,
  onChangeActive,
  hideTags = false,
}: {
  core: MonthlyAdoptionSeries[];
  lite: MonthlyAdoptionSeries[];
  active: string | null;
  onChangeActive: (v: string | null) => void;
  hideTags?: boolean;
}) {
  // Lista única de funcionalidades (unión)
  const allLabels = Array.from(
    new Set([...core.map((d) => d.label), ...lite.map((d) => d.label)]),
  );
  const setActive = onChangeActive;

  const visibleCore = active ? core.filter((d) => d.label === active) : core;
  const visibleLite = active ? lite.filter((d) => d.label === active) : lite;

  const toChartData = (series: MonthlyAdoptionSeries[]) => {
    const months = series[0]?.series.map((s) => s.month) ?? months6;
    return months.map((m, idx) => {
      const row: Record<string, string | number> = { month: m };
      series.forEach((d) => {
        row[d.label] = d.series[idx]?.pct ?? 0;
      });
      return row;
    });
  };

  // Comparación vs Octubre (solo cuando hay un evento activo)
  const comparison = active
    ? (() => {
        const c = core.find((d) => d.label === active);
        const l = lite.find((d) => d.label === active);
        const oct = (s?: MonthlyAdoptionSeries) => s?.series[0]?.pct ?? null;
        const mar = (s?: MonthlyAdoptionSeries) => s?.series[s.series.length - 1]?.pct ?? null;
        const delta = (a: number | null, b: number | null) =>
          a == null || b == null || b === 0 ? null : ((a - b) / b) * 100;
        return {
          coreOct: oct(c),
          coreMar: mar(c),
          coreDelta: delta(mar(c), oct(c)),
          liteOct: oct(l),
          liteMar: mar(l),
          liteDelta: delta(mar(l), oct(l)),
        };
      })()
    : null;

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-3 flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h4 className="text-base font-bold text-neutral-900">
            Funcionalidades — Uniques Mensual (% adopción)
          </h4>
          <p className="mt-1 text-xs text-neutral-500">
            % MAU mensual por funcionalidad · Selecciona un tag para comparar CORE vs LITE
          </p>
        </div>
        <div className="flex items-center gap-3">
          {active && (
            <button
              onClick={() => setActive(null)}
              className="rounded-full border border-neutral-300 px-3 py-1 text-[11px] font-medium text-neutral-600 hover:bg-neutral-50"
            >
              Limpiar filtro
            </button>
          )}
          <AmplitudeLink href="https://app.amplitude.com/analytics/alegra/chart/3jd1mc2p" />
        </div>
      </div>

      {/* Tags compartidos */}
      {!hideTags && (
        <div className="mb-5 flex flex-wrap gap-1.5">
          {allLabels.map((label) => {
            const isActive = active === label;
            const c = colorForEvent(label);
            return (
              <button
                key={label}
                onClick={() => setActive(isActive ? null : label)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium transition-all",
                  isActive
                    ? "text-white shadow-sm"
                    : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300",
                )}
                style={
                  isActive
                    ? { backgroundColor: c, borderColor: c }
                    : { borderLeftColor: c, borderLeftWidth: 3 }
                }
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: isActive ? "rgba(255,255,255,0.9)" : c }}
                />
                {label}
              </button>
            );
          })}
        </div>
      )}

      {/* Tabla de comparación vs Octubre cuando hay evento activo */}
      {active && comparison && (
        <div className="mb-5 overflow-hidden rounded-xl border border-neutral-200">
          <table className="w-full text-xs">
            <thead className="bg-neutral-50 text-neutral-600">
              <tr>
                <th className="px-4 py-2 text-left font-semibold uppercase tracking-wider">
                  Segmento
                </th>
                <th className="px-4 py-2 text-right font-semibold uppercase tracking-wider">
                  Ene '26
                </th>
                <th className="px-4 py-2 text-right font-semibold uppercase tracking-wider">
                  Jun '26
                </th>
                <th className="px-4 py-2 text-right font-semibold uppercase tracking-wider">
                  Variación
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-neutral-100">
                <td className="px-4 py-2.5">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: ALEGRA_GREEN }} />
                    <span className="font-semibold text-neutral-900">CORE</span>
                  </span>
                </td>
                <td className="px-4 py-2.5 text-right text-neutral-600">
                  {comparison.coreOct == null ? "—" : `${comparison.coreOct.toFixed(1)}%`}
                </td>
                <td className="px-4 py-2.5 text-right font-bold text-neutral-900">
                  {comparison.coreMar == null ? "—" : `${comparison.coreMar.toFixed(1)}%`}
                </td>
                <td
                  className={cn(
                    "px-4 py-2.5 text-right font-bold",
                    comparison.coreDelta == null
                      ? "text-neutral-400"
                      : comparison.coreDelta >= 0
                        ? "text-emerald-600"
                        : "text-red-600",
                  )}
                >
                  {comparison.coreDelta == null
                    ? "—"
                    : `${comparison.coreDelta >= 0 ? "+" : ""}${comparison.coreDelta.toFixed(1)}%`}
                </td>
              </tr>
              <tr className="border-t border-neutral-100">
                <td className="px-4 py-2.5">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#FF6B00" }} />
                    <span className="font-semibold text-neutral-900">LITE</span>
                  </span>
                </td>
                <td className="px-4 py-2.5 text-right text-neutral-600">
                  {comparison.liteOct == null ? "—" : `${comparison.liteOct.toFixed(1)}%`}
                </td>
                <td className="px-4 py-2.5 text-right font-bold text-neutral-900">
                  {comparison.liteMar == null ? "—" : `${comparison.liteMar.toFixed(1)}%`}
                </td>
                <td
                  className={cn(
                    "px-4 py-2.5 text-right font-bold",
                    comparison.liteDelta == null
                      ? "text-neutral-400"
                      : comparison.liteDelta >= 0
                        ? "text-emerald-600"
                        : "text-red-600",
                  )}
                >
                  {comparison.liteDelta == null
                    ? "—"
                    : `${comparison.liteDelta >= 0 ? "+" : ""}${comparison.liteDelta.toFixed(1)}%`}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Dos charts en paralelo */}
      <div className="grid gap-6 xl:grid-cols-2">
        <UniquesPctChart segment="CORE" data={toChartData(visibleCore)} series={visibleCore} />
        <UniquesPctChart segment="LITE" data={toChartData(visibleLite)} series={visibleLite} />
      </div>
    </div>
  );
}

function UniquesPctChart({
  segment,
  data,
  series,
  accent: accentProp,
}: {
  segment: string;
  data: Record<string, string | number>[];
  series: MonthlyAdoptionSeries[];
  accent?: string;
}) {
  const accent = accentProp ?? (segment === "CORE" ? ALEGRA_GREEN : "#FF6B00");
  const pctFmt = (v: number) => `${Number(v).toFixed(1)}%`;
  const firsts: Record<string, number> = {};
  series.forEach((d) => { firsts[d.label] = Number(data[0]?.[d.label] ?? 0); });
  const single = series.length === 1 && data.length > 0 ? series[0].label : null;
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-4">
      <div className="mb-2 flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: accent }} />
        <h5 className="text-sm font-bold text-neutral-900">{segment}</h5>
        <span className="text-[11px] text-neutral-500">% MAU mensual</span>
      </div>
      {single && (
        <div className="mb-2">
          <VariationCard
            label={`${segment} · ${single}`}
            first={Number(data[0][single])}
            last={Number(data[data.length - 1][single])}
            fmt={pctFmt}
            color={accent}
          />
        </div>
      )}
      <div className="h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis dataKey="month" stroke="#6b7280" tick={{ fontSize: 11 }} axisLine={{ stroke: "#e5e7eb" }} tickLine={false} />
            <YAxis stroke="#6b7280" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
            <Tooltip content={(p) => <DeltaTooltip {...(p as any)} firsts={firsts} fmt={pctFmt} />} />
            {series.map((d) => (
              <Line
                key={d.label}
                type="monotone"
                dataKey={d.label}
                stroke={colorForEvent(d.label)}
                strokeWidth={series.length === 1 ? 3 : 2}
                dot={{ r: series.length === 1 ? 4 : 2 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Cuadrante de engagement con bolitas estilo Amplitude — un solo segmento (CORE o LITE)
function EngagementScatterSegment({
  segment,
  events,
  accent,
  chartUrl,
}: {
  segment: string;
  events: EngagementEvent[];
  accent: string;
  chartUrl?: string;
}) {
  const W = 520;
  const H = 380;
  const padL = 40;
  const padR = 20;
  const padT = 20;
  const padB = 40;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;

  // Ejes fijos compartidos por todos los segmentos (CORE/LITE/BASE/SOS)
  // para que las bolitas sean comparables entre charts.
  const maxX = 100;
  const maxY = 50;
  const xToPx = (x: number) => padL + (x / maxX) * innerW;
  const yToPx = (y: number) => padT + innerH - (y / maxY) * innerH;
  const medX = 27.45;
  const medY = 9.65;
  const radius = (e: EngagementEvent) => 12 + Math.min(18, e.adoption * 0.25);

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: accent }}
            />
            <h3 className="text-sm font-bold text-neutral-900">
              Engagement por funcionalidad — {segment}
            </h3>
          </div>
          <p className="mt-1 text-[11px] text-neutral-500">
            Adopción (%MAU) vs Frecuencia · Líneas guía: %MAU {medX} · Frec {medY}
          </p>
        </div>
        {chartUrl && (
          <a
            href={chartUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] font-medium text-neutral-500 hover:text-neutral-900"
          >
            Amplitude <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>

      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-[360px] w-full min-w-[480px]">
          <rect x={padL} y={padT} width={xToPx(medX) - padL} height={yToPx(medY) - padT} fill="#FEF3C7" opacity="0.4" />
          <rect x={xToPx(medX)} y={padT} width={padL + innerW - xToPx(medX)} height={yToPx(medY) - padT} fill="#D1FAE5" opacity="0.4" />
          <rect x={padL} y={yToPx(medY)} width={xToPx(medX) - padL} height={padT + innerH - yToPx(medY)} fill="#FED7AA" opacity="0.4" />
          <rect x={xToPx(medX)} y={yToPx(medY)} width={padL + innerW - xToPx(medX)} height={padT + innerH - yToPx(medY)} fill="#E5E7EB" opacity="0.4" />
          <line x1={padL} y1={padT + innerH} x2={padL + innerW} y2={padT + innerH} stroke="#9ca3af" strokeWidth="1" />
          <line x1={padL} y1={padT} x2={padL} y2={padT + innerH} stroke="#9ca3af" strokeWidth="1" />
          <line x1={xToPx(medX)} y1={padT} x2={xToPx(medX)} y2={padT + innerH} stroke="#6b7280" strokeWidth="1" strokeDasharray="4 3" />
          <line x1={padL} y1={yToPx(medY)} x2={padL + innerW} y2={yToPx(medY)} stroke="#6b7280" strokeWidth="1" strokeDasharray="4 3" />

          {[0, 20, 40, 60, 80, 100].filter((v) => v <= maxX).map((v) => (
            <g key={v}>
              <text x={xToPx(v)} y={padT + innerH + 16} fontSize="10" fill="#6b7280" textAnchor="middle">{v}</text>
              <line x1={xToPx(v)} y1={padT + innerH} x2={xToPx(v)} y2={padT + innerH + 4} stroke="#9ca3af" />
            </g>
          ))}
          {[0, 10, 20, 30, 40, 50].filter((v) => v <= maxY).map((v) => (
            <g key={v}>
              <text x={padL - 6} y={yToPx(v) + 3} fontSize="10" fill="#6b7280" textAnchor="end">{v}</text>
              <line x1={padL - 4} y1={yToPx(v)} x2={padL} y2={yToPx(v)} stroke="#9ca3af" />
            </g>
          ))}

          {events.map((p, i) => {
            const cx = xToPx(p.adoption);
            const cy = yToPx(p.frequency);
            const r = radius(p);
            const fill = colorForEvent(p.label);
            return (
              <g key={`${segment}-${i}`}>
                <circle cx={cx} cy={cy} r={r} fill={fill} fillOpacity="0.85" stroke="white" strokeWidth="2" />
                <text x={cx} y={cy + 3} fontSize="11" fontWeight="bold" fill="white" textAnchor="middle">
                  {p.num}
                </text>
                <title>{`${p.label} — Adopción ${p.adoption}% · Frec ${p.frequency}`}</title>
              </g>
            );
          })}

          <text x={padL + innerW / 2} y={H - 6} fontSize="11" fill="#374151" textAnchor="middle" fontWeight="600">Adopción (%MAU)</text>
          <text x={12} y={padT + innerH / 2} fontSize="11" fill="#374151" textAnchor="middle" fontWeight="600" transform={`rotate(-90 12 ${padT + innerH / 2})`}>Frecuencia</text>
        </svg>
      </div>

      {/* Leyenda numerada */}
      <div className="mt-3 grid grid-cols-1 gap-x-4 gap-y-1 text-[11px] sm:grid-cols-2">
        {events.map((e) => (
          <div key={e.num} className="flex items-center gap-2">
            <span
              className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white"
              style={{ backgroundColor: colorForEvent(e.label) }}
            >
              {e.num}
            </span>
            <span className="text-neutral-700">{e.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// (Funcionalidades — Uniques mensual antiguo: reemplazado por FuncionalidadesUniquesShared)


// === Clusters BASE / SOS - bubble visualization ===

function ClustersBubbles() {
  // Chart d2fqi8hm (Junio): SOS = 72% (6.301), BASE = 28% (2.484). Radio ∝ √pct.
  const sosPct = 72;
  const basePct = 28;
  // El área del círculo es proporcional al porcentaje => radio ∝ √pct
  const sosRadius = Math.sqrt(sosPct) * 13; // px
  const baseRadius = Math.sqrt(basePct) * 13;

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-neutral-900">
            Clusters Mobile First y Web First
          </h3>
          <p className="mt-1 text-xs text-neutral-500">
            Tamaño relativo de cada cluster · Análisis de comportamiento de usuarios pagos activos
          </p>
        </div>
        <a
          href="https://app.amplitude.com/analytics/alegra/chart/d2fqi8hm"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[11px] font-medium text-neutral-500 hover:text-neutral-900"
        >
          Amplitude <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      {/* Bolitas */}
      <div className="flex flex-col items-center justify-center gap-10 py-6 md:flex-row md:gap-16">
        {/* SOS */}
        <div className="flex flex-col items-center">
          <div
            className="flex items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-105"
            style={{
              width: `${sosRadius * 2}px`,
              height: `${sosRadius * 2}px`,
              background: `radial-gradient(circle at 30% 30%, #FF8A3D, #FF6B00)`,
              boxShadow: "0 12px 30px -8px rgba(255,107,0,0.45)",
            }}
          >
            <div className="text-center">
              <p className="text-2xl font-bold leading-none md:text-3xl">{sosPct}%</p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-widest opacity-90">
                Web First
              </p>
            </div>
          </div>
          <div className="mt-4 max-w-[220px] text-center">
            <p className="text-xs font-semibold text-neutral-700">
              Web-first · usan app para emergencia
            </p>
            <p className="mt-1 text-[11px] text-neutral-500">
              Eventos de web · Reportes · Búsqueda de factura
            </p>
          </div>
        </div>

        {/* BASE */}
        <div className="flex flex-col items-center">
          <div
            className="flex items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-105"
            style={{
              width: `${baseRadius * 2}px`,
              height: `${baseRadius * 2}px`,
              background: `radial-gradient(circle at 30% 30%, #2DD4A6, ${ALEGRA_GREEN})`,
              boxShadow: `0 12px 30px -8px rgba(0,179,134,0.45)`,
            }}
          >
            <div className="text-center">
              <p className="text-xl font-bold leading-none md:text-2xl">{basePct}%</p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-widest opacity-90">
                Mobile First
              </p>
            </div>
          </div>
          <div className="mt-4 max-w-[220px] text-center">
            <p className="text-xs font-semibold text-neutral-700">
              Mobile-first · app es su herramienta principal
            </p>
            <p className="mt-1 text-[11px] text-neutral-500">
              Facturas · Items · Contactos · Cotizaciones en App
            </p>
          </div>
        </div>
      </div>
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

// === Sección 4: Resultados del período ===

const devInitiativesS4 = [
  {
    title: "Home — acciones rápidas",
    tags: ["Engagement"],
    problem:
      "El home actual no facilita el acceso rápido a las acciones más usadas por los usuarios.",
    krs: ["KR 2.2"],
  },
  {
    title: "Multicuenta",
    tags: ["Engagement"],
    problem:
      "Seguimiento del uso del selector de multicuenta en la app: cuántas veces se usa, cuántas personas lo utilizan y qué perfiles lo adoptan.",
    krs: ["KR 2.1"],
  },
  {
    title: "Rediseño de contactos",
    tags: ["Adopción", "Engagement"],
    problem:
      "Rediseño del flujo de contactos: intención de creación, uso y autocompletado de campos para reducir la fricción al crear un contacto.",
    krs: ["KR 2.1"],
  },
  {
    title: "Rediseño Facturación Costa Rica",
    tags: ["Engagement", "Adopción"],
    problem:
      "Con la salida en web de la versión 4.4, la cantidad de facturas aumentó un 20%, sin embargo, en la app se mantuvo constante. Adicionalmente, la tasa de conversión es la menor de las 4 versiones (63% hoy).",
    krs: ["KR 2.1", "KR 2.2", "KR 2.3"],
  },
  {
    title: "Rediseño Facturación Dominicana",
    tags: ["Engagement", "Adopción"],
    problem:
      "Seguimiento del uso de la factura de venta en República Dominicana: facturas creadas vs intención (visitas a nueva factura).",
    krs: ["KR 2.2"],
  },
  {
    title: "Estabilización",
    tags: ["Experiencia"],
    problem:
      "Semanalmente se presentan alrededor de 8k errores que se reportan conjuntamente en Sentry y Amplitude.",
    krs: ["KR 1.3"],
  },
];

const nonDevInitiativesS4 = [
  {
    title: "Creación de la sección de App en Alegra",
    tags: ["Adopción"],
    problem: "No existe una sección dedicada para la app en la plataforma de Alegra.",
  },
  {
    title: "App para pruebas de usabilidad",
    tags: ["Experiencia"],
    problem: "Necesitamos un entorno para prototipar y validar flujos de la app con usuarios reales antes de desarrollarlos.",
  },
];

// === Detalles de iniciativas específicos de Q3 ===
const facturaMeses7 = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul"];
// Sin Julio: los totales de factura por país se muestran hasta Junio.
const facturaMeses6 = ["Ene", "Feb", "Mar", "Abr", "May", "Jun"];

function AmplitudeLink({ href, label = "Amplitude" }: { href: string; label?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex shrink-0 items-center gap-1 text-[11px] font-medium text-neutral-500 hover:text-neutral-900"
    >
      {label} <ExternalLink className="h-3 w-3" />
    </a>
  );
}

function FacturaTotalesChart({ creadas, visitas }: { creadas: number[]; visitas: number[] }) {
  // Filtro de métrica dentro del chart: ambas, solo visitas o solo creadas.
  const [metric, setMetric] = useState<"both" | "visitas" | "creadas">("both");
  const showVisitas = metric !== "creadas";
  const showCreadas = metric !== "visitas";
  // Sin Julio: se recorren solo los 6 meses (Ene → Jun).
  const data = facturaMeses6.map((m, i) => ({ mes: m, Creadas: creadas[i], Visitas: visitas[i] }));
  const lastVisitas = visitas[facturaMeses6.length - 1];
  const lastCreadas = creadas[facturaMeses6.length - 1];
  const deltaVisitas = deltaVsFirst(visitas[0], lastVisitas);
  const deltaCreadas = deltaVsFirst(creadas[0], lastCreadas);
  const firsts = { Visitas: visitas[0], Creadas: creadas[0] };
  const deltaChip = (d: number) => (
    <span className={cn("mt-0.5 flex items-center gap-1 text-[11px] font-bold", d >= 0 ? "text-emerald-600" : "text-red-600")}>
      {d >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
      {d >= 0 ? "+" : ""}{d.toFixed(1)}% <span className="font-medium text-neutral-500">vs Ene</span>
    </span>
  );

  return (
    <div className="space-y-3">
      {/* Cards de selección de métrica dentro del chart */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setMetric(metric === "visitas" ? "both" : "visitas")}
          className={cn(
            "rounded-xl border bg-white px-3 py-2 text-left transition-all hover:shadow-sm",
            metric === "visitas" ? "ring-2 ring-offset-1" : "",
          )}
          style={{ borderLeft: `4px solid #93BD31`, ["--tw-ring-color" as any]: "#93BD31" }}
        >
          <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Visitas a nueva factura</p>
          <p className="mt-0.5 text-lg font-bold text-neutral-900">{lastVisitas?.toLocaleString("es-CO")}</p>
          {deltaChip(deltaVisitas)}
        </button>
        <button
          onClick={() => setMetric(metric === "creadas" ? "both" : "creadas")}
          className={cn(
            "rounded-xl border bg-white px-3 py-2 text-left transition-all hover:shadow-sm",
            metric === "creadas" ? "ring-2 ring-offset-1" : "",
          )}
          style={{ borderLeft: `4px solid #0052F2`, ["--tw-ring-color" as any]: "#0052F2" }}
        >
          <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Facturas creadas</p>
          <p className="mt-0.5 text-lg font-bold text-neutral-900">{lastCreadas?.toLocaleString("es-CO")}</p>
          {deltaChip(deltaCreadas)}
        </button>
        {metric !== "both" && (
          <button
            onClick={() => setMetric("both")}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-700 shadow-sm transition-all hover:border-neutral-400 hover:bg-neutral-50 hover:text-neutral-900"
          >
            Limpiar <span className="text-neutral-400">✕</span>
          </button>
        )}
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis dataKey="mes" tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={false} tickLine={false} tickFormatter={(v) => v.toLocaleString("es-CO")} />
            <Tooltip content={(p) => <DeltaTooltip {...(p as any)} firsts={firsts} fmt={(v) => v.toLocaleString("es-CO")} />} />
            <Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
            {showVisitas && <Line type="monotone" dataKey="Visitas" name="Visitas a nueva factura" stroke="#93BD31" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 6 }} />}
            {showCreadas && <Line type="monotone" dataKey="Creadas" name="Facturas creadas" stroke="#0052F2" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 6 }} />}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function RediseñoCRDetailQ3() {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h4 className="text-base font-bold text-neutral-900">Factura de venta Costa Rica — Totales por mes</h4>
          <p className="mt-0.5 text-xs text-neutral-500">Ene → Jun '26 · Facturas creadas vs visitas a nueva factura</p>
        </div>
        <AmplitudeLink href="https://app.amplitude.com/analytics/alegra/chart/6tootwru" />
      </div>
      <FacturaTotalesChart creadas={[1482, 1549, 1622, 1397, 1766, 2151, 1718]} visitas={[1970, 2037, 2214, 2395, 2797, 3321, 2500]} />
    </div>
  );
}

function RediseñoDominicanaDetailQ3() {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h4 className="text-base font-bold text-neutral-900">Factura de venta República Dominicana — Totales por mes</h4>
          <p className="mt-0.5 text-xs text-neutral-500">Ene → Jun '26 · Facturas creadas vs visitas a nueva factura</p>
        </div>
        <AmplitudeLink href="https://app.amplitude.com/analytics/alegra/chart/dxfa8lk5" />
      </div>
      <FacturaTotalesChart creadas={[6487, 5820, 6342, 6058, 6931, 7015, 7002]} visitas={[7922, 7222, 7906, 8079, 10007, 10002, 9881]} />
    </div>
  );
}

const contactosIntencionData = [
  { sem: "3 May", pct: 34.3 }, { sem: "10", pct: 37.4 }, { sem: "17", pct: 35.2 }, { sem: "24", pct: 37.5 },
  { sem: "31", pct: 38.5 }, { sem: "7 Jun", pct: 45.1 }, { sem: "14", pct: 47.3 }, { sem: "21", pct: 47.0 },
  { sem: "28", pct: 43.0 }, { sem: "5 Jul", pct: 45.2 }, { sem: "12", pct: 44.5 }, { sem: "19", pct: 44.9 },
];
const contactosAutocompUso = [0, 0, 0, 1081, 4154, 4746, 5571];
const contactosAutocompPie = [
  { name: "Autocompletado", value: 2545, color: "#93BD31" },
  { name: "Manual", value: 3799, color: "#0052F2" },
];

function RediseñoContactosDetailQ3() {
  const autocompTotal = contactosAutocompPie.reduce((s, d) => s + d.value, 0);
  const autocompPct = ((contactosAutocompPie[0].value / autocompTotal) * 100).toFixed(0);
  return (
    <div className="space-y-5">
      {/* Intención de creación */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h4 className="text-sm font-bold text-neutral-900">Intención de creación de contactos</h4>
            <p className="mt-0.5 text-xs text-neutral-500">% de conversión visita → creación · semanal</p>
          </div>
          <AmplitudeLink href="https://app.amplitude.com/analytics/alegra/chart/45ccva3n/edit/rsstm3hg" />
        </div>
        <div className="mt-3 max-w-xs">
          <VariationCard
            label="Conversión · vs primer dato"
            first={contactosIntencionData[0].pct}
            last={contactosIntencionData[contactosIntencionData.length - 1].pct}
            fmt={(v) => `${v.toFixed(1)}%`}
            color={ALEGRA_GREEN}
          />
        </div>
        <div className="mt-3 h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={contactosIntencionData} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="sem" tick={{ fontSize: 10, fill: "#6b7280" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#6b7280" }} axisLine={false} tickLine={false} domain={[0, 60]} tickFormatter={(v) => `${v}%`} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }} formatter={(v: number) => `${v.toFixed(1)}%`} />
              <Line type="monotone" dataKey="pct" name="Conversión" stroke={ALEGRA_GREEN} strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Autocompletado */}
      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h4 className="text-sm font-bold text-neutral-900">Autocompletado — uso mensual</h4>
              <p className="mt-0.5 text-xs text-neutral-500">Contactos creados con autocompletado · Ene → Jul '26</p>
            </div>
            <AmplitudeLink href="https://app.amplitude.com/analytics/alegra/chart/2wkal2xq" />
          </div>
          <div className="mt-3 h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={facturaMeses7.map((m, i) => ({ mes: m, v: contactosAutocompUso[i] }))} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="mes" tick={{ fontSize: 10, fill: "#6b7280" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#6b7280" }} axisLine={false} tickLine={false} tickFormatter={(v) => v.toLocaleString("es-CO")} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }} formatter={(v: number) => v.toLocaleString("es-CO")} />
                <Line type="monotone" dataKey="v" name="Con autocompletado" stroke="#93BD31" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h4 className="text-sm font-bold text-neutral-900">Autocompletado — % de contactos</h4>
              <p className="mt-0.5 text-xs text-neutral-500">Contactos con autocompletado vs manual</p>
            </div>
            <AmplitudeLink href="https://app.amplitude.com/analytics/alegra/chart/rablks0e" />
          </div>
          <div className="relative mt-3 h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={contactosAutocompPie} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={2}>
                  {contactosAutocompPie.map((e) => (
                    <Cell key={e.name} fill={e.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }} formatter={(v: number) => `${v.toLocaleString("es-CO")} (${((v / autocompTotal) * 100).toFixed(1)}%)`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-bold text-neutral-900">{autocompPct}%</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">Autocompletado</span>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-center gap-4 text-[11px]">
            {contactosAutocompPie.map((d) => (
              <span key={d.name} className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                <span className="font-semibold text-neutral-700">{d.name}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Multicuenta — uso del selector (evento app-multicompany-selected) · dashboard zdi7go6j
const multicuentaMeses = ["Feb", "Mar", "Abr", "May", "Jun", "Jul"];
const multicuentaTotal = [0, 0, 0, 212, 838, 818]; // byrtf747 · eventos totales
const multicuentaUniques = [0, 0, 0, 150, 296, 336]; // tn31kzzl · usuarios únicos
const multicuentaData = multicuentaMeses.map((mes, i) => ({ mes, total: multicuentaTotal[i], uniques: multicuentaUniques[i] }));
const multicuentaPerfil = [
  { name: "Emprendedor", value: 287, color: "#0052F2" },
  { name: "Contador", value: 176, color: "#93BD31" },
];

function MulticuentaDetailQ3() {
  const perfilTotal = multicuentaPerfil.reduce((s, d) => s + d.value, 0);
  return (
    <div className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        {/* Uso del selector — eventos totales */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h4 className="text-sm font-bold text-neutral-900">Uso del selector de multicuenta</h4>
              <p className="mt-0.5 text-xs text-neutral-500">Eventos totales · mensual · Feb → Jul '26</p>
            </div>
            <AmplitudeLink href="https://app.amplitude.com/analytics/alegra/chart/byrtf747?linkingDashboardId=zdi7go6j&source=dashboard" />
          </div>
          <div className="mt-3 h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={multicuentaData} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="mes" tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={false} tickLine={false} tickFormatter={(v) => v.toLocaleString("es-CO")} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }} formatter={(v: number) => v.toLocaleString("es-CO")} />
                <Line type="monotone" dataKey="total" name="Selecciones" stroke="#0052F2" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Personas que lo utilizan — usuarios únicos */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h4 className="text-sm font-bold text-neutral-900">Personas que lo utilizan</h4>
              <p className="mt-0.5 text-xs text-neutral-500">Usuarios únicos · mensual · Feb → Jul '26</p>
            </div>
            <AmplitudeLink href="https://app.amplitude.com/analytics/alegra/chart/tn31kzzl?linkingDashboardId=zdi7go6j&source=dashboard" />
          </div>
          <div className="mt-3 h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={multicuentaData} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="mes" tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={false} tickLine={false} tickFormatter={(v) => v.toLocaleString("es-CO")} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }} formatter={(v: number) => v.toLocaleString("es-CO")} />
                <Line type="monotone" dataKey="uniques" name="Usuarios" stroke={ALEGRA_GREEN} strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quién lo utiliza — por perfil */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h4 className="text-sm font-bold text-neutral-900">Quién lo utiliza</h4>
            <p className="mt-0.5 text-xs text-neutral-500">Usuarios únicos por perfil · últimas 12 semanas</p>
          </div>
          <AmplitudeLink href="https://app.amplitude.com/analytics/alegra/chart/hkjfu5yi" />
        </div>
        <div className="mt-3 grid items-center gap-4 sm:grid-cols-2">
          <div className="relative h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={multicuentaPerfil} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={2}>
                  {multicuentaPerfil.map((e) => (
                    <Cell key={e.name} fill={e.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }} formatter={(v: number) => `${v.toLocaleString("es-CO")} (${((v / perfilTotal) * 100).toFixed(1)}%)`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-bold text-neutral-900">{perfilTotal.toLocaleString("es-CO")}</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">Usuarios</span>
            </div>
          </div>
          <div className="space-y-2">
            {multicuentaPerfil.map((d) => (
              <div key={d.name} className="flex items-center gap-2 rounded-lg border border-neutral-100 px-3 py-2 text-xs">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                <span className="font-semibold text-neutral-900">{d.name}</span>
                <span className="ml-auto text-neutral-600">{d.value.toLocaleString("es-CO")} · {((d.value / perfilTotal) * 100).toFixed(0)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Errores críticos en producción (Sentry + Amplitude) · Ene → Jul '26 · dashboard r7zqh9du
const estabilizacionErrores = [
  { mes: "Ene", errores: 19549 },
  { mes: "Feb", errores: 12985 },
  { mes: "Mar", errores: 19820 },
  { mes: "Abr", errores: 8258 },
  { mes: "May", errores: 9240 },
  { mes: "Jun", errores: 6828 },
  { mes: "Jul", errores: 7661 },
];

function EstabilizacionDetailQ3() {
  const first = estabilizacionErrores[0].errores;
  const last = estabilizacionErrores[estabilizacionErrores.length - 1].errores;
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h4 className="text-base font-bold text-neutral-900">Estabilización — Errores críticos en producción</h4>
          <p className="mt-0.5 text-xs text-neutral-500">Sentry + Amplitude · Ene → Jul '26 · Meta KR-1.3: 10k → 1k</p>
        </div>
        <AmplitudeLink href="https://app.amplitude.com/analytics/alegra/chart/r7zqh9du/edit/jmrlug71" />
      </div>
      <div className="max-w-xs">
        <VariationCard
          label="Errores · vs Ene"
          first={first}
          last={last}
          fmt={(v) => v.toLocaleString("es-CO")}
          color="#EF4444"
        />
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={estabilizacionErrores} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis dataKey="mes" tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={false} tickLine={false} tickFormatter={(v) => v.toLocaleString("es-CO")} />
            <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }} formatter={(v: number) => v.toLocaleString("es-CO")} />
            <Line type="monotone" dataKey="errores" name="Errores críticos" stroke="#EF4444" strokeWidth={2.5} dot={{ r: 4, fill: "#EF4444" }} activeDot={{ r: 6 }}>
              <LabelList dataKey="errores" position="top" formatter={(v: number) => v.toLocaleString("es-CO")} style={{ fontSize: 10, fill: "#6b7280", fontWeight: 600 }} />
            </Line>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function AppPruebasUsabilidadDetailQ3() {
  const url = "https://app-sim-screen.vercel.app/?tab=";
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h4 className="text-base font-bold text-neutral-900">App para pruebas de usabilidad</h4>
          <p className="mt-0.5 text-xs text-neutral-500">Simulador de pantallas de la app para validar flujos con usuarios.</p>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-all hover:opacity-90"
          style={{ backgroundColor: ALEGRA_GREEN }}
        >
          Abrir simulador <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 shadow-sm">
        <iframe
          src={url}
          title="App para pruebas de usabilidad"
          className="h-[620px] w-full"
          loading="lazy"
        />
      </div>
    </div>
  );
}

// --- Home — acciones rápidas (override Q3: quita los grupos "Funcionalidad" y
// "Tiempo de conversión"; deja Home → Funcionalidad y Resultados) ---
const q3HomeFunnelFactura = [
  { sem: "01 Mar", pct: 42.56 }, { sem: "08 Mar", pct: 43.20 }, { sem: "15 Mar", pct: 43.28 },
  { sem: "22 Mar", pct: 42.78 }, { sem: "29 Mar", pct: 41.21 }, { sem: "05 Abr", pct: 44.31 },
  { sem: "12 Abr", pct: 54.33 }, { sem: "19 Abr", pct: 53.83 },
];
const q3HomeFunnelContactos = [
  { sem: "01 Mar", pct: 3.46 }, { sem: "08 Mar", pct: 3.22 }, { sem: "15 Mar", pct: 2.99 },
  { sem: "22 Mar", pct: 3.09 }, { sem: "29 Mar", pct: 2.65 }, { sem: "05 Abr", pct: 3.20 },
  { sem: "12 Abr", pct: 6.84 }, { sem: "19 Abr", pct: 10.01 },
];
const q3HomeFunnelItem = [
  { sem: "01 Feb", pct: 3.30 }, { sem: "08 Feb", pct: 3.38 }, { sem: "15 Feb", pct: 3.27 },
  { sem: "22 Feb", pct: 3.44 }, { sem: "01 Mar", pct: 3.68 }, { sem: "08 Mar", pct: 3.47 },
  { sem: "15 Mar", pct: 3.15 }, { sem: "22 Mar", pct: 2.64 }, { sem: "29 Mar", pct: 3.55 },
  { sem: "05 Abr", pct: 8.21 }, { sem: "12 Abr", pct: 7.08 },
];
const q3HomeFunnelCotizacion = [
  { sem: "01 Mar", pct: 19.21 }, { sem: "08 Mar", pct: 18.42 }, { sem: "15 Mar", pct: 18.63 },
  { sem: "22 Mar", pct: 18.45 }, { sem: "29 Mar", pct: 15.56 }, { sem: "05 Abr", pct: 19.33 },
  { sem: "12 Abr", pct: 22.98 }, { sem: "19 Abr", pct: 23.99 },
];
const q3ItemsCreadosSemanal = [
  { sem: "25 Ene", total: 4720 }, { sem: "01 Feb", total: 4615 }, { sem: "08 Feb", total: 4840 },
  { sem: "15 Feb", total: 4552 }, { sem: "22 Feb", total: 4451 }, { sem: "01 Mar", total: 4616 },
  { sem: "08 Mar", total: 4029 }, { sem: "15 Mar", total: 4050 }, { sem: "22 Mar", total: 4364 },
  { sem: "29 Mar", total: 2779 }, { sem: "05 Abr", total: 4265 }, { sem: "12 Abr", total: 5295 },
  { sem: "19 Abr", total: 5453 },
];

// Home → Funcionalidad: cada funcionalidad es una card (chip) con comparación vs Ene '26.
// Home → Funcionalidad — % conversión mensual (funnel chart 24552723, Ene → Jul '26)
const homeFuncMeses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul"];
const mkHomeSeries = (vals: number[]) => homeFuncMeses.map((sem, i) => ({ sem, pct: vals[i] }));
const HOME_FUNCS_Q3 = [
  { id: "fnFactura", label: "Factura", color: ALEGRA_GREEN, data: mkHomeSeries([49.38, 50.42, 50.33, 62.54, 65.74, 66.38, 66.61]) },
  { id: "fnContactos", label: "Contactos", color: "#0066FF", data: mkHomeSeries([6.49, 6.83, 6.83, 14.85, 18.74, 14.18, 14.87]) },
  { id: "fnCotizacion", label: "Cotización", color: "#9333EA", data: mkHomeSeries([23.15, 24.01, 24.28, 28.05, 29.33, 29.14, 30.82]) },
  { id: "fnItem", label: "Item", color: "#FF6B00", data: mkHomeSeries([6.62, 6.52, 7.18, 12.97, 14.78, 14.03, 15.26]) },
];

function q3PctDelta(arr: { pct?: number; total?: number }[], key: "pct" | "total") {
  const first = arr[0]?.[key] ?? 0;
  const last = arr[arr.length - 1]?.[key] ?? 0;
  if (!first) return 0;
  return ((last - first) / first) * 100;
}

function HomeDetailQ3() {
  const HOME_CHART_URL = "https://app.amplitude.com/analytics/alegra/chart/24552723?linkingDashboardId=zdi7go6j&sharingId=xobRXIKL";

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <p className="text-sm font-bold text-neutral-900">Home → Funcionalidad</p>
          <p className="mt-0.5 text-xs text-neutral-500">
            % de sesiones que llegan a la funcionalidad desde el home
          </p>
        </div>
        <AmplitudeLink href={HOME_CHART_URL} />
      </div>

      {/* Cards por funcionalidad — comparación vs Ene '26 (el detalle está en Amplitude) */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {HOME_FUNCS_Q3.map((f) => {
          const val = f.data[f.data.length - 1].pct;
          const delta = q3PctDelta(f.data, "pct");
          const up = delta >= 0;
          return (
            <div
              key={f.id}
              className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 shadow-sm"
              style={{ borderTop: `3px solid ${f.color}` }}
            >
              <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                Home → {f.label}
              </p>
              <p className="mt-1 text-2xl font-bold text-neutral-900">{val.toFixed(2)}%</p>
              <p className={cn("mt-1 flex items-center gap-1 text-xs font-bold", up ? "text-emerald-600" : "text-red-600")}>
                {up ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                {up ? "+" : ""}{delta.toFixed(1)}%
                <span className="ml-1 text-[10px] font-medium text-neutral-500">vs Ene '26</span>
              </p>
            </div>
          );
        })}
      </div>

      {/* Chart mensual — % conversión Home → Funcionalidad (Ene → Jul '26) */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
          % conversión mensual · Ene → Jul '26
        </p>
        <div className="mt-3 h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={HOME_FUNCS_Q3[0].data.map((d, i) => {
                const row: Record<string, string | number> = { mes: d.sem };
                HOME_FUNCS_Q3.forEach((f) => { row[f.label] = f.data[i].pct; });
                return row;
              })}
              margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="mes" stroke="#6b7280" tick={{ fontSize: 11 }} axisLine={{ stroke: "#e5e7eb" }} tickLine={false} />
              <YAxis stroke="#6b7280" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }} formatter={(v: number) => `${v.toFixed(2)}%`} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
              {HOME_FUNCS_Q3.map((f) => (
                <Line key={f.id} type="monotone" dataKey={f.label} name={`Home → ${f.label}`} stroke={f.color} strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 6 }} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

const q3InitiativeDetailMap = {
  ...initiativeDetailMap,
  "Estabilización": EstabilizacionDetailQ3,
  "Multicuenta": MulticuentaDetailQ3,
  "Home — acciones rápidas": HomeDetailQ3,
  "Rediseño Facturación Costa Rica": RediseñoCRDetailQ3,
  "Rediseño de contactos": RediseñoContactosDetailQ3,
  "Rediseño Facturación Dominicana": RediseñoDominicanaDetailQ3,
  "App para pruebas de usabilidad": AppPruebasUsabilidadDetailQ3,
};

// Acordeón horizontal para cada iniciativa: al abrir muestra el problema y los charts.
function InitiativeAccordion({
  title,
  tags,
  problem,
  Detail,
}: {
  title: string;
  tags: string[];
  problem: string;
  krs?: string[];
  Detail?: React.ComponentType;
}) {
  const tagColor = (t: string) => {
    if (t === "Engagement") return "#FF6B00";
    if (t === "Adopción") return ALEGRA_GREEN;
    if (t === "Experiencia") return "#0066FF";
    return "#737373";
  };
  return (
    <Collapsible className="group/collap">
      <CollapsibleTrigger className="flex w-full items-center justify-between gap-3 rounded-2xl border border-neutral-200 bg-white px-5 py-4 text-left shadow-sm transition hover:border-emerald-300 hover:bg-neutral-50">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-sm font-bold text-neutral-900">{title}</h3>
          {tags.map((t) => (
            <Badge
              key={t}
              variant="outline"
              className="text-[10px] font-semibold"
              style={{ borderColor: tagColor(t), color: tagColor(t) }}
            >
              {t}
            </Badge>
          ))}
        </div>
        <ChevronDown className="h-4 w-4 shrink-0 text-neutral-500 transition-transform group-data-[state=open]/collap:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="mt-3 space-y-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          <div className="rounded-lg border border-orange-200 bg-orange-50/50 px-3 py-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-orange-700">Problema</p>
            <p className="mt-1 text-xs leading-relaxed text-neutral-800">{problem}</p>
          </div>
          {Detail && <Detail />}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

// OKRs específicos de Q3 (no modifican los compartidos de otros trimestres)
const q3Okrs: typeof okrs = [
  {
    id: "obj-1",
    objective: "Reducir los errores críticos en los flujos clave de la app para garantizar una experiencia estable a los usuarios durante este trimestre.",
    type: "experience",
    keyResults: [
      { id: "kr-1.3", name: "Reducir los errores críticos en producción detectados por Sentry y Amplitude de 8.2k a 5k en los flujos principales durante el trimestre", baseline: "8.200", target: "5k", percentage: "-6.6%", currentResult: "7.661", achievedIncrease: "-6.6%" },
    ],
  },
  {
    id: "obj-2",
    objective: "Impulsar la adopción de la app móvil mejorando el flujo de navegación, creación de facturas y contactos para que los usuarios facturen de forma recurrente desde el móvil.",
    type: "adoption",
    keyResults: [
      { id: "kr-2.1", name: "Lograr que al menos 10000 usuarios pagos que facturan en web instalen la app móvil y realicen una acción de valor desde la app durante el trimestre", baseline: "7601", target: "10000", percentage: "15.6%", currentResult: "8785", achievedIncrease: "15.6%" },
      { id: "kr-2.2", name: "Alcanzar 6k usuarios que facturen mensualmente desde la app móvil al final del trimestre", baseline: "—", target: "6k", percentage: "—", currentResult: "4,6k", achievedIncrease: "—" },
      { id: "kr-2.3", name: "Incrementar de 2k usuarios a 3k usuarios creando contactos mensualmente desde la app", baseline: "2k", target: "3k", percentage: "25%", currentResult: "2,5k", achievedIncrease: "25%" },
    ],
  },
];

function Section4() {
  const okr1 = q3Okrs.find((o) => o.id === "obj-1");
  const okr2 = q3Okrs.find((o) => o.id === "obj-2");

  return (
    <div className="space-y-12">
      {/* OKRs Block */}
      <div>
        <div className="mb-5 flex items-center gap-2">
          <div className="h-1 w-10 rounded-full" style={{ backgroundColor: ALEGRA_GREEN }} />
          <h2 className="text-lg font-bold text-neutral-900">OKRs del período</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {okr1 && <OKRMiniCard okr={okr1} kind="experience" />}
          {okr2 && <OKRMiniCard okr={okr2} kind="adoption" />}
        </div>
      </div>

      {/* Items totales semanal movido a iniciativa "Home — acciones rápidas" */}

      {/* Iniciativas: Desarrollo */}
      <div>
        <div className="mb-5 flex items-center gap-3">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white"
            style={{ backgroundColor: ALEGRA_GREEN }}
          >
            <Wrench className="h-3.5 w-3.5" />
            Desarrollo
          </div>
          <div className="h-px flex-1 bg-neutral-200" />
          <span className="text-xs text-neutral-500">{devInitiativesS4.length} iniciativas</span>
        </div>
        <div className="space-y-3">
          {devInitiativesS4.map((i, idx) => (
            <InitiativeAccordion
              key={idx}
              {...i}
              Detail={q3InitiativeDetailMap[i.title]}
            />
          ))}
        </div>
      </div>

      {/* Iniciativas: No Desarrollo */}
      <div>
        <div className="mb-5 flex items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
            <ClipboardList className="h-3.5 w-3.5" />
            No Desarrollo
          </div>
          <div className="h-px flex-1 bg-neutral-200" />
          <span className="text-xs text-neutral-500">{nonDevInitiativesS4.length} iniciativas</span>
        </div>
        <div className="space-y-3">
          {nonDevInitiativesS4.map((i, idx) => (
            <InitiativeAccordion
              key={idx}
              {...i}
              Detail={q3InitiativeDetailMap[i.title]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// === Sección 6: Issues ===

function SectionIssues() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
            style={{ backgroundColor: `#EF444415` }}
          >
            <AlertTriangle className="h-5 w-5" style={{ color: "#EF4444" }} />
          </div>
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: "#EF4444" }}
            >
              Bloqueadores y bugs
            </p>
            <h2 className="mt-1 text-2xl font-bold text-neutral-900">
              Issues
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              Issues detectados durante el período que requieren atención del equipo.
            </p>
          </div>
        </div>
      </div>

      {/* Cantidad de bugs por mes según Soporte */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Tendencia
            </p>
            <h3 className="mt-1 text-base font-bold text-neutral-900">
              Cantidad de bugs por mes según Soporte
            </h3>
            <p className="mt-1 text-xs text-neutral-500">
              Octubre 2025 – Julio 2026
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-center">
              <p className="text-lg font-bold text-emerald-700">97%</p>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600">Resolución</p>
            </div>
            <a
              href="https://datastudio.google.com/u/0/reporting/fc5b7d56-a831-48bd-a903-aa01bc1779b0/page/p_659nk7t5gd?s=s8etNsfsP48"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[11px] font-medium text-neutral-500 hover:text-neutral-900"
            >
              Data Studio <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        <div className="mt-5 h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={[
                { mes: "Oct", cantidad: 3 },
                { mes: "Nov", cantidad: 4 },
                { mes: "Dic", cantidad: 3 },
                { mes: "Ene", cantidad: 4 },
                { mes: "Feb", cantidad: 6 },
                { mes: "Mar", cantidad: 5 },
                { mes: "Abr", cantidad: 5 },
                { mes: "May", cantidad: 3 },
                { mes: "Jun", cantidad: 11 },
                { mes: "Jul", cantidad: 2 },
              ]}
              margin={{ top: 10, right: 16, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="mes" tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }} />
              <Line
                type="monotone"
                dataKey="cantidad"
                name="Bugs"
                stroke="#EF4444"
                strokeWidth={2.5}
                dot={{ r: 4, fill: "#EF4444" }}
                activeDot={{ r: 6 }}
              >
                <LabelList dataKey="cantidad" position="top" style={{ fontSize: 11, fill: "#374151", fontWeight: 600 }} />
              </Line>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Issues atacados — Creados vs Cerrados */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Estabilidad
            </p>
            <h3 className="mt-1 text-base font-bold text-neutral-900">
              Issues atacados — Creados vs Cerrados
            </h3>
            <p className="mt-1 text-xs text-neutral-500">
              Diciembre 2025 – Julio 2026 · *Jul parcial
            </p>
          </div>
          <a
            href="https://linear.app/alegra/project/tmd-mobie-app-estabilidad-bc05f75e5e98/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] font-medium text-neutral-500 hover:text-neutral-900"
          >
            Ver en Linear <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        <div className="mt-5 h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                { mes: "Dic-25", creados: 15, cerrados: 2 },
                { mes: "Ene-26", creados: 4, cerrados: 10 },
                { mes: "Feb-26", creados: 8, cerrados: 6 },
                { mes: "Mar-26", creados: 17, cerrados: 13 },
                { mes: "Abr-26", creados: 16, cerrados: 20 },
                { mes: "May-26", creados: 9, cerrados: 4 },
                { mes: "Jun-26", creados: 8, cerrados: 7 },
                { mes: "Jul-26*", creados: 2, cerrados: 7 },
              ]}
              margin={{ top: 16, right: 16, left: 0, bottom: 0 }}
              barCategoryGap="25%"
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="mes" tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
              <Bar dataKey="creados" name="Creados" fill="#EF4444" radius={[4, 4, 0, 0]}>
                <LabelList dataKey="creados" position="top" style={{ fontSize: 10, fill: "#6b7280" }} />
              </Bar>
              <Bar dataKey="cerrados" name="Cerrados" fill={ALEGRA_GREEN} radius={[4, 4, 0, 0]}>
                <LabelList dataKey="cerrados" position="top" style={{ fontSize: 10, fill: "#6b7280" }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// --- Datos Soporte (Amplitude charts h88jlpxl + dfv2ba96) - últimos 3 meses ---
const soporteData = [
  { mes: "Feb '26", uniques: 268, totals: 493 },
  { mes: "Mar '26", uniques: 289, totals: 510 },
  { mes: "Abr '26", uniques: 213, totals: 381 },
  { mes: "May '26", uniques: 291, totals: 490 },
  { mes: "Jun '26", uniques: 258, totals: 428 },
  { mes: "Jul '26", uniques: 256, totals: 406 },
];

function SoporteFuncDetail() {
  const lastUniques = soporteData[soporteData.length - 1].uniques;
  const lastTotals = soporteData[soporteData.length - 1].totals;

  return (
    <div className="space-y-5">
      {/* Problema detectado + Oportunidad — compacto */}
      <div className="rounded-lg border border-amber-200 bg-amber-50/50 px-3 py-2">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="flex-1 min-w-[260px]">
            <p className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Problema detectado</p>
            <p className="mt-1 text-xs leading-relaxed text-neutral-800">
              El usuario debe ir a la web para realizar un reclamo de soporte; la app no gestiona tickets.
            </p>
          </div>
          <div className="flex-1 min-w-[260px] rounded-md border border-emerald-200 bg-emerald-50/60 px-3 py-2">
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Oportunidad</p>
              <a
                href="https://claude.ai/design/p/9a44db74-0c3c-4b5a-9c38-c22c7b9d0ba0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold transition-colors hover:bg-white"
                style={{ borderColor: "#10B98133", color: "#047857", backgroundColor: "#10B98110" }}
              >
                <Sparkles className="h-3 w-3" /> Ver prototipo <ExternalLink className="h-2.5 w-2.5" />
              </a>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-neutral-800">
              Link mágico creado por Identity.
            </p>
          </div>
        </div>
      </div>

      {/* Charts lado a lado */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Únicos */}
        <div className="rounded-xl border border-neutral-200 bg-white p-4">
          <div className="mb-3 flex items-start justify-between gap-3 flex-wrap">
            <div>
              <h4 className="text-sm font-bold text-neutral-900">App Support Request — Únicos</h4>
              <p className="mt-0.5 text-xs text-neutral-500">
                Usuarios únicos que solicitaron soporte desde la app · mensual
              </p>
            </div>
            <Badge variant="outline" className="text-[10px]" style={{ borderColor: "#FCD34D", color: "#B45309" }}>
              Abr '26: {lastUniques}
            </Badge>
          </div>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={soporteData} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="mes" tick={{ fontSize: 11 }} stroke="#6b7280" />
                <YAxis tick={{ fontSize: 11 }} stroke="#6b7280" />
                <Tooltip formatter={(v: number) => v.toLocaleString()} />
                <Bar dataKey="uniques" fill="#F59E0B" radius={[4, 4, 0, 0]}>
                  <LabelList
                    dataKey="uniques"
                    position="top"
                    style={{ fontSize: 11, fill: "#374151", fontWeight: 700 }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <a
            href="https://app.amplitude.com/analytics/alegra/chart/h88jlpxl"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-neutral-500 hover:text-neutral-800"
          >
            <ExternalLink className="h-3 w-3" /> Amplitude · h88jlpxl
          </a>
        </div>

        {/* Totales */}
        <div className="rounded-xl border border-neutral-200 bg-white p-4">
          <div className="mb-3 flex items-start justify-between gap-3 flex-wrap">
            <div>
              <h4 className="text-sm font-bold text-neutral-900">App Support Request — Total</h4>
              <p className="mt-0.5 text-xs text-neutral-500">
                Total de solicitudes (eventos) de soporte desde la app · mensual
              </p>
            </div>
            <Badge variant="outline" className="text-[10px]" style={{ borderColor: "#FCD34D", color: "#B45309" }}>
              Abr '26: {lastTotals}
            </Badge>
          </div>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={soporteData} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="mes" tick={{ fontSize: 11 }} stroke="#6b7280" />
                <YAxis tick={{ fontSize: 11 }} stroke="#6b7280" />
                <Tooltip formatter={(v: number) => v.toLocaleString()} />
                <Bar dataKey="totals" fill="#FCD34D" radius={[4, 4, 0, 0]}>
                  <LabelList
                    dataKey="totals"
                    position="top"
                    style={{ fontSize: 11, fill: "#374151", fontWeight: 700 }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <a
            href="https://app.amplitude.com/analytics/alegra/chart/dfv2ba96"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-neutral-500 hover:text-neutral-800"
          >
            <ExternalLink className="h-3 w-3" /> Amplitude · dfv2ba96
          </a>
        </div>
      </div>

      {/* Prototipo movido al header del Problema detectado */}
    </div>
  );
}


// === Sección 7: Funnel ===
// Datos extraídos de Amplitude (range = This Year, segment entrepreneur)
//   tgvpb7n5  Funnel Entero (4 pasos)         · ozsknaof Mobile web (4 pasos)
//   6lwwlzbl  Funnel Entero sin PQL (3 pasos) · jdusjvvg Mobile web sin PQL (3 pasos)
//   tnh09978  Funnel Entero App Mobile por País (group-by Country)
//   42w27hn3  Perfil por País (uniques semanal)
//   b6xrlqln/txoefzi7/kcf69jc1  Tendencias mensuales Perfil→MQL/PQL/Logo
//   j30yk1tu  Eventos Onboarding Semanal (Perfil/MQL/PQL)

// --- Funnels combinados: Todos vs Mobile web (con PQL) ---
// Datos refresh Amplitude (tgvpb7n5 + ozsknaof, This Year, segment entrepreneur)
const funnelComboPQL = [
  { step: "Perfil", todosCount: 3335, todosPct: 100, mobileCount: 10567, mobilePct: 100 },
  { step: "Onboarding", todosCount: 2886, todosPct: 86.54, mobileCount: 6960, mobilePct: 65.87 },
  { step: "PQL · Intento factura", todosCount: 589, todosPct: 17.66, mobileCount: 1593, mobilePct: 15.08 },
  { step: "Logo · Pago", todosCount: 39, todosPct: 1.17, mobileCount: 105, mobilePct: 0.99 },
];

// --- Funnels combinados sin PQL: Mobile App vs Mobile web ---
// Mobile App (6lwwlzbl): 3338 → 2888 → 64 = 1.92%
// Mobile web (jdusjvvg): 10577 → 6968 → 289 = 2.74%
const funnelComboSinPQL = [
  { step: "Perfil", todosCount: 3338, todosPct: 100, mobileCount: 10577, mobilePct: 100 },
  { step: "Onboarding", todosCount: 2888, todosPct: 86.52, mobileCount: 6968, mobilePct: 65.88 },
  { step: "Logo · Pago", todosCount: 64, todosPct: 1.92, mobileCount: 289, mobilePct: 2.74 },
];

// --- Tendencias mensuales (charts b6xrlqln / txoefzi7 / kcf69jc1, Ene → Jun '26) ---
const tendenciaPerfilMQL = [
  { mes: "Ene '26", pct: 87.0 },
  { mes: "Feb '26", pct: 84.7 },
  { mes: "Mar '26", pct: 86.9 },
  { mes: "Abr '26", pct: 87.5 },
  { mes: "May '26", pct: 89.0 },
  { mes: "Jun '26", pct: 89.9 },
];
const tendenciaPerfilPQL = [
  { mes: "Ene '26", pct: 19.2 },
  { mes: "Feb '26", pct: 15.7 },
  { mes: "Mar '26", pct: 14.3 },
  { mes: "Abr '26", pct: 14.5 },
  { mes: "May '26", pct: 16.3 },
  { mes: "Jun '26", pct: 15.8 },
];
const tendenciaPerfilLogo = [
  { mes: "Ene '26", pct: 1.4 },
  { mes: "Feb '26", pct: 1.2 },
  { mes: "Mar '26", pct: 1.5 },
  { mes: "Abr '26", pct: 0.9 },
  { mes: "May '26", pct: 1.2 },
  { mes: "Jun '26", pct: 1.0 },
];

// --- Funnel App Mobile por país (chart tnh09978) - solo CO, MX, CR, PE ---
const funnelPorPais: Record<string, { perfil: number; onboarding: number; pql: number; logo: number; conv: number }> = {
  Colombia: { perfil: 1236, onboarding: 1077, pql: 271, logo: 21, conv: 1.70 },
  Mexico: { perfil: 569, onboarding: 498, pql: 78, logo: 5, conv: 0.88 },
  "Costa Rica": { perfil: 126, onboarding: 111, pql: 25, logo: 2, conv: 1.59 },
  "Rep. Dominicana": { perfil: 938, onboarding: 812, pql: 198, logo: 16, conv: 1.71 },
};

// --- Perfil por país (chart 42w27hn3) - totales últimas 24 semanas (sin USA) ---
const perfilPorPaisTotal: { country: string; uniques: number }[] = [
  { country: "Colombia", uniques: 1502 },
  { country: "Dominican Republic", uniques: 938 },
  { country: "Mexico", uniques: 642 },
  { country: "Argentina", uniques: 220 },
  { country: "Peru", uniques: 165 },
  { country: "Spain", uniques: 154 },
  { country: "Costa Rica", uniques: 150 },
  { country: "Panama", uniques: 89 },
];

// --- Eventos Onboarding Mensual (chart j30yk1tu/edit/584t53it, Ene → Jun '26) ---
const eventosOnboardingMensual = [
  { mes: "Ene '26", perfil: 268, mql: 226, pql: 47 },
  { mes: "Feb '26", perfil: 884, mql: 738, pql: 158 },
  { mes: "Mar '26", perfil: 877, mql: 751, pql: 153 },
  { mes: "Abr '26", perfil: 1268, mql: 1089, pql: 222 },
  { mes: "May '26", perfil: 1284, mql: 1117, pql: 263 },
  { mes: "Jun '26", perfil: 1246, mql: 1096, pql: 270 },
];

type FunnelComboDatum = {
  step: string;
  todosCount: number;
  todosPct: number;
  mobileCount: number;
  mobilePct: number;
};

function FunnelComboCard({
  title,
  subtitle,
  source,
  data,
}: {
  title: string;
  subtitle: string;
  source?: string;
  data: FunnelComboDatum[];
}) {
  const [mode, setMode] = useState<"pct" | "num">("pct");
  const finalTodos = data[data.length - 1].todosPct;
  const finalMobile = data[data.length - 1].mobilePct;

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">{subtitle}</p>
          <h3 className="mt-1 text-base font-bold text-neutral-900">{title}</h3>
          {source && <p className="mt-1 text-xs text-neutral-500">{source}</p>}
        </div>
        <div className="inline-flex rounded-lg border border-neutral-200 bg-neutral-50 p-0.5">
          <button
            onClick={() => setMode("pct")}
            className={cn(
              "rounded-md px-2.5 py-1 text-[11px] font-semibold transition-all",
              mode === "pct" ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500",
            )}
          >
            %
          </button>
          <button
            onClick={() => setMode("num")}
            className={cn(
              "rounded-md px-2.5 py-1 text-[11px] font-semibold transition-all",
              mode === "num" ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500",
            )}
          >
            #
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-baseline gap-x-6 gap-y-1">
        <div className="flex items-baseline gap-2">
          <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: ALEGRA_GREEN }} />
          <span className="text-xs font-semibold text-neutral-700">Mobile App</span>
          <span className="text-lg font-bold" style={{ color: ALEGRA_GREEN }}>
            {finalTodos.toFixed(2)}%
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: "#FF6B00" }} />
          <span className="text-xs font-semibold text-neutral-700">Mobile web</span>
          <span className="text-lg font-bold" style={{ color: "#FF6B00" }}>
            {finalMobile.toFixed(2)}%
          </span>
        </div>
      </div>

      <div className="mt-5 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 28, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis dataKey="step" tick={{ fontSize: 10, fill: "#6b7280" }} axisLine={false} tickLine={false} />
            <YAxis
              tick={{ fontSize: 11, fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => (mode === "pct" ? `${v}%` : v.toLocaleString())}
            />
            <Tooltip
              contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }}
              formatter={(value: number, name: string, item) => {
                const p = item.payload as FunnelComboDatum;
                const isTodos = name === "Mobile App";
                const pct = isTodos ? p.todosPct : p.mobilePct;
                const count = isTodos ? p.todosCount : p.mobileCount;
                return [
                  mode === "pct"
                    ? `${pct.toFixed(2)}%  (${count.toLocaleString()})`
                    : `${count.toLocaleString()}  (${pct.toFixed(2)}%)`,
                  name,
                ];
              }}
            />
            <Legend wrapperStyle={{ fontSize: 11 }} iconType="square" />
            <Bar
              name="Mobile App"
              dataKey={mode === "pct" ? "todosPct" : "todosCount"}
              fill={ALEGRA_GREEN}
              radius={[6, 6, 0, 0]}
            >
              <LabelList
                position="top"
                style={{ fontSize: 10, fill: "#374151", fontWeight: 700 }}
                formatter={(v: number) => (mode === "pct" ? `${v.toFixed(2)}%` : v.toLocaleString())}
              />
            </Bar>
            <Bar
              name="Mobile web"
              dataKey={mode === "pct" ? "mobilePct" : "mobileCount"}
              fill="#FF6B00"
              radius={[6, 6, 0, 0]}
            >
              <LabelList
                position="top"
                style={{ fontSize: 10, fill: "#374151", fontWeight: 700 }}
                formatter={(v: number) => (mode === "pct" ? `${v.toFixed(2)}%` : v.toLocaleString())}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// --- Card combinada de tendencias (toggle MQL / PQL / Logo) ---
type TrendKey = "mql" | "pql" | "logo";

const trendsConfig: Record<
  TrendKey,
  {
    label: string;
    subtitle: string;
    color: string;
    url: string;
    data: { mes: string; pct: number }[];
  }
> = {
  mql: {
    label: "Perfil → MQL",
    subtitle: "Onboarding finalizado",
    color: ALEGRA_GREEN,
    url: "https://app.amplitude.com/analytics/alegra/chart/b6xrlqln",
    data: tendenciaPerfilMQL,
  },
  pql: {
    label: "Perfil → PQL",
    subtitle: "Intento de factura",
    color: "#FF6B00",
    url: "https://app.amplitude.com/analytics/alegra/chart/txoefzi7",
    data: tendenciaPerfilPQL,
  },
  logo: {
    label: "Perfil → Logo",
    subtitle: "Pago suscripción",
    color: "#0066FF",
    url: "https://app.amplitude.com/analytics/alegra/chart/kcf69jc1",
    data: tendenciaPerfilLogo,
  },
};

function TrendCombinedCard() {
  const [active, setActive] = useState<TrendKey>("mql");
  const cfg = trendsConfig[active];
  const oct = cfg.data[0]?.pct ?? 0;
  const firstMes = cfg.data[0]?.mes ?? "";
  const last = cfg.data[cfg.data.length - 1]?.pct ?? 0;
  const delta = last - oct;
  const deltaPct = oct !== 0 ? (delta / oct) * 100 : 0;
  const positive = delta >= 0;

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Tendencia mensual · últimos 6-7 meses
          </p>
          <h3 className="mt-1 text-base font-bold text-neutral-900">{cfg.label}</h3>
          <p className="mt-1 text-xs text-neutral-500">{cfg.subtitle}</p>
        </div>
        <div className="inline-flex flex-wrap rounded-lg border border-neutral-200 bg-neutral-50 p-0.5">
          {(Object.keys(trendsConfig) as TrendKey[]).map((k) => (
            <button
              key={k}
              onClick={() => setActive(k)}
              className={cn(
                "rounded-md px-3 py-1.5 text-[11px] font-semibold transition-all",
                active === k ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500 hover:text-neutral-800",
              )}
              style={active === k ? { color: trendsConfig[k].color } : undefined}
            >
              {trendsConfig[k].label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-baseline gap-3">
        <span className="text-3xl font-bold" style={{ color: cfg.color }}>
          {last.toFixed(2)}%
        </span>
        <span className="text-xs text-neutral-500">
          {firstMes}: <span className="font-semibold text-neutral-700">{oct.toFixed(2)}%</span>
        </span>
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold",
            positive ? "bg-emerald-50 text-emerald-700" : "bg-orange-50 text-orange-700",
          )}
        >
          {positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          {positive ? "+" : ""}
          {deltaPct.toFixed(2)}% vs {firstMes}
        </span>
      </div>

      <div className="mt-4 h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={cfg.data} margin={{ top: 16, right: 24, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis dataKey="mes" tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={false} tickLine={false} />
            <YAxis
              tick={{ fontSize: 11, fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip
              contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }}
              formatter={(v: number) => [`${v.toFixed(2)}%`, "Conversión"]}
            />
            <Line
              type="monotone"
              dataKey="pct"
              stroke={cfg.color}
              strokeWidth={2.5}
              dot={{ r: 3.5, fill: cfg.color }}
              activeDot={{ r: 5.5 }}
            >
              <LabelList
                dataKey="pct"
                position="top"
                style={{ fontSize: 10, fill: "#374151", fontWeight: 600 }}
                formatter={(v: number) => `${v.toFixed(1)}%`}
              />
            </Line>
          </LineChart>
        </ResponsiveContainer>
      </div>

      <a
        href={cfg.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-neutral-500 hover:text-neutral-800"
      >
        <ExternalLink className="h-3 w-3" /> Ver en Amplitude
      </a>
    </div>
  );
}

// --- Funnel por País + selector de cards ---
const COUNTRY_COLORS: Record<string, string> = {
  Colombia: ALEGRA_GREEN,
  Mexico: "#0066FF",
  "Costa Rica": "#FF6B00",
  "Rep. Dominicana": "#A855F7",
};

function CountrySelectorCards({
  selected,
  setSelected,
}: {
  selected: string | null;
  setSelected: (c: string | null) => void;
}) {
  const countries = Object.keys(funnelPorPais);
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {countries.map((c) => {
        const isActive = selected === c;
        const d = funnelPorPais[c];
        const color = COUNTRY_COLORS[c] ?? "#6b7280";
        return (
          <button
            key={c}
            onClick={() => setSelected(isActive ? null : c)}
            className={cn(
              "rounded-2xl border bg-white px-4 py-3 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md",
              isActive
                ? "border-transparent ring-2"
                : "border-neutral-200 hover:border-neutral-300",
            )}
            style={
              isActive
                ? { backgroundColor: `${color}10`, borderColor: color, boxShadow: `0 0 0 2px ${color}40` }
                : undefined
            }
          >
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-700">{c}</p>
            </div>
            <p className="mt-1 text-2xl font-bold" style={{ color: isActive ? color : "#111827" }}>
              {d.conv.toFixed(2)}%
            </p>
            <p className="text-[10px] text-neutral-500">{d.perfil.toLocaleString()} perfiles · conversión total</p>
          </button>
        );
      })}
    </div>
  );
}

function FunnelByCountryCard({
  selected,
  setSelected,
}: {
  selected: string | null;
  setSelected: (c: string | null) => void;
}) {
  const countries = Object.keys(funnelPorPais);
  const stepKeys = ["perfil", "onboarding", "pql", "logo"] as const;
  const stepLabels = ["Perfil", "Onboarding", "PQL · Intento", "Logo · Pago"];

  const visibleCountries = selected ? [selected] : countries;

  // Build chart data: one row per step, one bar per visible country (% over its own perfil)
  const chartData = stepLabels.map((label, idx) => {
    const key = stepKeys[idx];
    const row: Record<string, number | string> = { step: label };
    visibleCountries.forEach((c) => {
      const d = funnelPorPais[c];
      const base = d.perfil || 1;
      row[c] = (d[key] / base) * 100;
      row[`${c}__count`] = d[key];
    });
    return row;
  });

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">App Mobile · por país</p>
          <h3 className="mt-1 text-base font-bold text-neutral-900">Funnel Entero App Mobile por País</h3>
        </div>
        <a
          href="https://app.amplitude.com/analytics/alegra/chart/tnh09978"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[11px] font-semibold text-neutral-500 hover:text-neutral-800"
        >
          <ExternalLink className="h-3 w-3" /> Amplitude
        </a>
      </div>

      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-2xl font-bold text-neutral-900">
          {selected ?? "Comparativo 4 países"}
        </span>
        {selected ? (
          <span className="text-xs text-neutral-500">
            conversión total{" "}
            <span className="font-semibold" style={{ color: COUNTRY_COLORS[selected] }}>
              {funnelPorPais[selected].conv.toFixed(2)}%
            </span>
            {" · "}
            <button onClick={() => setSelected(null)} className="underline hover:text-neutral-800">
              ver todos
            </button>
          </span>
        ) : (
          <span className="text-xs text-neutral-500">click en un país (arriba) para filtrar</span>
        )}
      </div>

      <div className="mt-4 h-[340px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 24, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis dataKey="step" tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={false} tickLine={false} />
            <YAxis
              tick={{ fontSize: 11, fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip
              contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }}
              formatter={(v: number, name: string, item) => {
                const payload = item.payload as Record<string, number>;
                const count = payload[`${name}__count`];
                return [`${v.toFixed(2)}%  (${count?.toLocaleString?.() ?? count} usuarios)`, name];
              }}
            />
            {visibleCountries.length > 1 && <Legend wrapperStyle={{ fontSize: 11 }} iconType="circle" />}
            {visibleCountries.map((c) => (
              <Bar key={c} dataKey={c} fill={COUNTRY_COLORS[c] ?? "#6b7280"} radius={[6, 6, 0, 0]}>
                {visibleCountries.length === 1 && (
                  <LabelList
                    dataKey={c}
                    position="top"
                    style={{ fontSize: 11, fill: "#374151", fontWeight: 700 }}
                    formatter={(v: number) => `${v.toFixed(2)}%`}
                  />
                )}
              </Bar>
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// --- Perfil por País (chart 42w27hn3) ---
const PIE_COLORS = ["#00C853", "#0066FF", "#FF6B00", "#A855F7", "#06B6D4", "#F59E0B", "#EC4899", "#10B981", "#6366F1"];

function PerfilPorPaisCard() {
  const totalPerfiles = perfilPorPaisTotal.reduce((acc, x) => acc + x.uniques, 0);

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">Distribución</p>
          <h3 className="mt-1 text-base font-bold text-neutral-900">Perfil por País</h3>
        </div>
        <a
          href="https://app.amplitude.com/analytics/alegra/chart/42w27hn3"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[11px] font-semibold text-neutral-500 hover:text-neutral-800"
        >
          <ExternalLink className="h-3 w-3" /> Amplitude
        </a>
      </div>

      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-3xl font-bold text-neutral-900">{totalPerfiles.toLocaleString()}</span>
        <span className="text-xs text-neutral-500">perfiles seleccionados (top {perfilPorPaisTotal.length} países)</span>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={perfilPorPaisTotal}
                dataKey="uniques"
                nameKey="country"
                cx="50%"
                cy="50%"
                outerRadius={85}
                innerRadius={45}
                paddingAngle={2}
              >
                {perfilPorPaisTotal.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }}
                formatter={(v: number, n: string) => [
                  `${v.toLocaleString()} (${((v / totalPerfiles) * 100).toFixed(1)}%)`,
                  n,
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-1.5">
          {perfilPorPaisTotal.map((row, i) => {
            const pct = (row.uniques / totalPerfiles) * 100;
            return (
              <div key={row.country} className="flex items-center gap-2 text-xs">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-sm"
                  style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }}
                />
                <span className="flex-1 truncate font-medium text-neutral-700">{row.country}</span>
                <span className="font-semibold text-neutral-900">{row.uniques.toLocaleString()}</span>
                <span className="w-12 text-right text-neutral-500">{pct.toFixed(1)}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// --- Eventos Onboarding Mensual (chart j30yk1tu/edit/584t53it) ---
function EventosOnboardingSemanalCard() {
  const first = eventosOnboardingMensual[0];
  const last = eventosOnboardingMensual[eventosOnboardingMensual.length - 1];
  const perfilDelta = ((last.perfil - first.perfil) / first.perfil) * 100;
  const mqlDelta = ((last.mql - first.mql) / first.mql) * 100;
  const pqlDelta = ((last.pql - first.pql) / first.pql) * 100;
  const tag = (label: string, v: number) => (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ring-1",
        v >= 0 ? "bg-emerald-50 text-emerald-700 ring-emerald-200" : "bg-orange-50 text-orange-700 ring-orange-200",
      )}
    >
      {v >= 0 ? <TrendingUp className="h-2.5 w-2.5" /> : <TrendingDown className="h-2.5 w-2.5" />}
      {label} {v >= 0 ? "+" : ""}
      {v.toFixed(1)}%
    </span>
  );
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">Volumen mensual</p>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <h3 className="text-base font-bold text-neutral-900">Eventos Onboarding Mensual</h3>
            {tag("Perfil", perfilDelta)}
            {tag("MQL", mqlDelta)}
            {tag("PQL", pqlDelta)}
          </div>
        </div>
        <a
          href="https://app.amplitude.com/analytics/alegra/chart/j30yk1tu/edit/584t53it"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[11px] font-semibold text-neutral-500 hover:text-neutral-800"
        >
          <ExternalLink className="h-3 w-3" /> Amplitude
        </a>
      </div>

      <div className="mt-5 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={eventosOnboardingMensual} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis dataKey="mes" tick={{ fontSize: 10, fill: "#6b7280" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }}
              formatter={(v: number, n: string) => [v.toLocaleString(), n]}
            />
            <Legend wrapperStyle={{ fontSize: 11 }} iconType="circle" />
            <Line
              type="monotone"
              name="Perfil"
              dataKey="perfil"
              stroke={ALEGRA_GREEN}
              strokeWidth={2.5}
              dot={{ r: 3, fill: ALEGRA_GREEN }}
            />
            <Line
              type="monotone"
              name="MQL"
              dataKey="mql"
              stroke="#0066FF"
              strokeWidth={2.5}
              dot={{ r: 3, fill: "#0066FF" }}
            />
            <Line
              type="monotone"
              name="PQL"
              dataKey="pql"
              stroke="#FF6B00"
              strokeWidth={2.5}
              dot={{ r: 3, fill: "#FF6B00" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function SectionFunnel() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
            style={{ backgroundColor: `${ALEGRA_GREEN}15` }}
          >
            <Target className="h-5 w-5" style={{ color: ALEGRA_GREEN }} />
          </div>
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: ALEGRA_GREEN }}
            >
              Conversión end-to-end
            </p>
            <h2 className="mt-1 text-2xl font-bold text-neutral-900">Funnel</h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              Segmento <strong>entrepreneur</strong> · Año en curso. Comparamos el funnel <strong>Mobile App</strong> frente a <strong>Mobile web</strong>, con y sin PQL (intento de factura). Debajo, el funnel <strong>App Mobile por país</strong> y la distribución de perfiles por mercado.
            </p>
          </div>
        </div>
      </div>

      {/* Funnels combinados Mobile App vs Mobile web - 2 columnas */}
      <div className="grid gap-6 lg:grid-cols-2">
        <FunnelComboCard
          title="Funnel Entero — Mobile App vs Mobile web"
          subtitle="Con PQL · 4 pasos"
          
          data={funnelComboPQL}
        />
        <FunnelComboCard
          title="Funnel Entero sin PQL — Mobile App vs Mobile web"
          subtitle="Sin PQL · 3 pasos"
          data={funnelComboSinPQL}
        />
      </div>

      {/* Selector de países (afuera del dashboard) */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <div className="h-1 w-10 rounded-full" style={{ backgroundColor: ALEGRA_GREEN }} />
          <h3 className="text-base font-bold text-neutral-900">Selecciona un país</h3>
          <span className="text-xs text-neutral-500">· filtra el funnel App Mobile</span>
        </div>
        <CountrySelectorCards selected={selectedCountry} setSelected={setSelectedCountry} />
      </div>

      {/* Funnel por País (3/4) + Perfil por País (1/4) */}
      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <FunnelByCountryCard selected={selectedCountry} setSelected={setSelectedCountry} />
        </div>
        <div className="lg:col-span-1">
          <PerfilPorPaisCard />
        </div>
      </div>

      {/* Tendencia combinada con tag selector */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <TrendingUp className="h-4 w-4" style={{ color: ALEGRA_GREEN }} />
          <h3 className="text-lg font-bold text-neutral-900">Tendencia mensual de conversión</h3>
          <span className="text-xs text-neutral-500">· comparativo vs Octubre 2025</span>
        </div>
        <TrendCombinedCard />
      </div>

      {/* Eventos Onboarding Semanal */}
      <EventosOnboardingSemanalCard />
    </div>
  );
}
function OKRMiniCard({
  okr,
  kind,
}: {
  okr: (typeof okrs)[number];
  kind: "experience" | "adoption";
}) {
  const isExp = kind === "experience";
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2">
        <Badge
          variant="outline"
          className="border-neutral-300 text-[10px] font-bold uppercase tracking-wider"
          style={{
            borderColor: isExp ? "#0066FF" : ALEGRA_GREEN,
            color: isExp ? "#0066FF" : ALEGRA_GREEN,
          }}
        >
          {isExp ? "Experiencia" : "Adopción"}
        </Badge>
        {!isExp && (
          <Badge
            variant="outline"
            className="text-[10px] font-bold uppercase tracking-wider"
            style={{ borderColor: "#FF6B00", color: "#FF6B00" }}
          >
            Engagement
          </Badge>
        )}
      </div>
      <p className="mt-3 text-sm font-semibold leading-snug text-neutral-900">
        {okr.objective}
      </p>
      <div className="mt-4 space-y-2.5">
        {okr.keyResults.map((kr) => {
          const num = Number.parseFloat(kr.percentage.replace(/[%,]/g, ""));
          const isDecrease = Number.isFinite(num) && num < 0;
          return (
            <div
              key={kr.id}
              className="rounded-lg bg-neutral-50 p-3"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                  {kr.id.toUpperCase()}
                </span>
                <span
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold",
                    isDecrease
                      ? "bg-orange-100 text-orange-700"
                      : "bg-emerald-100 text-emerald-700",
                  )}
                >
                  {isDecrease ? (
                    <TrendingDown className="h-3 w-3" />
                  ) : (
                    <TrendingUp className="h-3 w-3" />
                  )}
                  {kr.percentage}
                </span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-neutral-600">
                {kr.name}
              </p>
              <div className="mt-2 grid grid-cols-3 gap-2 text-[11px] text-neutral-500">
                <span>
                  Base:{" "}
                  <span className="font-semibold text-neutral-800">{kr.baseline}</span>
                </span>
                <span>
                  Target:{" "}
                  <span className="font-semibold text-neutral-800">{kr.target}</span>
                </span>
                <span>
                  Actual:{" "}
                  <span className="font-semibold text-neutral-800">{kr.currentResult ?? "—"}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SimpleInitiativeCard({
  title,
  tags,
  problem,
  onClick,
}: {
  title: string;
  tags: string[];
  problem: string;
  krs?: string[];
  onClick?: () => void;
}) {
  const tagColor = (t: string) => {
    if (t === "Engagement") return "#FF6B00";
    if (t === "Adopción") return ALEGRA_GREEN;
    if (t === "Experiencia") return "#0066FF";
    return "#737373";
  };
  return (
    <div
      onClick={onClick}
      className={cn(
        "group flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md",
        onClick && "cursor-pointer hover:border-emerald-300",
      )}
    >
      <h3 className="text-sm font-bold leading-snug text-neutral-900">{title}</h3>
      <div className="mt-2 flex flex-wrap gap-1">
        {tags.map((t) => (
          <Badge
            key={t}
            variant="outline"
            className="text-[10px] font-semibold"
            style={{ borderColor: tagColor(t), color: tagColor(t) }}
          >
            {t}
          </Badge>
        ))}
      </div>
      <div className="mt-3">
        <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
          Problema
        </p>
        <p className="mt-1 text-xs leading-relaxed text-neutral-600 line-clamp-3">
          {problem}
        </p>
      </div>
    </div>
  );
}

// === Sección 5: Diagnóstico y oportunidades ===

function CollapsibleSection({
  title,
  subtitle,
  color,
  defaultOpen = false,
  children,
}: {
  title: string;
  subtitle?: string;
  color: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Collapsible defaultOpen={defaultOpen} className="group/collap">
      <CollapsibleTrigger className="flex w-full items-center justify-between rounded-2xl border border-neutral-200 bg-white px-5 py-4 text-left shadow-sm transition hover:bg-neutral-50">
        <div className="flex items-center gap-2">
          <div className="h-1 w-10 rounded-full" style={{ backgroundColor: color }} />
          <h2 className="text-lg font-bold text-neutral-900">{title}</h2>
          {subtitle && <span className="ml-2 text-xs text-neutral-500">{subtitle}</span>}
        </div>
        <ChevronDown className="h-4 w-4 text-neutral-500 transition-transform group-data-[state=open]/collap:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="mt-3">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  );
}

// Funcionalidades que más utilizan los Mobile First por fuera de la App (web).
// Cohort Mobile App Top Users Q3 · últimas 4 semanas · Fuente: Amplitude chart h6i1m5l2
const baseFueraDeApp = [
  { feature: "Creación Factura", uso: 25115 },
  { feature: "Pago recibido", uso: 19335 },
  { feature: "Editar fv", uso: 11891 },
  { feature: "Generar Reporte", uso: 11707 },
  { feature: "Imprimir fv", uso: 9941 },
  { feature: "Descargar fv", uso: 4683 },
  { feature: "Descargar reportes", uso: 4063 },
  { feature: "Nota de crédito", uso: 3441 },
  { feature: "Items", uso: 3388 },
  { feature: "Factura de compra", uso: 3155 },
  { feature: "Reportes por vendedor", uso: 2961 },
  { feature: "Pago de gastos", uso: 2560 },
  { feature: "Contacto", uso: 2253 },
  { feature: "Clonar fv", uso: 2064 },
  { feature: "Editar retenciones", uso: 1690 },
  { feature: "Cotizaciones", uso: 1578 },
  { feature: "Compartir fv", uso: 1201 },
];

// Color por iniciativa: cada oportunidad tiene un color que se usa también para
// pintar sus funcionalidades en el gráfico de arriba (juntar iniciativa ↔ features).
const OTROS_COLOR = "#94A3B8"; // gris neutro para features sin iniciativa asociada
const INICIATIVA_COLORS: Record<string, string> = {
  pagos: "#0066FF",
  "detalle-factura": "#7C3AED",
  "factura-venta": ALEGRA_GREEN,
  reportes: "#F59E0B",
};

// Cada feature del gráfico apunta a la iniciativa que la agrupa.
const featureColor: Record<string, string> = {
  "Creación Factura": INICIATIVA_COLORS["factura-venta"],
  "Pago recibido": INICIATIVA_COLORS["pagos"],
  "Editar fv": INICIATIVA_COLORS["detalle-factura"],
  "Imprimir fv": INICIATIVA_COLORS["detalle-factura"],
  "Descargar fv": INICIATIVA_COLORS["detalle-factura"],
  "Clonar fv": INICIATIVA_COLORS["detalle-factura"],
  "Compartir fv": INICIATIVA_COLORS["detalle-factura"],
  "Generar Reporte": INICIATIVA_COLORS["reportes"],
  "Descargar reportes": INICIATIVA_COLORS["reportes"],
  "Reportes por vendedor": INICIATIVA_COLORS["reportes"],
};

const oportunidades = [
  {
    id: "pagos",
    title: "Pagos recibidos",
    tags: ["Adopción", "Engagement"],
    color: INICIATIVA_COLORS["pagos"],
    resumen: "No hay sección de pagos recibidos; habilitar registro y consulta desde el flujo de la factura.",
  },
  {
    id: "detalle-factura",
    title: "Detalle de la factura",
    tags: ["Experiencia", "Adopción"],
    color: INICIATIVA_COLORS["detalle-factura"],
    resumen: "Faltan imprimir y clonar; sumarlas al detalle para cerrar el ciclo sin volver al PC.",
  },
  {
    id: "factura-venta",
    title: "Factura de venta",
    tags: ["Adopción", "Experiencia"],
    color: INICIATIVA_COLORS["factura-venta"],
    resumen: "Faltan retenciones y remisiones en varias versiones y crear factura desde foto.",
  },
  {
    id: "reportes",
    title: "Reportes",
    tags: ["Adopción", "Experiencia"],
    color: INICIATIVA_COLORS["reportes"],
    resumen: "No se pueden descargar ni compartir; faltan reportes clave de ventas e inventario.",
  },
];

// === Funcionalidades a profundizar ===
type FuncCard = {
  id: string;
  title: string;
  short: string;
};
const funcionalidadesCards: FuncCard[] = [
  { id: "contactos", title: "Contactos", short: "Llenado automático y captura rápida" },
  { id: "items", title: "Items", short: "Participación, intención y campos faltantes" },
];

// Funnel Home → New Item — chart w81wjr5i (semanal, last 12 weeks · cohort Pagos)
// Conversión semanal: app-home-visited → app-new-item-visited (excl. última semana incompleta)
const itemsAppVsWebSeries = [
  { mes: "01 Feb", pct: 3.61 },
  { mes: "08 Feb", pct: 3.30 },
  { mes: "15 Feb", pct: 3.38 },
  { mes: "22 Feb", pct: 3.27 },
  { mes: "01 Mar", pct: 3.44 },
  { mes: "08 Mar", pct: 3.68 },
  { mes: "15 Mar", pct: 3.47 },
  { mes: "22 Mar", pct: 3.15 },
  { mes: "29 Mar", pct: 2.64 },
  { mes: "05 Abr", pct: 3.55 },
  { mes: "12 Abr", pct: 8.21 },
  { mes: "19 Abr", pct: 7.08 },
];

// Intención de creación de Items — chart wh2ltvtf (semanal, last 12 weeks · all users)
// Conversión: app-new-item-visited → app-item-created
const itemsIntencion = [
  { mes: "01 Feb", conversion: 64.13 },
  { mes: "08 Feb", conversion: 70.53 },
  { mes: "15 Feb", conversion: 65.54 },
  { mes: "22 Feb", conversion: 64.75 },
  { mes: "01 Mar", conversion: 66.67 },
  { mes: "08 Mar", conversion: 70.38 },
  { mes: "15 Mar", conversion: 66.18 },
  { mes: "22 Mar", conversion: 61.65 },
  { mes: "29 Mar", conversion: 65.69 },
  { mes: "05 Abr", conversion: 52.95 },
  { mes: "12 Abr", conversion: 36.36 },
  { mes: "19 Abr", conversion: 39.46 },
  { mes: "26 Abr", conversion: 36.13 },
];

// % de participación de App en Items (último valor consolidado)
const ITEMS_APP_PARTICIPACION = 4.33;
// % de participación de App en Contactos (último valor consolidado)
const CONTACTOS_APP_PARTICIPACION = 3.74;

const itemsCamposFaltantes = [
  "Categoría — no se pueden crear",
  "Tipo: servicios — no disponible",
  "Otros opcionales — ausentes",
];
const itemsUxDeficiente = [
  "Costo unidad",
  "Cantidad inicial",
  "Precio Base",
  "Precio total",
  "Selección de unidad",
];

// === Olas ===
// Filtramos % usuarios pagos activos por país solo a Rep. Dominicana
const adopcionRDRaw = countryAdoption.find((c) => c.country === "Rep. Dominicana")!;
const adopcionRD = {
  country: adopcionRDRaw.country,
  wau: adopcionRDRaw.adopcion[adopcionRDRaw.adopcion.length - 1],
  wac: adopcionRDRaw.real[adopcionRDRaw.real.length - 1],
};

function Section5() {
  const segBase = segmentos.find((s) => s.id === "base")!;
  

  return (
    <div className="space-y-12">
      {/* Intro: Pyme BASE + Video lado a lado */}
      <div>
        <div className="mb-5 flex items-center gap-2">
          <div className="h-1 w-10 rounded-full" style={{ backgroundColor: ALEGRA_GREEN }} />
          <h2 className="text-lg font-bold text-neutral-900">Quién es nuestro mejor usuario</h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-5">
          {/* Bloque texto (3/4) */}
          <div
            className="relative overflow-hidden rounded-2xl border border-emerald-100 bg-white p-7 shadow-sm md:p-8 lg:col-span-4"
            style={{
              backgroundImage:
                "radial-gradient(circle at 100% 0%, rgba(0,179,134,0.08), transparent 55%)",
            }}
          >
            <div
              className="absolute left-0 top-0 h-full w-1.5"
              style={{ backgroundColor: ALEGRA_GREEN }}
            />
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white"
                style={{ backgroundColor: ALEGRA_GREEN }}
              >
                <Star className="h-3 w-3" /> Pyme App First
              </span>
              <Badge variant="outline" className="text-[10px]" style={{ borderColor: ALEGRA_GREEN, color: ALEGRA_GREEN }}>
                {segBase.badge}
              </Badge>
              <span className="text-[11px] text-neutral-500">{segBase.tamano}</span>
            </div>

            <p className="mt-4 text-lg font-semibold leading-snug text-neutral-900 md:text-xl">
              La Pyme App First es nuestro mejor usuario: vive con la app en la mano y la usa como su centro operativo móvil real.
            </p>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div className="rounded-xl border border-neutral-200/80 bg-white/80 p-3 backdrop-blur-sm">
                <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Su dolor</p>
                <p className="mt-1 text-xs leading-relaxed text-neutral-700">{segBase.problema}</p>
              </div>
              <div className="rounded-xl border border-neutral-200/80 bg-white/80 p-3 backdrop-blur-sm">
                <p
                  className="text-[10px] font-bold uppercase tracking-wider"
                  style={{ color: ALEGRA_GREEN }}
                >
                  Valor que creamos
                </p>
                <p className="mt-1 text-xs leading-relaxed text-neutral-700">{segBase.valor}</p>
              </div>
            </div>
          </div>

          {/* Video pequeño (1/4) */}
          <div className="lg:col-span-1 flex flex-col rounded-2xl border border-neutral-200 bg-white p-3 shadow-sm">
            <span
              className="inline-flex w-fit items-center gap-1.5 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider"
              style={{ backgroundColor: `${ALEGRA_GREEN}15`, color: ALEGRA_GREEN }}
            >
              <Heart className="h-2.5 w-2.5" /> Caso real · 1:18
            </span>
            <div className="mt-2 overflow-hidden rounded-xl bg-black">
              <video
                src="/videos/pyme-base-venta.mp4"
                controls
                playsInline
                className="aspect-[9/16] w-full object-contain"
              />
            </div>
            <p className="mt-2 text-[11px] leading-snug text-neutral-600">
              Crea y comparte la venta en{" "}
              <strong style={{ color: ALEGRA_GREEN }}>1 min 18 seg</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Funcionalidades fuera de App + Oportunidades (combinado, colapsable) */}
      <CollapsibleSection
        title="Funcionalidades fuera de App y Oportunidades"
        subtitle={`${oportunidades.length} frentes detectados`}
        color="#FF6B00"
      >
        <div className="space-y-6">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-start justify-between gap-4 flex-wrap">
              <div>
                <p className="text-sm font-semibold text-neutral-900">
                  Funcionalidades que más utilizan los Mobile First por fuera de App
                </p>
                <p className="mt-0.5 text-xs text-neutral-500">
                  Últimas 4 semanas · Cohort Mobile App Top Users Q3 · Conteo de eventos en web
                </p>
              </div>
              <a
                href="https://app.amplitude.com/analytics/alegra/chart/h6i1m5l2"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[11px] font-medium text-neutral-500 hover:text-neutral-900"
              >
                Amplitude <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2">
              {oportunidades.map((op) => (
                <span key={op.id} className="inline-flex items-center gap-1.5 text-[11px] font-medium text-neutral-700">
                  <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: op.color }} />
                  {op.title}
                </span>
              ))}
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-neutral-500">
                <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: OTROS_COLOR }} />
                Otras
              </span>
            </div>

            <div className="h-[460px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={baseFueraDeApp} layout="vertical" margin={{ top: 8, right: 56, left: 8, bottom: 8 }}>
                  <CartesianGrid horizontal={false} stroke="#f1f5f9" />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 11, fill: "#64748b" }}
                    tickFormatter={(v) => v.toLocaleString("es-CO")}
                  />
                  <YAxis
                    type="category"
                    dataKey="feature"
                    width={220}
                    tick={{ fontSize: 11, fill: "#0f172a" }}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(255,107,0,0.06)" }}
                    formatter={(v: number) => [v.toLocaleString("es-CO"), "Eventos"]}
                  />
                  <Bar dataKey="uso" radius={[0, 6, 6, 0]}>
                    {baseFueraDeApp.map((d, i) => (
                      <Cell key={i} fill={featureColor[d.feature] ?? OTROS_COLOR} />
                    ))}
                    <LabelList
                      dataKey="uso"
                      position="right"
                      formatter={(v: number) => v.toLocaleString("es-CO")}
                      style={{ fontSize: 11, fill: "#475569", fontWeight: 600 }}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-neutral-600">Oportunidades</h3>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {oportunidades.map((op) => (
                <OportunidadCard key={op.id} op={op} />
              ))}
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* Adquisición */}
      <CollapsibleSection title="Adquisición" subtitle="Login para ver planes y pagar" color="#FF6B00">
        <div className="mb-5 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div className="flex items-start gap-3">
              <div
                className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: "#FF6B0015" }}
              >
                <Target className="h-4 w-4" style={{ color: "#FF6B00" }} />
              </div>
              <div>
                <h3 className="text-base font-bold text-neutral-900">ICP</h3>
                <p className="mt-0.5 text-xs text-neutral-500">Mercados prioritarios</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-2xl">
              <span title="México">🇲🇽</span>
              <span title="Colombia">🇨🇴</span>
              <span title="Costa Rica">🇨🇷</span>
              <span title="República Dominicana">🇩🇴</span>
            </div>
          </div>
          <div className="mt-4 rounded-lg border border-orange-200 bg-orange-50/50 p-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-orange-700">Estrategia ICP</p>
            <p className="mt-1 text-xs leading-relaxed text-neutral-800">
              El <strong>onboarding de la app</strong> tiene que adaptarse al <strong>onboarding de web</strong>.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-start gap-3">
            <div
              className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
              style={{ backgroundColor: "#FF6B0015" }}
            >
              <LogIn className="h-4 w-4" style={{ color: "#FF6B00" }} />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900">
                Funnel Entero sin PQL — Mobile App vs Mobile web
              </h3>
              <p className="mt-0.5 text-xs text-neutral-500">
                Comparativo de adquisición entre canales · Año en curso · entrepreneur
              </p>
            </div>
          </div>

          <div className="mb-5 grid gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-orange-200 bg-orange-50/60 p-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-orange-700">
                Problema detectado
              </p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-800">
                Los usuarios <strong>tienen que iniciar sesión dentro de la app</strong> para ver los planes y pagar, o <strong>ir a web</strong>. Este paso adicional fricciona la conversión a pago.
              </p>
            </div>

            <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4">
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                  Oportunidad
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href="https://claude.ai/design/p/019dc058-65c2-700c-ba39-a56f47183a28?file=Alegra+Prototype.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold transition-colors hover:bg-white"
                    style={{ borderColor: "#10b98133", color: "#059669", backgroundColor: "#10b98110" }}
                  >
                    <Sparkles className="h-3 w-3" /> Prototipo 1 <ExternalLink className="h-2.5 w-2.5" />
                  </a>
                  <a
                    href="https://www.figma.com/proto/mwZw2uwa23VqYfWeAfM55R/ACT---Test-ABC-invitaci%C3%B3n-a-descargar-app-Alegra-para-usuarios-mobile?node-id=7001-303&viewport=-124%2C-500%2C0.18&t=8Gb8o270oF3s50V7-1&scaling=min-zoom&content-scaling=fixed&page-id=1%3A2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold transition-colors hover:bg-white"
                    style={{ borderColor: "#10b98133", color: "#059669", backgroundColor: "#10b98110" }}
                  >
                    <Sparkles className="h-3 w-3" /> Prototipo 2 <ExternalLink className="h-2.5 w-2.5" />
                  </a>
                </div>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-neutral-800">
                <strong>Link mágico creado por Identity</strong> para ver planes + <strong>contactabilidad bot ventas</strong>.
              </p>
            </div>
          </div>

          <FunnelComboCard
            title="Funnel Entero sin PQL — Mobile App vs Mobile web"
            subtitle="Sin PQL · 3 pasos · Adquisición"
            
            data={funnelComboSinPQL}
          />
        </div>
      </CollapsibleSection>

      {/* Contadores */}
      <CollapsibleSection title="Contadores" subtitle="Acciones más importantes · voces de campo" color="rgb(48,171,169)">
        <ContadoresSection />
      </CollapsibleSection>

      <CollapsibleSection title="Agentes" subtitle="Agente de Alegra en la app" color="#7C3AED">
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div className="flex items-start gap-3">
              <div
                className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: "#7C3AED15" }}
              >
                <Sparkles className="h-4 w-4" style={{ color: "#7C3AED" }} />
              </div>
              <div>
                <h3 className="text-base font-bold text-neutral-900">Agente de Alegra</h3>
                <p className="mt-0.5 text-xs text-neutral-500">Prototipo del agente en la app</p>
              </div>
            </div>
            <a
              href="https://play.alegra.design/proto/2613528560/d?view=agent"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-all hover:opacity-90"
              style={{ backgroundColor: "#7C3AED" }}
            >
              Ver prototipo <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
          <div className="mt-4 rounded-lg border border-purple-200 bg-purple-50/50 p-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-purple-700">Iniciativa</p>
            <p className="mt-1 text-xs leading-relaxed text-neutral-800">
              El <strong>Agente de Alegra</strong> se lanzará a producción y la <strong>app debe crear el agente</strong>.
            </p>
          </div>
        </div>
      </CollapsibleSection>

      {/* Olas */}
      <CollapsibleSection title="Obligatoriedad" subtitle="Iniciativas por país" color="#7C3AED">
        <div className="grid gap-4 md:grid-cols-2">
          {/* Card Ola RD */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div className="flex items-start gap-3">
                <div
                  className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-lg"
                  style={{ backgroundColor: "#7C3AED15" }}
                >
                  🇩🇴
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900">Ola Rep. Dominicana</h3>
                  <p className="mt-0.5 text-xs text-neutral-500">
                    Habilitación de factura electrónica en la app
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="rounded-lg border border-emerald-200 bg-emerald-50/60 p-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Oportunidad</p>
                <p className="mt-1 text-xs leading-relaxed text-neutral-800">
                  La facturación ya queda 1:1 en República Dominicana, pero la habilitación de factura electrónica solo se puede hacer por web. La idea es colocarlo en la app.
                </p>
              </div>
            </div>
          </div>

          {/* Card Ola Venezuela */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <div
                className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-lg"
                style={{ backgroundColor: "#7C3AED15" }}
              >
                🇻🇪
              </div>
              <div>
                <h3 className="text-base font-bold text-neutral-900">Ola Venezuela</h3>
                <p className="mt-0.5 text-xs text-neutral-500">Nuevo mercado</p>
              </div>
            </div>

            <div className="mt-4">
              <div className="rounded-lg border border-emerald-200 bg-emerald-50/60 p-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Oportunidad</p>
                <p className="mt-1 text-xs leading-relaxed text-neutral-800">
                  Habilitar un nuevo mercado.
                </p>
              </div>
            </div>
          </div>

          {/* Card Ola Argentina */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm md:col-span-2">
            <div className="flex items-start gap-3">
              <div
                className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-lg"
                style={{ backgroundColor: "#7C3AED15" }}
              >
                🇦🇷
              </div>
              <div>
                <h3 className="text-base font-bold text-neutral-900">Ola Argentina</h3>
                <p className="mt-0.5 text-xs text-neutral-500">
                  Nuevo idioma técnico de facturación (v4.4 y v4.5)
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-purple-200 bg-purple-50/50 p-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-purple-700">
                Continuidad operativa
              </p>
              <p className="mt-1 text-xs leading-relaxed text-neutral-800">
                Argentina renueva su <strong>"idioma técnico" de facturación (v4.4 y v4.5)</strong>, suma el régimen <strong>RG 5866</strong> de liquidación mensual para alto volumen y exige mostrar <strong>Ingresos Brutos por provincia</strong> en cada factura. Es el frente de mayor continuidad operativa del semestre: toda la base activa que emite comprobantes queda expuesta, sin segmentar por tamaño.
              </p>
            </div>
          </div>

          {/* % usuarios pagos activos en Rep. Dominicana únicamente */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="mb-3 flex items-start justify-between gap-3 flex-wrap">
              <div>
                <h3 className="text-sm font-bold text-neutral-900">
                  % Usuarios pagos activos · Rep. Dominicana
                </h3>
                <p className="mt-0.5 text-xs text-neutral-500">
                  Marzo 2026 · Tasa de Adopción y Tasa Real
                </p>
              </div>
              <a
                href="https://app.amplitude.com/analytics/alegra/chart/hqcerbqk"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[11px] font-medium text-neutral-500 hover:text-neutral-900"
              >
                Amplitude <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="font-medium text-neutral-700">{adopcionRD.country}</span>
                <div className="flex gap-3">
                  <span className="text-[#0066FF]">
                    Adopción <strong>{adopcionRD.wau.toFixed(1)}%</strong>
                  </span>
                  <span style={{ color: ALEGRA_GREEN }}>
                    Real <strong>{adopcionRD.wac.toFixed(1)}%</strong>
                  </span>
                </div>
              </div>
              <div className="relative h-6 w-full overflow-hidden rounded-full bg-neutral-100">
                <div
                  className="absolute left-0 top-0 h-full rounded-full"
                  style={{ width: `${Math.min(adopcionRD.wau, 100)}%`, backgroundColor: "#0066FF40" }}
                />
                <div
                  className="absolute left-0 top-0 h-full rounded-full"
                  style={{ width: `${Math.min(adopcionRD.wac, 100)}%`, backgroundColor: ALEGRA_GREEN }}
                />
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3 text-[11px]">
                <div className="rounded-lg bg-blue-50 p-3">
                  <p className="font-bold uppercase tracking-wider text-blue-700">Adopción</p>
                  <p className="mt-1 text-2xl font-bold text-neutral-900">{adopcionRD.wau.toFixed(1)}%</p>
                  <p className="text-[10px] text-neutral-500">MAU APP / MAC WEB</p>
                </div>
                <div className="rounded-lg bg-emerald-50 p-3">
                  <p className="font-bold uppercase tracking-wider" style={{ color: ALEGRA_GREEN }}>
                    Real
                  </p>
                  <p className="mt-1 text-2xl font-bold text-neutral-900">{adopcionRD.wac.toFixed(1)}%</p>
                  <p className="text-[10px] text-neutral-500">MAC APP / MAC WEB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* Soporte (sección aparte, colapsable) */}
      <CollapsibleSection
        title="Soporte"
        subtitle="Solicitudes de soporte desde la app · totales y únicos"
        color="#F59E0B"
      >
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-start gap-3">
            <div
              className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
              style={{ backgroundColor: "#F59E0B20" }}
            >
              <Headphones className="h-4 w-4 text-amber-500" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900">Soporte</h3>
            </div>
          </div>
          <SoporteFuncDetail />
        </div>
      </CollapsibleSection>

    </div>
  );
}

function ContadoresSection() {
  const TEAL = "rgb(48,171,169)";
  const acciones = [
    { evento: "ac-form-bill-visited", label: "Ver facturas de compra", pctMau: 26.6, veces: 31.5 },
    { evento: "ac-bill-created", label: "Crear factura de compra", pctMau: 24.0, veces: 32.9 },
    { evento: "ac-invoice-attempted", label: "Intentar facturar", pctMau: 17.8, veces: 30.4 },
    { evento: "ac-invoice-managed", label: "Gestionar facturas", pctMau: 16.8, veces: 50.9 },
    { evento: "ac-invoice-submitted", label: "Enviar factura", pctMau: 14.6, veces: 27.6 },
    { evento: "ac-report-generated", label: "Generar reportes", pctMau: 13.9, veces: 30.8 },
  ];
  const maxPct = Math.max(...acciones.map((a) => a.pctMau));
  const maxVeces = Math.max(...acciones.map((a) => a.veces));

  return (
    <div className="space-y-6">
      {/* Power Features chart */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-start justify-between gap-3 flex-wrap">
          <div className="flex items-start gap-3">
            <div
              className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
              style={{ backgroundColor: `${TEAL}20` }}
            >
              <Star className="h-4 w-4" style={{ color: TEAL }} />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900">
                Acciones más importantes para los Contadores
              </h3>
              <p className="mt-0.5 text-xs text-neutral-500">
                Alto alcance + alta frecuencia · "Power Features" estrella
              </p>
            </div>
          </div>
          <a
            href="https://claude.ai/design/p/019dd71f-3a95-7d0d-a907-e02820cd8205?file=sidebar.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-colors hover:bg-white"
            style={{ borderColor: `${TEAL}55`, color: TEAL, backgroundColor: `${TEAL}10` }}
          >
            <Sparkles className="h-3 w-3" /> Ver prototipo <ExternalLink className="h-2.5 w-2.5" />
          </a>
        </div>

        <div className="overflow-hidden rounded-xl border border-neutral-100">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 border-b border-neutral-100 bg-neutral-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-neutral-500">
            <span>Acción</span>
            <span className="w-12 text-right">% MAU</span>
            <span>Veces/usuario</span>
          </div>
          {acciones.map((a, i) => (
            <div
              key={a.evento}
              className={cn(
                "grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-3 py-1.5",
                i !== acciones.length - 1 && "border-b border-neutral-100"
              )}
            >
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-neutral-900">{a.label}</p>
                <p className="truncate text-[9px] font-mono text-neutral-400">{a.evento}</p>
              </div>
              <span className="w-12 text-right text-xs font-bold" style={{ color: TEAL }}>
                {a.pctMau}%
              </span>
              <div className="flex items-center gap-2">
                <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-neutral-100">
                  <div
                    className="absolute left-0 top-0 h-full rounded-full"
                    style={{ width: `${(a.veces / maxVeces) * 100}%`, backgroundColor: "#FF6B00" }}
                  />
                </div>
                <span className="w-10 text-right text-[11px] font-bold text-orange-600">
                  {a.veces}x
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insight cards - voces de contadores */}
      <div className="grid gap-4 md:grid-cols-2">
        <div
          className="rounded-2xl border bg-white p-5 shadow-sm"
          style={{ borderColor: `${TEAL}40` }}
        >
          <div className="mb-3 flex items-center gap-2">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg"
              style={{ backgroundColor: `${TEAL}20` }}
            >
              <Sparkles className="h-4 w-4" style={{ color: TEAL }} />
            </div>
            <h4 className="text-sm font-bold text-neutral-900">
              Recuperación instantánea de documentos
            </h4>
          </div>
          <blockquote
            className="rounded-lg border-l-4 bg-neutral-50/60 p-3 text-xs italic leading-relaxed text-neutral-700"
            style={{ borderLeftColor: TEAL }}
          >
            "De repente, salgo de la oficina para una reunión y un cliente me pide un documento. Desde donde esté, lo descargo y se lo envío por WhatsApp."
          </blockquote>
        </div>

        <div
          className="rounded-2xl border bg-white p-5 shadow-sm"
          style={{ borderColor: "#FF6B0040" }}
        >
          <div className="mb-3 flex items-center gap-2">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg"
              style={{ backgroundColor: "#FF6B0020" }}
            >
              <Sparkles className="h-4 w-4 text-orange-600" />
            </div>
            <h4 className="text-sm font-bold text-neutral-900">Generación de facturas</h4>
          </div>
          <blockquote className="rounded-lg border-l-4 border-orange-500 bg-neutral-50/60 p-3 text-xs italic leading-relaxed text-neutral-700">
            "Si configuras tu producto y cliente, puedo generar una factura en segundos. Simplemente ingresas el cliente y el servicio, creas la factura y se envía por WhatsApp en segundos."
          </blockquote>
        </div>
      </div>
    </div>
  );
}

function ItemsFuncDetail() {
  return (
    <div className="space-y-5">
      {/* Problema detectado + Oportunidad — compacto */}
      <div className="rounded-lg border border-orange-200 bg-orange-50/50 px-3 py-2">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="flex-1 min-w-[260px]">
            <p className="text-[10px] font-bold uppercase tracking-wider text-orange-700">Problema detectado</p>
            <p className="mt-1 text-xs leading-relaxed text-neutral-800">
              <strong>Caída en la intención de creación de Items</strong> y <strong>campos faltantes</strong> respecto a la web; UX deficiente en varios campos genera fricción.
            </p>
          </div>
          <div className="flex-1 min-w-[260px] rounded-md border border-emerald-200 bg-emerald-50/60 px-3 py-2">
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Oportunidad</p>
              <a
                href="https://www.figma.com/design/VjC6hok9QSdr9Wd8iasWms/Secci%C3%B3n-items-App?node-id=2266-3088&t=Vbquk9q4yag4jbVR-0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold transition-colors hover:bg-white"
                style={{ borderColor: "#10B98133", color: "#047857", backgroundColor: "#10B98110" }}
              >
                <Sparkles className="h-3 w-3" /> Ver prototipo <ExternalLink className="h-2.5 w-2.5" />
              </a>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-neutral-800">
              Simplificación de la creación de items + agregar creación de servicios + paridad de campos con web.
            </p>
          </div>
        </div>
      </div>

      {/* Charts lado a lado */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Funnel Home → New Item (chart w81wjr5i) */}
        <div className="rounded-xl border border-neutral-200 bg-white p-4">
          <div className="mb-3 flex items-start justify-between gap-3 flex-wrap">
            <div>
              <h4 className="text-sm font-bold text-neutral-900">
                Funnel Home → New Item
              </h4>
              <p className="mt-0.5 text-xs text-neutral-500">
                % de conversión: app-home-visited → app-new-item-visited · cohort Pagos · últ. 12 semanas
              </p>
            </div>
            <Badge variant="outline" className="text-[10px]" style={{ borderColor: "#0066FF", color: "#0066FF" }}>
              19 Abr: {itemsAppVsWebSeries[itemsAppVsWebSeries.length - 1].pct}%
            </Badge>
          </div>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={itemsAppVsWebSeries} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="mes" tick={{ fontSize: 10 }} stroke="#6b7280" />
                <YAxis tick={{ fontSize: 11 }} stroke="#6b7280" tickFormatter={(v) => `${v}%`} domain={[0, 10]} />
                <Tooltip formatter={(v: number) => `${v.toFixed(2)}%`} />
                <Line type="monotone" dataKey="pct" stroke="#0066FF" strokeWidth={3} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <a
            href="https://app.amplitude.com/analytics/alegra/chart/w81wjr5i"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-neutral-500 hover:text-neutral-800"
          >
            <ExternalLink className="h-3 w-3" /> Amplitude · w81wjr5i · pico 8.2% mid-Abr, cae a 2.9% al cierre
          </a>
        </div>

        {/* Intención de creación de Items (chart wh2ltvtf, semanal) */}
        <div className="rounded-xl border border-neutral-200 bg-white p-4">
          <div className="mb-3 flex items-start justify-between gap-3 flex-wrap">
            <div>
              <h4 className="text-sm font-bold text-neutral-900">
                Intención de creación de Items
              </h4>
              <p className="mt-0.5 text-xs text-neutral-500">
                % de conversión: app-new-item-visited → app-item-created · all users · últ. 12 semanas
              </p>
            </div>
            <Badge variant="outline" className="text-[10px]" style={{ borderColor: ALEGRA_GREEN, color: ALEGRA_GREEN }}>
              26 Abr: {itemsIntencion[itemsIntencion.length - 1].conversion.toFixed(1)}%
            </Badge>
          </div>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={itemsIntencion} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="mes" tick={{ fontSize: 10 }} stroke="#6b7280" />
                <YAxis tick={{ fontSize: 11 }} stroke="#6b7280" tickFormatter={(v) => `${v}%`} domain={[0, 100]} />
                <Tooltip formatter={(v: number) => `${v.toFixed(1)}%`} />
                <Bar dataKey="conversion" fill={ALEGRA_GREEN} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <a
            href="https://app.amplitude.com/analytics/alegra/chart/8a3546k8/edit/wh2ltvtf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-neutral-500 hover:text-neutral-800"
          >
            <ExternalLink className="h-3 w-3" /> Amplitude · wh2ltvtf · cae de ~66% a 36% en abril
          </a>
        </div>
      </div>

      {/* % participación movido al header del módulo Items */}
      {/* Campos faltantes y UX deficiente */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-orange-100 bg-orange-50/40 p-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-orange-700">
            Campos que no se encuentran
          </p>
          <ul className="mt-2 space-y-1.5 text-xs text-neutral-700">
            {itemsCamposFaltantes.map((c) => (
              <li key={c} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                {c}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-blue-700">
            Deficiente UX en campos
          </p>
          <ul className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs text-neutral-700">
            {itemsUxDeficiente.map((c) => (
              <li key={c} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// --- Datos Contactos (Amplitude charts up58fj0c + 45ccva3n) - últimas 9 semanas ---
const contactosHomeAContactos = [
  { semana: "22 Feb", pct: 3.47 },
  { semana: "01 Mar", pct: 3.46 },
  { semana: "08 Mar", pct: 3.22 },
  { semana: "15 Mar", pct: 2.99 },
  { semana: "22 Mar", pct: 3.09 },
  { semana: "29 Mar", pct: 2.65 },
  { semana: "05 Abr", pct: 3.20 },
  { semana: "12 Abr", pct: 6.84 },
  { semana: "19 Abr", pct: 9.93 },
];
const contactosVisitaACreado = [
  { semana: "22 Feb", pct: 81.91 },
  { semana: "01 Mar", pct: 83.55 },
  { semana: "08 Mar", pct: 77.05 },
  { semana: "15 Mar", pct: 78.64 },
  { semana: "22 Mar", pct: 81.91 },
  { semana: "29 Mar", pct: 78.01 },
  { semana: "05 Abr", pct: 65.31 },
  { semana: "12 Abr", pct: 41.55 },
  { semana: "19 Abr", pct: 30.70 },
];

function ContactosFuncDetail() {
  const lastDescubre = contactosHomeAContactos[contactosHomeAContactos.length - 1].pct;
  const lastCrea = contactosVisitaACreado[contactosVisitaACreado.length - 1].pct;
  return (
    <div className="space-y-5">
      {/* Problema destacado + Oportunidad — compacto */}
      <div className="rounded-lg border border-orange-200 bg-orange-50/50 px-3 py-2">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="flex-1 min-w-[260px]">
            <p className="text-[10px] font-bold uppercase tracking-wider text-orange-700">Problema detectado</p>
            <p className="mt-1 text-xs leading-relaxed text-neutral-800">
              <strong>Disparidad en algunos campos no obligatorios</strong>, sumado a <strong>poca claridad en la elección de cliente y vendedor</strong>. Esto genera fricción en la creación de contactos desde la app.
            </p>
          </div>
          <div className="flex-1 min-w-[260px] rounded-md border border-emerald-200 bg-emerald-50/60 px-3 py-2">
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Oportunidad</p>
              <a
                href="https://claude.ai/design/p/019dc695-1901-7519-a9d7-a74bd0eedfd0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold transition-colors hover:bg-white"
                style={{ borderColor: "#10B98133", color: "#047857", backgroundColor: "#10B98110" }}
              >
                <Sparkles className="h-3 w-3" /> Ver prototipo <ExternalLink className="h-2.5 w-2.5" />
              </a>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-neutral-800">
              Simplificación de la creación de contactos + paridad de campos con web.
            </p>
          </div>
        </div>
      </div>

      {/* Charts lado a lado */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Funnel home → contactos */}
        <div className="rounded-xl border border-neutral-200 bg-white p-4">
          <div className="mb-3 flex items-start justify-between gap-3 flex-wrap">
            <div>
              <h4 className="text-sm font-bold text-neutral-900">Funnel Home → Contactos</h4>
              <p className="mt-0.5 text-xs text-neutral-500">
                % de usuarios pagos que llegan a la sección de contactos desde el home · últ. 9 semanas
              </p>
            </div>
            <Badge variant="outline" className="text-[10px]" style={{ borderColor: "#0066FF", color: "#0066FF" }}>
              19 Abr: {lastDescubre.toFixed(2)}%
            </Badge>
          </div>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={contactosHomeAContactos} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="semana" tick={{ fontSize: 10 }} stroke="#6b7280" />
                <YAxis tick={{ fontSize: 11 }} stroke="#6b7280" tickFormatter={(v) => `${v}%`} />
                <Tooltip formatter={(v: number) => `${v.toFixed(2)}%`} />
                <Line type="monotone" dataKey="pct" stroke="#0066FF" strokeWidth={3} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <a
            href="https://app.amplitude.com/analytics/alegra/chart/up58fj0c"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-neutral-500 hover:text-neutral-800"
          >
            <ExternalLink className="h-3 w-3" /> Amplitude · up58fj0c
          </a>
        </div>

        {/* Funnel visita → creado */}
        <div className="rounded-xl border border-neutral-200 bg-white p-4">
          <div className="mb-3 flex items-start justify-between gap-3 flex-wrap">
            <div>
              <h4 className="text-sm font-bold text-neutral-900">Funnel Visita Contactos → Contacto Creado</h4>
              <p className="mt-0.5 text-xs text-neutral-500">
                % de conversión: app-new-contact-visited → app-contact-created · últ. 9 semanas
              </p>
            </div>
            <Badge variant="outline" className="text-[10px]" style={{ borderColor: "#FF6B00", color: "#FF6B00" }}>
              19 Abr: {lastCrea.toFixed(2)}%
            </Badge>
          </div>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={contactosVisitaACreado} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="semana" tick={{ fontSize: 10 }} stroke="#6b7280" />
                <YAxis tick={{ fontSize: 11 }} stroke="#6b7280" tickFormatter={(v) => `${v}%`} domain={[0, 100]} />
                <Tooltip formatter={(v: number) => `${v.toFixed(2)}%`} />
                <Line type="monotone" dataKey="pct" stroke="#FF6B00" strokeWidth={3} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <a
            href="https://app.amplitude.com/analytics/alegra/chart/45ccva3n"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-neutral-500 hover:text-neutral-800"
          >
            <ExternalLink className="h-3 w-3" /> Amplitude · 45ccva3n
          </a>
        </div>
      </div>

    </div>
  );
}

function PrototypeCard({
  title,
  description,
  href,
  accent,
}: {
  title: string;
  description: string;
  href: string;
  accent: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-2xl border bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
      style={{ borderColor: `${accent}33` }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
            style={{ backgroundColor: `${accent}15` }}
          >
            <Sparkles className="h-4 w-4" style={{ color: accent }} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: accent }}>
              Prototipo
            </p>
            <h4 className="mt-0.5 text-sm font-bold text-neutral-900">{title}</h4>
            <p className="mt-1 text-xs leading-relaxed text-neutral-600">{description}</p>
          </div>
        </div>
        <div
          className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold transition-colors group-hover:opacity-90"
          style={{ backgroundColor: `${accent}15`, color: accent }}
        >
          Ver prototipo <ExternalLink className="h-3 w-3" />
        </div>
      </div>
    </a>
  );
}
function OportunidadCard({
  op,
}: {
  op: { id: string; title: string; tags: string[]; resumen: string; color?: string };
}) {
  const accent = op.color ?? ALEGRA_GREEN;
  const tagColor = (t: string) => {
    if (t === "Engagement") return "#FF6B00";
    if (t === "Adopción") return ALEGRA_GREEN;
    if (t === "Experiencia") return "#0066FF";
    return "#737373";
  };
  return (
    <div
      className="flex h-full flex-col rounded-2xl border border-neutral-200 border-l-4 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
      style={{ borderLeftColor: accent }}
    >
      <div className="flex items-center gap-2">
        <div
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${accent}15` }}
        >
          <Lightbulb className="h-3.5 w-3.5" style={{ color: accent }} />
        </div>
        <h3 className="text-sm font-bold leading-snug text-neutral-900">{op.title}</h3>
      </div>

      <div className="mt-2 flex flex-wrap gap-1">
        {op.tags.map((t) => (
          <Badge
            key={t}
            variant="outline"
            className="text-[9px] font-semibold"
            style={{ borderColor: tagColor(t), color: tagColor(t) }}
          >
            {t}
          </Badge>
        ))}
      </div>

      <p className="mt-2 text-xs leading-relaxed text-neutral-600">{op.resumen}</p>
    </div>
  );
}

// === Sección Agenda ===
function SectionAgenda() {
  const items = [
    "Visión",
    "North star metric",
    "Segmentación y comportamiento",
    "Resultados",
    "Issues",
    "Funnel",
    "Diagnóstico",
  ];

  const highlights = [
    "Incremento del 66% en el total de remisiones creadas.",
    "Incremento de 0 a 2.855 búsquedas de cotizaciones.",
    "Incremento del 13% en la creación de items.",
    "Disminución del 40% en los bugs reportados de API.",
    "30% de los contactos llenados con autocompletado.",
    "Aumento de 3x en los usuarios que se registran.",
  ];

  const lowlights = [
    "Disminución de 1,33% en el total de facturas creadas.",
    "Aumento de issues reportados del 50%.",
  ];

  return (
    <div className="space-y-6">
      {/* Módulo Agenda — contiene el listado y la imagen pequeña */}
      <div className="relative rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
        {/* Aviso esquina superior derecha */}
        <div className="absolute right-4 top-4 z-10">
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                aria-label="Aviso importante"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-amber-300 bg-amber-50 text-amber-600 shadow-sm transition hover:bg-amber-100"
              >
                <AlertTriangle className="h-4 w-4" />
              </button>
            </PopoverTrigger>
            <PopoverContent align="end" side="bottom" className="w-72 text-sm">
              <div className="flex items-start gap-2">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                <p className="leading-relaxed text-neutral-700">
                  <strong>App mobile</strong> es diferente a <strong>web mobile</strong>.
                </p>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="mb-6 flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl text-white"
            style={{ backgroundColor: ALEGRA_GREEN }}
          >
            <ClipboardList className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-900">Agenda</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-[1fr,auto] md:items-start">
          <ul className="space-y-2.5">
            {items.map((it, idx) => (
              <li
                key={it}
                className="flex items-center gap-3 rounded-lg border border-neutral-100 bg-neutral-50/60 px-4 py-3"
              >
                <span
                  className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                  style={{ backgroundColor: ALEGRA_GREEN }}
                >
                  {idx + 1}
                </span>
                <span className="text-sm font-medium text-neutral-800">{it}</span>
              </li>
            ))}
          </ul>

          <img
            src={agendaAppMockup}
            alt="Mockup de la app Alegra Contabilidad Inteligente"
            className="mx-auto h-auto w-40 rounded-xl md:w-48"
          />
        </div>
      </div>

      {/* Highlights (izq) + Lowlights (der) */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-white">
              <TrendingUp className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">
                Highlights
              </p>
              <h3 className="text-base font-bold text-neutral-900">Logros del período</h3>
            </div>
          </div>
          <ul className="space-y-2.5">
            {highlights.map((h) => (
              <li key={h} className="flex items-start gap-2.5 text-sm text-neutral-700">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-rose-200 bg-gradient-to-br from-rose-50 to-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500 text-white">
              <TrendingDown className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-rose-600">
                Lowlights
              </p>
              <h3 className="text-base font-bold text-neutral-900">Aspectos a mejorar</h3>
            </div>
          </div>
          <ul className="space-y-2.5">
            {lowlights.map((l) => (
              <li key={l} className="flex items-start gap-2.5 text-sm text-neutral-700">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-rose-500" />
                <span>{l}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
