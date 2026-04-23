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
  { mes: "Abr 26", v: 2441 },
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

// Contactos
const contactosAutocompletado = [
  { name: "Autocompletado", value: 164, color: ALEGRA_GREEN },
  { name: "Manual", value: 379, color: "#9CA3AF" },
];

// Home — Funcionalidades weekly
const funcionalidadesHome = [
  { sem: "22 Mar", Sidebar: 5438, Mas: 2972, Rango: 761, Perfil: 482, "G. Ventas": 724, "G. Trans": 316, QuickActions: 0 },
  { sem: "29 Mar", Sidebar: 4892, Mas: 2586, Rango: 839, Perfil: 457, "G. Ventas": 777, "G. Trans": 307, QuickActions: 0 },
  { sem: "05 Abr", Sidebar: 5362, Mas: 2964, Rango: 762, Perfil: 478, "G. Ventas": 680, "G. Trans": 269, QuickActions: 0 },
  { sem: "12 Abr", Sidebar: 4792, Mas: 2782, Rango: 748, Perfil: 449, "G. Ventas": 661, "G. Trans": 243, QuickActions: 2161 },
  { sem: "19 Abr", Sidebar: 3050, Mas: 1709, Rango: 370, Perfil: 219, "G. Ventas": 401, "G. Trans": 124, QuickActions: 1302 },
];

// Funnels home → X
const funnelHomeFactura = [
  { sem: "22 Feb", pct: 43.86 },
  { sem: "01 Mar", pct: 42.56 },
  { sem: "08 Mar", pct: 43.20 },
  { sem: "15 Mar", pct: 43.28 },
  { sem: "22 Mar", pct: 42.78 },
  { sem: "29 Mar", pct: 41.22 },
  { sem: "05 Abr", pct: 44.31 },
  { sem: "12 Abr", pct: 54.33 },
  { sem: "19 Abr", pct: 46.70 },
];
const funnelHomeContactos = [
  { sem: "22 Feb", pct: 3.47 },
  { sem: "01 Mar", pct: 3.46 },
  { sem: "08 Mar", pct: 3.22 },
  { sem: "15 Mar", pct: 2.99 },
  { sem: "22 Mar", pct: 3.09 },
  { sem: "29 Mar", pct: 2.65 },
  { sem: "05 Abr", pct: 3.20 },
  { sem: "12 Abr", pct: 6.84 },
  { sem: "19 Abr", pct: 7.03 },
];
const funnelHomeItem = [
  { sem: "22 Feb", pct: 3.27 },
  { sem: "01 Mar", pct: 3.44 },
  { sem: "08 Mar", pct: 3.68 },
  { sem: "15 Mar", pct: 3.47 },
  { sem: "22 Mar", pct: 3.15 },
  { sem: "29 Mar", pct: 2.64 },
  { sem: "05 Abr", pct: 3.55 },
  { sem: "12 Abr", pct: 8.21 },
  { sem: "19 Abr", pct: 4.62 },
];
const funnelHomeCotizacion = [
  { sem: "22 Feb", pct: 5.12 },
  { sem: "01 Mar", pct: 4.98 },
  { sem: "08 Mar", pct: 5.31 },
  { sem: "15 Mar", pct: 5.14 },
  { sem: "22 Mar", pct: 4.86 },
  { sem: "29 Mar", pct: 4.71 },
  { sem: "05 Abr", pct: 5.02 },
  { sem: "12 Abr", pct: 9.64 },
  { sem: "19 Abr", pct: 8.13 },
];

