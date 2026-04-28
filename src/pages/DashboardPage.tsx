import { motion } from "framer-motion";
import { MetricCard } from "../components/analytics/MetricCard";
import { AdmissionsLineChart, StatusDonutChart } from "../components/analytics/Charts";
import { Card } from "../components/common/Card";
import { DotGrid } from "../components/common/DotGrid";
import { LoadingSkeleton } from "../components/common/LoadingSkeleton";
import { ScanTimeline } from "../components/common/ScanTimeline";
import { Badge } from "../components/common/Badge";
import { Button } from "../components/common/Button";
import { analyticsData, patients } from "../services/mockData";
import { useUiStore } from "../store/uiStore";

export default function DashboardPage() {
  const simulateCriticalAlert = useUiStore((s) => s.simulateCriticalAlert);
  const critical = patients.filter((p) => p.status === "Critical").length;
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15, ease: "easeOut" }} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <MetricCard label="PATIENT_INDEX" value={analyticsData.activePatients} sublabel="PATIENTS MONITORED" rightContent={<LoadingSkeleton />} />
        <MetricCard label="CRITICAL_WATCH" value={critical} sublabel="CRITICAL CASES" rightContent={<DotGrid total={20} filled={critical} />} isLive />
      </div>
      <MetricCard
        label="ADMISSION_TIMELINE"
        value={analyticsData.totalPatients}
        sublabel="ADMISSIONS TODAY"
        rightContent={
          <div className="min-w-[260px]">
            <ScanTimeline
              startTime="00:00:00"
              endTime="00:24:12"
              currentTime="08:14.329"
              isScanning
              markers={[
                { start: 28, end: 42, color: "#C49A2A" },
                { start: 58, end: 75, color: "#3B6FD4" },
              ]}
            />
          </div>
        }
      />
      <Button onClick={simulateCriticalAlert}>[ ⚠ TRIGGER_TEST_ALERT ]</Button>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
        <Card label="ADMISSION_TREND" className="xl:col-span-3"><AdmissionsLineChart data={analyticsData.admissionsOverTime} /></Card>
        <Card label="STATUS_DISTRIBUTION" className="xl:col-span-2"><StatusDonutChart data={analyticsData.statusDistribution} /></Card>
      </div>
      <Card label="RECENT_ADMISSIONS" noPadding>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-[10px] uppercase tracking-[0.1em] text-[#6B6B6B]"><tr className="border-b border-[#1E1E1E]"><th className="p-3">ID</th><th className="p-3">PATIENT</th><th className="p-3">DEPT</th><th className="p-3">STATUS</th><th className="p-3">ACTION</th></tr></thead>
            <tbody>{patients.slice(0, 5).map((p, i) => <tr key={p.id} className={`${i % 2 ? "bg-[#111111]" : "bg-card"} hover:bg-surface`}><td className="p-3 text-xs text-[#6B6B6B]">{p.id}</td><td className="p-3 text-xs text-[#A0A0A0]">{p.name}</td><td className="p-3 text-xs text-[#A0A0A0]">{p.department}</td><td className="p-3"><Badge status={p.status} /></td><td className="p-3 text-xs text-accent-blue cursor-pointer">VIEW →</td></tr>)}</tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
