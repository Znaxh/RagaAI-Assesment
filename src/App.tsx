import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppRouter } from "./router";
import { auth, onAuthStateChanged } from "./services/firebase";
import { registerServiceWorker, requestNotificationPermission } from "./services/notificationService";
import { useAuthStore } from "./store/authStore";

const queryClient = new QueryClient();

export default function App() {
  const { setUser, setLoading } = useAuthStore();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user ? { uid: user.uid, email: user.email, displayName: user.displayName } : null);
      setLoading(false);
    });
    registerServiceWorker();
    requestNotificationPermission();
    return unsub;
  }, [setLoading, setUser]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
