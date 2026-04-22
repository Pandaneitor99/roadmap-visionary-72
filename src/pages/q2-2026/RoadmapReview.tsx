import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Sparkles, TrendingUp, TrendingDown, Wrench, ClipboardList, Star, ExternalLink, Users, AlertTriangle, Heart, Target, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { okrs } from "@/data/initiatives";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import clustersImage from "@/assets/clusters-sos-base.png";
import { initiativeDetailMap } from "./initiativeDetails";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
          ) : current === 1 ? (
            <Section2 />
          ) : current === 2 ? (
            <Section3 />
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

      {/* Segmentos Objetivo */}
      <SegmentosObjetivo />
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
          <div className="col-span-3">Segmento</div>
          <div className="col-span-3">Tamaño</div>
          <div className="col-span-2">Nivel de dolor</div>
          <div className="col-span-3">Alternativa actual</div>
          <div className="col-span-1 text-right">Prioridad</div>
        </div>
        {segmentos.map((s) => {
          const active = s.id === selected;
          return (
            <button
              key={s.id}
              onClick={() => setSelected(s.id)}
              className={cn(
                "grid w-full grid-cols-12 items-center border-b border-neutral-100 px-5 py-3 text-left text-xs transition-all last:border-b-0 hover:bg-neutral-50",
                active && "bg-emerald-50/40",
              )}
              style={active ? { boxShadow: `inset 3px 0 0 ${s.color}` } : undefined}
            >
              <div className="col-span-3 font-semibold text-neutral-900">
                {s.nombre}
                <span className="ml-2 text-[10px] font-medium text-neutral-500">
                  {s.badge}
                </span>
              </div>
              <div className="col-span-3 text-neutral-600">{s.tamano}</div>
              <div className="col-span-2 text-neutral-600">{s.dolor}</div>
              <div className="col-span-3 text-neutral-600">{s.alternativa}</div>
              <div className="col-span-1 text-right">
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

function Section2() {
  const [trendVariant, setTrendVariant] = useState<"full" | "sinExtras">("full");
  const macTrendData = trendVariant === "full" ? macTrendDataFull : macTrendDataSinExtras;
  const last = macTrendData[macTrendData.length - 1];
  const first = macTrendData[0];
  const deltaPct = (((last.Pagos - first.Pagos) / first.Pagos) * 100).toFixed(1);
  const positive = Number(deltaPct) >= 0;

  return (
    <div className="space-y-8">
      {/* North Star definition */}
      <div
        className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm"
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
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              Usuarios pagos únicos que ejecutan al menos una acción crítica de negocio en la app cada mes.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
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
                  className="relative inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium text-neutral-700"
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

      {/* MAC Trend Chart */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-neutral-900">MAC — Tendencia</h3>
            <p className="mt-1 text-xs text-neutral-500">
              Últimos 6 meses · Usuarios Pagos, segmentados por CORE y LITE
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div>
              <p className="text-xs font-medium text-neutral-500">MAC actual</p>
              <p className="text-2xl font-bold text-neutral-900">
                {last.Pagos.toLocaleString("es-CO")}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-neutral-500">vs Oct '25</p>
              <p
                className={cn(
                  "flex items-center gap-1 text-2xl font-bold",
                  positive ? "text-emerald-600" : "text-red-600",
                )}
              >
                {positive ? (
                  <TrendingUp className="h-5 w-5" />
                ) : (
                  <TrendingDown className="h-5 w-5" />
                )}
                {positive ? "+" : ""}
                {deltaPct}%
              </p>
            </div>
          </div>
        </div>

        {/* Toggle entre las dos vistas de MAC */}
        <div className="mb-5 inline-flex rounded-lg border border-neutral-200 bg-neutral-50 p-1">
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
                stroke="#9ca3af"
                strokeWidth={2}
                dot={{ r: 3 }}
                strokeDasharray="4 4"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-4">
          <p className="text-[11px] text-neutral-400">
            Fuente: Amplitude ·{" "}
            {trendVariant === "full"
              ? "Eventos críticos de negocio (incluye búsquedas y gráficos)"
              : "Eventos críticos sin incluir búsquedas ni gráficos"}
          </p>
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
      </div>

      {/* Variación por país: Marzo vs Octubre */}
      <div>
        <h3 className="mb-3 text-base font-bold text-neutral-900">
          MAC por país — Marzo '26 vs Octubre '25
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {countryVariation.map((c) => {
            const delta = ((c.march - c.october) / c.october) * 100;
            const isUp = delta >= 0;
            return (
              <div
                key={c.country}
                className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                style={{ borderTop: `3px solid ${c.color}` }}
              >
                <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                  {c.country}
                </p>
                <p className="mt-2 text-3xl font-bold text-neutral-900">
                  {c.march.toLocaleString("es-CO")}
                </p>
                <p
                  className={cn(
                    "mt-1 flex items-center gap-1 text-sm font-bold",
                    isUp ? "text-emerald-600" : "text-red-600",
                  )}
                >
                  {isUp ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  {isUp ? "+" : ""}
                  {delta.toFixed(1)}%
                  <span className="ml-1 text-[11px] font-medium text-neutral-500">
                    vs Oct '25
                  </span>
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* MAC por país: Line + Pie */}
      <MacPorPais />

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

function MacPorPais() {
  return (
    <div className="grid gap-6 lg:grid-cols-5">
      {/* Line per country */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm lg:col-span-3">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-neutral-900">MAC — Tendencia por país</h3>
            <p className="mt-1 text-xs text-neutral-500">
              Últimos 6 meses · Top 4 países por volumen
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
              <Line type="monotone" dataKey="Colombia" stroke={ALEGRA_GREEN} strokeWidth={3} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="República Dominicana" stroke="#0066FF" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="México" stroke="#FF6B00" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="Costa Rica" stroke="#06B6D4" strokeWidth={2} dot={{ r: 3 }} />
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

function TasaAdopcion() {
  // Marzo 2026 (chart rbp5ch2z): Ingresan a la app 31.85%, Realizan acción 22.10%
  const tasaAdopcion = "31.1"; // MAU APP / MAC WEB
  const tasaReal = "22.1"; // MAC APP / MAC WEB

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-neutral-900">Tasa de Adopción</h3>
        <p className="mt-1 text-sm text-neutral-600">
          % de usuarios pagos web que entran a la app y/o realizan acciones de valor.
        </p>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-2">
        <div
          className="rounded-2xl border bg-white p-6 shadow-sm"
          style={{ borderLeft: `4px solid #0066FF` }}
        >
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4" style={{ color: "#0066FF" }} />
            <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#0066FF" }}>
              Tasa de Adopción
            </span>
          </div>
          <p className="mt-2 text-xs text-neutral-500">MAU APP / MAC WEB</p>
          <p className="mt-3 text-4xl font-bold text-neutral-900">{tasaAdopcion}%</p>
          <p className="mt-2 text-xs text-neutral-500">
            {wauApp.toLocaleString("es-CO")} usuarios entran a la app cada mes sobre {wacWeb.toLocaleString("es-CO")} pagos activos en web.
          </p>
        </div>

        <div
          className="rounded-2xl border bg-white p-6 shadow-sm"
          style={{ borderLeft: `4px solid ${ALEGRA_GREEN}` }}
        >
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4" style={{ color: ALEGRA_GREEN }} />
            <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: ALEGRA_GREEN }}>
              Tasa de Adopción Real
            </span>
          </div>
          <p className="mt-2 text-xs text-neutral-500">MAC APP / MAC WEB</p>
          <p className="mt-3 text-4xl font-bold text-neutral-900">{tasaReal}%</p>
          <p className="mt-2 text-xs text-neutral-500">
            {wacApp.toLocaleString("es-CO")} usuarios realizan al menos una acción de valor en la app sobre {wacWeb.toLocaleString("es-CO")} pagos activos en web.
          </p>
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

// === Sección 3: Base de usuarios y MRR ===

function Section3() {
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
              BASE vs SOS
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              Hoy tenemos dos clusters claros de usuarios pagos activos en la app móvil. Conocer su comportamiento nos permite priorizar qué experiencia profundizar.
            </p>
          </div>
        </div>
      </div>

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

      {/* Clusters image */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-neutral-900">
              Clusters BASE y SOS
            </h3>
            <p className="mt-1 text-xs text-neutral-500">
              Análisis de comportamiento · 7,703 usuarios totales
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
        <img
          src={clustersImage}
          alt="Clusters BASE y SOS - distribución y caracterización de usuarios"
          className="w-full rounded-lg border border-neutral-200"
        />
        <div className="mt-4 grid gap-3 text-xs text-neutral-600 md:grid-cols-2">
          <div className="rounded-lg bg-neutral-50 p-3">
            <p className="font-bold text-neutral-900">Cluster 1 (67%)</p>
            <p className="mt-1">Eventos de web · Reportes en App · Busca factura de venta app</p>
          </div>
          <div className="rounded-lg bg-neutral-50 p-3">
            <p className="font-bold text-neutral-900">Cluster 2 (33%)</p>
            <p className="mt-1">Factura de venta App · Item en App · Contactos en App · Cotizaciones App</p>
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
    tags: ["Experiencia"],
    problem:
      "Los usuarios no pueden encontrar fácilmente sus documentos e información dentro de la app, generando fricción en la consulta.",
    krs: ["KR 1.3"],
  },
  {
    title: "Compartir y descargar remisiones",
    tags: ["Adopción"],
    problem:
      "Falta la capacidad de compartir y descargar remisiones desde la app, limitando la operación móvil del usuario.",
    krs: ["KR 2.2"],
  },
  {
    title: "Llenado automático campos contactos",
    tags: ["Experiencia", "Adopción"],
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
            <SimpleInitiativeCard key={idx} {...i} />
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
              <div className="mt-2 flex items-center justify-between text-[11px] text-neutral-500">
                <span>
                  Base:{" "}
                  <span className="font-semibold text-neutral-800">
                    {kr.baseline}
                  </span>
                </span>
                <span>
                  Target:{" "}
                  <span className="font-semibold text-neutral-800">
                    {kr.target}
                  </span>
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
  krs,
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
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-bold leading-snug text-neutral-900">{title}</h3>
        {onClick && (
          <span
            className="shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white"
            style={{ backgroundColor: ALEGRA_GREEN }}
          >
            Métricas
          </span>
        )}
      </div>
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
      {krs && krs.length > 0 && (
        <div className="mt-auto pt-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
            Key Results
          </p>
          <div className="mt-1 flex flex-wrap gap-1">
            {krs.map((kr) => (
              <span
                key={kr}
                className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-medium text-neutral-700"
              >
                {kr}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
