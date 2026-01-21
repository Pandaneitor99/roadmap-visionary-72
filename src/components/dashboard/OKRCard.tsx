import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
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
          <CardTitle className="text-base font-semibold">{okr.objective}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {okr.keyResults.map((kr) => (
          <div key={kr.id} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-foreground">{kr.name}</span>
              <span className="text-muted-foreground">
                {kr.baseline} → {kr.target}
              </span>
            </div>
            <Progress
              value={kr.progress}
              className="h-2"
            />
            <p className="text-right text-xs text-muted-foreground">{kr.progress}% completado</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
