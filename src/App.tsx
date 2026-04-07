import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import OKRs from "./pages/OKRs";
import Iniciativas from "./pages/Iniciativas";
import Roadmap from "./pages/Roadmap";
import DashboardQ42025 from "./pages/q4-2025/Dashboard";
import OKRsQ42025 from "./pages/q4-2025/OKRs";
import IniciativasQ42025 from "./pages/q4-2025/Iniciativas";
import RoadmapQ42025 from "./pages/q4-2025/Roadmap";
import LogrosQ42025 from "./pages/q4-2025/Logros";
import DashboardQ22026 from "./pages/q2-2026/Dashboard";
import OKRsQ22026 from "./pages/q2-2026/OKRs";
import IniciativasQ22026 from "./pages/q2-2026/Iniciativas";
import RoadmapQ22026 from "./pages/q2-2026/Roadmap";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/okrs" element={<OKRs />} />
            <Route path="/iniciativas" element={<Iniciativas />} />
            <Route path="/roadmap" element={<Roadmap />} />

            {/* Q4 2025 */}
            <Route path="/q4-2025" element={<DashboardQ42025 />} />
            <Route path="/q4-2025/okrs" element={<OKRsQ42025 />} />
            <Route path="/q4-2025/iniciativas" element={<IniciativasQ42025 />} />
            <Route path="/q4-2025/roadmap" element={<RoadmapQ42025 />} />
            <Route path="/q4-2025/logros" element={<LogrosQ42025 />} />

            {/* Q2 2026 */}
            <Route path="/q2-2026" element={<DashboardQ22026 />} />
            <Route path="/q2-2026/okrs" element={<OKRsQ22026 />} />
            <Route path="/q2-2026/iniciativas" element={<IniciativasQ22026 />} />
            <Route path="/q2-2026/roadmap" element={<RoadmapQ22026 />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
