import { motion } from "framer-motion";
import { DepartmentBarChart, MonthlyAreaChart } from "../components/analytics/Charts";
import { MetricCard } from "../components/analytics/MetricCard";
import { Card } from "../components/common/Card";
import { DotGrid } from "../components/common/DotGrid";
import { analyticsData, patients } from "../services/mockData";

export default function AnalyticsPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15, ease: "easeOut" }} className="space-y-6">
      <div className="mono-label">ANALYTICS_ENGINE</div>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-5">
        <MetricCard label="TOTAL_PATIENTS" value={analyticsData.totalPatients} sublabel="REGISTERED" />
        <MetricCard label="AVG_STAY" value="4.2" sublabel="DAYS" />
        <MetricCard label="BED_OCCUPANCY" value="68%" sublabel="CAPACITY" rightContent={<DotGrid total={21} filled={14} />} />
        <MetricCard label="SATISFACTION" value="4.6" sublabel="PATIENT_SCORE" rightContent={<DotGrid total={5} filled={4} cols={5} />} />
        <MetricCard label="RECOVERY_RATE" value="91%" sublabel="THIS MONTH" />
      </div>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card label="DEPT_DISTRIBUTION"><DepartmentBarChart data={analyticsData.departmentBreakdown} /></Card>
        <Card label="MONTHLY_TREND"><MonthlyAreaChart data={analyticsData.admissionsOverTime} /></Card>
      </div>
      <Card label="PATIENT_REGISTRY" noPadding>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-[10px] uppercase tracking-[0.1em] text-[#6B6B6B]">
              <tr className="border-b border-[#1E1E1E]">
                <th className="p-3">ID</th>
                <th className="p-3">PATIENT</th>
                <th className="p-3">STATUS</th>
                <th className="p-3">DOCTOR</th>
                <th className="p-3">ADMITTED</th>
              </tr>
            </thead>
            <tbody>
              {patients.slice(0, 10).map((p) => (
                <tr key={p.id} className="hover:bg-surface">
                  <td className="p-3 text-xs text-[#6B6B6B]">{p.id}</td>
                  <td className="p-3 text-xs text-[#A0A0A0]">{p.name}</td>
                  <td className="p-3 text-xs text-[#A0A0A0]">{p.status}</td>
                  <td className="p-3 text-xs text-[#A0A0A0]">{p.doctorAssigned}</td>
                  <td className="p-3 text-xs text-[#A0A0A0]">{new Date(p.admittedDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