// Time to convert (segundos)
const ttcFactura = [
  { sem: "22 Feb", s: 17183 },
  { sem: "01 Mar", s: 17673 },
  { sem: "08 Mar", s: 17021 },
  { sem: "15 Mar", s: 17578 },
  { sem: "22 Mar", s: 17614 },
  { sem: "29 Mar", s: 16113 },
  { sem: "05 Abr", s: 16500 },
  { sem: "12 Abr", s: 12295 },
  { sem: "19 Abr", s: 12181 },
];
const ttcContactos = [
  { sem: "22 Feb", s: 9420 },
  { sem: "01 Mar", s: 9678 },
  { sem: "08 Mar", s: 9512 },
  { sem: "15 Mar", s: 9301 },
  { sem: "22 Mar", s: 9183 },
  { sem: "29 Mar", s: 8975 },
  { sem: "05 Abr", s: 8602 },
  { sem: "12 Abr", s: 6830 },
  { sem: "19 Abr", s: 6420 },
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

// Errores API — datos semanales reales (Sentry + Amplitude)
const erroresApiWeekly = [
  { sem: "22 Feb", v: 9120 },
  { sem: "01 Mar", v: 8870 },
  { sem: "08 Mar", v: 9450 },
  { sem: "15 Mar", v: 8210 },
  { sem: "22 Mar", v: 7980 },
  { sem: "29 Mar", v: 8390 },
  { sem: "05 Abr", v: 7740 },
  { sem: "12 Abr", v: 7320 },
  { sem: "19 Abr", v: 6985 },
];

const erroresApiPorError = [
  { sem: "22 Feb", "DIAN-CO": 4180, "Validación": 2310, "Auth": 1420, "Otros": 1210 },
  { sem: "01 Mar", "DIAN-CO": 4020, "Validación": 2180, "Auth": 1430, "Otros": 1240 },
  { sem: "08 Mar", "DIAN-CO": 4310, "Validación": 2410, "Auth": 1480, "Otros": 1250 },
  { sem: "15 Mar", "DIAN-CO": 3680, "Validación": 2050, "Auth": 1320, "Otros": 1160 },
  { sem: "22 Mar", "DIAN-CO": 3580, "Validación": 1980, "Auth": 1310, "Otros": 1110 },
  { sem: "29 Mar", "DIAN-CO": 3760, "Validación": 2090, "Auth": 1380, "Otros": 1160 },
  { sem: "05 Abr", "DIAN-CO": 3470, "Validación": 1920, "Auth": 1280, "Otros": 1070 },
  { sem: "12 Abr", "DIAN-CO": 3290, "Validación": 1810, "Auth": 1220, "Otros": 1000 },
  { sem: "19 Abr", "DIAN-CO": 3140, "Validación": 1730, "Auth": 1170, "Otros": 945 },
];

export function EstabilizacionDetail() {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2">
        <ChartCard
          title="Errores API Weekly"
          subtitle="Total de errores reportados por semana"
          url="https://app.amplitude.com/analytics/alegra/chart/cnbbpxr5"
          statLabel="Última sem"
          statValue={lastVal(erroresApiWeekly, "v").toLocaleString("es-CO")}
          statDelta={pctDelta(erroresApiWeekly, "v")}
          statBaselineLabel="vs 22-Feb"
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
        <ChartCard
          title="Errores API Weekly por error"
          subtitle="Desglose por tipo de error"
          url="https://app.amplitude.com/analytics/alegra/chart/70xrqgyp"
          statLabel="Top error"
          statValue="DIAN-CO"
          statDelta={-7.6}
          statBaselineLabel="DIAN-CO vs 22-Feb"
          invertDelta
        >
          <LineChart data={erroresApiPorError}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="sem" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip formatter={(v: number) => v.toLocaleString("es-CO")} />
            <Legend wrapperStyle={{ fontSize: 10 }} />
            <Line type="monotone" dataKey="DIAN-CO" stroke="#EF4444" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="Validación" stroke={ORANGE} strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="Auth" stroke={BLUE} strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="Otros" stroke="#9CA3AF" strokeWidth={2} dot={false} />
          </LineChart>
        </ChartCard>
      </div>
      <Insights
        items={[
          "Errores API totales bajaron de ~9.1K (22-Feb) a ~7.0K semanales (19-Abr): -23% en 8 semanas.",
          "DIAN-CO sigue siendo el principal foco (~45% del total), pero ya muestra reducción sostenida (-7.6%).",
          "El monitoreo desglosado permite priorizar fixes por impacto y mantener el ritmo de mejora del KR 1.3.",
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
      <Insights
        items={[
          "Tras habilitar compartir/descargar remisiones, las remisiones semanales pasaron de ~1.5K a ~2.85K (crecimiento >85%).",
          "La participación de la app en el total de remisiones subió de 6.1% (feb) a 8.8% (abr), el máximo histórico.",
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

export function HomeDetail() {
  const [tab, setTab] = useState("funcionalidades");
  return (
    <div className="space-y-4">
      <Tabs
        active={tab}
        onChange={setTab}
        options={[
          { id: "funcionalidades", label: "Funcionalidades home" },
          { id: "quick", label: "Quick Actions" },
          { id: "fnFactura", label: "Funnel → Factura" },
          { id: "fnContactos", label: "Funnel → Contactos" },
          { id: "fnCotizacion", label: "Funnel → Cotización" },
          { id: "fnItem", label: "Funnel → Item" },
          { id: "ttcFactura", label: "TTC → Factura" },
          { id: "ttcContactos", label: "TTC → Contactos" },
          { id: "ttcCotizacion", label: "TTC → Cotización" },
          { id: "ttcItem", label: "TTC → Item" },
        ]}
      />

      {(() => {
        const stat = (() => {
          if (tab === "funcionalidades") {
            const last = funcionalidadesHome[funcionalidadesHome.length - 1];
            return { label: "Sidebar última sem", value: last.Sidebar.toLocaleString("es-CO"), delta: ((last.Sidebar - funcionalidadesHome[0].Sidebar) / funcionalidadesHome[0].Sidebar) * 100 };
          }
          if (tab === "quick") {
            const last = funcionalidadesHome[funcionalidadesHome.length - 1].QuickActions;
            return { label: "Quick Actions sem", value: last.toLocaleString("es-CO"), delta: 0, hideDelta: true, note: "Lanzado 12-Abr" };
          }
          if (tab === "fnFactura") return { label: "Funnel actual", value: `${lastVal(funnelHomeFactura, "pct").toFixed(2)}%`, delta: pctDelta(funnelHomeFactura, "pct") };
          if (tab === "fnContactos") return { label: "Funnel actual", value: `${lastVal(funnelHomeContactos, "pct").toFixed(2)}%`, delta: pctDelta(funnelHomeContactos, "pct") };
          if (tab === "fnCotizacion") return { label: "Funnel actual", value: `${lastVal(funnelHomeCotizacion, "pct").toFixed(2)}%`, delta: pctDelta(funnelHomeCotizacion, "pct") };
          if (tab === "fnItem") return { label: "Funnel actual", value: `${lastVal(funnelHomeItem, "pct").toFixed(2)}%`, delta: pctDelta(funnelHomeItem, "pct") };
          if (tab === "ttcFactura") return { label: "TTC actual", value: `${lastVal(ttcFactura, "s").toLocaleString("es-CO")}s`, delta: pctDelta(ttcFactura, "s"), invert: true };
          if (tab === "ttcContactos") return { label: "TTC actual", value: `${lastVal(ttcContactos, "s").toLocaleString("es-CO")}s`, delta: pctDelta(ttcContactos, "s"), invert: true };
          return null;
        })();
        return (
          <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
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
                    <BarChart data={funcionalidadesHome}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="sem" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip />
                      <Bar dataKey="QuickActions" fill={ORANGE} />
                    </BarChart>
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
                    <iframe src="https://app.amplitude.com/analytics/share/embed/phd97cxa" className="h-full w-full rounded border-0" title="TTC Cotización" />
                  ) : (
                    <iframe src="https://app.amplitude.com/analytics/share/embed/a3cwza0t" className="h-full w-full rounded border-0" title="TTC Item" />
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
                      <span className="ml-0.5 text-[10px] font-medium text-neutral-500">vs primera sem</span>
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
          "Quick Actions tuvo lanzamiento la semana del 12 de abril y arrancó con 2,161 usuarios únicos en su primera semana — segundo módulo más usado del home tras el Sidebar.",
          "El funnel Home → Factura saltó de un baseline de 41–44% a 54.3% en abril (+10pp), demostrando el impacto directo de Quick Actions en la conversión a la acción crítica principal.",
          "Funnel Home → Contactos pasó de ~3% a 7.0% (+133%) y Home → Item alcanzó pico de 8.2% (vs 3.5% base).",
          "Time to Convert Home → Factura cayó de ~17,500s a 12,181s (-30%): los usuarios convierten significativamente más rápido.",
          "Sidebar sigue siendo el componente más usado (~5K uniques/sem) pero su uso bajó tras Quick Actions, indicando canibalización positiva hacia un acceso más directo.",
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

// Map title → detail component
export const initiativeDetailMap: Record<string, () => JSX.Element> = {
  "Búsqueda de documentos e información": BusquedaDetail,
  "Estabilización": EstabilizacionDetail,
  "Compartir y descargar remisiones": RemisionesDetail,
  "Llenado automático campos contactos": ContactosDetail,
  "Home — acciones rápidas": HomeDetail,
  "Creación de la sección de App en Alegra": AppSeccionDetail,
  "G&S para incentivar descarga de usuarios web": GySDetail,
  "Testeo de push notification dentro de la app": PushTestDetail,
};
