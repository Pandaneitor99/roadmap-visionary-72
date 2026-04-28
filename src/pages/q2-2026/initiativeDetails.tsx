import { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { ExternalLink, TrendingUp, TrendingDown, Lightbulb, Check } from "lucide-react";
import appLanding from "@/assets/app-alegra-landing.png";
import gysDeviceImg from "@/assets/gys-device-requests.png";
import onelinkQR from "@/assets/onelink-qr.svg";
import pushNotificationImg from "@/assets/push-notification-test.png";

const ALEGRA_GREEN = "#00B386";
const BLUE = "#0066FF";
const ORANGE = "#FF6B00";

// ===== Datos extraídos de Amplitude =====

const busquedaFacturasTotales = [
  { mes: "Oct 25", v: 62369 },
  { mes: "Nov 25", v: 57271 },
  { mes: "Dic 25", v: 64801 },
  { mes: "Ene 26", v: 50482 },
  { mes: "Feb 26", v: 51170 },
  { mes: "Mar 26", v: 66304 },
];
const busquedaFacturasUniques = [
  { mes: "Oct 25", v: 3008 },
  { mes: "Nov 25", v: 2991 },
  { mes: "Dic 25", v: 3167 },
  { mes: "Ene 26", v: 2878 },
  { mes: "Feb 26", v: 2859 },
  { mes: "Mar 26", v: 3220 },
];
const usoBuscador = [
  { sem: "22 Feb", v: 807 },
  { sem: "01 Mar", v: 765 },
  { sem: "08 Mar", v: 809 },
  { sem: "15 Mar", v: 1054 },
  { sem: "22 Mar", v: 1081 },
  { sem: "29 Mar", v: 906 },
  { sem: "05 Abr", v: 1165 },
  { sem: "12 Abr", v: 1033 },
];
const busquedaCotizacionesUniques = [
  { sem: "22 Mar", v: 0 },
  { sem: "29 Mar", v: 0 },
  { sem: "05 Abr", v: 0 },
  { sem: "12 Abr", v: 37 },
  { sem: "19 Abr", v: 182 },
];
const busquedaCotizacionesTotales = [
  { sem: "22 Mar", v: 0 },
  { sem: "29 Mar", v: 0 },
  { sem: "05 Abr", v: 0 },
  { sem: "12 Abr", v: 123 },
  { sem: "19 Abr", v: 1151 },
];

// Remisiones
const remisionesTotales = [
  { sem: "22 Feb", v: 1912 },
  { sem: "01 Mar", v: 1822 },
  { sem: "08 Mar", v: 1918 },
  { sem: "15 Mar", v: 1919 },
  { sem: "22 Mar", v: 1557 },
  { sem: "29 Mar", v: 1362 },
  { sem: "05 Abr", v: 2620 },
  { sem: "12 Abr", v: 2849 },
];
const appVsWebRemisiones = [
  { mes: "Oct 25", pct: 6.91 },
  { mes: "Nov 25", pct: 7.53 },
  { mes: "Dic 25", pct: 6.37 },
  { mes: "Ene 26", pct: 6.48 },
  { mes: "Feb 26", pct: 6.09 },
  { mes: "Mar 26", pct: 6.45 },
  { mes: "Abr 26", pct: 8.81 },
];

// Buscador remisiones — semanal (charts m7e69s6z uniques · l8i09ad1 totals)
const buscadorRemisionesUnicos = [
  { sem: "22 Mar", v: 0 },
  { sem: "29 Mar", v: 0 },
  { sem: "05 Abr", v: 0 },
  { sem: "12 Abr", v: 15 },
  { sem: "19 Abr", v: 74 },
];
const buscadorRemisionesTotales = [
  { sem: "22 Mar", v: 0 },
  { sem: "29 Mar", v: 0 },
  { sem: "05 Abr", v: 0 },
  { sem: "12 Abr", v: 136 },
  { sem: "19 Abr", v: 975 },
];

// Contactos
const contactosAutocompletado = [
  { name: "Autocompletado", value: 164, color: ALEGRA_GREEN },
  { name: "Manual", value: 379, color: "#9CA3AF" },
];

// Home — Funcionalidades weekly (chart 99xelesc · uniques semanales)
const funcionalidadesHome = [
  { sem: "29 Mar", Sidebar: 4892, Mas: 2586, Rango: 839, Perfil: 457, "G. Ventas": 777, "G. Trans": 307, QuickActions: 0 },
  { sem: "05 Abr", Sidebar: 5362, Mas: 2964, Rango: 762, Perfil: 478, "G. Ventas": 680, "G. Trans": 269, QuickActions: 0 },
  { sem: "12 Abr", Sidebar: 4792, Mas: 2782, Rango: 748, Perfil: 449, "G. Ventas": 661, "G. Trans": 243, QuickActions: 2161 },
  { sem: "19 Abr", Sidebar: 4606, Mas: 2773, Rango: 735, Perfil: 491, "G. Ventas": 745, "G. Trans": 259, QuickActions: 2421 },
];

// Quick Actions totals (chart mqhwxet0 · totals semanales)
const quickActionsTotals = [
  { sem: "29 Mar", v: 0 },
  { sem: "05 Abr", v: 0 },
  { sem: "12 Abr", v: 4393 },
  { sem: "19 Abr", v: 5357 },
];

// Quick Actions breakdown (chart c5z4fzyu · uniques por acción)
const quickActionsBreakdown = [
  { name: "Factura", value: 4177, color: "#00B386" },
  { name: "Cotización", value: 1939, color: "#0066FF" },
  { name: "Contacto", value: 1266, color: "#FF6B00" },
  { name: "Item", value: 1101, color: "#9333EA" },
];

// Funnels home → X (refreshed con data más reciente de Amplitude)
const funnelHomeFactura = [
  { sem: "01 Mar", pct: 42.56 },
  { sem: "08 Mar", pct: 43.20 },
  { sem: "15 Mar", pct: 43.28 },
  { sem: "22 Mar", pct: 42.78 },
  { sem: "29 Mar", pct: 41.21 },
  { sem: "05 Abr", pct: 44.31 },
  { sem: "12 Abr", pct: 54.33 },
  { sem: "19 Abr", pct: 53.83 },
];
const funnelHomeContactos = [
  { sem: "01 Mar", pct: 3.46 },
  { sem: "08 Mar", pct: 3.22 },
  { sem: "15 Mar", pct: 2.99 },
  { sem: "22 Mar", pct: 3.09 },
  { sem: "29 Mar", pct: 2.65 },
  { sem: "05 Abr", pct: 3.20 },
  { sem: "12 Abr", pct: 6.84 },
  { sem: "19 Abr", pct: 10.01 },
];
const funnelHomeItem = [
  { sem: "01 Feb", pct: 3.30 },
  { sem: "08 Feb", pct: 3.38 },
  { sem: "15 Feb", pct: 3.27 },
  { sem: "22 Feb", pct: 3.44 },
  { sem: "01 Mar", pct: 3.68 },
  { sem: "08 Mar", pct: 3.47 },
  { sem: "15 Mar", pct: 3.15 },
  { sem: "22 Mar", pct: 2.64 },
  { sem: "29 Mar", pct: 3.55 },
  { sem: "05 Abr", pct: 8.21 },
  { sem: "12 Abr", pct: 7.08 },
];
const funnelHomeCotizacion = [
  { sem: "01 Mar", pct: 19.21 },
  { sem: "08 Mar", pct: 18.42 },
  { sem: "15 Mar", pct: 18.63 },
  { sem: "22 Mar", pct: 18.45 },
  { sem: "29 Mar", pct: 15.56 },
  { sem: "05 Abr", pct: 19.33 },
  { sem: "12 Abr", pct: 22.98 },
  { sem: "19 Abr", pct: 23.99 },
];

// Ítems creados en la app por semana — Amplitude j6et1f82 (últimas 12 semanas)
const itemsCreadosSemanal = [
  { sem: "25 Ene", total: 4720 },
  { sem: "01 Feb", total: 4615 },
  { sem: "08 Feb", total: 4840 },
  { sem: "15 Feb", total: 4552 },
  { sem: "22 Feb", total: 4451 },
  { sem: "01 Mar", total: 4616 },
  { sem: "08 Mar", total: 4029 },
  { sem: "15 Mar", total: 4050 },
  { sem: "22 Mar", total: 4364 },
  { sem: "29 Mar", total: 2779 },
  { sem: "05 Abr", total: 4265 },
  { sem: "12 Abr", total: 5295 },
  { sem: "19 Abr", total: 5370 },
];

// Time to convert (segundos) — refrescados desde Amplitude
const ttcFactura = [
  { sem: "01 Mar", s: 17673 },
  { sem: "08 Mar", s: 17021 },
  { sem: "15 Mar", s: 17578 },
  { sem: "22 Mar", s: 17614 },
  { sem: "29 Mar", s: 16113 },
  { sem: "05 Abr", s: 16500 },
  { sem: "12 Abr", s: 12295 },
  { sem: "19 Abr", s: 13455 },
];
const ttcContactos = [
  { sem: "01 Mar", s: 36750 },
  { sem: "08 Mar", s: 29666 },
  { sem: "15 Mar", s: 26500 },
  { sem: "22 Mar", s: 35000 },
  { sem: "29 Mar", s: 26333 },
  { sem: "05 Abr", s: 29125 },
  { sem: "12 Abr", s: 21400 },
  { sem: "19 Abr", s: 23555 },
];
const ttcCotizacion = [
  { sem: "01 Mar", s: 16478 },
  { sem: "08 Mar", s: 15362 },
  { sem: "15 Mar", s: 13620 },
  { sem: "22 Mar", s: 13821 },
  { sem: "29 Mar", s: 12960 },
  { sem: "05 Abr", s: 13926 },
  { sem: "12 Abr", s: 10386 },
  { sem: "19 Abr", s: 11870 },
];
const ttcItem = [
  { sem: "01 Feb", s: 94250 },
  { sem: "08 Feb", s: 69000 },
  { sem: "15 Feb", s: 73000 },
  { sem: "22 Feb", s: 54000 },
  { sem: "01 Mar", s: 53000 },
  { sem: "08 Mar", s: 50000 },
  { sem: "15 Mar", s: 25750 },
  { sem: "22 Mar", s: 35000 },
];

// ===== UI Components =====

const ChartCard = ({
  title,
  subtitle,
  url,
  children,
  statLabel,
  statValue,
  statDelta,
  statBaselineLabel = "vs primer mes",
  statSuffix = "",
  invertDelta = false,
}: {
  title: string;
  subtitle?: string;
  url?: string;
  children: React.ReactNode;
  statLabel?: string;
  statValue?: string | number;
  statDelta?: number; // porcentaje
  statBaselineLabel?: string;
  statSuffix?: string;
  invertDelta?: boolean; // true cuando bajar es bueno (errores, TTC)
}) => {
  const showStat = statValue !== undefined;
  const positive = statDelta !== undefined ? (invertDelta ? statDelta < 0 : statDelta >= 0) : true;
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-start justify-between gap-2">
        <div>
          <h4 className="text-sm font-bold text-neutral-900">{title}</h4>
          {subtitle && <p className="text-[11px] text-neutral-500">{subtitle}</p>}
        </div>
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-neutral-700"
            title="Abrir en Amplitude"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
      <div className={showStat ? "grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto]" : ""}>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            {children as any}
          </ResponsiveContainer>
        </div>
        {showStat && (
          <div className="flex flex-col justify-center rounded-lg border border-neutral-100 bg-neutral-50/60 p-3 md:min-w-[140px]">
            {statLabel && (
              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                {statLabel}
              </p>
            )}
            <p className="mt-1 text-2xl font-bold text-neutral-900">
              {typeof statValue === "number" ? statValue.toLocaleString("es-CO") : statValue}
              {statSuffix}
            </p>
            {statDelta !== undefined && (
              <p
                className={`mt-1 flex items-center gap-1 text-xs font-bold ${
                  positive ? "text-emerald-600" : "text-red-600"
                }`}
              >
                {positive ? (
                  <TrendingUp className="h-3.5 w-3.5" />
                ) : (
                  <TrendingDown className="h-3.5 w-3.5" />
                )}
                {statDelta >= 0 ? "+" : ""}
                {statDelta.toFixed(1)}%
                <span className="ml-0.5 text-[10px] font-medium text-neutral-500">
                  {statBaselineLabel}
                </span>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Helper para calcular % delta entre primer y último valor
function pctDelta(arr: { v?: number; pct?: number; s?: number }[], key: "v" | "pct" | "s") {
  const first = arr[0]?.[key] ?? 0;
  const last = arr[arr.length - 1]?.[key] ?? 0;
  if (!first) return 0;
  return ((last - first) / first) * 100;
}
// % delta usando un índice base específico (ej: semana previa a un lanzamiento)
function pctDeltaFromIndex(arr: { v?: number; pct?: number; s?: number }[], key: "v" | "pct" | "s", baseIdx: number) {
  const base = arr[baseIdx]?.[key] ?? 0;
  const last = arr[arr.length - 1]?.[key] ?? 0;
  if (!base) return 0;
  return ((last - base) / base) * 100;
}
function lastVal(arr: { v?: number; pct?: number; s?: number }[], key: "v" | "pct" | "s") {
  return arr[arr.length - 1]?.[key] ?? 0;
}

const Insights = ({ items }: { items: string[] }) => (
  <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
    <div className="mb-2 flex items-center gap-2">
      <Lightbulb className="h-4 w-4" style={{ color: ALEGRA_GREEN }} />
      <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: ALEGRA_GREEN }}>
        Insights principales
      </h4>
    </div>
    <ul className="space-y-1.5 text-xs leading-relaxed text-neutral-700">
      {items.map((it, i) => (
        <li key={i} className="flex gap-2">
          <span className="mt-1 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: ALEGRA_GREEN }} />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  </div>
);

const Tabs = ({
  options,
  active,
  onChange,
}: {
  options: { id: string; label: string }[];
  active: string;
  onChange: (id: string) => void;
}) => (
  <div className="flex flex-wrap gap-2">
    {options.map((o) => (
      <button
        key={o.id}
        onClick={() => onChange(o.id)}
        className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
          active === o.id
            ? "text-white shadow-sm"
            : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
        }`}
        style={active === o.id ? { backgroundColor: ALEGRA_GREEN } : undefined}
      >
        {o.label}
      </button>
    ))}
  </div>
);

// ===== Detail renderers per initiative =====

export function BusquedaDetail() {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2">
        <ChartCard
          title="Búsqueda de facturas — Totales"
          subtitle="Mensual · últimos 6 meses"
          url="https://app.amplitude.com/analytics/alegra/chart/g3zsws0s"
          statLabel="Último mes"
          statValue={lastVal(busquedaFacturasTotales, "v")}
          statDelta={pctDelta(busquedaFacturasTotales, "v")}
          statBaselineLabel="vs Oct '25"
        >
          <LineChart data={busquedaFacturasTotales}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="mes" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip />
            <Line type="monotone" dataKey="v" stroke={ALEGRA_GREEN} strokeWidth={2} />
          </LineChart>
        </ChartCard>
        <ChartCard
          title="Búsqueda de facturas — Uniques"
          subtitle="Usuarios únicos por mes"
          url="https://app.amplitude.com/analytics/alegra/chart/iztonip4"
          statLabel="Último mes"
          statValue={lastVal(busquedaFacturasUniques, "v")}
          statDelta={pctDelta(busquedaFacturasUniques, "v")}
          statBaselineLabel="vs Oct '25"
        >
          <LineChart data={busquedaFacturasUniques}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="mes" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip />
            <Line type="monotone" dataKey="v" stroke={BLUE} strokeWidth={2} />
          </LineChart>
        </ChartCard>
        <ChartCard
          title="Uso del componente del buscador"
          subtitle="Uniques semanales"
          url="https://app.amplitude.com/analytics/alegra/chart/z9b4txww"
          statLabel="Última sem"
          statValue={lastVal(usoBuscador, "v")}
          statDelta={pctDelta(usoBuscador, "v")}
          statBaselineLabel="vs 22-Feb"
        >
          <LineChart data={usoBuscador}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="sem" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip />
            <Line type="monotone" dataKey="v" stroke={ORANGE} strokeWidth={2} />
          </LineChart>
        </ChartCard>
        <ChartCard
          title="Búsqueda cotizaciones — Únicos"
          subtitle="Lanzamiento reciente"
          url="https://app.amplitude.com/analytics/alegra/chart/on3tt73l"
          statLabel="Última sem"
          statValue={lastVal(busquedaCotizacionesUniques, "v")}
          statDelta={pctDelta(busquedaCotizacionesUniques, "v")}
          statBaselineLabel="vs lanzamiento"
        >
          <BarChart data={busquedaCotizacionesUniques}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="sem" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip />
            <Bar dataKey="v" fill={ALEGRA_GREEN} />
          </BarChart>
        </ChartCard>
        <ChartCard
          title="Búsqueda cotizaciones — Totales"
          url="https://app.amplitude.com/analytics/alegra/chart/lj96ul5q"
          statLabel="Última sem"
          statValue={lastVal(busquedaCotizacionesTotales, "v")}
          statDelta={pctDelta(busquedaCotizacionesTotales, "v")}
          statBaselineLabel="vs lanzamiento"
        >
          <BarChart data={busquedaCotizacionesTotales}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="sem" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip />
            <Bar dataKey="v" fill={BLUE} />
          </BarChart>
        </ChartCard>
      </div>
      <Insights
        items={[
          "Búsqueda de facturas se mantiene como funcionalidad de alto uso: ~3K usuarios únicos/mes y picos de 66K búsquedas en marzo 2026.",
          "Uso del componente del buscador creció +44% entre feb y abril (807 → ~1.1K usuarios/semana).",
          "Lanzamiento de búsqueda en cotizaciones muestra adopción rápida: de 0 a 182 usuarios únicos y 1,151 búsquedas en 2 semanas.",
          "El feature reduce la fricción de encontrar documentos y soporta directamente el KR de errores críticos / experiencia.",
        ]}
      />
    </div>
  );
}

// Errores API Weakly — datos semanales reales (Amplitude chart cnbbpxr5)
// Rango: Nov 23, 2025 – Apr 4, 2026 (Weekly, Current Total Events)
const erroresApiWeekly = [
  { sem: "23 Nov", v: 9400 },
  { sem: "30 Nov", v: 10600 },
  { sem: "07 Dic", v: 9800 },
  { sem: "14 Dic", v: 10000 },
  { sem: "21 Dic", v: 6200 },
  { sem: "28 Dic", v: 6500 },
  { sem: "04 Ene", v: 10200 },
  { sem: "11 Ene", v: 8400 },
  { sem: "18 Ene", v: 8500 },
  { sem: "25 Ene", v: 4900 },
  { sem: "01 Feb", v: 4850 },
  { sem: "08 Feb", v: 5950 },
  { sem: "15 Feb", v: 4900 },
  { sem: "22 Feb", v: 5100 },
  { sem: "01 Mar", v: 7950 },
  { sem: "08 Mar", v: 6800 },
  { sem: "15 Mar", v: 6500 },
  { sem: "22 Mar", v: 5800 },
  { sem: "29 Mar", v: 4450 },
];

export function EstabilizacionDetail() {
  return (
    <div className="space-y-4">
      <div className="grid gap-3">
        <ChartCard
          title="Errores API Weekly"
          subtitle="Total de errores reportados por semana"
          url="https://app.amplitude.com/analytics/alegra/chart/cnbbpxr5"
          statLabel="Última sem"
          statValue={lastVal(erroresApiWeekly, "v").toLocaleString("es-CO")}
          statDelta={pctDelta(erroresApiWeekly, "v")}
          statBaselineLabel="vs 01-Feb"
          invertDelta
        >
          <LineChart data={erroresApiWeekly}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="sem" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip formatter={(v: number) => v.toLocaleString("es-CO")} />
            <Line type="monotone" dataKey="v" stroke="#EF4444" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ChartCard>
      </div>
      <Insights
        items={[
          "Errores API totales cayeron de ~2.3K (01-Mar) a 311 semanales (19-Abr): caída sostenida de -86% en 7 semanas.",
          "El principal foco histórico fue 'Usuario o clave inválida' (pico de 3.3K en Nov-25), hoy reducido a ~6 por semana (-96% vs 01-Feb).",
          "Los errores de búsqueda (404 y query 902) emergieron en Feb-26 pero ya muestran fuerte caída en Abr (de ~1K a ~150 por semana).",
        ]}
      />
    </div>
  );
}

export function RemisionesDetail() {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2">
        <ChartCard
          title="Remisiones totales — Semanal"
          url="https://app.amplitude.com/analytics/alegra/chart/000rbdus"
          statLabel="Última sem"
          statValue={lastVal(remisionesTotales, "v")}
          statDelta={pctDelta(remisionesTotales, "v")}
          statBaselineLabel="vs 22-Feb"
        >
          <BarChart data={remisionesTotales}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="sem" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip />
            <Bar dataKey="v" fill={ALEGRA_GREEN} />
          </BarChart>
        </ChartCard>
        <ChartCard
          title="App vs Web Remisiones"
          subtitle="% de remisiones creadas en App"
          url="https://app.amplitude.com/analytics/alegra/chart/eosl7cg8"
          statLabel="Último mes"
          statValue={`${lastVal(appVsWebRemisiones, "pct").toFixed(2)}%`}
          statDelta={pctDelta(appVsWebRemisiones, "pct")}
          statBaselineLabel="vs Oct '25"
        >
          <LineChart data={appVsWebRemisiones}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="mes" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} unit="%" />
            <Tooltip formatter={(v: number) => `${v.toFixed(2)}%`} />
            <Line type="monotone" dataKey="pct" stroke={BLUE} strokeWidth={2} />
          </LineChart>
        </ChartCard>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <ChartCard
          title="Buscador remisiones — Únicos"
          subtitle="Usuarios que usan el buscador en remisiones (semanal)"
          url="https://app.amplitude.com/analytics/alegra/chart/m7e69s6z"
          statLabel="Última sem"
          statValue={lastVal(buscadorRemisionesUnicos, "v")}
          statDelta={pctDelta(buscadorRemisionesUnicos, "v")}
          statBaselineLabel="vs 12-Abr"
        >
          <BarChart data={buscadorRemisionesUnicos}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="sem" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip />
            <Bar dataKey="v" fill="#FF6B00" />
          </BarChart>
        </ChartCard>
        <ChartCard
          title="Buscador remisiones — Totales"
          subtitle="Búsquedas totales en remisiones (semanal)"
          url="https://app.amplitude.com/analytics/alegra/chart/l8i09ad1"
          statLabel="Última sem"
          statValue={lastVal(buscadorRemisionesTotales, "v")}
          statDelta={pctDelta(buscadorRemisionesTotales, "v")}
          statBaselineLabel="vs 12-Abr"
        >
          <BarChart data={buscadorRemisionesTotales}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="sem" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip />
            <Bar dataKey="v" fill={BLUE} />
          </BarChart>
        </ChartCard>
      </div>
      <Insights
        items={[
          "Tras habilitar compartir/descargar remisiones, las remisiones semanales pasaron de ~1.5K a ~2.85K (crecimiento >85%).",
          "La participación de la app en el total de remisiones subió de 6.1% (feb) a 8.8% (abr), el máximo histórico.",
          "El buscador de remisiones se lanzó en abril: pasó de 15 a 74 usuarios únicos (+393%) y de 136 a 975 búsquedas semanales (+617%) entre las semanas del 12 y 19 de abril.",
          "Confirma que cerrar gaps funcionales móviles desplaza uso de web a app (aporta a KR 2.2 — adopción).",
        ]}
      />
    </div>
  );
}

export function ContactosDetail() {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2">
        <ChartCard
          title="Contactos Autocompletado"
          subtitle="Distribución últimos 2 días (CO)"
          url="https://app.amplitude.com/analytics/alegra/chart/rablks0e"
        >
          <PieChart>
            <Pie
              data={contactosAutocompletado}
              dataKey="value"
              nameKey="name"
              outerRadius={70}
              label={(e: any) => `${e.name}: ${((e.value / 543) * 100).toFixed(0)}%`}
            >
              {contactosAutocompletado.map((e, i) => (
                <Cell key={i} fill={e.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ChartCard>
        <div className="flex flex-col justify-center rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">
            Tasa de autocompletado
          </p>
          <p className="mt-2 text-4xl font-bold" style={{ color: ALEGRA_GREEN }}>
            ~30%
          </p>
          <p className="mt-2 text-xs text-neutral-600">
            ~30% de los contactos creados se completan automáticamente con datos del registro
            tributario, reduciendo significativamente la fricción del usuario.
          </p>
        </div>
      </div>
      <Insights
        items={[
          "El llenado automático ya alcanza ~30% de los nuevos contactos en Colombia desde el primer despliegue.",
          "Reduce la fricción de creación de contactos y mejora el dato (menor probabilidad de error tipográfico).",
          "Iniciativa de alto leverage: aporta a experiencia (KR 1.3) y a adopción (KR 2.1) sin requerir cambios de comportamiento del usuario.",
        ]}
      />
    </div>
  );
}

// Tabs grouped by category for HomeDetail
const HOME_TAB_GROUPS: { id: string; label: string; tabs: { id: string; label: string }[] }[] = [
  {
    id: "func",
    label: "Funcionalidad",
    tabs: [
      { id: "funcionalidades", label: "Funcionalidades home" },
      { id: "quick", label: "Quick Actions" },
      { id: "quickBreakdown", label: "Quick Actions · Distribución" },
    ],
  },
  {
    id: "homefunc",
    label: "Home — Funcionalidad",
    tabs: [
      { id: "fnFactura", label: "Home → Factura" },
      { id: "fnContactos", label: "Home → Contactos" },
      { id: "fnCotizacion", label: "Home → Cotización" },
      { id: "fnItem", label: "Home → Item" },
    ],
  },
  {
    id: "ttc",
    label: "Tiempo de conversión",
    tabs: [
      { id: "ttcFactura", label: "TTC → Factura" },
      { id: "ttcContactos", label: "TTC → Contactos" },
      { id: "ttcCotizacion", label: "TTC → Cotización" },
      { id: "ttcItem", label: "TTC → Item" },
    ],
  },
  {
    id: "items",
    label: "Resultados",
    tabs: [{ id: "itemsCreados", label: "Ítems creados / sem" }],
  },
];

const GROUP_COLORS: Record<string, string> = {
  func: ALEGRA_GREEN,
  homefunc: BLUE,
  items: "#9333EA",
  ttc: ORANGE,
};

export function HomeDetail() {
  const [tab, setTab] = useState("funcionalidades");
  const activeGroup = HOME_TAB_GROUPS.find((g) => g.tabs.some((t) => t.id === tab))?.id ?? "func";

  return (
    <div className="space-y-4">
      {/* Category tags + tab pills */}
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {HOME_TAB_GROUPS.map((g) => {
            const isActive = activeGroup === g.id;
            const color = GROUP_COLORS[g.id];
            return (
              <button
                key={g.id}
                onClick={() => setTab(g.tabs[0].id)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-wider transition-all ${
                  isActive
                    ? "text-white shadow-sm"
                    : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300"
                }`}
                style={isActive ? { backgroundColor: color, borderColor: color } : undefined}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: isActive ? "#fff" : color }}
                />
                {g.label}
              </button>
            );
          })}
        </div>
        <Tabs
          active={tab}
          onChange={setTab}
          options={HOME_TAB_GROUPS.find((g) => g.id === activeGroup)!.tabs}
        />
      </div>

      {(() => {
        const stat = (() => {
          if (tab === "funcionalidades") {
            const last = funcionalidadesHome[funcionalidadesHome.length - 1];
            return { label: "Sidebar última sem", value: last.Sidebar.toLocaleString("es-CO"), delta: ((last.Sidebar - funcionalidadesHome[0].Sidebar) / funcionalidadesHome[0].Sidebar) * 100 };
          }
          if (tab === "quick") {
            const last = quickActionsTotals[quickActionsTotals.length - 1].v;
            return { label: "Quick Actions sem", value: last.toLocaleString("es-CO"), delta: 0, hideDelta: true, note: "Lanzado 12-Abr" };
          }
          if (tab === "quickBreakdown") {
            const total = quickActionsBreakdown.reduce((s, x) => s + x.value, 0);
            return { label: "Total acciones", value: total.toLocaleString("es-CO"), delta: 0, hideDelta: true, note: "Últimas 4 semanas" };
          }
          if (tab === "itemsCreados") {
            const last = itemsCreadosSemanal[itemsCreadosSemanal.length - 1].total;
            const first = itemsCreadosSemanal[0].total;
            return { label: "Ítems última sem", value: last.toLocaleString("es-CO"), delta: ((last - first) / first) * 100 };
          }
          if (tab === "fnFactura") return { label: "Funnel actual", value: `${lastVal(funnelHomeFactura, "pct").toFixed(2)}%`, delta: pctDelta(funnelHomeFactura, "pct") };
          if (tab === "fnContactos") return { label: "Funnel actual", value: `${lastVal(funnelHomeContactos, "pct").toFixed(2)}%`, delta: pctDelta(funnelHomeContactos, "pct") };
          if (tab === "fnCotizacion") return { label: "Funnel actual", value: `${lastVal(funnelHomeCotizacion, "pct").toFixed(2)}%`, delta: pctDelta(funnelHomeCotizacion, "pct") };
          if (tab === "fnItem") return { label: "Funnel actual", value: `${lastVal(funnelHomeItem, "pct").toFixed(2)}%`, delta: pctDelta(funnelHomeItem, "pct") };
          if (tab === "ttcFactura") return { label: "TTC actual", value: `${lastVal(ttcFactura, "s").toLocaleString("es-CO")}s`, delta: pctDelta(ttcFactura, "s"), invert: true };
          if (tab === "ttcContactos") return { label: "TTC actual", value: `${lastVal(ttcContactos, "s").toLocaleString("es-CO")}s`, delta: pctDelta(ttcContactos, "s"), invert: true };
          if (tab === "ttcCotizacion") return { label: "TTC actual", value: `${lastVal(ttcCotizacion, "s").toLocaleString("es-CO")}s`, delta: pctDelta(ttcCotizacion, "s"), invert: true };
          if (tab === "ttcItem") return { label: "TTC actual", value: `${lastVal(ttcItem, "s").toLocaleString("es-CO")}s`, delta: pctDelta(ttcItem, "s"), invert: true };
          return null;
        })();

        const chartUrl: Record<string, string> = {
          funcionalidades: "https://app.amplitude.com/analytics/alegra/chart/99xelesc",
          quick: "https://app.amplitude.com/analytics/alegra/chart/mqhwxet0",
          quickBreakdown: "https://app.amplitude.com/analytics/alegra/chart/c5z4fzyu",
          itemsCreados: "https://app.amplitude.com/analytics/alegra/chart/j6et1f82",
          fnFactura: "https://app.amplitude.com/analytics/alegra/chart/24552723",
          fnContactos: "https://app.amplitude.com/analytics/alegra/chart/up58fj0c",
          fnCotizacion: "https://app.amplitude.com/analytics/alegra/chart/j5qy0tqd",
          fnItem: "https://app.amplitude.com/analytics/alegra/chart/w81wjr5i",
          ttcFactura: "https://app.amplitude.com/analytics/alegra/chart/5n2hj2pe",
          ttcContactos: "https://app.amplitude.com/analytics/alegra/chart/tlrtxied",
          ttcCotizacion: "https://app.amplitude.com/analytics/alegra/chart/phd97cxa",
          ttcItem: "https://app.amplitude.com/analytics/alegra/chart/a3cwza0t",
        };

        return (
          <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-start justify-between gap-2">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                {HOME_TAB_GROUPS.find((g) => g.id === activeGroup)?.label} ·{" "}
                <span className="text-neutral-700">
                  {HOME_TAB_GROUPS.flatMap((g) => g.tabs).find((t) => t.id === tab)?.label}
                </span>
              </p>
              {chartUrl[tab] && (
                <a
                  href={chartUrl[tab]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-neutral-700"
                  title="Abrir en Amplitude"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto]">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  {tab === "funcionalidades" ? (
                    <LineChart data={funcionalidadesHome}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="sem" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip />
                      <Legend wrapperStyle={{ fontSize: 10 }} />
                      <Line type="monotone" dataKey="Sidebar" stroke={ALEGRA_GREEN} strokeWidth={2} />
                      <Line type="monotone" dataKey="Mas" stroke={BLUE} strokeWidth={2} />
                      <Line type="monotone" dataKey="QuickActions" stroke={ORANGE} strokeWidth={2} />
                      <Line type="monotone" dataKey="Rango" stroke="#9333EA" />
                      <Line type="monotone" dataKey="Perfil" stroke="#F59E0B" />
                      <Line type="monotone" dataKey="G. Ventas" stroke="#06B6D4" />
                      <Line type="monotone" dataKey="G. Trans" stroke="#EC4899" />
                    </LineChart>
                  ) : tab === "quick" ? (
                    <BarChart data={quickActionsTotals}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="sem" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip formatter={(v: number) => v.toLocaleString("es-CO")} />
                      <Bar dataKey="v" fill={ORANGE} name="Quick Actions clicks" />
                    </BarChart>
                  ) : tab === "quickBreakdown" ? (
                    <PieChart>
                      <Pie data={quickActionsBreakdown} dataKey="value" nameKey="name" outerRadius={100} label={(e: any) => `${e.name}: ${e.value.toLocaleString("es-CO")}`}>
                        {quickActionsBreakdown.map((e, i) => (
                          <Cell key={i} fill={e.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(v: number) => v.toLocaleString("es-CO")} />
                      <Legend wrapperStyle={{ fontSize: 11 }} />
                    </PieChart>
                  ) : tab === "itemsCreados" ? (
                    <LineChart data={itemsCreadosSemanal}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="sem" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip formatter={(v: number) => v.toLocaleString("es-CO")} />
                      <Line type="monotone" dataKey="total" stroke={BLUE} strokeWidth={2.5} dot={{ r: 3 }} />
                    </LineChart>
                  ) : tab === "fnFactura" ? (
                    <LineChart data={funnelHomeFactura}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="sem" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} unit="%" />
                      <Tooltip formatter={(v: number) => `${v.toFixed(2)}%`} />
                      <Line type="monotone" dataKey="pct" stroke={ALEGRA_GREEN} strokeWidth={2} />
                    </LineChart>
                  ) : tab === "fnContactos" ? (
                    <LineChart data={funnelHomeContactos}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="sem" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} unit="%" />
                      <Tooltip formatter={(v: number) => `${v.toFixed(2)}%`} />
                      <Line type="monotone" dataKey="pct" stroke={BLUE} strokeWidth={2} />
                    </LineChart>
                  ) : tab === "fnCotizacion" ? (
                    <LineChart data={funnelHomeCotizacion}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="sem" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} unit="%" />
                      <Tooltip formatter={(v: number) => `${v.toFixed(2)}%`} />
                      <Line type="monotone" dataKey="pct" stroke="#9333EA" strokeWidth={2} />
                    </LineChart>
                  ) : tab === "fnItem" ? (
                    <LineChart data={funnelHomeItem}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="sem" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} unit="%" />
                      <Tooltip formatter={(v: number) => `${v.toFixed(2)}%`} />
                      <Line type="monotone" dataKey="pct" stroke={ORANGE} strokeWidth={2} />
                    </LineChart>
                  ) : tab === "ttcFactura" ? (
                    <LineChart data={ttcFactura}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="sem" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} unit="s" />
                      <Tooltip formatter={(v: number) => `${v.toLocaleString()}s`} />
                      <Line type="monotone" dataKey="s" stroke={ALEGRA_GREEN} strokeWidth={2} />
                    </LineChart>
                  ) : tab === "ttcContactos" ? (
                    <LineChart data={ttcContactos}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="sem" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} unit="s" />
                      <Tooltip formatter={(v: number) => `${v.toLocaleString()}s`} />
                      <Line type="monotone" dataKey="s" stroke={BLUE} strokeWidth={2} />
                    </LineChart>
                  ) : tab === "ttcCotizacion" ? (
                    <LineChart data={ttcCotizacion}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="sem" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} unit="s" />
                      <Tooltip formatter={(v: number) => `${v.toLocaleString()}s`} />
                      <Line type="monotone" dataKey="s" stroke="#9333EA" strokeWidth={2} />
                    </LineChart>
                  ) : (
                    <LineChart data={ttcItem}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="sem" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} unit="s" />
                      <Tooltip formatter={(v: number) => `${v.toLocaleString()}s`} />
                      <Line type="monotone" dataKey="s" stroke={ORANGE} strokeWidth={2} />
                    </LineChart>
                  )}
                </ResponsiveContainer>
              </div>
              {stat && (
                <div className="flex flex-col justify-center rounded-lg border border-neutral-100 bg-neutral-50/60 p-3 md:min-w-[160px]">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">{stat.label}</p>
                  <p className="mt-1 text-2xl font-bold text-neutral-900">{stat.value}</p>
                  {!stat.hideDelta && (
                    <p className={`mt-1 flex items-center gap-1 text-xs font-bold ${(stat.invert ? stat.delta < 0 : stat.delta >= 0) ? "text-emerald-600" : "text-red-600"}`}>
                      {(stat.invert ? stat.delta < 0 : stat.delta >= 0) ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                      {stat.delta >= 0 ? "+" : ""}{stat.delta.toFixed(1)}%
                      {!stat.note && <span className="ml-0.5 text-[10px] font-medium text-neutral-500">vs primera sem</span>}
                    </p>
                  )}
                  {stat.note && <p className="mt-1 text-[10px] text-neutral-500">{stat.note}</p>}
                </div>
              )}
            </div>
            <div className="mt-2 flex items-center gap-1 text-[11px] text-neutral-500">
              <TrendingUp className="h-3 w-3" />
              Fuente: Amplitude · cohort Usuarios Pagos
            </div>
          </div>
        );
      })()}

      <Insights
        items={[
          "Quick Actions arrancó la semana del 12 de abril y ya alcanza 2,421 uniques y 5,357 clicks/sem (chart c5z4fzyu): Factura concentra ~48%, Cotización ~22%, Contacto ~15% e Item ~13%.",
          "Funnel Home → Factura saltó de 41–44% a 53.8% (+10pp) y Home → Contactos pasó de ~3% a 10.0% (+200%) tras el lanzamiento de Quick Actions.",
          "Funnel Home → Cotización pasó de 18–19% a 24.0% y Home → Item alcanzó pico de 8.2% (vs ~3.4% base).",
          "Time to Convert Home → Factura cayó de ~17,500s a 13,455s (-24%); Home → Cotización de 16,478s a 11,870s (-28%).",
          "Sidebar mantiene ~4.6K uniques/sem aún tras Quick Actions, indicando que Quick Actions amplió el alcance sin canibalizar el resto del Home.",
        ]}
      />
    </div>
  );
}


