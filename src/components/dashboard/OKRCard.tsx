import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { OKR } from "@/data/initiatives";

interface OKRCardProps {
  okr: OKR;
}

export function OKRCard({ okr }: OKRCardProps) {
  const isExperience = okr.type === "experience";
  const isAdoption = okr.type === "adoption";

  const parsePercent = (value?: string) => {
    if (!value) return null;
    const cleaned = value
      .toString()
      .replace(/,/g, "")
      .replace(/%/g, "")
      .trim();
    const num = Number.parseFloat(cleaned);
    return Number.isFinite(num) ? num : null;
  };

  return (
    <Card className="border-0 bg-card/80 backdrop-blur-md shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-lg ${
              isExperience
                ? "bg-[hsl(var(--badge-experience))]/10 text-[hsl(var(--badge-experience))]"
                : "bg-[hsl(var(--badge-adoption))]/10 text-[hsl(var(--badge-adoption))]"
            }`}
          >
            <TrendingUp className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge
                variant="outline"
                className={`${
                  isExperience
                    ? "border-[hsl(var(--badge-experience))] text-[hsl(var(--badge-experience))]"
                    : "border-[hsl(var(--badge-adoption))] text-[hsl(var(--badge-adoption))]"
                }`}
              >
                {isExperience ? "Experiencia" : "Adopción"}
              </Badge>
              {isAdoption && (
                <Badge
                  variant="outline"
                  className="border-[hsl(var(--badge-engagement))] text-[hsl(var(--badge-engagement))]"
                >
                  Engagement
                </Badge>
              )}
            </div>
            <CardTitle className="text-sm font-semibold leading-tight">{okr.objective}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {okr.keyResults.map((kr) => {
          const valueForBadge = kr.achievedIncrease ?? kr.percentage;
          const parsed = parsePercent(valueForBadge);
          const isDecrease = parsed !== null ? parsed < 0 : false;
          const isTbd = valueForBadge.toLowerCase?.().includes("tbd") ?? false;

          return (
            <div key={kr.id} className="rounded-lg bg-muted/50 p-3 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <span className="text-sm font-medium text-foreground">{kr.id.toUpperCase()}</span>
                <Badge 
                  variant="secondary" 
                  className={`text-xs ${
                    isTbd
                      ? "bg-muted text-muted-foreground"
                      : isDecrease
                        ? "bg-[hsl(var(--alegra-orange))]/10 text-[hsl(var(--alegra-orange))]"
                        : "bg-success/10 text-success"
                  }`}
                >
                  {isTbd ? null : isDecrease ? (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  )}
                  {valueForBadge}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{kr.name}</p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">
                  Base: <span className="font-medium text-foreground">{kr.baseline}</span>
                </span>
                <span className="text-muted-foreground">
                  Target: <span className="font-medium text-foreground">{kr.target}</span>
                </span>
              </div>

              {(kr.currentResult || kr.achievedIncrease) && (
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  {kr.currentResult && (
                    <span className="text-muted-foreground">
                      Resultado actual:{" "}
                      <span className="font-medium text-foreground">{kr.currentResult}</span>
                    </span>
                  )}
                  {kr.achievedIncrease && (
                    <span className="text-muted-foreground">
                      Incremento logrado:{" "}
                      <span className="font-medium text-foreground">{kr.achievedIncrease}</span>
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
