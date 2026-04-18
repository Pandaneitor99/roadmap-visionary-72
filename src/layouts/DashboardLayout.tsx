import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Menu } from "lucide-react";
import alegraLogo from "@/assets/alegra-logo.png";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 overflow-auto">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <SidebarTrigger>
              <Menu className="h-5 w-5" />
            </SidebarTrigger>
            <div className="flex-1" />
            <img
              src={alegraLogo}
              alt="Alegra"
              className="h-6 w-auto select-none"
              loading="eager"
              draggable={false}
            />
          </header>
          <div className="p-6">
            <Breadcrumbs />
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