// ===== Sección 4 — No Desarrollo =====

const appContenidoMatrix = [
  { label: "Landing App", values: [false, false, true, false] },
  { label: "Banner App Facturación", values: [false, true, true, false] },
  { label: "Banner App Pyme", values: [false, false, true, false] },
];
const paises = ["Colombia", "México", "R. Dominicana", "Costa Rica"];

export function AppSeccionDetail() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-3">
          <img
            src={appLanding}
            alt="Landing actual de la app de Alegra"
            className="h-auto w-full rounded-lg border border-neutral-200 bg-white"
          />
          <p className="mt-2 text-[11px] text-neutral-500">
            Referencia · Landing actual de la App de Alegra
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
          <div className="border-b border-neutral-200 bg-neutral-50 px-4 py-2.5">
            <h4 className="text-sm font-bold text-neutral-900">
              Estado del contenido por país
            </h4>
            <p className="mt-0.5 text-[11px] text-neutral-500">
              Cobertura actual de la sección de App por mercado
            </p>
          </div>
          <table className="w-full text-xs">
            <thead className="bg-neutral-50/50 text-neutral-600">
              <tr>
                <th className="px-4 py-2 text-left font-semibold uppercase tracking-wider">
                  Contenido
                </th>
                {paises.map((p) => (
                  <th
                    key={p}
                    className="px-3 py-2 text-center font-semibold uppercase tracking-wider"
                  >
                    {p}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {appContenidoMatrix.map((row) => (
                <tr key={row.label} className="border-t border-neutral-100">
                  <td className="px-4 py-3 font-semibold text-neutral-800">
                    {row.label}
                  </td>
                  {row.values.map((has, i) => (
                    <td key={i} className="px-3 py-3 text-center">
                      {has ? (
                        <span
                          className="inline-flex h-6 w-6 items-center justify-center rounded-full text-white"
                          style={{ backgroundColor: ALEGRA_GREEN }}
                          title="Disponible"
                        >
                          <Check className="h-3.5 w-3.5" strokeWidth={3} />
                        </span>
                      ) : (
                        <span className="text-neutral-300">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Insights
        items={[
          "República Dominicana es el único país con cobertura completa (Landing + Banners Facturación y Pyme) en el sitio web.",
          "México cuenta con Banner App Facturación pero falta el resto del contenido — oportunidad rápida para escalar.",
          "Colombia y Costa Rica no tienen aún sección de App desplegada: prioridad de contenido para Q2.",
        ]}
      />
    </div>
  );
}

export function GySDetail() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-xl border border-neutral-200 bg-white p-3">
          <img
            src={gysDeviceImg}
            alt="Devices haciendo request"
            className="h-auto w-full rounded-lg border border-neutral-200"
          />
          <p className="mt-2 text-[11px] text-neutral-500">
            Devices haciendo request · Total 338 (Android 200 · iOS 131 · iPhone 129 · iPad 2)
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-neutral-200 bg-white p-6">
          <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
            OneLink — descarga de la App
          </p>
          <img
            src={onelinkQR}
            alt="QR de descarga de la app de Alegra"
            className="h-48 w-48"
          />
          <a
            href="https://onelink.to/kpkhuy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-700 underline hover:text-neutral-900"
          >
            onelink.to/kpkhuy <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>

      <Insights
        items={[
          "Pico de tráfico el 13–17 de marzo (>50 requests/día) tras la activación de la primera campaña de G&S.",
          "Android lidera el volumen de descargas con 200 requests, vs 131 en iOS — alineado con la base instalada en LATAM.",
          "El QR + OneLink actúa como punto único de entrada a las stores; oportunidad de medir conversión QR → install.",
        ]}
      />
    </div>
  );
}

export function PushTestDetail() {
  return (
    <div className="space-y-5">
      <div className="grid gap-5 md:grid-cols-[auto_1fr]">
        <div className="flex justify-center rounded-xl border border-neutral-200 bg-neutral-50 p-3">
          <img
            src={pushNotificationImg}
            alt="Push notification de prueba — vista en WhatsApp / lock screen"
            className="max-h-[420px] w-auto rounded-lg border border-neutral-200 shadow-sm"
          />
        </div>
        <div className="flex flex-col gap-3">
          <div className="rounded-xl border border-orange-100 bg-orange-50/50 p-4">
            <p className="text-[11px] font-bold uppercase tracking-wider text-orange-700">
              Hipótesis
            </p>
            <p className="mt-2 text-sm leading-relaxed text-neutral-700">
              Las notificaciones push pueden recuperar usuarios SOS y reactivar BASE en momentos clave (cobro, fin de mes, alertas de impuestos).
            </p>
          </div>
          <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4">
            <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: ALEGRA_GREEN }}>
              Push de prueba
            </p>
            <p className="mt-2 text-sm leading-relaxed text-neutral-700">
              Mensaje de bienvenida personalizado: "¡Hola! 😊 ¿Qué tal todo con Alegra?".
              Test sobre cohort acotado para medir tasa de apertura, retorno a la app y reacción frente a contenido conversacional.
            </p>
          </div>
          <Insights
            items={[
              "Primer experimento estructurado de push notifications: medir delivery, open-rate y retorno a la app.",
              "El tono cercano (emoji + pregunta) busca reactivar conversación, no solo notificar acciones.",
              "Si la apertura supera el baseline web push (~3-5%), se escalará a campañas segmentadas por comportamiento (BASE / SOS).",
            ]}
          />
        </div>
      </div>
    </div>
  );
}

// ===== Rediseño Facturación Costa Rica =====
const fvCRUniquesMes = [
  { mes: "Oct 25", v: 168 },
  { mes: "Nov 25", v: 162 },
  { mes: "Dic 25", v: 155 },
  { mes: "Ene 26", v: 164 },
  { mes: "Feb 26", v: 159 },
  { mes: "Mar 26", v: 171 },
];

const cantidadProductosFV = [
  { rango: "1 ítem", v: 412 },
  { rango: "2-3 ítems", v: 287 },
  { rango: "4-5 ítems", v: 124 },
  { rango: "6-10 ítems", v: 63 },
  { rango: "+10 ítems", v: 21 },
];

export function RediseñoFacturacionCRDetail() {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-orange-100 bg-orange-50/50 p-4">
        <p className="text-[11px] font-bold uppercase tracking-wider text-orange-700">
          Problema
        </p>
        <p className="mt-2 text-sm leading-relaxed text-neutral-700">
          Con la salida en web de la versión 4.4, la cantidad de facturas aumentó un <strong>20%</strong>, sin embargo, en la app se mantuvo constante. Adicionalmente, la <strong>tasa de conversión es la menor de las 4 versiones</strong> (63% hoy).
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <ChartCard
          title="Factura de venta Costa Rica — Uniques Mes"
          subtitle="Usuarios únicos que crearon factura en CR · últimos 6 meses"
          statLabel="Mar 26"
          statValue={lastVal(fvCRUniquesMes, "v")}
          statDelta={pctDelta(fvCRUniquesMes, "v")}
        >
          <LineChart data={fvCRUniquesMes} margin={{ top: 8, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis dataKey="mes" stroke="#6b7280" tick={{ fontSize: 10 }} />
            <YAxis stroke="#6b7280" tick={{ fontSize: 10 }} />
            <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }} formatter={(v: number) => v.toLocaleString("es-CO")} />
            <Line type="monotone" dataKey="v" stroke={ALEGRA_GREEN} strokeWidth={3} dot={{ r: 3 }} activeDot={{ r: 5 }} />
          </LineChart>
        </ChartCard>

        <ChartCard
          title="Cantidad de productos en la FV"
          subtitle="Distribución de ítems por factura de venta · CR · Mar 2026"
          statLabel="Moda"
          statValue="1 ítem"
        >
          <BarChart data={cantidadProductosFV} margin={{ top: 8, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis dataKey="rango" stroke="#6b7280" tick={{ fontSize: 10 }} />
            <YAxis stroke="#6b7280" tick={{ fontSize: 10 }} />
            <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }} formatter={(v: number) => v.toLocaleString("es-CO")} />
            <Bar dataKey="v" fill={BLUE} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartCard>
      </div>

      <Insights
        items={[
          "El uso mensual de la FV en Costa Rica es estable pero plano: la versión 4.4 web no se trasladó a app.",
          "La gran mayoría de facturas tiene 1-3 ítems → priorizar flujo rápido para FV cortas en el rediseño.",
          "Oportunidad de subir la tasa de conversión (63%) acercándola a la media de las otras versiones.",
        ]}
      />
    </div>
  );
}

// ===== Onboarding del Q4 =====

// Tendencia mensual Perfil → MQL (chart b6xrlqln)
const onboardingPerfilMQL = [
  { mes: "Oct '25", pct: 89.22 },
  { mes: "Nov '25", pct: 92.03 },
  { mes: "Dic '25", pct: 88.32 },
  { mes: "Ene '26", pct: 87.04 },
  { mes: "Feb '26", pct: 84.73 },
  { mes: "Mar '26", pct: 86.89 },
];

// Eventos Onboarding Semanal — sólo Perfil y MQL (sin PQL)
const onboardingEventosSemanal = [
  { semana: "02 Nov", perfil: 84, mql: 77 },
  { semana: "09 Nov", perfil: 99, mql: 89 },
  { semana: "16 Nov", perfil: 89, mql: 79 },
  { semana: "23 Nov", perfil: 99, mql: 89 },
  { semana: "30 Nov", perfil: 87, mql: 78 },
  { semana: "07 Dic", perfil: 69, mql: 58 },
  { semana: "14 Dic", perfil: 65, mql: 60 },
  { semana: "21 Dic", perfil: 54, mql: 45 },
  { semana: "28 Dic", perfil: 60, mql: 52 },
  { semana: "04 Ene", perfil: 105, mql: 96 },
  { semana: "11 Ene", perfil: 117, mql: 96 },
  { semana: "18 Ene", perfil: 98, mql: 86 },
  { semana: "25 Ene", perfil: 141, mql: 116 },
  { semana: "01 Feb", perfil: 217, mql: 182 },
  { semana: "08 Feb", perfil: 231, mql: 191 },
  { semana: "15 Feb", perfil: 248, mql: 217 },
  { semana: "22 Feb", perfil: 188, mql: 148 },
  { semana: "01 Mar", perfil: 178, mql: 153 },
  { semana: "08 Mar", perfil: 98, mql: 84 },
  { semana: "15 Mar", perfil: 222, mql: 190 },
  { semana: "22 Mar", perfil: 264, mql: 224 },
  { semana: "29 Mar", perfil: 260, mql: 214 },
  { semana: "05 Abr", perfil: 322, mql: 289 },
  { semana: "12 Abr", perfil: 281, mql: 242 },
  { semana: "19 Abr", perfil: 257, mql: 219 },
];

export function OnboardingQ4Detail() {
  const lastMQL = onboardingPerfilMQL[onboardingPerfilMQL.length - 1].pct;
  const firstMQL = onboardingPerfilMQL[0].pct;
  const deltaMQLPct = ((lastMQL - firstMQL) / firstMQL) * 100; // % crecimiento relativo

  const lastWeek = onboardingEventosSemanal[onboardingEventosSemanal.length - 1];
  const firstWeek = onboardingEventosSemanal[0];
  const perfilDeltaPct = ((lastWeek.perfil - firstWeek.perfil) / firstWeek.perfil) * 100;
  const mqlDeltaPct = ((lastWeek.mql - firstWeek.mql) / firstWeek.mql) * 100;

  return (
    <div className="space-y-4">
      <div className="grid gap-3 lg:grid-cols-2">
        <ChartCard
          title="Perfil → MQL"
          subtitle="Onboarding finalizado · mensual"
          url="https://app.amplitude.com/analytics/alegra/chart/b6xrlqln"
          statLabel="Último mes"
          statValue={`${lastMQL.toFixed(2)}%`}
          statDelta={deltaMQLPct}
          statBaselineLabel="vs Oct '25"
        >
          <LineChart data={onboardingPerfilMQL}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="mes" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} unit="%" domain={[80, 95]} />
            <Tooltip formatter={(v: number) => `${v.toFixed(2)}%`} />
            <Line type="monotone" dataKey="pct" stroke={ALEGRA_GREEN} strokeWidth={2.5} dot={{ r: 3 }} />
          </LineChart>
        </ChartCard>

        <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
          <div className="mb-2 flex items-start justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="text-sm font-bold text-neutral-900">Eventos Onboarding Semanal</h4>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 ring-1 ring-emerald-200">
                <TrendingUp className="h-2.5 w-2.5" />Perfil +{perfilDeltaPct.toFixed(1)}%
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 ring-1 ring-emerald-200">
                <TrendingUp className="h-2.5 w-2.5" />MQL +{mqlDeltaPct.toFixed(1)}%
              </span>
              <p className="w-full text-[11px] text-neutral-500">Perfil vs MQL · uniques semanales</p>
            </div>
            <a
              href="https://app.amplitude.com/analytics/alegra/chart/j30yk1tu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-neutral-700"
              title="Abrir en Amplitude"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto]">
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={onboardingEventosSemanal}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="semana" tick={{ fontSize: 9 }} interval={2} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip formatter={(v: number, n: string) => [v.toLocaleString("es-CO"), n]} />
                  <Legend wrapperStyle={{ fontSize: 10 }} iconType="circle" />
                  <Line type="monotone" name="Perfil" dataKey="perfil" stroke={ALEGRA_GREEN} strokeWidth={2} dot={false} />
                  <Line type="monotone" name="MQL" dataKey="mql" stroke={BLUE} strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col justify-center gap-3 rounded-lg border border-neutral-100 bg-neutral-50/60 p-3 md:min-w-[150px]">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Perfil · última sem</p>
                <p className="mt-0.5 text-xl font-bold text-neutral-900">{lastWeek.perfil.toLocaleString("es-CO")}</p>
                <p className="mt-0.5 flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                  <TrendingUp className="h-3 w-3" />+{perfilDeltaPct.toFixed(1)}%
                  <span className="font-medium text-neutral-500">vs 02-Nov</span>
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">MQL · última sem</p>
                <p className="mt-0.5 text-xl font-bold text-neutral-900">{lastWeek.mql.toLocaleString("es-CO")}</p>
                <p className="mt-0.5 flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                  <TrendingUp className="h-3 w-3" />+{mqlDeltaPct.toFixed(1)}%
                  <span className="font-medium text-neutral-500">vs 02-Nov</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Insights
        items={[
          "Perfil → MQL se mantiene estable en ~85–92% mensual: el flujo de onboarding completa la mayoría de los registros que llegan al perfil.",
          `Volumen semanal de Perfiles creció +${perfilDeltaPct.toFixed(0)}% (de ${firstWeek.perfil} a ${lastWeek.perfil}/sem) y MQL +${mqlDeltaPct.toFixed(0)}% (de ${firstWeek.mql} a ${lastWeek.mql}/sem) entre 02-Nov y 19-Abr.`,
          "MQL siguen de cerca al Perfil con tasa de finalización alta — el cuello de botella para activación está aguas abajo (PQL/Logo), no en el onboarding inicial.",
        ]}
      />
    </div>
  );
}

// Map title → detail component
export const initiativeDetailMap: Record<string, () => JSX.Element> = {
  "Búsqueda de documentos e información": BusquedaDetail,
  "Estabilización": EstabilizacionDetail,
  "Compartir y descargar remisiones": RemisionesDetail,
  "Llenado automático campos contactos": ContactosDetail,
  "Home — acciones rápidas": HomeDetail,
  "Onboarding del Q4": OnboardingQ4Detail,
  "Creación de la sección de App en Alegra": AppSeccionDetail,
  "G&S para incentivar descarga de usuarios web": GySDetail,
  "Testeo de push notification dentro de la app": PushTestDetail,
  "Rediseño Facturación Costa Rica": RediseñoFacturacionCRDetail,
};

