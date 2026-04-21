import { useState } from "react";
import { LayoutDashboard, Target, Lightbulb, CalendarDays, Smartphone, ChevronDown, FolderOpen, Trophy, Presentation } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
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

const q2MenuItems = [
  { title: "Dashboard", url: "/q2-2026", icon: LayoutDashboard },
  { title: "OKRs", url: "/q2-2026/okrs", icon: Target },
  { title: "Iniciativas", url: "/q2-2026/iniciativas", icon: Lightbulb },
  { title: "Roadmap", url: "/q2-2026/roadmap", icon: CalendarDays },
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
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const isQ1Route = q1MenuItems.some(item => 
    item.url === "/" ? location.pathname === "/" : location.pathname.startsWith(item.url)
  );
  const isQ2Route = location.pathname.startsWith("/q2-2026");
  const isQ4Route = location.pathname.startsWith("/q4-2025");

  const [isOpenQ1, setIsOpenQ1] = useState(isQ1Route);
  const [isOpenQ2, setIsOpenQ2] = useState(isQ2Route);
  const [isOpenQ4, setIsOpenQ4] = useState(isQ4Route);

  return (
    <Sidebar collapsible="icon" className="border-r-0 backdrop-blur-md bg-sidebar/95">
      <SidebarHeader className={collapsed ? "p-2" : "p-6"}>
        <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
          <div className={`flex shrink-0 items-center justify-center rounded-lg bg-white/20 shadow-lg backdrop-blur-sm ${collapsed ? "h-8 w-8" : "h-10 w-10"}`}>
            <Smartphone className={collapsed ? "h-4 w-4 text-sidebar-foreground" : "h-5 w-5 text-sidebar-foreground"} />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-lg font-bold text-sidebar-foreground">TMD Mobile</h1>
              <p className="text-xs text-sidebar-foreground/60">Roadmap 2026</p>
            </div>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className={collapsed ? "px-1" : ""}>
          {collapsed ? (
            <div className="flex flex-col items-center gap-2 py-2">
              <NavLink
                to="/"
                end
                className="flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold text-sidebar-foreground/80 transition-all hover:bg-white/10 hover:text-sidebar-foreground"
                activeClassName="bg-white/20 text-sidebar-foreground shadow-sm"
              >
                Q1
              </NavLink>
              <NavLink
                to="/q2-2026"
                end
                className="flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold text-sidebar-foreground/80 transition-all hover:bg-white/10 hover:text-sidebar-foreground"
                activeClassName="bg-white/20 text-sidebar-foreground shadow-sm"
              >
                Q2
              </NavLink>
              <NavLink
                to="/q4-2025"
                end
                className="flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold text-sidebar-foreground/80 transition-all hover:bg-white/10 hover:text-sidebar-foreground"
                activeClassName="bg-white/20 text-sidebar-foreground shadow-sm"
              >
                Q4
              </NavLink>
            </div>
          ) : (
            <>
              <Collapsible open={isOpenQ1} onOpenChange={setIsOpenQ1}>
                <CollapsibleTrigger className="group flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/90 transition-all duration-300 ease-in-out hover:bg-white/10 hover:shadow-md hover:translate-x-0.5">
                  <FolderOpen className="h-5 w-5 text-alegra-orange transition-transform duration-300 group-hover:scale-110" />
                  <span className="flex-1 text-left">Q1 2026</span>
                  <ChevronDown
                    className="h-4 w-4 transition-transform duration-300 ease-in-out"
                    style={{ transform: isOpenQ1 ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent className="ml-4 mt-1 border-l-2 border-white/20 pl-3">
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {q1MenuItems.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild>
                            <NavLink
                              to={item.url}
                              end={item.url === "/"}
                              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground/70 transition-all duration-200 hover:bg-white/10 hover:text-sidebar-foreground hover:pl-4"
                              activeClassName="bg-white/15 text-sidebar-foreground font-medium shadow-sm"
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

              <Collapsible open={isOpenQ2} onOpenChange={setIsOpenQ2}>
                <CollapsibleTrigger className="group flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/90 transition-all duration-300 ease-in-out hover:bg-white/10 hover:shadow-md hover:translate-x-0.5">
                  <FolderOpen className="h-5 w-5 text-alegra-orange transition-transform duration-300 group-hover:scale-110" />
                  <span className="flex-1 text-left">Q2 2026</span>
                  <ChevronDown
                    className="h-4 w-4 transition-transform duration-300 ease-in-out"
                    style={{ transform: isOpenQ2 ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent className="ml-4 mt-1 border-l-2 border-white/20 pl-3">
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {q2MenuItems.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild>
                            <NavLink
                              to={item.url}
                              end={item.url === "/q2-2026"}
                              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground/70 transition-all duration-200 hover:bg-white/10 hover:text-sidebar-foreground hover:pl-4"
                              activeClassName="bg-white/15 text-sidebar-foreground font-medium shadow-sm"
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
                  <ChevronDown
                    className="h-4 w-4 transition-transform duration-300 ease-in-out"
                    style={{ transform: isOpenQ4 ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent className="ml-4 mt-1 border-l-2 border-white/20 pl-3">
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {q4MenuItems.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild>
                            <NavLink
                              to={item.url}
                              end={item.url === "/q4-2025"}
                              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground/70 transition-all duration-200 hover:bg-white/10 hover:text-sidebar-foreground hover:pl-4"
                              activeClassName="bg-white/15 text-sidebar-foreground font-medium shadow-sm"
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
            </>
          )}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
