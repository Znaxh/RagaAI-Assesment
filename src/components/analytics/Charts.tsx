import { memo } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const axisTick = { fontFamily: "JetBrains Mono", fontSize: 10, fill: "#6B6B6B" };
const tooltipStyle = { background: "#141414", border: "1px solid #2A2A2A", borderRadius: "4px", fontFamily: "JetBrains Mono", fontSize: "11px" };

export const AdmissionsLineChart = memo(function AdmissionsLineChart({ data }: { data: { month: string; admissions: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1E1E1E" vertical={false} />
        <XAxis dataKey="month" tick={axisTick} axisLine={{ stroke: "#2A2A2A" }} tickLine={false} />
        <YAxis tick={axisTick} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: "#2A2A2A" }} />
        <Line type="monotone" dataKey="admissions" stroke="#3B6FD4" strokeWidth={1.5} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
});

export const StatusDonutChart = memo(function StatusDonutChart({ data }: { data: { status: string; count: number; color: string }[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie data={data} dataKey="count" nameKey="status" innerRadius="60%" outerRadius="82%" stroke="none">
          {data.map((entry) => <Cell key={entry.status} fill={entry.color} />)}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} />
      </PieChart>
    </ResponsiveContainer>
  );
});

export const DepartmentBarChart = memo(function DepartmentBarChart({ data }: { data: { department: string; count: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" stroke="#1E1E1E" horizontal={false} />
        <XAxis type="number" tick={axisTick} axisLine={false} tickLine={false} />
        <YAxis dataKey="department" type="category" tick={axisTick} axisLine={false} tickLine={false} width={90} />
        <Tooltip contentStyle={tooltipStyle} />
        <Bar dataKey="count" fill="#3B6FD4" radius={[2, 2, 2, 2]} />
      </BarChart>
    </ResponsiveContainer>
  );
});

export const MonthlyAreaChart = memo(function MonthlyAreaChart({ data }: { data: { month: string; admissions: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1E1E1E" vertical={false} />
        <XAxis dataKey="month" tick={axisTick} axisLine={{ stroke: "#2A2A2A" }} tickLine={false} />
        <YAxis tick={axisTick} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={tooltipStyle} />
        <Area dataKey="admissions" stroke="#3B6FD4" fill="#0D1929" fillOpacity={1} />
      </AreaChart>
    </ResponsiveContainer>
  );
});
