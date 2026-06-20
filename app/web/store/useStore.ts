import { create } from 'zustand';

export type Role = 'patient' | 'hospital' | 'pharmacy' | 'insurance';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
}

export interface RecordItem {
  id: string;
  title: string;
  category: string;
  issuer: string;
  date: string;
  encrypted: boolean;
}

export interface ConsentGrant {
  id: string;
  nodeId: string;
  requester: string;
  purpose: string;
  scope: string[];
  status: 'pending' | 'approved' | 'revoked' | 'expired' | 'delegated';
  expiry: string;
  date: string;
}

export interface Prescription {
  id: string;
  medication: string;
  dosage: string;
  doctor: string;
  hospital: string;
  issueDate: string;
  expiry: string;
  status: 'active' | 'dispensed' | 'expired' | 'flagged';
  refills: number;
  instructions: string;
  fraudScore: number;
}

export interface AuditEvent {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'security' | 'access' | 'medical' | 'system';
}

interface AppState {
  // Auth
  user: User | null;
  login: (email: string) => void;
  logout: () => void;

  // Vault
  records: RecordItem[];
  uploadRecord: (record: Omit<RecordItem, 'id'>) => void;
  deleteRecord: (id: string) => void;

  // Consent
  grants: ConsentGrant[];
  approveConsent: (id: string) => void;
  revokeConsent: (id: string) => void;

  // Prescriptions
  prescriptions: Prescription[];
  issuePrescription: (prescription: Omit<Prescription, 'id'>) => void;
  dispensePrescription: (id: string) => void;

  // Audit
  auditLogs: AuditEvent[];
  logEvent: (event: Omit<AuditEvent, 'id' | 'time'>) => void;
}

const generateId = () => Math.random().toString(36).substring(2, 9);

export const useStore = create<AppState>((set) => ({
  // Auth
  user: null,
  login: (email) => {
    let role: Role = 'patient';
    let name = 'John Doe';
    if (email.includes('hospital')) { role = 'hospital'; name = 'Apollo Demo Hospital'; }
    else if (email.includes('pharmacy')) { role = 'pharmacy'; name = 'Walgreens Pharmacy'; }
    else if (email.includes('insurance')) { role = 'insurance'; name = 'Aetna Health'; }

    set({ user: { id: generateId(), email, name, role } });
  },
  logout: () => set({ user: null }),

  // Vault Initial Data
  records: [
    { id: 'REC-101', title: 'Comprehensive Metabolic Panel', category: 'Lab Results', issuer: 'Apollo Labs', date: 'Oct 15, 2026', encrypted: true },
    { id: 'REC-102', title: 'MRI Scan - Lumbar Spine', category: 'Imaging', issuer: 'City Imaging Center', date: 'Sep 22, 2026', encrypted: true },
    { id: 'REC-103', title: 'Vaccination Record', category: 'Immunization', issuer: 'Mercy Clinic', date: 'Aug 10, 2026', encrypted: true }
  ],
  uploadRecord: (record) => set((state) => {
    const newRecord = { ...record, id: `REC-${Math.floor(Math.random() * 900) + 100}` };
    state.logEvent({ title: 'Record Uploaded', description: `Uploaded new record: ${record.title}`, type: 'medical' });
    return { records: [newRecord, ...state.records] };
  }),
  deleteRecord: (id) => set((state) => {
    state.logEvent({ title: 'Record Deleted', description: `Deleted record ID: ${id}`, type: 'security' });
    return { records: state.records.filter(r => r.id !== id) };
  }),

  // Consent Initial Data
  grants: [
    {
      id: "c1",
      nodeId: "hospital",
      requester: "Apollo Demo Hospital",
      purpose: "Consultation",
      scope: ["Lab Reports", "Allergies"],
      status: "approved",
      expiry: "23h 45m",
      date: "2026-06-20",
    },
    {
      id: "c2",
      nodeId: "pharmacy",
      requester: "Walgreens Pharmacy",
      purpose: "Dispense Medication",
      scope: ["Prescriptions"],
      status: "pending",
      expiry: "One Time",
      date: "2026-06-20",
    },
    {
      id: "c3",
      nodeId: "insurance",
      requester: "Blue Cross",
      purpose: "Claim Verification",
      scope: ["Prescriptions", "Lab Reports"],
      status: "expired",
      expiry: "Expired",
      date: "2026-05-15",
    },
  ],
  approveConsent: (id) => set((state) => {
    state.logEvent({ title: 'Consent Approved', description: `Approved access request ${id}`, type: 'access' });
    return {
      grants: state.grants.map(g => g.id === id ? { ...g, status: 'approved' } : g)
    };
  }),
  revokeConsent: (id) => set((state) => {
    state.logEvent({ title: 'Consent Revoked', description: `Revoked access for request ${id}`, type: 'security' });
    return {
      grants: state.grants.map(g => g.id === id ? { ...g, status: 'revoked' } : g)
    };
  }),

  // Prescriptions Initial Data
  prescriptions: [
    {
      id: "rx-1",
      medication: "Amoxicillin",
      dosage: "500mg, 3x daily",
      doctor: "Dr. Sarah Jenkins",
      hospital: "Apollo Hospital",
      issueDate: "2026-06-20",
      expiry: "2026-06-30",
      status: "active",
      refills: 0,
      instructions: "Take with food.",
      fraudScore: 99,
    },
    {
      id: "rx-2",
      medication: "Lisinopril",
      dosage: "10mg, 1x daily",
      doctor: "Dr. Michael Chen",
      hospital: "Mercy Clinic",
      issueDate: "2026-05-15",
      expiry: "2026-11-15",
      status: "dispensed",
      refills: 2,
      instructions: "Take in the morning.",
      fraudScore: 98,
    },
    {
      id: "rx-3",
      medication: "Oxycodone",
      dosage: "5mg, as needed",
      doctor: "Dr. Gregory House",
      hospital: "Princeton Plainsboro",
      issueDate: "2026-06-19",
      expiry: "2026-06-26",
      status: "flagged",
      refills: 0,
      instructions: "Pain management.",
      fraudScore: 45,
    },
  ],
  issuePrescription: (rx) => set((state) => {
    const newRx = { ...rx, id: `RX-${Math.floor(Math.random() * 900) + 100}` };
    state.logEvent({ title: 'Prescription Issued', description: `Issued ${rx.medication}`, type: 'medical' });
    return { prescriptions: [newRx, ...state.prescriptions] };
  }),
  dispensePrescription: (id) => set((state) => {
    state.logEvent({ title: 'Prescription Dispensed', description: `Dispensed RX ${id}`, type: 'medical' });
    return {
      prescriptions: state.prescriptions.map(p => p.id === id ? { ...p, status: 'dispensed' } : p)
    };
  }),

  // Audit Logs
  auditLogs: [
    { id: 'AUD-001', title: 'System Login', description: 'Successful authentication from new device', time: '1 hour ago', type: 'system' }
  ],
  logEvent: (event) => set((state) => {
    const newLog = { ...event, id: `AUD-${Math.floor(Math.random() * 9000) + 1000}`, time: 'Just now' };
    return { auditLogs: [newLog, ...state.auditLogs] };
  })
}));
