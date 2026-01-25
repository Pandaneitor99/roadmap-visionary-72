import { useState } from "react";
import { LayoutDashboard, Target, Lightbulb, CalendarDays, Smartphone, ChevronDown, FolderOpen, Trophy } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const q1MenuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "OKRs", url: "/okrs", icon: Target },
  { title: "Iniciativas", url: "/iniciativas", icon: Lightbulb },
  { title: "Roadmap", url: "/roadmap", icon: CalendarDays },
];

const q4MenuItems = [
  { title: "Dashboard", url: "/q4-2025", icon: LayoutDashboard },
  { title: "OKRs", url: "/q4-2025/okrs", icon: Target },
  { title: "Iniciativas", url: "/q4-2025/iniciativas", icon: Lightbulb },
  { title: "Roadmap", url: "/q4-2025/roadmap", icon: CalendarDays },
  { title: "Logros", url: "/q4-2025/logros", icon: Trophy },
];

export function AppSidebar() {
  const location = useLocation();
  const isQ1Route = q1MenuItems.some(item => 
    item.url === "/" ? location.pathname === "/" : location.pathname.startsWith(item.url)
  );
  const isQ4Route = location.pathname.startsWith("/q4-2025");

  const [isOpenQ1, setIsOpenQ1] = useState(isQ1Route);
  const [isOpenQ4, setIsOpenQ4] = useState(isQ4Route);

  // Count initiatives per quarter
  const q1Count = 5; // Active initiatives in Q1
  const q4Count = 5; // Items in Q4

  return (
    <Sidebar className="border-r-0 backdrop-blur-md bg-sidebar/95">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 shadow-lg backdrop-blur-sm">
            <Smartphone className="h-5 w-5 text-sidebar-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-sidebar-foreground">TMD Mobile</h1>
            <p className="text-xs text-sidebar-foreground/60">Roadmap 2026</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <Collapsible open={isOpenQ1} onOpenChange={setIsOpenQ1}>
            <CollapsibleTrigger className="group flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/90 transition-all duration-300 ease-in-out hover:bg-white/10 hover:shadow-md hover:translate-x-0.5">
              <FolderOpen className="h-5 w-5 text-alegra-orange transition-transform duration-300 group-hover:scale-110" />
              <span className="flex-1 text-left">Q1 2026</span>
              <Badge variant="secondary" className="h-5 px-1.5 text-[10px] bg-white/20 text-sidebar-foreground border-0">
                {q1Count}
              </Badge>
              <ChevronDown 
                className="h-4 w-4 transition-transform duration-300 ease-in-out" 
                style={{ transform: isOpenQ1 ? "rotate(180deg)" : "rotate(0deg)" }}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="ml-4 mt-1 border-l-2 border-white/20 pl-3 animate-accordion-down origin-top">
              <SidebarGroupContent>
                <SidebarMenu>
                  {q1MenuItems.map((item, index) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to={item.url}
                          end={item.url === "/"}
                          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground/70 transition-all duration-200 hover:bg-white/10 hover:text-sidebar-foreground hover:pl-4"
                          activeClassName="bg-white/15 text-sidebar-foreground font-medium shadow-sm"
                          style={{ paddingLeft: `${12 + index * 0}px` }}
                        >
                          <item.icon className="h-4 w-4" />
                          <span className="text-sm">{item.title}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>

          <div className="mt-2" />

          <Collapsible open={isOpenQ4} onOpenChange={setIsOpenQ4}>
            <CollapsibleTrigger className="group flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/90 transition-all duration-300 ease-in-out hover:bg-white/10 hover:shadow-md hover:translate-x-0.5">
              <FolderOpen className="h-5 w-5 text-alegra-orange transition-transform duration-300 group-hover:scale-110" />
              <span className="flex-1 text-left">Q4 2025</span>
              <Badge variant="secondary" className="h-5 px-1.5 text-[10px] bg-white/20 text-sidebar-foreground border-0">
                {q4Count}
              </Badge>
              <ChevronDown 
                className="h-4 w-4 transition-transform duration-300 ease-in-out"
                style={{ transform: isOpenQ4 ? "rotate(180deg)" : "rotate(0deg)" }}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="ml-4 mt-1 border-l-2 border-white/20 pl-3 animate-accordion-down origin-top">
              <SidebarGroupContent>
                <SidebarMenu>
                  {q4MenuItems.map((item, index) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to={item.url}
                          end={item.url === "/q4-2025"}
                          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground/70 transition-all duration-200 hover:bg-white/10 hover:text-sidebar-foreground hover:pl-4"
                          activeClassName="bg-white/15 text-sidebar-foreground font-medium shadow-sm"
                          style={{ paddingLeft: `${12 + index * 0}px` }}
                        >
                          <item.icon className="h-4 w-4" />
                          <span className="text-sm">{item.title}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
