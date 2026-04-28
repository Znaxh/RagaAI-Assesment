import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { patients } from "../services/mockData";
import { sendLocalNotification } from "../services/notificationService";
import type { Notification, Patient } from "../types";

interface UiState {
  sidebarOpen: boolean;
  notifications: Notification[];
  trash: Notification[];
  unreadCount: number;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  addNotification: (notification: Notification) => void;
  markAsRead: (id: string) => void;
  markAsUnread: (id: string) => void;
  markAllAsRead: () => void;
  moveToTrash: (id: string) => void;
  restoreFromTrash: (id: string) => void;
  clearAll: () => void;
  emptyTrash: () => void;
  simulateCriticalAlert: () => void;
}

export const useUiStore = create<UiState>()(
  persist(
    (set, get) => ({
      sidebarOpen: true,
      notifications: [],
      trash: [],
      unreadCount: 0,
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
      addNotification: (notification) =>
        set((state) => ({
          notifications: [notification, ...state.notifications],
          unreadCount: state.unreadCount + 1,
        })),
      markAsRead: (id) =>
        set((state) => {
          const notifications = state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
          return { notifications, unreadCount: notifications.filter((n) => !n.read).length };
        }),
      markAsUnread: (id) =>
        set((state) => {
          const notifications = state.notifications.map((n) => (n.id === id ? { ...n, read: false } : n));
          return { notifications, unreadCount: notifications.filter((n) => !n.read).length };
        }),
      markAllAsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
          unreadCount: 0,
        })),
      moveToTrash: (id) =>
        set((state) => {
          const notification = state.notifications.find((n) => n.id === id);
          if (!notification) return state;
          const notifications = state.notifications.filter((n) => n.id !== id);
          return {
            notifications,
            trash: [notification, ...state.trash],
            unreadCount: notifications.filter((n) => !n.read).length,
          };
        }),
      restoreFromTrash: (id) =>
        set((state) => {
          const notification = state.trash.find((n) => n.id === id);
          if (!notification) return state;
          const trash = state.trash.filter((n) => n.id !== id);
          const notifications = [notification, ...state.notifications];
          return {
            notifications,
            trash,
            unreadCount: notifications.filter((n) => !n.read).length,
          };
        }),
      clearAll: () =>
        set((state) => ({
          trash: [...state.notifications, ...state.trash],
          notifications: [],
          unreadCount: 0,
        })),
      emptyTrash: () => set({ trash: [] }),
      simulateCriticalAlert: () => {
        const criticalPatients: Patient[] = patients.filter((p) => p.status === "Critical");
        const patient = criticalPatients[Math.floor(Math.random() * criticalPatients.length)];
        if (!patient) return;
        const notification: Notification = {
          id: crypto.randomUUID(),
          title: "CRITICAL_ALERT",
          message: `${patient.name} — vitals below threshold. Immediate review required.`,
          type: "critical",
          timestamp: new Date().toISOString(),
          read: false,
          patientId: patient.id,
        };
        get().addNotification(notification);
        sendLocalNotification("CRITICAL_ALERT: PATIENT AT RISK", notification.message);
      },
    }),
    {
      name: "ui-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
