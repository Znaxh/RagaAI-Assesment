export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  bloodType: "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-";
  diagnosis: string;
  status: "Active" | "Discharged" | "Critical" | "Pending";
  admittedDate: string;
  doctorAssigned: string;
  department: string;
  contactNumber: string;
  email: string;
  vitals: {
    heartRate: number;
    bloodPressure: string;
    temperature: number;
    oxygenSaturation: number;
  };
  lastVisit: string;
}

export interface AnalyticsData {
  totalPatients: number;
  activePatients: number;
  criticalCases: number;
  dischargedThisMonth: number;
  admissionsOverTime: { month: string; admissions: number }[];
  departmentBreakdown: { department: string; count: number }[];
  statusDistribution: { status: string; count: number; color: string }[];
  weeklyTrend: { day: string; patients: number; discharges: number }[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "critical" | "success";
  timestamp: string;
  read: boolean;
  patientId?: string;
}

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

export type ViewMode = "grid" | "list";

export interface PatientFilters {
  search: string;
  status: Patient["status"] | "All";
  department: string;
  sortBy: "name" | "admittedDate" | "status";
  sortOrder: "asc" | "desc";
}
