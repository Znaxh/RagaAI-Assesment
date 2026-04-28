import { create } from "zustand";
import { patients as seededPatients } from "../services/mockData";
import type { Patient, PatientFilters, ViewMode } from "../types";

interface PatientState {
  patients: Patient[];
  selectedPatient: Patient | null;
  viewMode: ViewMode;
  filters: PatientFilters;
  isLoading: boolean;
  setPatients: (patients: Patient[]) => void;
  selectPatient: (patient: Patient | null) => void;
  clearSelection: () => void;
  setViewMode: (viewMode: ViewMode) => void;
  setFilter: <K extends keyof PatientFilters>(key: K, value: PatientFilters[K]) => void;
  resetFilters: () => void;
}

const defaultFilters: PatientFilters = {
  search: "",
  status: "All",
  department: "All",
  sortBy: "name",
  sortOrder: "asc",
};

export const usePatientStore = create<PatientState>((set) => ({
  patients: seededPatients,
  selectedPatient: null,
  viewMode: "grid",
  filters: defaultFilters,
  isLoading: false,
  setPatients: (patients) => set({ patients }),
  selectPatient: (selectedPatient) => set({ selectedPatient }),
  clearSelection: () => set({ selectedPatient: null }),
  setViewMode: (viewMode) => set({ viewMode }),
  setFilter: (key, value) => set((state) => ({ filters: { ...state.filters, [key]: value } })),
  resetFilters: () => set({ filters: defaultFilters }),
}));

export const getFilteredPatients = (patients: Patient[], filters: PatientFilters) => {
  const searched = patients.filter((patient) => {
    const matchesSearch = patient.name.toLowerCase().includes(filters.search.toLowerCase()) || patient.id.toLowerCase().includes(filters.search.toLowerCase());
    const matchesStatus = filters.status === "All" || patient.status === filters.status;
    const matchesDepartment = filters.department === "All" || patient.department === filters.department;
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  return searched.sort((a, b) => {
    const factor = filters.sortOrder === "asc" ? 1 : -1;
    if (filters.sortBy === "admittedDate") return factor * (new Date(a.admittedDate).getTime() - new Date(b.admittedDate).getTime());
    return factor * String(a[filters.sortBy]).localeCompare(String(b[filters.sortBy]));
  });
};
