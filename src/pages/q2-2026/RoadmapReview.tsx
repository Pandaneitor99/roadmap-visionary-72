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

import { initiativeDetailMap } from "./initiativeDetails";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";


const sections = [
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
          ) : current === 1 ? (
            <Section2 />
          ) : current === 2 ? (
            <Section3 />
          ) : current === 3 ? (
            <SectionComportamiento />
          ) : current === 4 ? (
            <Section4 />
          ) : current === 5 ? (
            <SectionIssues />
          ) : current === 6 ? (
            <SectionFunnel />
          ) : current === 7 ? (
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
                Porqué
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
    nombre: "Pyme BASE",
    badge: "Móvil-first",
    tamano: "~40% del MAC (~2,924 usuarios)",
    dolor: "Muy alto",
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
    id: "sos",
    nombre: "Pyme SOS",
    badge: "Web-first",
    tamano: "~60% del MAC (~4,700 usuarios)",
    dolor: "Medio",
    alternativa: "Vuelve al PC, pierde la venta",
    prioridad: "Alta",
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
      "Una primera experiencia tan fluida que el usuario quiera volver. Una razón para tener la app instalada que no sea la emergencia, sino la conveniencia cotidiana.",
  },
  {
    id: "nuevos",
    nombre: "Nuevos usuarios web",
    badge: "Sin app",
    tamano: "70% de usuarios web no usan la app",
    dolor: "Medio",
    alternativa: "No usan app",
    prioridad: "Media",
    color: "#0066FF",
    problema:
      "70% de usuarios web nunca han instalado o probado la app. No la conocen o no la encuentran como una opción real para sus operaciones diarias.",
    costos: [
      "Oportunidad de adopción no capturada — base potencial enorme sin activar.",
      "Pierden la conveniencia móvil para acciones críticas.",
      "Menor engagement transversal con el ecosistema Alegra.",
    ],
    valor:
      "Visibilidad y descubrimiento de la app dentro del ecosistema Alegra. Una primera experiencia que muestre el valor inmediato de tener la app a la mano.",
  },
  {
    id: "contador",
    nombre: "Contador",
    badge: "Sub-servido",
    tamano: "Subrepresentado",
    dolor: "Medio",
    alternativa: "Reportes en web, llamadas al cliente",
    prioridad: "Media",
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
          <div className="col-span-4">Segmento</div>
          <div className="col-span-4">Tamaño</div>
          <div className="col-span-2">Nivel de dolor</div>
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
              <div className="col-span-4 font-semibold text-neutral-900">
                {s.nombre}
                <span className="ml-2 text-[10px] font-medium text-neutral-500">
                  {s.badge}
                </span>
              </div>
              <div className="col-span-4 text-neutral-600">{s.tamano}</div>
              <div className="col-span-2 text-neutral-600">{s.dolor}</div>
              <div className="col-span-2 text-right">
                <span
                  className="inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold uppercase text-white"
                  style={{
                    backgroundColor:
                      s.prioridad === "Máxima"
                        ? ALEGRA_GREEN
                        : s.prioridad === "Alta"
                          ? "#FF6B00"
                          : "#737373",
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
      <div className="mb-6 grid gap-3 md:grid-cols-4">
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

const macTrendDataFull = [
  { month: "Oct '25", Pagos: 7601, CORE: 4553, LITE: 3030 },
  { month: "Nov '25", Pagos: 7496, CORE: 4436, LITE: 2945 },
  { month: "Dic '25", Pagos: 7974, CORE: 4668, LITE: 3254 },
  { month: "Ene '26", Pagos: 7504, CORE: 4393, LITE: 2997 },
  { month: "Feb '26", Pagos: 7570, CORE: 4427, LITE: 3048 },
  { month: "Mar '26", Pagos: 7977, CORE: 4936, LITE: 3412 },
];

// Sin Búsqueda ni gráficos (chart yhghuf5q)
const macTrendDataSinExtras = [
  { month: "Oct '25", Pagos: 7108, CORE: 3972, LITE: 2398 },
  { month: "Nov '25", Pagos: 7017, CORE: 3798, LITE: 2263 },
  { month: "Dic '25", Pagos: 7442, CORE: 3953, LITE: 2509 },
  { month: "Ene '26", Pagos: 7004, CORE: 3688, LITE: 2292 },
  { month: "Feb '26", Pagos: 7071, CORE: 3721, LITE: 2331 },
  { month: "Mar '26", Pagos: 7384, CORE: 4117, LITE: 2600 },
];

// Variación por país: Marzo '26 vs Octubre '25
const countryVariation = [
  { country: "Colombia", march: 5128, october: 4892, color: ALEGRA_GREEN },
  { country: "República Dominicana", march: 1197, october: 1135, color: "#0066FF" },
  { country: "México", march: 728, october: 677, color: "#FF6B00" },
  { country: "Costa Rica", march: 235, october: 232, color: "#06B6D4" },
];

function SideMetricCard({
  label,
  value,
  delta,
  color,
  highlight,
}: {
  label: string;
  value: number;
  delta: number;
  color: string;
  highlight?: boolean;
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
        <span className="ml-1 text-[10px] font-medium text-neutral-500">vs Oct '25</span>
      </p>
    </div>
  );
}

function Section2() {
  const [trendVariant, setTrendVariant] = useState<"full" | "sinExtras">("full");
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const macTrendData = trendVariant === "full" ? macTrendDataFull : macTrendDataSinExtras;
  const last = macTrendData[macTrendData.length - 1];
  const first = macTrendData[0];
  const deltaPct = (((last.Pagos - first.Pagos) / first.Pagos) * 100).toFixed(1);
  const positive = Number(deltaPct) >= 0;
  const coreDelta = (((last.CORE - first.CORE) / first.CORE) * 100).toFixed(1);
  const liteDelta = (((last.LITE - first.LITE) / first.LITE) * 100).toFixed(1);
  const coreUp = Number(coreDelta) >= 0;
  const liteUp = Number(liteDelta) >= 0;

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
              Usuarios pagos únicos que ejecutan al menos una acción crítica de negocio en la app cada mes.
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
                { label: "Búsquedas", isNew: true },
                { label: "Gráficos", isNew: true },
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
                Últimos 6 meses · Usuarios Pagos, segmentados por CORE y LITE
              </p>
            </div>
          </div>

          {/* Toggle entre las dos vistas de MAC */}
          <div className="mb-4 flex items-center justify-between gap-3 flex-wrap">
            <div className="inline-flex rounded-lg border border-neutral-200 bg-neutral-50 p-1">
              <button
                onClick={() => setTrendVariant("full")}
                className={cn(
                  "rounded-md px-3 py-1.5 text-xs font-semibold transition-all",
                  trendVariant === "full"
                    ? "bg-white text-neutral-900 shadow-sm"
                    : "text-neutral-500 hover:text-neutral-700",
                )}
              >
                MAC — Tendencia
              </button>
              <button
                onClick={() => setTrendVariant("sinExtras")}
                className={cn(
                  "rounded-md px-3 py-1.5 text-xs font-semibold transition-all",
                  trendVariant === "sinExtras"
                    ? "bg-white text-neutral-900 shadow-sm"
                    : "text-neutral-500 hover:text-neutral-700",
                )}
              >
                Sin búsqueda ni gráficos
              </button>
            </div>
            <a
              href={
                trendVariant === "full"
                  ? "https://app.amplitude.com/analytics/alegra/chart/wy27awa1"
                  : "https://app.amplitude.com/analytics/alegra/chart/yhghuf5q"
              }
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
                  dataKey="Pagos"
                  name="Usuarios Pagos"
                  stroke={ALEGRA_GREEN}
                  strokeWidth={3}
                  dot={{ r: 4, fill: ALEGRA_GREEN }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="CORE"
                  stroke="#1f2937"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="LITE"
                  stroke="#FF6B00"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cards laterales: dinámicas según el toggle */}
        <div className="flex flex-col gap-4 lg:col-span-1">
          <SideMetricCard
            label="MAC actual"
            value={last.Pagos}
            delta={Number(deltaPct)}
            color={ALEGRA_GREEN}
            highlight
          />
          <SideMetricCard
            label="MAC Core actual"
            value={last.CORE}
            delta={Number(coreDelta)}
            color="#1f2937"
          />
          <SideMetricCard
            label="MAC Lite actual"
            value={last.LITE}
            delta={Number(liteDelta)}
            color="#FF6B00"
          />
        </div>
      </div>

      {/* Variación por país: Marzo vs Octubre — clic para filtrar la línea */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-base font-bold text-neutral-900">
            MAC por país — Marzo '26 vs Octubre '25
          </h3>
          {selectedCountry && (
            <button
              onClick={() => setSelectedCountry(null)}
              className="text-xs font-medium text-neutral-500 hover:text-neutral-900"
            >
              Limpiar filtro ({selectedCountry}) ✕
            </button>
          )}
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {countryVariation.map((c) => {
            const delta = ((c.march - c.october) / c.october) * 100;
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
                    {c.march.toLocaleString("es-CO")}
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
                <p className="mt-0.5 text-[10px] font-medium text-neutral-400">vs Oct '25</p>
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

const macLinePerCountry = [
  { month: "Oct '25", Colombia: 4892, "República Dominicana": 1135, México: 677, "Costa Rica": 232 },
  { month: "Nov '25", Colombia: 4882, "República Dominicana": 1084, México: 667, "Costa Rica": 225 },
  { month: "Dic '25", Colombia: 5254, "República Dominicana": 1124, México: 729, "Costa Rica": 209 },
  { month: "Ene '26", Colombia: 4842, "República Dominicana": 1083, México: 659, "Costa Rica": 227 },
  { month: "Feb '26", Colombia: 4925, "República Dominicana": 1111, México: 657, "Costa Rica": 222 },
  { month: "Mar '26", Colombia: 5128, "República Dominicana": 1197, México: 728, "Costa Rica": 235 },
];

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
  const visible = selectedCountry && allCountries.includes(selectedCountry)
    ? [selectedCountry]
    : allCountries;

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      {/* Line per country */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm lg:col-span-3">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-neutral-900">MAC — Tendencia por país</h3>
            <p className="mt-1 text-xs text-neutral-500">
              Últimos 6 meses ·{" "}
              {selectedCountry ? `Filtrado: ${selectedCountry}` : "Top 4 países por volumen"}
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
            <LineChart data={macLinePerCountry} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="month" stroke="#6b7280" tick={{ fontSize: 11 }} axisLine={{ stroke: "#e5e7eb" }} tickLine={false} />
              <YAxis stroke="#6b7280" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
              {visible.map((c) => (
                <Line
                  key={c}
                  type="monotone"
                  dataKey={c}
                  stroke={countryColors[c]}
                  strokeWidth={c === "Colombia" ? 3 : 2}
                  dot={{ r: 3 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie per country */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm lg:col-span-2">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-neutral-900">MAC — Distribución por país</h3>
            <p className="mt-1 text-xs text-neutral-500">Marzo 2026</p>
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
        <div className="h-[220px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={macPieData} dataKey="value" nameKey="name" innerRadius={45} outerRadius={85} paddingAngle={2}>
                {macPieData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }}
                formatter={(v: number) => `${v.toLocaleString("es-CO")} (${((v / macPieTotal) * 100).toFixed(1)}%)`}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1 text-[11px]">
          {macPieData.slice(0, 6).map((d) => (
            <div key={d.name} className="flex items-center gap-1.5">
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

const adoptionByCountry = [
  { country: "Colombia", wac: 15.4, wau: 32.7 },
  { country: "Rep. Dominicana", wac: 31.1, wau: 56.4 },
  { country: "México", wac: 17.3, wau: 33.8 },
  { country: "Panamá", wac: 27.8, wau: 49.5 },
  { country: "Costa Rica", wac: 20.0, wau: 38.0 },
];

// Evolución mensual % usuarios pagos activos (Oct'25 → Mar'26) - chart rbp5ch2z
const adopcionMensualSeries = [
  { month: "Oct '25", adopcion: 30.5, real: 19.8 },
  { month: "Nov '25", adopcion: 30.2, real: 19.9 },
  { month: "Dic '25", adopcion: 31.0, real: 20.7 },
  { month: "Ene '26", adopcion: 30.8, real: 21.0 },
  { month: "Feb '26", adopcion: 30.6, real: 21.3 },
  { month: "Mar '26", adopcion: 31.1, real: 22.1 },
];

function TasaAdopcion() {
  // Marzo 2026 (chart rbp5ch2z): Ingresan a la app 31.85%, Realizan acción 22.10%
  const tasaAdopcion = 31.1; // MAU APP / MAC WEB
  const tasaReal = 22.1; // MAC APP / MAC WEB
  const tasaAdopcionOct = 30.5;
  const tasaRealOct = 19.8;
  const deltaAdopcion = tasaAdopcion - tasaAdopcionOct;
  const deltaReal = tasaReal - tasaRealOct;
  const upAdopcion = deltaAdopcion >= 0;
  const upReal = deltaReal >= 0;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-neutral-900">Tasa de Adopción</h3>
        <p className="mt-1 text-sm text-neutral-600">
          % de <strong>usuarios pagos web activos</strong> que entran a la app y/o realizan acciones de valor.
        </p>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-2">
        <div
          className="rounded-2xl border bg-white p-4 shadow-sm"
          style={{ borderLeft: `4px solid #0066FF` }}
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
              {upAdopcion ? "+" : ""}{deltaAdopcion.toFixed(1)} pp
              <span className="ml-1 text-[10px] font-medium text-neutral-500">vs Oct '25</span>
            </p>
          </div>
          <p className="mt-1.5 text-[11px] text-neutral-500">
            % de <strong>usuarios pagos web activos</strong> que entran a la app cada mes (Marzo 2026).
          </p>
        </div>

        <div
          className="rounded-2xl border bg-white p-4 shadow-sm"
          style={{ borderLeft: `4px solid ${ALEGRA_GREEN}` }}
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
              {upReal ? "+" : ""}{deltaReal.toFixed(1)} pp
              <span className="ml-1 text-[10px] font-medium text-neutral-500">vs Oct '25</span>
            </p>
          </div>
          <p className="mt-1.5 text-[11px] text-neutral-500">
            % de <strong>usuarios pagos web activos</strong> que realizan al menos una acción de valor en la app (Marzo 2026).
          </p>
        </div>
      </div>

      {/* Progreso global unificado: Tasa Real (verde) sobre Tasa de Adopción (azul) */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-neutral-900">
              Tasa de Adopción global — Marzo 2026
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
        {/* Barra unificada: azul = Adopción, verde encima = Real */}
        <div className="relative h-8 w-full overflow-hidden rounded-full bg-neutral-100">
          <div
            className="absolute left-0 top-0 h-full rounded-full transition-all"
            style={{ width: `${tasaAdopcion}%`, backgroundColor: "#0066FF" }}
          />
          <div
            className="absolute left-0 top-0 h-full rounded-full transition-all"
            style={{ width: `${tasaReal}%`, backgroundColor: ALEGRA_GREEN }}
          />
          <span
            className="absolute top-1/2 -translate-y-1/2 text-[11px] font-bold text-white"
            style={{ left: `calc(${tasaReal}% - 38px)` }}
          >
            {tasaReal}%
          </span>
          <span
            className="absolute top-1/2 -translate-y-1/2 text-[11px] font-bold text-white"
            style={{ left: `calc(${tasaAdopcion}% - 42px)` }}
          >
            {tasaAdopcion}%
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: ALEGRA_GREEN }} />
            <span className="font-semibold text-neutral-700">Tasa de Adopción Real</span>
            <span className="text-neutral-500">(MAC APP / MAC WEB)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#0066FF" }} />
            <span className="font-semibold text-neutral-700">Tasa de Adopción</span>
            <span className="text-neutral-500">(MAU APP / MAC WEB)</span>
          </div>
        </div>
      </div>

      {/* Evolución mensual */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-neutral-900">
              % Usuarios pagos activos que entran a la app o realizan una acción
            </h4>
            <p className="mt-0.5 text-xs text-neutral-500">
              Evolución mensual · Oct '25 → Mar '26
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
              <Line type="monotone" dataKey="adopcion" name="Tasa de Adopción (entran)" stroke="#0066FF" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="real" name="Tasa de Adopción Real (acciones)" stroke={ALEGRA_GREEN} strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart por país */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-neutral-900">
              % Usuarios pagos activos por país
            </h4>
            <p className="mt-0.5 text-xs text-neutral-500">
              Marzo 2026 · Tasa de Adopción (entran a la app) y Tasa Real (acciones de valor)
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
        <div className="space-y-3">
          {adoptionByCountry.map((c) => (
            <div key={c.country}>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="font-medium text-neutral-700">{c.country}</span>
                <div className="flex gap-3">
                  <span className="text-[#0066FF]">
                    Adopción <strong>{c.wau.toFixed(1)}%</strong>
                  </span>
                  <span style={{ color: ALEGRA_GREEN }}>
                    Real <strong>{c.wac.toFixed(1)}%</strong>
                  </span>
                </div>
              </div>
              <div className="relative h-5 w-full overflow-hidden rounded-full bg-neutral-100">
                <div
                  className="absolute left-0 top-0 h-full rounded-full"
                  style={{ width: `${Math.min(c.wau, 100)}%`, backgroundColor: "#0066FF40" }}
                />
                <div
                  className="absolute left-0 top-0 h-full rounded-full"
                  style={{ width: `${Math.min(c.wac, 100)}%`, backgroundColor: ALEGRA_GREEN }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// === % Participación de App ===

// Series reales de Amplitude (Oct '25 → Mar/Abr '26)
const facturasParticipSeries = [
  { m: "Oct", v: 7.85 },
  { m: "Nov", v: 7.37 },
  { m: "Dic", v: 7.27 },
  { m: "Ene", v: 7.33 },
  { m: "Feb", v: 7.29 },
  { m: "Mar", v: 7.57 },
];
const cotizacionesParticipSeries = [
  { m: "Oct", v: 14.80 },
  { m: "Nov", v: 14.89 },
  { m: "Dic", v: 16.14 },
  { m: "Ene", v: 13.81 },
  { m: "Feb", v: 14.47 },
  { m: "Mar", v: 15.38 },
];
const remisionesParticipSeries = [
  { m: "Oct", v: 6.84 },
  { m: "Nov", v: 7.48 },
  { m: "Dic", v: 6.35 },
  { m: "Ene", v: 6.49 },
  { m: "Feb", v: 6.08 },
  { m: "Mar", v: 6.42 },
  { m: "Abr", v: 8.93 },
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
      value: 7.57,
      delta: -3.8,
      color: ALEGRA_GREEN,
      desc: "% de facturas totales (web + app) creadas desde la app móvil",
      series: facturasParticipSeries,
      chartUrl: "https://app.amplitude.com/analytics/alegra/chart/hltxo7ij",
    },
    {
      label: "Cotizaciones",
      value: 15.4,
      delta: 3.94,
      color: "#0066FF",
      desc: "% de cotizaciones totales (web + app) creadas desde la app móvil",
      series: cotizacionesParticipSeries,
      chartUrl: "https://app.amplitude.com/analytics/alegra/chart/ndgvmi3v",
    },
    {
      label: "Remisiones",
      value: 8.96,
      delta: 6.9,
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
          const isUp = it.delta >= 0;
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
                {it.value.toLocaleString("es-CO")}%
              </p>
              <p
                className={cn(
                  "mt-1 flex items-center gap-1 text-sm font-bold",
                  isUp ? "text-emerald-600" : "text-red-600",
                )}
              >
                {isUp ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                {isUp ? "+" : ""}{it.delta.toFixed(2)}%
                <span className="ml-1 text-[11px] font-medium text-neutral-500">vs Oct '25</span>
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


function Section3() {
  const [tab, setTab] = useState<"negocio" | "baseSos">("negocio");

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
              Analizamos a los usuarios pagos activos en la app desde dos lentes complementarios: por <strong>tipo de negocio</strong> (Core / Lite) y por <strong>comportamiento</strong> (BASE / SOS).
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
          Negocio · Core y Lite
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
          BASE y SOS
        </button>
      </div>

      {tab === "baseSos" ? <BaseSosView /> : <NegocioView />}
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
                <AlertTriangle className="h-3 w-3" /> SOS
              </span>
              <h3 className="mt-3 text-xl font-bold text-neutral-900">
                Utilizan la app para una emergencia
              </h3>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold" style={{ color: "#FF6B00" }}>
                62%
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
                <Star className="h-3 w-3" /> BASE
              </span>
              <h3 className="mt-3 text-xl font-bold text-neutral-900">
                Utilizan la app como su principal herramienta
              </h3>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold" style={{ color: ALEGRA_GREEN }}>
                38%
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

// Distribución BASE / SOS por país (Mar 2026) - aproximación a partir del mix por país
const baseSosPorPaisData = [
  { country: "Colombia", short: "CO", BASE: 39, SOS: 61 },
  { country: "México", short: "MX", BASE: 33, SOS: 67 },
  { country: "Costa Rica", short: "CR", BASE: 41, SOS: 59 },
  { country: "Rep. Dominicana", short: "DOM", BASE: 36, SOS: 64 },
];

function BaseSosPorPais() {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <h3 className="text-base font-bold text-neutral-900">
        Distribución por país
      </h3>
      <p className="mt-1 text-xs text-neutral-500">% BASE vs SOS · Marzo 2026</p>
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
          <span className="font-semibold text-neutral-700">BASE</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#FF6B00" }} />
          <span className="font-semibold text-neutral-700">SOS</span>
        </span>
      </div>
    </div>
  );
}

function SectionComportamiento() {
  const [tab, setTab] = useState<"coreLite" | "baseSos">("coreLite");

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
              Cómo se relacionan los usuarios con las funcionalidades de la app, segmentado por <strong>Negocio (Core / Lite)</strong> y por <strong>Comportamiento (BASE / SOS)</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="inline-flex flex-wrap rounded-lg border border-neutral-200 bg-neutral-50 p-1">
        <button
          onClick={() => setTab("coreLite")}
          className={cn(
            "rounded-md px-4 py-2 text-xs font-semibold transition-all",
            tab === "coreLite"
              ? "bg-white text-neutral-900 shadow-sm"
              : "text-neutral-500 hover:text-neutral-700",
          )}
        >
          Negocio · Core y Lite
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
          BASE y SOS
        </button>
      </div>

      {tab === "coreLite" ? <ComportamientoCoreLiteView /> : <ComportamientoBaseSosView />}
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
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  const filteredCoreEvents = activeFeature
    ? coreEvents.filter((e) => e.label === activeFeature)
    : coreEvents;
  const filteredLiteEvents = activeFeature
    ? liteEvents.filter((e) => e.label === activeFeature)
    : liteEvents;

  return (
    <div className="space-y-6">
      {/* Adopción funcionalidades CORE vs LITE - barras VERTICALES */}
      <div className="rounded-2xl border border-neutral-200 bg-white px-6 pt-5 pb-2 shadow-sm">
        <div className="mb-2 flex items-start justify-between gap-3 flex-wrap">
          <div>
            <h4 className="text-base font-bold text-neutral-900">
              Adopción funcionalidades — Uniques Mensual CORE vs LITE
            </h4>
            <p className="mt-0.5 text-xs text-neutral-500">
              % de adopción por funcionalidad · Marzo 2026
            </p>
          </div>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={adopcionCoreLiteData} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
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

  return (
    <div className="space-y-6">
      <FeatureTagFilter
        features={allFeatures}
        active={activeFeature}
        onChange={setActiveFeature}
        description="Selecciona un tag para filtrar los gráficos de adopción y engagement BASE / SOS"
      />

      {/* Adopción funcionalidades BASE vs SOS */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="mb-3 flex items-start justify-between gap-3 flex-wrap">
          <div>
            <h4 className="text-base font-bold text-neutral-900">
              Adopción funcionalidades — Uniques Mensual BASE vs SOS
            </h4>
            <p className="mt-1 text-xs text-neutral-500">
              % de adopción por funcionalidad · Mar 2026 · Cohort BASE vs Cohort SOS
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
              <Bar dataKey="BASE" fill={ALEGRA_GREEN} radius={[0, 4, 4, 0]} />
              <Bar dataKey="SOS" fill="#FF6B00" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Engagement scatter BASE / SOS */}
      <div className="grid gap-6 xl:grid-cols-2">
        <EngagementScatterSegment
          segment="BASE"
          events={filteredBase}
          accent={ALEGRA_GREEN}
          chartUrl="https://app.amplitude.com/analytics/alegra/chart/no1u7db2"
        />
        <EngagementScatterSegment
          segment="SOS"
          events={filteredSos}
          accent="#FF6B00"
          chartUrl="https://app.amplitude.com/analytics/alegra/chart/ezbhdx9r"
        />
      </div>
    </div>
  );
}

// === Negocio: Core / Lite ===

const macCoreLiteTrend = [
  { month: "Oct '25", CORE: 4553, LITE: 3030 },
  { month: "Nov '25", CORE: 4436, LITE: 2945 },
  { month: "Dic '25", CORE: 4668, LITE: 3254 },
  { month: "Ene '26", CORE: 4393, LITE: 2997 },
  { month: "Feb '26", CORE: 4427, LITE: 3048 },
  { month: "Mar '26", CORE: 4936, LITE: 3412 },
];

// MAC por país (CORE / LITE) — Oct '25 → Mar '26
// Fuente: Amplitude jgmbk3gb (CORE) y af1mxpmw (LITE), agregado por país
type CoreLitePerCountry = {
  country: string;
  short: string;
  color: string;
  CORE: { month: string; v: number }[];
  LITE: { month: string; v: number }[];
};
const macCoreLitePerCountry: CoreLitePerCountry[] = [
  {
    country: "Colombia",
    short: "CO",
    color: ALEGRA_GREEN,
    CORE: [
      { month: "Oct '25", v: 2780 },
      { month: "Nov '25", v: 2705 },
      { month: "Dic '25", v: 2860 },
      { month: "Ene '26", v: 2690 },
      { month: "Feb '26", v: 2710 },
      { month: "Mar '26", v: 3015 },
    ],
    LITE: [
      { month: "Oct '25", v: 1860 },
      { month: "Nov '25", v: 1810 },
      { month: "Dic '25", v: 1990 },
      { month: "Ene '26", v: 1840 },
      { month: "Feb '26", v: 1870 },
      { month: "Mar '26", v: 2095 },
    ],
  },
  {
    country: "México",
    short: "MX",
    color: "#FF6B00",
    CORE: [
      { month: "Oct '25", v: 410 },
      { month: "Nov '25", v: 405 },
      { month: "Dic '25", v: 425 },
      { month: "Ene '26", v: 398 },
      { month: "Feb '26", v: 401 },
      { month: "Mar '26", v: 442 },
    ],
    LITE: [
      { month: "Oct '25", v: 270 },
      { month: "Nov '25", v: 265 },
      { month: "Dic '25", v: 290 },
      { month: "Ene '26", v: 269 },
      { month: "Feb '26", v: 273 },
      { month: "Mar '26", v: 305 },
    ],
  },
  {
    country: "Costa Rica",
    short: "CR",
    color: "#06B6D4",
    CORE: [
      { month: "Oct '25", v: 142 },
      { month: "Nov '25", v: 138 },
      { month: "Dic '25", v: 130 },
      { month: "Ene '26", v: 139 },
      { month: "Feb '26", v: 134 },
      { month: "Mar '26", v: 145 },
    ],
    LITE: [
      { month: "Oct '25", v: 92 },
      { month: "Nov '25", v: 88 },
      { month: "Dic '25", v: 79 },
      { month: "Ene '26", v: 89 },
      { month: "Feb '26", v: 87 },
      { month: "Mar '26", v: 93 },
    ],
  },
  {
    country: "Rep. Dominicana",
    short: "DOM",
    color: "#0066FF",
    CORE: [
      { month: "Oct '25", v: 720 },
      { month: "Nov '25", v: 705 },
      { month: "Dic '25", v: 745 },
      { month: "Ene '26", v: 698 },
      { month: "Feb '26", v: 705 },
      { month: "Mar '26", v: 785 },
    ],
    LITE: [
      { month: "Oct '25", v: 425 },
      { month: "Nov '25", v: 415 },
      { month: "Dic '25", v: 460 },
      { month: "Ene '26", v: 419 },
      { month: "Feb '26", v: 425 },
      { month: "Mar '26", v: 478 },
    ],
  },
];

const corePieData = [
  { name: "CORE", value: 4936, color: ALEGRA_GREEN },
  { name: "LITE", value: 3412, color: "#FF6B00" },
];
const corePieTotal = corePieData.reduce((s, d) => s + d.value, 0);

// Engagement por funcionalidad — CORE y LITE (Adopción %MAU vs Frecuencia)
type EngagementEvent = {
  num: number;
  label: string;
  adoption: number; // % MAU
  frequency: number; // avg perform
};
// Datos reales Amplitude (Mar 2026)
const coreEvents: EngagementEvent[] = [
  { num: 1, label: "Crear factura", adoption: 44.3, frequency: 45.3 },
  { num: 2, label: "Buscar factura", adoption: 38.2, frequency: 28.0 },
  { num: 6, label: "Ver gráfico de ventas", adoption: 27.8, frequency: 9.3 },
  { num: 4, label: "Crear cotización", adoption: 27.0, frequency: 27.1 },
  { num: 3, label: "Crear contacto", adoption: 20.0, frequency: 10.6 },
  { num: 5, label: "Crear ítem", adoption: 15.3, frequency: 7.3 },
  { num: 8, label: "Crear remisión", adoption: 4.4, frequency: 42.4 },
  { num: 9, label: "Crear factura de proveedor", adoption: 3.0, frequency: 10.4 },
  { num: 10, label: "Crear gasto", adoption: 1.9, frequency: 9.4 },
];
const liteEvents: EngagementEvent[] = [
  { num: 1, label: "Crear factura", adoption: 56.7, frequency: 13.2 },
  { num: 3, label: "Crear contacto", adoption: 27.6, frequency: 4.8 },
  { num: 4, label: "Crear cotización", adoption: 24.2, frequency: 7.6 },
  { num: 2, label: "Buscar factura", adoption: 24.2, frequency: 10.8 },
  { num: 5, label: "Crear ítem", adoption: 23.2, frequency: 8.0 },
  { num: 6, label: "Ver gráfico de ventas", adoption: 21.8, frequency: 7.0 },
  { num: 8, label: "Crear remisión", adoption: 2.5, frequency: 8.4 },
  { num: 10, label: "Crear gasto", adoption: 2.0, frequency: 8.0 },
  { num: 9, label: "Crear factura de proveedor", adoption: 2.0, frequency: 8.2 },
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

// Adopción CORE vs LITE - basado en % adoption Mar 2026
const adopcionCoreLiteData = Array.from(
  new Set([...coreEvents.map((e) => e.label), ...liteEvents.map((e) => e.label)]),
)
  .map((label) => {
    const c = coreEvents.find((e) => e.label === label);
    const l = liteEvents.find((e) => e.label === label);
    return { event: label, CORE: c ? c.adoption : 0, LITE: l ? l.adoption : 0 };
  })
  .sort((a, b) => b.CORE + b.LITE - (a.CORE + a.LITE));

// Adopción mensual % por evento — Series reales Amplitude (Oct '25 → Mar '26)
// Formula: % usuarios únicos del evento / MAC del segmento × 100
type MonthlyAdoptionSeries = { label: string; num: number; series: { month: string; pct: number }[] };

const months6 = ["Oct '25", "Nov '25", "Dic '25", "Ene '26", "Feb '26", "Mar '26"];

// % MAU mensual CORE (chart 8bsh2x62 con histórico mensual)
const coreMonthlyAdoption: MonthlyAdoptionSeries[] = [
  { num: 1, label: "Crear factura",              series: zip(months6, [42.1, 41.5, 43.8, 41.0, 41.8, 44.3]) },
  { num: 2, label: "Buscar factura",             series: zip(months6, [33.5, 34.6, 35.9, 35.4, 34.9, 38.2]) },
  { num: 3, label: "Ver gráfico de ventas",      series: zip(months6, [22.5, 26.8, 28.6, 28.1, 27.9, 27.8]) },
  { num: 4, label: "Crear cotización",           series: zip(months6, [27.6, 26.7, 25.5, 26.0, 26.4, 27.0]) },
  { num: 5, label: "Crear contacto",             series: zip(months6, [22.0, 19.7, 20.2, 19.7, 20.3, 20.0]) },
  { num: 6, label: "Crear ítem",                 series: zip(months6, [15.5, 14.7, 15.3, 12.9, 14.5, 15.3]) },
  { num: 7, label: "Crear remisión",             series: zip(months6, [3.9, 3.7, 4.0, 3.6, 3.9, 4.4]) },
  { num: 8, label: "Crear factura de proveedor", series: zip(months6, [2.8, 2.6, 2.7, 2.4, 2.7, 3.0]) },
  { num: 9, label: "Crear gasto",                series: zip(months6, [1.7, 1.6, 1.7, 1.5, 1.7, 1.9]) },
];

// % MAU mensual LITE (chart jtbzs8ce con histórico mensual)
const liteMonthlyAdoption: MonthlyAdoptionSeries[] = [
  { num: 1, label: "Crear factura",              series: zip(months6, [55.0, 55.2, 56.7, 52.3, 53.5, 56.7]) },
  { num: 2, label: "Crear contacto",             series: zip(months6, [29.4, 28.7, 27.8, 27.4, 28.2, 27.6]) },
  { num: 3, label: "Crear cotización",           series: zip(months6, [23.2, 22.5, 20.6, 22.2, 22.5, 24.2]) },
  { num: 4, label: "Buscar factura",             series: zip(months6, [19.8, 20.2, 21.0, 19.8, 19.7, 24.2]) },
  { num: 5, label: "Crear ítem",                 series: zip(months6, [24.6, 23.6, 23.9, 23.4, 23.3, 23.2]) },
  { num: 6, label: "Ver gráfico de ventas",      series: zip(months6, [16.7, 20.7, 23.0, 21.5, 21.2, 21.8]) },
  { num: 7, label: "Crear remisión",             series: zip(months6, [2.2, 2.1, 2.3, 2.1, 2.2, 2.5]) },
  { num: 8, label: "Crear gasto",                series: zip(months6, [1.8, 1.7, 1.9, 1.7, 1.8, 2.0]) },
  { num: 9, label: "Crear factura de proveedor", series: zip(months6, [1.7, 1.7, 1.8, 1.6, 1.8, 2.0]) },
];

function zip(months: string[], vals: number[]): { month: string; pct: number }[] {
  return months.map((m, i) => ({ month: m, pct: vals[i] }));
}

// === Comportamiento BASE / SOS — datos reales Amplitude ===

// Adopción funcionalidades BASE vs SOS - chart aq7o241v (Mar 29 - Abr 26 2026)
const adopcionBaseSosData = [
  { event: "Crear factura", BASE: 79.8, SOS: 49.2 },
  { event: "Crear contacto", BASE: 43.1, SOS: 21.2 },
  { event: "Crear ítem", BASE: 36.8, SOS: 13.2 },
  { event: "Buscar factura", BASE: 30.4, SOS: 40.4 },
  { event: "Crear cotización", BASE: 29.8, SOS: 34.6 },
  { event: "Ver gráfico de ventas", BASE: 27.2, SOS: 32.3 },
  { event: "Cuentas por cobrar", BASE: 9.9, SOS: 19.8 },
  { event: "Crear factura de proveedor", BASE: 3.2, SOS: 2.8 },
  { event: "Crear remisión", BASE: 3.1, SOS: 5.1 },
];

// Engagement BASE - chart no1u7db2 (Mar 29 - Abr 26 2026)
const baseEvents: EngagementEvent[] = [
  { num: 1, label: "Crear factura", adoption: 71.3, frequency: 35.4 },
  { num: 3, label: "Crear contacto", adoption: 37.2, frequency: 8.0 },
  { num: 5, label: "Crear ítem", adoption: 32.1, frequency: 9.3 },
  { num: 4, label: "Crear cotización", adoption: 26.2, frequency: 15.2 },
  { num: 2, label: "Buscar factura", adoption: 21.5, frequency: 25.6 },
  { num: 6, label: "Ver gráfico de ventas", adoption: 20.3, frequency: 13.1 },
  { num: 9, label: "Crear factura de proveedor", adoption: 2.9, frequency: 16.9 },
  { num: 8, label: "Crear remisión", adoption: 2.8, frequency: 31.8 },
  { num: 10, label: "Crear gasto", adoption: 2.1, frequency: 12.3 },
];

// Engagement SOS - chart ezbhdx9r (Mar 2026)
const sosEvents: EngagementEvent[] = [
  { num: 1, label: "Crear factura", adoption: 24.6, frequency: 9.1 },
  { num: 2, label: "Buscar factura", adoption: 18.5, frequency: 14.0 },
  { num: 4, label: "Crear cotización", adoption: 18.3, frequency: 16.2 },
  { num: 6, label: "Ver gráfico de ventas", adoption: 12.8, frequency: 7.6 },
  { num: 3, label: "Crear contacto", adoption: 10.0, frequency: 3.6 },
  { num: 5, label: "Crear ítem", adoption: 6.1, frequency: 4.3 },
  { num: 8, label: "Crear remisión", adoption: 2.4, frequency: 47.8 },
  { num: 9, label: "Crear factura de proveedor", adoption: 1.3, frequency: 3.6 },
  { num: 10, label: "Crear gasto", adoption: 1.1, frequency: 5.9 },
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
          <div className="mb-4 flex items-end justify-between">
            <div>
              <h3 className="text-lg font-bold text-neutral-900">
                MAC — Tendencia CORE y LITE
              </h3>
              <p className="mt-1 text-xs text-neutral-500">
                Últimos 6 meses · Usuarios pagos activos por tipo de negocio
              </p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div
              className="rounded-xl border bg-white p-4"
              style={{ borderLeft: `4px solid ${ALEGRA_GREEN}` }}
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
                {coreUp ? "+" : ""}{coreDelta}% vs Oct '25
              </p>
            </div>
            <div
              className="rounded-xl border bg-white p-4"
              style={{ borderLeft: `4px solid #FF6B00` }}
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
                {liteUp ? "+" : ""}{liteDelta}% vs Oct '25
              </p>
            </div>
          </div>

          <div className="mt-6 h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={macCoreLiteTrend} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="month" stroke="#6b7280" tick={{ fontSize: 12 }} axisLine={{ stroke: "#e5e7eb" }} tickLine={false} />
                <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => v.toLocaleString("es-CO")} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }} formatter={(v: number) => v.toLocaleString("es-CO")} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
                <Line type="monotone" dataKey="CORE" stroke={ALEGRA_GREEN} strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="LITE" stroke="#FF6B00" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <p className="mt-3 text-[11px] text-neutral-400">
            Fuente: Amplitude · jgmbk3gb (CORE) · af1mxpmw (LITE)
          </p>
        </div>

        {/* Distribución al lado */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h3 className="text-base font-bold text-neutral-900">
            Distribución CORE vs LITE
          </h3>
          <p className="mt-1 text-xs text-neutral-500">Marzo 2026</p>
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
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
          <div className="flex items-baseline gap-3">
            <h3 className="text-lg font-bold text-neutral-900">Detalle por país</h3>
            <span className="text-xs text-neutral-500">
              Click en una card para filtrar el gráfico de abajo
            </span>
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
                <p className="mt-0.5 text-[10px] font-medium text-neutral-400">vs Oct '25</p>
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
            <div className="flex items-center gap-2">
              <div className="inline-flex rounded-lg border border-neutral-200 bg-neutral-50 p-1">
                {([
                  { id: "both", label: "Core + Lite" },
                  { id: "CORE", label: "Core" },
                  { id: "LITE", label: "Lite" },
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

          <p className="mt-3 text-[11px] text-neutral-400">
            Fuente: Amplitude · jgmbk3gb (CORE) · af1mxpmw (LITE)
          </p>
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
}: {
  core: MonthlyAdoptionSeries[];
  lite: MonthlyAdoptionSeries[];
  active: string | null;
  onChangeActive: (v: string | null) => void;
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
          a == null || b == null ? null : a - b;
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
        {active && (
          <button
            onClick={() => setActive(null)}
            className="rounded-full border border-neutral-300 px-3 py-1 text-[11px] font-medium text-neutral-600 hover:bg-neutral-50"
          >
            Limpiar filtro
          </button>
        )}
      </div>

      {/* Tags compartidos */}
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
                  Oct '25
                </th>
                <th className="px-4 py-2 text-right font-semibold uppercase tracking-wider">
                  Mar '26
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
                    : `${comparison.coreDelta >= 0 ? "+" : ""}${comparison.coreDelta.toFixed(1)} pp`}
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
                    : `${comparison.liteDelta >= 0 ? "+" : ""}${comparison.liteDelta.toFixed(1)} pp`}
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
}: {
  segment: "CORE" | "LITE";
  data: Record<string, string | number>[];
  series: MonthlyAdoptionSeries[];
}) {
  const accent = segment === "CORE" ? ALEGRA_GREEN : "#FF6B00";
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-4">
      <div className="mb-2 flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: accent }} />
        <h5 className="text-sm font-bold text-neutral-900">{segment}</h5>
        <span className="text-[11px] text-neutral-500">% MAU mensual</span>
      </div>
      <div className="h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis dataKey="month" stroke="#6b7280" tick={{ fontSize: 11 }} axisLine={{ stroke: "#e5e7eb" }} tickLine={false} />
            <YAxis stroke="#6b7280" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
            <Tooltip
              contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }}
              formatter={(v: number) => `${v.toFixed(1)}%`}
            />
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
  segment: "CORE" | "LITE" | "BASE" | "SOS";
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
  // SOS = 62%, BASE = 38% (proporcional al tamaño del círculo via radio)
  const sosPct = 62;
  const basePct = 38;
  // El área del círculo es proporcional al porcentaje => radio ∝ √pct
  const sosRadius = Math.sqrt(sosPct) * 22; // px
  const baseRadius = Math.sqrt(basePct) * 22;

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-neutral-900">
            Clusters BASE y SOS
          </h3>
          <p className="mt-1 text-xs text-neutral-500">
            Tamaño relativo de cada cluster · Análisis de comportamiento de usuarios pagos activos
          </p>
        </div>
        <a
          href="https://app.amplitude.com/analytics/alegra/chart/w4dmwazb"
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
              <p className="text-4xl font-bold leading-none md:text-5xl">{sosPct}%</p>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-widest opacity-90">
                SOS
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
              <p className="text-3xl font-bold leading-none md:text-4xl">{basePct}%</p>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-widest opacity-90">
                BASE
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

      {/* Detalle inferior */}
      <div className="mt-2 grid gap-3 border-t border-neutral-100 pt-5 text-xs text-neutral-600 md:grid-cols-2">
        <div
          className="rounded-lg p-3"
          style={{ backgroundColor: "#FF6B0010" }}
        >
          <p className="font-bold" style={{ color: "#FF6B00" }}>
            Cluster SOS — 62%
          </p>
          <p className="mt-1 text-neutral-600">
            Eventos de web · Reportes en App · Busca factura de venta en app
          </p>
        </div>
        <div
          className="rounded-lg p-3"
          style={{ backgroundColor: `${ALEGRA_GREEN}10` }}
        >
          <p className="font-bold" style={{ color: ALEGRA_GREEN }}>
            Cluster BASE — 38%
          </p>
          <p className="mt-1 text-neutral-600">
            Factura de venta App · Item en App · Contactos en App · Cotizaciones App
          </p>
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
    title: "Rediseño Facturación Costa Rica",
    tags: ["Engagement", "Adopción"],
    problem:
      "Con la salida en web de la versión 4.4, la cantidad de facturas aumentó un 20%, sin embargo, en la app se mantuvo constante. Adicionalmente, la tasa de conversión es la menor de las 4 versiones (63% hoy).",
    krs: ["KR 2.1", "KR 2.2", "KR 2.3"],
  },
  {
    title: "Estabilización",
    tags: ["Experiencia"],
    problem:
      "Semanalmente se presentan alrededor de 8k errores que se reportan conjuntamente en Sentry y Amplitude.",
    krs: ["KR 1.3"],
  },
  {
    title: "Onboarding del Q4",
    tags: ["Adopción"],
    problem:
      "Continuación del trabajo de onboarding iniciado en Q4 para mejorar la activación de nuevos usuarios en la app.",
    krs: ["KR 2.1"],
  },
  {
    title: "Búsqueda de documentos e información",
    tags: ["Engagement"],
    problem:
      "Los usuarios no pueden encontrar fácilmente sus documentos e información dentro de la app, generando fricción en la consulta.",
    krs: ["KR 1.3"],
  },
  {
    title: "Compartir y descargar remisiones",
    tags: ["Adopción", "Engagement"],
    problem:
      "Falta la capacidad de compartir y descargar remisiones desde la app, limitando la operación móvil del usuario.",
    krs: ["KR 2.2"],
  },
  {
    title: "Llenado automático campos contactos",
    tags: ["Adopción", "Engagement"],
    problem:
      "El llenado manual de campos en contactos es tedioso y aumenta la fricción al crear un nuevo contacto.",
    krs: ["KR 2.1"],
  },
  {
    title: "Home — acciones rápidas",
    tags: ["Engagement"],
    problem:
      "El home actual no facilita el acceso rápido a las acciones más usadas por los usuarios.",
    krs: ["KR 2.2"],
  },
];

const nonDevInitiativesS4 = [
  {
    title: "Creación de la sección de App en Alegra",
    tags: ["Adopción"],
    problem: "No existe una sección dedicada para la app en la plataforma de Alegra.",
  },
  {
    title: "Testeo de push notification dentro de la app",
    tags: ["Engagement"],
    problem: "No se han probado las notificaciones push de forma estructurada.",
  },
  {
    title: "G&S para incentivar descarga de usuarios web",
    tags: ["Adopción"],
    problem: "Bajo porcentaje de usuarios web que descargan la app.",
  },
];

function Section4() {
  const okr1 = okrs.find((o) => o.id === "obj-1");
  const okr2 = okrs.find((o) => o.id === "obj-2");
  const [openInit, setOpenInit] = useState<string | null>(null);
  const DetailComp = openInit ? initiativeDetailMap[openInit] : null;

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
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {devInitiativesS4.map((i, idx) => (
            <SimpleInitiativeCard
              key={idx}
              {...i}
              onClick={initiativeDetailMap[i.title] ? () => setOpenInit(i.title) : undefined}
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
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {nonDevInitiativesS4.map((i, idx) => (
            <SimpleInitiativeCard
              key={idx}
              {...i}
              onClick={initiativeDetailMap[i.title] ? () => setOpenInit(i.title) : undefined}
            />
          ))}
        </div>
      </div>

      {/* Detail dialog */}
      <Dialog open={!!openInit} onOpenChange={(o) => !o && setOpenInit(null)}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-neutral-900">{openInit}</DialogTitle>
          </DialogHeader>
          {DetailComp && <DetailComp />}
        </DialogContent>
      </Dialog>
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

      {/* Charts: tendencia + origen */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Línea: bugs por mes */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm lg:col-span-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                Tendencia
              </p>
              <h3 className="mt-1 text-base font-bold text-neutral-900">
                Cantidad de bugs por mes
              </h3>
              <p className="mt-1 text-xs text-neutral-500">
                Octubre 2025 – Marzo 2026
              </p>
            </div>
            <Badge variant="outline" className="border-neutral-200 text-[10px] font-semibold text-neutral-600">
              27 bugs
            </Badge>
          </div>

          <div className="mt-5 h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={[
                  { mes: "Oct", cantidad: 3 },
                  { mes: "Nov", cantidad: 4 },
                  { mes: "Dic", cantidad: 3 },
                  { mes: "Ene", cantidad: 4 },
                  { mes: "Feb", cantidad: 6 },
                  { mes: "Mar", cantidad: 5 },
                  { mes: "Abr", cantidad: 2 },
                ]}
                margin={{ top: 10, right: 16, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="mes" tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid #e5e7eb",
                    fontSize: 12,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="cantidad"
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

        {/* Donut: origen Q1 */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm lg:col-span-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Origen Q1
            </p>
            <h3 className="mt-1 text-base font-bold text-neutral-900">
              Total de bugs encontrados
            </h3>
            <p className="mt-1 text-xs text-neutral-500">
              Detección por canal en Q1 2026
            </p>
          </div>

          <div className="relative mt-3 h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: "Llamadas y visitas", value: 24, fill: "#EF4444" },
                    { name: "Soporte (CS)", value: 14, fill: "#FCA5A5" },
                  ]}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={2}
                  stroke="#fff"
                  strokeWidth={2}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid #e5e7eb",
                    fontSize: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-neutral-900">38</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
                bugs Q1
              </span>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between rounded-lg bg-neutral-50 px-3 py-2">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: "#EF4444" }} />
                <span className="text-xs font-medium text-neutral-700">Llamadas y visitas</span>
              </div>
              <span className="text-xs font-bold text-neutral-900">24</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-neutral-50 px-3 py-2">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: "#FCA5A5" }} />
                <span className="text-xs font-medium text-neutral-700">Soporte (CS)</span>
              </div>
              <span className="text-xs font-bold text-neutral-900">14</span>
            </div>
          </div>

          <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs leading-relaxed text-amber-900">
            <span className="font-semibold">Insight:</span> encontramos más bugs en llamadas y visitas con clientes que a través de soporte.
          </p>
        </div>
      </div>
    </div>
  );
}

// --- Datos Soporte (Amplitude charts h88jlpxl + dfv2ba96) - últimos 3 meses ---
const soporteData = [
  { mes: "Feb '26", uniques: 268, totals: 493 },
  { mes: "Mar '26", uniques: 289, totals: 510 },
  { mes: "Abr '26", uniques: 155, totals: 298 },
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

// --- Tendencias mensuales actualizadas (Amplitude refresh) ---
const tendenciaPerfilMQL = [
  { mes: "Oct '25", pct: 89.22 },
  { mes: "Nov '25", pct: 92.03 },
  { mes: "Dic '25", pct: 88.32 },
  { mes: "Ene '26", pct: 87.04 },
  { mes: "Feb '26", pct: 84.73 },
  { mes: "Mar '26", pct: 86.89 },
];
const tendenciaPerfilPQL = [
  { mes: "Oct '25", pct: 14.59 },
  { mes: "Nov '25", pct: 17.99 },
  { mes: "Dic '25", pct: 17.53 },
  { mes: "Ene '26", pct: 17.41 },
  { mes: "Feb '26", pct: 13.80 },
  { mes: "Mar '26", pct: 12.88 },
  { mes: "Abr '26", pct: 12.54 },
];
const tendenciaPerfilLogo = [
  { mes: "Oct '25", pct: 1.69 },
  { mes: "Nov '25", pct: 2.06 },
  { mes: "Dic '25", pct: 2.75 },
  { mes: "Ene '26", pct: 2.63 },
  { mes: "Feb '26", pct: 2.49 },
  { mes: "Mar '26", pct: 2.39 },
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

// --- Eventos Onboarding Semanal (chart j30yk1tu) - últimas 24 semanas ---
const eventosOnboardingSemanal = [
  { semana: "02 Nov", perfil: 84, mql: 77, pql: 30 },
  { semana: "09 Nov", perfil: 99, mql: 89, pql: 31 },
  { semana: "16 Nov", perfil: 89, mql: 79, pql: 22 },
  { semana: "23 Nov", perfil: 99, mql: 89, pql: 30 },
  { semana: "30 Nov", perfil: 87, mql: 78, pql: 28 },
  { semana: "07 Dic", perfil: 69, mql: 58, pql: 17 },
  { semana: "14 Dic", perfil: 65, mql: 60, pql: 19 },
  { semana: "21 Dic", perfil: 54, mql: 45, pql: 17 },
  { semana: "28 Dic", perfil: 60, mql: 52, pql: 13 },
  { semana: "04 Ene", perfil: 105, mql: 96, pql: 33 },
  { semana: "11 Ene", perfil: 117, mql: 96, pql: 35 },
  { semana: "18 Ene", perfil: 98, mql: 86, pql: 28 },
  { semana: "25 Ene", perfil: 141, mql: 116, pql: 31 },
  { semana: "01 Feb", perfil: 217, mql: 182, pql: 38 },
  { semana: "08 Feb", perfil: 231, mql: 191, pql: 62 },
  { semana: "15 Feb", perfil: 248, mql: 217, pql: 58 },
  { semana: "22 Feb", perfil: 188, mql: 148, pql: 60 },
  { semana: "01 Mar", perfil: 178, mql: 153, pql: 45 },
  { semana: "08 Mar", perfil: 98, mql: 84, pql: 43 },
  { semana: "15 Mar", perfil: 222, mql: 190, pql: 51 },
  { semana: "22 Mar", perfil: 264, mql: 224, pql: 62 },
  { semana: "29 Mar", perfil: 260, mql: 214, pql: 56 },
  { semana: "05 Abr", perfil: 322, mql: 289, pql: 63 },
  { semana: "12 Abr", perfil: 281, mql: 242, pql: 76 },
  { semana: "19 Abr", perfil: 257, mql: 219, pql: 72 },
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
          Oct: <span className="font-semibold text-neutral-700">{oct.toFixed(2)}%</span>
        </span>
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold",
            positive ? "bg-emerald-50 text-emerald-700" : "bg-orange-50 text-orange-700",
          )}
        >
          {positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          {positive ? "+" : ""}
          {deltaPct.toFixed(2)}% vs Oct
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

// --- Eventos Onboarding Semanal (chart j30yk1tu) ---
function EventosOnboardingSemanalCard() {
  const first = eventosOnboardingSemanal[0];
  const last = eventosOnboardingSemanal[eventosOnboardingSemanal.length - 1];
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
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">Volumen semanal</p>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <h3 className="text-base font-bold text-neutral-900">Eventos Onboarding Semanal</h3>
            {tag("Perfil", perfilDelta)}
            {tag("MQL", mqlDelta)}
            {tag("PQL", pqlDelta)}
          </div>
        </div>
        <a
          href="https://app.amplitude.com/analytics/alegra/chart/j30yk1tu"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[11px] font-semibold text-neutral-500 hover:text-neutral-800"
        >
          <ExternalLink className="h-3 w-3" /> Amplitude
        </a>
      </div>

      <div className="mt-5 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={eventosOnboardingSemanal} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis dataKey="semana" tick={{ fontSize: 10, fill: "#6b7280" }} axisLine={false} tickLine={false} />
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

// Funcionalidades que más utilizan los BASE por fuera de la App (web).
// Conteo de eventos · Cohort MAC Mobile BASE Marzo 2026 · 2026-03-29 → 2026-04-26
// Fuente: Amplitude chart h6i1m5l2
const baseFueraDeApp = [
  { feature: "Creación Factura", uso: 34089 },
  { feature: "Pago recibido", uso: 22989 },
  { feature: "Reportes", uso: 18519 },
  { feature: "Imprimir fv", uso: 14717 },
  { feature: "Editar fv", uso: 13774 },
  { feature: "Items", uso: 10935 },
  { feature: "Factura de compra", uso: 7605 },
  { feature: "Pago de gastos", uso: 6284 },
  { feature: "Descargar fv", uso: 5927 },
  { feature: "Descargar reportes", uso: 5710 },
  { feature: "Reportes por vendedor", uso: 5601 },
  { feature: "Contacto", uso: 3460 },
  { feature: "Cotizaciones", uso: 3420 },
  { feature: "Compartir fv", uso: 2050 },
  { feature: "Clonar", uso: 2040 },
  { feature: "Remisiones", uso: 1690 },
  { feature: "Editar retenciones", uso: 1677 },
  { feature: "Nota de crédito", uso: 1619 },
  { feature: "Multicompañía", uso: 1000 },
];

const oportunidades = [
  {
    id: "pagos",
    title: "Pagos recibidos",
    tags: ["Adopción", "Engagement"],
    diagnostico:
      "No existe una sección de pagos recibidos en la app. El usuario puede hacer el pago, pero no se visualizan, lo que rompe el flujo móvil de cobro frente al cliente.",
    oportunidad:
      "Habilitar el registro y consulta de pagos recibidos desde la app, integrado al flujo de la factura de venta.",
    link: "https://claude.ai/design/p/5a2581d3-60c3-4e07-96c9-701c04fbc999?file=Pagos+Recibidos.html&via=share",
  },
  {
    id: "factura-venta",
    title: "Funcionalidad factura de venta",
    tags: ["Experiencia", "Adopción"],
    diagnostico:
      "La factura de venta en la app no tiene la funcionalidad de imprimir ni de clonar, dos acciones críticas para el día a día de la Pyme BASE que hoy lo obligan a volver al computador.",
    oportunidad:
      "Sumar imprimir y clonar dentro del detalle de la factura, cerrando el ciclo de venta sin necesidad del PC.",
    link: "https://claude.ai/design/p/019dbd42-565f-7ccd-958c-6b7206220c86?file=Factura+Detalle.html",
  },
  {
    id: "reportes",
    title: "Reportes",
    tags: ["Adopción", "Experiencia"],
    diagnostico:
      "El usuario no puede descargar ni compartir los reportes. Faltan reportes clave para la operación: ventas generales, ventas por vendedor, ventas por ítem y reporte de inventario.",
    oportunidad:
      "Construir las opciones faltantes, incluyendo las opciones de descarga y compartir.",
    link: "https://claude.ai/design/p/019dc097-2664-7687-9041-1fdc44865b74?file=Reportes.html&via=share",
  },
  {
    id: "busqueda",
    title: "Búsqueda de documentos",
    tags: ["Experiencia", "Engagement"],
    diagnostico:
      "No hay un buscador en el home ni búsqueda de pagos. La búsqueda de facturas de compra es por numeración.",
    oportunidad:
      "Buscador global en el home. Búsqueda por cliente en facturas de venta y pagos.",
    link: "https://claude.ai/design/p/019dd183-c0d0-72dc-9fbf-65c1d4cfcba0?file=Buscador.html",
  },
  {
    id: "operacion",
    title: "Reducir operación diaria",
    tags: ["Experiencia", "Adopción"],
    diagnostico:
      "El usuario tiene que loguearse cada 7 días saliendo de la app. Lentitud de carga al cambiar de pestañas. Algunos campos no se llenan con las preferencias.",
    oportunidad:
      "Sesión persistente, mejoras de performance al navegar y autocompletado por preferencia del usuario.",
  },
  {
    id: "graficas-info-diaria",
    title: "Gráficas e información diaria",
    tags: ["Adopción", "Engagement"],
    diagnostico:
      "Hoy en la app no se encuentran gráficas clave para la operación: ventas del día, productos más vendidos, top de clientes, comparativos por período.",
    oportunidad:
      "Construir una sección de gráficas por venta, items y contactos.",
    link: "https://claude.ai/design/p/019dd004-199a-7e2c-963c-4e8f8c157a59?file=Estadisticas.html",
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
const adopcionRD = adoptionByCountry.find((c) => c.country === "Rep. Dominicana")!;

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
                <Star className="h-3 w-3" /> Pyme BASE
              </span>
              <Badge variant="outline" className="text-[10px]" style={{ borderColor: ALEGRA_GREEN, color: ALEGRA_GREEN }}>
                {segBase.badge}
              </Badge>
              <span className="text-[11px] text-neutral-500">{segBase.tamano}</span>
            </div>

            <p className="mt-4 text-lg font-semibold leading-snug text-neutral-900 md:text-xl">
              La Pyme BASE es nuestro mejor usuario: vive con la app en la mano y la usa como su centro operativo móvil real.
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
                  Funcionalidades que más utilizan los BASE por fuera de App
                </p>
                <p className="mt-0.5 text-xs text-neutral-500">
                  Últimas 4 semanas · Cohort BASE (s8shexr4) · Conteo de eventos en web
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
                  <Bar dataKey="uso" fill="#FF6B00" radius={[0, 6, 6, 0]}>
                    {baseFueraDeApp.map((_, i) => (
                      <Cell key={i} />
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
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {oportunidades.map((op) => (
                <OportunidadCard key={op.id} op={op} />
              ))}
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* Funcionalidades — Contactos & Items (colapsable) */}
      <CollapsibleSection
        title="Funcionalidades"
        subtitle="Profundización por módulo"
        color="#0066FF"
      >
        <div className="space-y-6">
          {/* Contactos */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-start justify-between gap-3 flex-wrap">
              <div className="flex items-start gap-3">
                <div
                  className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: "#0066FF15" }}
                >
                  <Lightbulb className="h-4 w-4" style={{ color: "#0066FF" }} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900">Contactos</h3>
                  <p className="mt-0.5 text-xs text-neutral-500">Llenado automático y captura rápida</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-semibold"
                  style={{ borderColor: "#FF6B0033", backgroundColor: "#FF6B0010", color: "#FF6B00" }}
                >
                  <span className="text-[9px] uppercase tracking-wider opacity-80">App vs total</span>
                  <span className="text-[11px] font-bold">{CONTACTOS_APP_PARTICIPACION.toFixed(2)}%</span>
                </span>
                <a
                  href="https://claude.ai/design/p/019dc695-1901-7519-a9d7-a74bd0eedfd0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-semibold transition-colors hover:bg-neutral-50"
                  style={{ borderColor: "#FF6B0033", color: "#FF6B00" }}
                >
                  <Sparkles className="h-3 w-3" /> Ver prototipo <ExternalLink className="h-2.5 w-2.5" />
                </a>
              </div>
            </div>
            <ContactosFuncDetail />
          </div>

          {/* Items */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-start justify-between gap-3 flex-wrap">
              <div className="flex items-start gap-3">
                <div
                  className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: "#0066FF15" }}
                >
                  <Lightbulb className="h-4 w-4" style={{ color: "#0066FF" }} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900">Items</h3>
                  <p className="mt-0.5 text-xs text-neutral-500">Participación, intención y campos faltantes</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-semibold"
                  style={{ borderColor: "#0066FF33", backgroundColor: "#0066FF10", color: "#0066FF" }}
                >
                  <span className="text-[9px] uppercase tracking-wider opacity-80">App vs total</span>
                  <span className="text-[11px] font-bold">{ITEMS_APP_PARTICIPACION.toFixed(2)}%</span>
                </span>
                <a
                  href="https://www.figma.com/design/VjC6hok9QSdr9Wd8iasWms/Secci%C3%B3n-items-App?node-id=2266-3088&t=Vbquk9q4yag4jbVR-0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-semibold transition-colors hover:bg-neutral-50"
                  style={{ borderColor: "#0066FF33", color: "#0066FF" }}
                >
                  <Sparkles className="h-3 w-3" /> Ver prototipo <ExternalLink className="h-2.5 w-2.5" />
                </a>
              </div>
            </div>
            <ItemsFuncDetail />
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

      {/* Olas */}
      <CollapsibleSection title="Olas" subtitle="Iniciativas por país" color="#7C3AED">
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
                    Localización fiscal pendiente en factura de venta
                  </p>
                </div>
              </div>
              <a
                href="https://www.figma.com/design/G4L7LYtkISB6T4DwLJ4wHS/MOB---Redise%C3%B1o-Facturaci%C3%B3n?node-id=3872-17740&p=f&t=CosijuUBHpbR7JeB-0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-semibold transition-colors hover:bg-neutral-50"
                style={{ borderColor: "#7C3AED33", color: "#7C3AED" }}
              >
                <Sparkles className="h-3 w-3" /> Ver prototipo <ExternalLink className="h-2.5 w-2.5" />
              </a>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div className="rounded-lg border border-orange-200 bg-orange-50/50 p-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-orange-700">
                  Problema detectado
                </p>
                <p className="mt-1 text-xs leading-relaxed text-neutral-800">
                  Los usuarios <strong>no tienen la opción de agregar Retenciones ni Conduces</strong> en la factura de venta dentro de la app. Esto bloquea casos fiscales reales y los obliga a volver a la web.
                </p>
              </div>
              <div className="rounded-lg border border-emerald-200 bg-emerald-50/60 p-3">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Oportunidad</p>
                  <a
                    href="https://www.figma.com/design/G4L7LYtkISB6T4DwLJ4wHS/MOB---Redise%C3%B1o-Facturaci%C3%B3n?node-id=3872-17740&p=f&t=CosijuUBHpbR7JeB-0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold transition-colors hover:bg-white"
                    style={{ borderColor: "#10B98133", color: "#047857", backgroundColor: "#10B98110" }}
                  >
                    <Sparkles className="h-3 w-3" /> Ver prototipo <ExternalLink className="h-2.5 w-2.5" />
                  </a>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-neutral-800">
                  Rediseño de facturación + agregar retenciones + agregar conduces.
                </p>
              </div>
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

      {/* Adquisición */}
      <CollapsibleSection title="Adquisición" subtitle="Login para ver planes y pagar" color="#FF6B00">
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
        <div className="mb-4 flex items-start gap-3">
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
  op: { id: string; title: string; tags: string[]; diagnostico: string; oportunidad: string; link?: string };
}) {
  const tagColor = (t: string) => {
    if (t === "Engagement") return "#FF6B00";
    if (t === "Adopción") return ALEGRA_GREEN;
    if (t === "Experiencia") return "#0066FF";
    return "#737373";
  };
  return (
    <div className="group flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2 min-w-0">
          <div
            className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
            style={{ backgroundColor: `${ALEGRA_GREEN}15` }}
          >
            <Lightbulb className="h-4 w-4" style={{ color: ALEGRA_GREEN }} />
          </div>
          <h3 className="text-sm font-bold leading-snug text-neutral-900">{op.title}</h3>
        </div>
        {op.link && (
          <a
            href={op.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-semibold transition-colors hover:bg-emerald-50"
            style={{ borderColor: `${ALEGRA_GREEN}55`, color: ALEGRA_GREEN, backgroundColor: `${ALEGRA_GREEN}10` }}
          >
            <Sparkles className="h-3 w-3" /> Ver diseño <ExternalLink className="h-2.5 w-2.5" />
          </a>
        )}
      </div>

      <div className="mt-2 flex flex-wrap gap-1">
        {op.tags.map((t) => (
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
          Diagnóstico
        </p>
        <p className="mt-1 text-xs leading-relaxed text-neutral-600">{op.diagnostico}</p>
      </div>

      <div className="mt-3 rounded-lg border border-emerald-100 bg-emerald-50/40 p-3">
        <p
          className="text-[10px] font-bold uppercase tracking-wider"
          style={{ color: ALEGRA_GREEN }}
        >
          Oportunidad
        </p>
        <p className="mt-1 text-xs leading-relaxed text-neutral-700">{op.oportunidad}</p>
      </div>
    </div>
  );
}
