import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const routeLabels: Record<string, string> = {
  "": "Dashboard",
  "okrs": "OKRs",
  "iniciativas": "Iniciativas",
  "roadmap": "Roadmap",
  "q4-2025": "Q4 2025",
  "logros": "Logros",
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

  const isQ4 = pathSegments[0] === "q4-2025";
  const isQ2 = pathSegments[0] === "q2-2026";
  const quarterLabel = isQ4 ? "Q4 2025" : isQ2 ? "Q2 2026" : "Q1 2026";
  
  const breadcrumbs: { label: string; path: string }[] = [];
  
  if (isQ4) {
    breadcrumbs.push({ label: "Q4 2025", path: "/q4-2025" });
    if (pathSegments.length > 1) {
      const subPage = pathSegments[1];
      breadcrumbs.push({ 
        label: routeLabels[subPage] || subPage, 
        path: `/${pathSegments.join("/")}` 
      });
    } else {
      breadcrumbs[0].label = "Dashboard";
    }
  } else if (isQ2) {
    breadcrumbs.push({ label: "Q2 2026", path: "/q2-2026" });
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
