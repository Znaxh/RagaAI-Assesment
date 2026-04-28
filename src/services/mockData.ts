import type { AnalyticsData, Patient } from "../types";

const names = [
  "Aarav Singh", "Priya Nair", "Rohan Mehta", "Ananya Sharma", "Vikram Rao",
  "Deepika Patel", "Arjun Kumar", "Kavitha Reddy", "Rahul Gupta", "Sneha Iyer",
  "Karan Malhotra", "Divya Krishnan", "Aditya Joshi", "Pooja Mishra", "Nikhil Bose",
  "Meera Pillai", "Suresh Nambiar", "Riya Desai", "Mohit Agarwal", "Lakshmi Rao",
  "Vivek Sinha", "Nisha Menon", "Abhishek Tiwari", "Swati Chakraborty", "Manish Saxena",
];
const departments = ["Cardiology", "Neurology", "Orthopedics", "Oncology", "Pediatrics", "Emergency"];
const doctors = ["Dr. Priya Sharma", "Dr. Arjun Mehta", "Dr. Kavitha Nair", "Dr. Rohit Verma", "Dr. Sunita Patel", "Dr. Vikram Rao"];
const diagnoses = ["Hypertension", "Migraine", "Fracture", "Leukemia", "Asthma", "Trauma", "Arrhythmia", "Stroke Recovery"];
const bloodTypes: Patient["bloodType"][] = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
const genders: Patient["gender"][] = ["Male", "Female", "Other"];

const statusByIndex = (idx: number): Patient["status"] => {
  if (idx <= 10) return "Active";
  if (idx <= 15) return "Critical";
  if (idx <= 19) return "Pending";
  return "Discharged";
};

const randomDateInLast90Days = (offset: number) => {
  const now = new Date();
  const days = (offset * 7) % 90;
  now.setDate(now.getDate() - days);
  return now.toISOString();
};

const makeVitals = (critical: boolean, seed: number) => ({
  heartRate: critical ? (seed % 2 === 0 ? 112 + (seed % 29) : 42 + (seed % 11)) : 60 + (seed % 41),
  bloodPressure: critical ? (seed % 2 === 0 ? "160/100" : "90/60") : `${110 + (seed % 21)}/${70 + (seed % 16)}`,
  temperature: critical ? Number((38.5 + (seed % 18) * 0.1).toFixed(1)) : Number((36.5 + (seed % 11) * 0.1).toFixed(1)),
  oxygenSaturation: critical ? 88 + (seed % 6) : 95 + (seed % 5),
});

export const patients: Patient[] = Array.from({ length: 25 }, (_, i) => {
  const index = i + 1;
  const status = statusByIndex(index);
  const critical = status === "Critical";
  return {
    id: `PT_${String(index).padStart(4, "0")}`,
    name: names[i],
    age: 24 + ((i * 3) % 53),
    gender: genders[i % genders.length],
    bloodType: bloodTypes[i % bloodTypes.length],
    diagnosis: diagnoses[i % diagnoses.length],
    status,
    admittedDate: randomDateInLast90Days(index),
    doctorAssigned: doctors[i % doctors.length],
    department: departments[i % departments.length],
    contactNumber: `+91-98${100000 + i}`,
    email: names[i].toLowerCase().replace(/\s/g, ".") + "@example.com",
    vitals: makeVitals(critical, index),
    lastVisit: randomDateInLast90Days(index + 3),
  };
});

const statusDistribution = [
  { status: "Active", count: patients.filter((p) => p.status === "Active").length, color: "#22C55E" },
  { status: "Critical", count: patients.filter((p) => p.status === "Critical").length, color: "#EF4444" },
  { status: "Pending", count: patients.filter((p) => p.status === "Pending").length, color: "#E8B84B" },
  { status: "Discharged", count: patients.filter((p) => p.status === "Discharged").length, color: "#6B7280" },
];

export const analyticsData: AnalyticsData = {
  totalPatients: patients.length,
  activePatients: statusDistribution[0].count,
  criticalCases: statusDistribution[1].count,
  dischargedThisMonth: statusDistribution[3].count,
  admissionsOverTime: [
    { month: "Jan", admissions: 14 }, { month: "Feb", admissions: 18 }, { month: "Mar", admissions: 22 },
    { month: "Apr", admissions: 19 }, { month: "May", admissions: 24 }, { month: "Jun", admissions: 25 },
  ],
  departmentBreakdown: departments.map((department) => ({
    department,
    count: patients.filter((p) => p.department === department).length,
  })),
  statusDistribution,
  weeklyTrend: [
    { day: "Mon", patients: 18, discharges: 4 },
    { day: "Tue", patients: 20, discharges: 2 },
    { day: "Wed", patients: 21, discharges: 3 },
    { day: "Thu", patients: 19, discharges: 5 },
    { day: "Fri", patients: 23, discharges: 4 },
    { day: "Sat", patients: 16, discharges: 2 },
    { day: "Sun", patients: 14, discharges: 1 },
  ],
};
