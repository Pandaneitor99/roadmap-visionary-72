import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const routeLabels: Record<string, string> = {
  "": "Dashboard",
  "okrs": "OKRs",
  "iniciativas": "Iniciativas",
  "roadmap": "Roadmap",
  "roadmap-review": "Roadmap Review",
  "q4-2025": "Q4 2025",
  "logros": "Logros",
};

// Route prefixes that namespace a quarter of their own; anything else falls back to Q1.
const quarterLabels: Record<string, string> = {
  "q4-2025": "Q4 2025",
  "q2-2026": "Q2 2026",
  "q3-2026": "Q3 2026",
};

export function Breadcrumbs() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  
  if (pathSegments.length === 0) {
    return (
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4 px-3 py-2 rounded-lg bg-card/50 backdrop-blur-sm w-fit">
        <Home className="h-4 w-4" />
        <span className="text-foreground font-medium">Q1 2026</span>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground font-medium">Dashboard</span>
      </nav>
    );
  }

  const quarterSegment = pathSegments[0];
  const quarterLabel = quarterLabels[quarterSegment];

  const breadcrumbs: { label: string; path: string }[] = [];

  if (quarterLabel) {
    breadcrumbs.push({ label: quarterLabel, path: `/${quarterSegment}` });
    if (pathSegments.length > 1) {
      const subPage = pathSegments[1];
      breadcrumbs.push({
        label: routeLabels[subPage] || subPage,
        path: `/${pathSegments.join("/")}`
      });
    } else {
      breadcrumbs[0].label = "Dashboard";
    }
  } else {
    breadcrumbs.push({ label: "Q1 2026", path: "/" });
    const currentPage = pathSegments[0];
    breadcrumbs.push({ 
      label: routeLabels[currentPage] || currentPage, 
      path: `/${currentPage}` 
    });
  }

  return (
    <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4 px-3 py-2 rounded-lg bg-card/50 backdrop-blur-sm w-fit">
      <Home className="h-4 w-4" />
      {breadcrumbs.map((crumb, index) => (
        <div key={crumb.path} className="flex items-center gap-1.5">
          {index > 0 && <ChevronRight className="h-3.5 w-3.5" />}
          {index === breadcrumbs.length - 1 ? (
            <span className="text-foreground font-medium">{crumb.label}</span>
          ) : (
            <Link 
              to={crumb.path} 
              className="hover:text-foreground hover:underline transition-all duration-200"
            >
              {crumb.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
