import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { OKR } from "@/data/initiatives";

interface OKRCardProps {
  okr: OKR;
}

export function OKRCard({ okr }: OKRCardProps) {
  const isExperience = okr.type === "experience";

  return (
    <Card className="border-0 bg-card shadow-sm">
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
            <Badge
              variant="outline"
              className={`mb-2 ${
                isExperience
                  ? "border-[hsl(var(--badge-experience))] text-[hsl(var(--badge-experience))]"
                  : "border-[hsl(var(--badge-adoption))] text-[hsl(var(--badge-adoption))]"
              }`}
            >
              {isExperience ? "Experiencia" : "Adopción"}
            </Badge>
            <CardTitle className="text-sm font-semibold leading-tight">{okr.objective}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {okr.keyResults.map((kr) => {
          const isNegative = kr.percentage.startsWith("-");
          return (
            <div key={kr.id} className="rounded-lg bg-muted/50 p-3 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <span className="text-sm font-medium text-foreground">{kr.id.toUpperCase()}</span>
                <Badge 
                  variant="secondary" 
                  className={`text-xs ${
                    isNegative 
                      ? "bg-success/10 text-success" 
                      : "bg-[hsl(var(--alegra-orange))]/10 text-[hsl(var(--alegra-orange))]"
                  }`}
                >
                  {isNegative ? <TrendingDown className="h-3 w-3 mr-1" /> : <TrendingUp className="h-3 w-3 mr-1" />}
                  {kr.percentage}
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
