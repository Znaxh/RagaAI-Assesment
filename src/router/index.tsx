import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "../components/layout/AppShell";
import { Spinner } from "../components/common/Spinner";
import { useAuthStore } from "../store/authStore";

const LoginPage = lazy(() => import("../pages/LoginPage"));
const DashboardPage = lazy(() => import("../pages/DashboardPage"));
const AnalyticsPage = lazy(() => import("../pages/AnalyticsPage"));
const PatientDetailsPage = lazy(() => import("../pages/PatientDetailsPage"));

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { loading, user } = useAuthStore();
  if (loading) return <div className="flex min-h-screen items-center justify-center bg-page"><Spinner label="AUTHENTICATING..." /></div>;
  if (!user) return <Navigate to="/login" replace />;
  return <AppShell>{children}</AppShell>;
}

export function AppRouter() {
  const user = useAuthStore((s) => s.user);
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-page"><Spinner label="LOADING_MODULE..." /></div>}>
      <Routes>
        <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
        <Route path="/patients" element={<ProtectedRoute><PatientDetailsPage /></ProtectedRoute>} />
      </Routes>
    </Suspense>
  );
}
