import { OKRCard } from "@/components/dashboard/OKRCard";
import { okrsQ22026 } from "@/data/q2-2026";
import { strategyInfo } from "@/data/initiatives";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Compass, Star } from "lucide-react";

export default function OKRsQ22026() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">OKRs Q2 2026</h1>
        <p className="text-muted-foreground">
          Objetivos y Resultados Clave para TMD Mobile
        </p>
      </div>

      {/* Strategy & North Star */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-0 bg-gradient-to-br from-primary/5 to-primary/10 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Compass className="h-4 w-4 text-primary" />
              </div>
              <CardTitle className="text-sm font-semibold text-primary">Estrategia</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-foreground/80 leading-relaxed">
              {strategyInfo.strategy}
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-[hsl(var(--alegra-orange))]/5 to-[hsl(var(--alegra-orange))]/10 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--alegra-orange))]/10">
                <Star className="h-4 w-4 text-[hsl(var(--alegra-orange))]" />
              </div>
              <CardTitle className="text-sm font-semibold text-[hsl(var(--alegra-orange))]">North Star Metric</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-foreground/80 leading-relaxed">
              {strategyInfo.northStarMetric}
            </p>
          </CardContent>
        </Card>
      </div>

      {okrsQ22026.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
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
  );
}
