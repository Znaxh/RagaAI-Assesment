import { AnimatePresence, motion } from "framer-motion";
import { useUiStore } from "../../store/uiStore";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useState } from "react";
import { Trash2, RotateCcw, Check } from "lucide-react";

export function NotificationPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { notifications, trash, markAsRead, markAsUnread, moveToTrash, restoreFromTrash, markAllAsRead, clearAll, emptyTrash } = useUiStore();
  const [tab, setTab] = useState<"active" | "trash">("active");
  const ref = useClickOutside(onClose);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="absolute right-0 top-12 z-30 w-[400px] rounded-md border border-border bg-card shadow-2xl"
        >
          <div className="flex border-b border-border">
            <button
              onClick={() => setTab("active")}
              className={`flex-1 py-2 text-[10px] uppercase tracking-wider ${tab === "active" ? "bg-surface text-white" : "text-[#6B6B6B] hover:text-[#A0A0A0]"}`}
            >
              Notifications ({notifications.length})
            </button>
            <button
              onClick={() => setTab("trash")}
              className={`flex-1 py-2 text-[10px] uppercase tracking-wider ${tab === "trash" ? "bg-surface text-white" : "text-[#6B6B6B] hover:text-[#A0A0A0]"}`}
            >
              Trash ({trash.length})
            </button>
          </div>

          <div className="p-3">
            <div className="mb-3 flex justify-between">
              {tab === "active" ? (
                <>
                  <button className="text-[10px] uppercase text-[#A0A0A0] hover:text-white" onClick={markAllAsRead}>
                    [ MARK_ALL_READ ]
                  </button>
                  <button className="text-[10px] uppercase text-[#A0A0A0] hover:text-[#EF4444]" onClick={clearAll}>
                    [ CLEAR_ALL ]
                  </button>
                </>
              ) : (
                <button className="text-[10px] uppercase text-[#A0A0A0] hover:text-[#EF4444]" onClick={emptyTrash}>
                  [ EMPTY_TRASH ]
                </button>
              )}
            </div>

            <div className="max-h-80 overflow-auto pr-1 custom-scrollbar">
              {tab === "active" ? (
                notifications.length > 0 ? (
                  notifications.map((n) => (
                    <div key={n.id} className={`group relative border-b border-[#1E1E1E] py-3 last:border-0 ${n.read ? "opacity-60" : ""}`}>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="text-[10px] font-bold uppercase tracking-tight" style={{ color: n.type === "critical" ? "#EF4444" : "#3B6FD4" }}>
                            {n.title}
                          </div>
                          <div className="mt-1 text-xs leading-relaxed text-[#A0A0A0]">{n.message}</div>
                          <div className="mt-1 text-[10px] text-[#6B6B6B]">{new Date(n.timestamp).toLocaleTimeString()}</div>
                        </div>
                        <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                          <button
                            onClick={() => (n.read ? markAsUnread(n.id) : markAsRead(n.id))}
                            className="rounded bg-[#1E1E1E] p-1 text-[#6B6B6B] hover:text-white"
                            title={n.read ? "Mark as unread" : "Mark as read"}
                          >
                            {n.read ? <RotateCcw size={12} /> : <Check size={12} />}
                          </button>
                          <button onClick={() => moveToTrash(n.id)} className="rounded bg-[#1E1E1E] p-1 text-[#6B6B6B] hover:text-[#EF4444]" title="Delete">
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-8 text-center text-[10px] uppercase text-[#6B6B6B]">No notifications found.</div>
                )
              ) : trash.length > 0 ? (
                trash.map((n) => (
                  <div key={n.id} className="group relative border-b border-[#1E1E1E] py-3 opacity-60 last:border-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="text-[10px] uppercase text-[#6B6B6B]">{n.title}</div>
                        <div className="mt-1 text-xs text-[#6B6B6B] line-through">{n.message}</div>
                      </div>
                      <button onClick={() => restoreFromTrash(n.id)} className="rounded bg-[#1E1E1E] p-1 text-[#6B6B6B] hover:text-white" title="Restore">
                        <RotateCcw size={12} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-[10px] uppercase text-[#6B6B6B]">Trash is empty.</div>
              )}
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
