import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/common/Button";
import { Input } from "../components/common/Input";
import { useAuthStore } from "../store/authStore";
import { sendLocalNotification } from "../services/notificationService";

export default function LoginPage() {
  const [email, setEmail] = useState("demo@healthcare.com");
  const [password, setPassword] = useState("Demo@1234");
  const { setUser, setError, error } = useAuthStore();
  const navigate = useNavigate();

  const onLogin = () => {
    if (email === "demo@healthcare.com" && password === "Demo@1234") {
      setError(null);
      setUser({ uid: "demo-user", email, displayName: "Dr. User" });
      sendLocalNotification("HEALTH_OS ACCESS GRANTED", "Welcome back. 3 critical alerts require attention.");
      navigate("/dashboard");
    } else setError("Invalid credentials");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-page p-4">
      <div className="w-full max-w-[400px]">
        <div className="mb-6 text-center">
          <div className="mono-label text-white">HEALTH_OS</div>
          <div className="mt-2 text-[10px] text-[#6B6B6B]">SECURE CLINICAL INTELLIGENCE PLATFORM</div>
        </div>
        <div className="rounded-md border border-border bg-card p-10">
          <div className="mono-label">AUTHENTICATION_REQUIRED</div>
          <div className="my-4 h-px bg-[#1E1E1E]" />
          <div className="space-y-3">
            <Input label="EMAIL_ADDRESS" placeholder="demo@healthcare.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input label="ACCESS_KEY" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} error={error ?? undefined} />
            <Button className="w-full" onClick={onLogin}>[ AUTHENTICATE ]</Button>
          </div>
          <div className="mt-4 rounded-md border border-[#1E3A5F] bg-[#0D1929] p-3 text-[11px] text-[#A0A0A0]">
            DEMO_ACCESS: demo@healthcare.com / Demo@1234
          </div>
        </div>
      </div>
    </div>
  );
}
