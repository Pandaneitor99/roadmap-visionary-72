import { useState } from "react";
import { LayoutDashboard, Target, Lightbulb, CalendarDays, Smartphone, ChevronDown, FolderOpen } from "lucide-react";
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

export function AppSidebar() {
  const location = useLocation();
  const isQ1Route = q1MenuItems.some(item => 
    item.url === "/" ? location.pathname === "/" : location.pathname.startsWith(item.url)
  );
  const [isOpen, setIsOpen] = useState(isQ1Route);

  return (
    <Sidebar className="border-r-0">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Smartphone className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-sidebar-foreground">TMD Mobile</h1>
            <p className="text-xs text-sidebar-foreground/60">Roadmap 2026</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground">
              <FolderOpen className="h-5 w-5 text-alegra-orange" />
              <span className="flex-1 text-left">Q1 2026</span>
              <ChevronDown 
                className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} 
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="ml-4 mt-1 border-l border-sidebar-border pl-2">
              <SidebarGroupContent>
                <SidebarMenu>
                  {q1MenuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to={item.url}
                          end={item.url === "/"}
                          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
                          activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                        >
                          <item.icon className="h-5 w-5" />
                          <span>{item.title}</span>
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
