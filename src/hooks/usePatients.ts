import { useMemo } from "react";
import { getFilteredPatients, usePatientStore } from "../store/patientStore";

export function usePatients() {
  const patients = usePatientStore((s) => s.patients);
  const filters = usePatientStore((s) => s.filters);
  const filteredPatients = useMemo(() => getFilteredPatients(patients, filters), [patients, filters]);
  return { patients, filters, filteredPatients };
}
