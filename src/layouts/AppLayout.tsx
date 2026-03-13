import { Outlet } from "react-router-dom";
import { BottomNav } from "@/components/BottomNav";
import { DesktopSidebar } from "@/components/DesktopSidebar";

export default function AppLayout() {
  return (
    <div className="min-h-screen flex w-full">
      <DesktopSidebar />
      <main className="flex-1 p-4 lg:p-8 max-w-4xl mx-auto w-full">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
