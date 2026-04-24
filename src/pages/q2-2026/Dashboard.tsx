import { Lightbulb, CalendarCheck, TrendingUp, Zap, Sparkles, Star, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { StatCard } from "@/components/dashboard/StatCard";
import { InitiativeCard } from "@/components/dashboard/InitiativeCard";
import { OKRCard } from "@/components/dashboard/OKRCard";
import { initiativesQ22026, okrsQ22026 } from "@/data/q2-2026";
import { Button } from "@/components/ui/button";

const ALEGRA_GREEN = "#00B386";

const NSM_ACTIONS = [
  { label: "Facturas", isNew: false },
  { label: "Cotizar", isNew: false },
  { label: "Contactos", isNew: false },
  { label: "Items", isNew: false },
  { label: "Remisiones", isNew: false },
  { label: "Pagos", isNew: false },
  { label: "Reportes", isNew: false },
  { label: "Búsquedas", isNew: true },
  { label: "Gráficos", isNew: true },
];

export default function DashboardQ22026() {
  const navigate = useNavigate();
  const inProgressCount = initiativesQ22026.filter((i) => i.status === "in-progress").length;
  const notStartedCount = initiativesQ22026.filter((i) => i.status === "not-started").length;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard Q2 2026</h1>
          <p className="text-muted-foreground">Vista general del roadmap TMD Mobile Q2 2026</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/q2-2026/roadmap-review")}
          className="gap-2"
        >
          Ver Roadmap Review
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Visión estratégica */}
      <div
        className="relative overflow-hidden rounded-2xl border border-emerald-100 bg-white p-8 shadow-sm md:p-10"
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
        <p className="mt-4 text-xl font-semibold leading-snug text-neutral-900 md:text-2xl">
          "Convertir la App de Alegra en el centro operativo móvil imprescindible
          de la Pyme y el centro de control móvil en tiempo real del contador,
          donde las decisiones y flujos críticos se resuelven en segundos."
        </p>

        {/* Principios */}
        <div className="mt-7 grid gap-3 md:grid-cols-3">
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

      {/* North Star Metric */}
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
          <div className="flex-1">
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
              {NSM_ACTIONS.map((action) => (
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

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="cursor-pointer" onClick={() => navigate("/q2-2026/iniciativas")}>
          <StatCard title="Iniciativas Totales" value={initiativesQ22026.length} subtitle="Q2 2026" icon={Lightbulb} />
        </div>
        <div className="cursor-pointer" onClick={() => navigate("/q2-2026/iniciativas?status=in-progress")}>
          <StatCard title="En Progreso" value={inProgressCount} subtitle="Activas ahora" icon={TrendingUp} />
        </div>
        <div className="cursor-pointer" onClick={() => navigate("/q2-2026/iniciativas?status=not-started")}>
          <StatCard title="Por iniciar" value={notStartedCount} subtitle="Próximas" icon={CalendarCheck} />
        </div>
        <div className="cursor-pointer" onClick={() => navigate("/q2-2026/roadmap")}>
          <StatCard title="Sprint Actual" value={0} subtitle="En curso" icon={Zap} />
        </div>
      </div>

      {/* OKRs Summary */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-foreground">Resumen de OKRs</h2>
        {okrsQ22026.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {okrsQ22026.map((okr) => (
              <OKRCard key={okr.id} okr={okr} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            Aún no hay OKRs definidos para Q2 2026.
          </div>
        )}
      </div>

      {/* Recent Initiatives */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-foreground">Iniciativas Activas</h2>
        {initiativesQ22026.filter((i) => i.status === "in-progress").length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {initiativesQ22026
              .filter((i) => i.status === "in-progress")
              .map((initiative) => (
                <InitiativeCard key={initiative.id} initiative={initiative} />
              ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            Aún no hay iniciativas activas para Q2 2026.
          </div>
        )}
      </div>
    </div>
  );
}
