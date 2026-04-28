import { useEffect, useState } from "react";
import { NotificationBell } from "../notifications/NotificationBell";
import { NotificationPanel } from "../notifications/NotificationPanel";
import { useUiStore } from "../../store/uiStore";
import { Menu } from "lucide-react";

export function Navbar({ label }: { label: string }) {
  const [time, setTime] = useState(new Date());
  const [open, setOpen] = useState(false);
  const { unreadCount, toggleSidebar } = useUiStore();

  useEffect(() => {
    const i = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <header className="relative flex h-12 items-center justify-between border-b border-[#1E1E1E] bg-page px-5">
      <div className="flex items-center gap-3">
        <button className="text-[#6B6B6B] hover:text-white md:hidden" onClick={toggleSidebar}>
          <Menu size={18} />
        </button>
        <span className="mono-label hidden sm:inline-block">{label}</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-[10px] text-[#6B6B6B] md:text-xs">{time.toLocaleTimeString("en-GB")}</span>
        <NotificationBell unreadCount={unreadCount} onClick={() => setOpen((p) => !p)} />
        <span className="hidden text-xs text-[#6B6B6B] lg:inline-block">[ USER ONLINE ]</span>
      </div>
      <NotificationPanel open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
