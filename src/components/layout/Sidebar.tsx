import { BarChart2, LayoutDashboard, Users, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { useUiStore } from "../../store/uiStore";

const links = [
  { to: "/dashboard", label: "DASHBOARD", icon: LayoutDashboard },
  { to: "/analytics", label: "ANALYTICS", icon: BarChart2 },
  { to: "/patients", label: "PATIENTS", icon: Users },
];

export function Sidebar() {
  const { sidebarOpen, toggleSidebar } = useUiStore();
  const { logout } = useAuthStore();
  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden" 
          onClick={toggleSidebar}
        />
      )}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 flex h-screen flex-col border-r border-[#1E1E1E] bg-[#0D0D0D] transition-all duration-200 md:relative ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`} 
        style={{ width: sidebarOpen ? 220 : 52 }}
      >
        <div className="border-b border-[#1E1E1E] p-4">
          <div className="text-[13px] font-bold text-white">{sidebarOpen ? "HEALTH_OS" : "HO"}</div>
        </div>
        <nav className="flex-1 py-2">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={label}
              to={to}
              onClick={() => { if (window.innerWidth < 768) toggleSidebar(); }}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 text-[11px] uppercase tracking-[0.08em] ${isActive ? "border-l-2 border-accent-blue bg-[#3B6FD414] text-white" : "text-[#6B6B6B] hover:bg-card hover:text-[#A0A0A0]"}`
              }
            >
              <Icon size={16} strokeWidth={1.5} />
              {sidebarOpen ? label : null}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-[#1E1E1E] p-3">
          <div className="flex flex-col items-center gap-4 md:items-start">
            <div className="text-[10px] uppercase text-[#6B6B6B]">{sidebarOpen ? "DR. USERNAME" : "DR"}</div>
            <div className={`flex w-full flex-col gap-2 ${!sidebarOpen ? "items-center" : ""}`}>
              <button className="text-[10px] uppercase text-[#6B6B6B] hover:text-[#EF4444]" onClick={logout}>
                {sidebarOpen ? "[ EXIT ]" : <X size={14} />}
              </button>
              <button className="hidden text-[10px] uppercase text-[#6B6B6B] hover:text-white md:block" onClick={toggleSidebar}>
                {sidebarOpen ? "[ ‹ ]" : "[ › ]"}
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
