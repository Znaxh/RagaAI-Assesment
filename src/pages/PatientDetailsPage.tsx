import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Badge } from "../components/common/Badge";
import { Button } from "../components/common/Button";
import { Card } from "../components/common/Card";
import { Input } from "../components/common/Input";
import { Modal } from "../components/common/Modal";
import { getFilteredPatients, usePatientStore } from "../store/patientStore";

export default function PatientDetailsPage() {
  const { patients, viewMode, setViewMode, filters, setFilter, selectedPatient, selectPatient } = usePatientStore();
  const [page, setPage] = useState(1);
  const filtered = useMemo(() => getFilteredPatients(patients, filters), [patients, filters]);
  const pageItems = filtered.slice((page - 1) * 10, page * 10);

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15, ease: "easeOut" }} className="space-y-4">
      <div className="mono-label">PATIENT_DATABASE</div>
      <Card>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <Input label="SEARCH" placeholder="SEARCH_PATIENTS..." value={filters.search} onChange={(e) => setFilter("search", e.target.value)} />
          <label className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-[0.12em] text-[#6B6B6B]">STATUS_FILTER</span>
            <select
              className="appearance-none rounded-sm border border-border bg-page px-3 py-2 text-xs text-[#A0A0A0] outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue"
              value={filters.status}
              onChange={(e) => setFilter("status", e.target.value as typeof filters.status)}
            >
              <option className="bg-card">All</option>
              <option className="bg-card">Active</option>
              <option className="bg-card">Critical</option>
              <option className="bg-card">Pending</option>
              <option className="bg-card">Discharged</option>
            </select>
          </label>
          <div className="flex items-end gap-2">
            <Button className={viewMode === "grid" ? "border-accent-blue text-accent-blue bg-[#0D1929]" : ""} onClick={() => setViewMode("grid")}>
              [ ▦ GRID_VIEW ]
            </Button>
            <Button className={viewMode === "list" ? "border-accent-blue text-accent-blue bg-[#0D1929]" : ""} onClick={() => setViewMode("list")}>
              [ ☰ LIST_VIEW ]
            </Button>
          </div>
        </div>
      </Card>
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {pageItems.map((p) => (
            <button
              key={p.id}
              onClick={() => selectPatient(p)}
              className="rounded-md border border-border bg-card p-5 text-left transition-all hover:border-accent-blue hover:shadow-[0_0_15px_-5px_#3B6FD4]"
            >
              <div className="text-sm font-bold text-white">{p.name}</div>
              <div className="text-[11px] uppercase text-[#6B6B6B]">{p.department}</div>
              <div className="mt-2">
                <Badge status={p.status} />
              </div>
              <div className="mt-2 text-[11px] text-[#A0A0A0]">{p.doctorAssigned}</div>
              <div className="mt-3 flex items-center gap-3 text-[11px] text-[#6B6B6B]">
                <span>♥ {p.vitals.heartRate}bpm</span>
                <span>O₂ {p.vitals.oxygenSaturation}%</span>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <Card noPadding>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-[#1E1E1E] text-[10px] uppercase tracking-[0.1em] text-[#6B6B6B]">
                  <th className="p-3 text-left">ID</th>
                  <th className="p-3 text-left">PATIENT</th>
                  <th className="p-3 text-left">DEPT</th>
                  <th className="p-3 text-left">STATUS</th>
                  <th className="p-3 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((p) => (
                  <tr key={p.id} className="border-b border-[#1E1E1E]/50 last:border-0 hover:bg-surface">
                    <td className="p-3 text-xs text-[#6B6B6B]">{p.id}</td>
                    <td className="p-3 text-xs font-medium text-[#A0A0A0]">{p.name}</td>
                    <td className="p-3 text-xs text-[#6B6B6B]">{p.department}</td>
                    <td className="p-3">
                      <Badge status={p.status} />
                    </td>
                    <td className="p-3 text-right">
                      <button className="text-xs text-accent-blue hover:underline" onClick={() => selectPatient(p)}>
                        VIEW_RECORD →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="text-[10px] uppercase text-[#6B6B6B]">
          PAGE {page} OF {Math.ceil(filtered.length / 10)} | TOTAL {filtered.length} RECORDS
        </div>
        <div className="flex gap-2">
          <Button disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
            [ PREV ]
          </Button>
          <Button disabled={page * 10 >= filtered.length} onClick={() => setPage((p) => (p * 10 < filtered.length ? p + 1 : p))}>
            [ NEXT ]
          </Button>
        </div>
      </div>
      <Modal open={Boolean(selectedPatient)} onClose={() => selectPatient(null)}>
        {selectedPatient ? (
          <div>
            <div className="flex items-center justify-between border-b border-[#1E1E1E] px-5 py-3">
              <span className="mono-label">PATIENT_RECORD</span>
              <button className="text-[#6B6B6B]" onClick={() => selectPatient(null)}>
                [ × ]
              </button>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-2 gap-4">
                {["name", "department", "doctorAssigned", "diagnosis"].map((k) => (
                  <div key={k} className="border-b border-[#1E1E1E] py-2">
                    <div className="text-[10px] uppercase text-[#6B6B6B]">{k}</div>
                    <div className="text-[13px]">{String(selectedPatient[k as keyof typeof selectedPatient])}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </Modal>
    </motion.div>
  );
}
