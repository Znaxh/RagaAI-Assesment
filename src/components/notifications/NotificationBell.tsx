import { Bell } from "lucide-react";

export function NotificationBell({ unreadCount, onClick }: { unreadCount: number; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex items-center gap-1 text-xs text-[#6B6B6B] hover:text-white">
      <Bell size={16} strokeWidth={1.5} />
      <span style={{ color: unreadCount > 0 ? "#EF4444" : "#6B6B6B" }}>{unreadCount > 0 ? "[ ● ]" : "[ ○ ]"}</span>
    </button>
  );
}
