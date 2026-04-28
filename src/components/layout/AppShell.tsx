import { useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import type { ReactNode } from "react";

export function AppShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const pageLabel = pathname === "/dashboard" ? "DASHBOARD" : pathname === "/analytics" ? "ANALYTICS_ENGINE" : "PATIENT_DATABASE";
  return (
    <div className="flex min-h-screen bg-page text-white">
      <Sidebar />
      <div className="flex-1 overflow-hidden">
        <Navbar label={pageLabel} />
        <main className="h-[calc(100vh-48px)] overflow-auto p-4 md:p-8 lg:p-12">{children}</main>
      </div>
    </div>
  );
}
