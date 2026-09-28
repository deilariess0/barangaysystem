// ==========================================
// Residents
// ==========================================

export type ResidentStatus = 'Active' | 'Moved' | 'Deceased';

export interface Resident {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  birthDate: string;
  sex: 'Male' | 'Female' | 'Other';
  civilStatus: string;
  phone: string;
  email?: string;
  purok: string;
  streetAddress: string;
  occupation?: string;
  voterStatus: 'Registered' | 'Not registered' | 'Unknown';
  householdId?: string;
  status: ResidentStatus;
  createdAt: string;
}

// ==========================================
// Households
// ==========================================

export interface Household {
  id: string;
  householdNo: string;
  headResidentId: string;
  purok: string;
  address: string;
  members: number;
  createdAt: string;
}

// ==========================================
// Service Requests
// ==========================================

export type RequestStatus = 'Pending' | 'In review' | 'Approved' | 'Rejected' | 'Completed';

export interface ServiceRequest {
  id: string;
  residentId: string;
  service: string;
  purpose: string;
  date: string;
  status: RequestStatus;
  assignedTo: string;
  fee: number;
  createdAt: string;
}

// ==========================================
// Announcements
// ==========================================

export interface Announcement {
  id: string;
  title: string;
  category: string;
  body: string;
  date: string;
  status: 'Published' | 'Draft';
}

// ==========================================
// Complaints
// ==========================================

export interface Complaint {
  id: string;
  residentName: string;
  category: string;
  location: string;
  details: string;
  date: string;
  status: 'Submitted' | 'Under review' | 'Resolved' | 'Closed';
}

// ==========================================
// Payments
// ==========================================

export interface Payment {
  id: string;
  residentName: string;
  service: string;
  amount: number;
  method: string;
  date: string;
  status: 'Paid' | 'Pending' | 'Refunded';
}

// ==========================================
// Application Data Root
// ==========================================

export interface AppData {
  residents: Resident[];
  households: Household[];
  requests: ServiceRequest[];
  announcements: Announcement[];
  complaints: Complaint[];
  payments: Payment[];
}

// Utility type to reference any collection key (e.g., 'residents', 'households')
export type DataKey = keyof AppData;