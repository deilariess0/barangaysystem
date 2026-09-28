import type { AppData } from '../types';

// ==========================================
// Constants
// ==========================================

const today = new Date().toISOString().slice(0, 10);

// ==========================================
// Seed Data
// ==========================================

export const seedData: AppData = {
  
  // ------------------------------------------
  // Residents
  // ------------------------------------------
  residents: [
    {
      id: 'RES-1001',
      firstName: 'Juan',
      lastName: 'Dela Cruz',
      birthDate: '1990-03-14',
      sex: 'Male',
      civilStatus: 'Married',
      phone: '09171234567',
      email: 'juan@example.com',
      purok: 'Purok 1',
      streetAddress: 'Mabini Street',
      occupation: 'Driver',
      voterStatus: 'Registered',
      householdId: 'HH-001',
      status: 'Active',
      createdAt: today
    },
    {
      id: 'RES-1002',
      firstName: 'Maria',
      lastName: 'Santos',
      birthDate: '1988-07-22',
      sex: 'Female',
      civilStatus: 'Married',
      phone: '09181234567',
      purok: 'Purok 2',
      streetAddress: 'Rizal Street',
      occupation: 'Vendor',
      voterStatus: 'Registered',
      householdId: 'HH-002',
      status: 'Active',
      createdAt: today
    },
    {
      id: 'RES-1003',
      firstName: 'Ana',
      lastName: 'Reyes',
      birthDate: '2004-11-05',
      sex: 'Female',
      civilStatus: 'Single',
      phone: '09981234567',
      purok: 'Purok 3',
      streetAddress: 'Bonifacio Street',
      occupation: 'Student',
      voterStatus: 'Registered',
      householdId: 'HH-003',
      status: 'Active',
      createdAt: today
    },
    {
      id: 'RES-1004',
      firstName: 'Pedro',
      lastName: 'Garcia',
      birthDate: '1970-02-10',
      sex: 'Male',
      civilStatus: 'Widowed',
      phone: '09271234567',
      purok: 'Purok 1',
      streetAddress: 'Sampaguita Road',
      occupation: 'Farmer',
      voterStatus: 'Not registered',
      householdId: 'HH-001',
      status: 'Active',
      createdAt: today
    },
    {
      id: 'RES-1005',
      firstName: 'Liza',
      lastName: 'Mendoza',
      birthDate: '1998-09-18',
      sex: 'Female',
      civilStatus: 'Single',
      phone: '09381234567',
      purok: 'Purok 4',
      streetAddress: 'Bonifacio Street',
      occupation: 'Teacher',
      voterStatus: 'Registered',
      householdId: 'HH-004',
      status: 'Active',
      createdAt: today
    }
  ],

  // ------------------------------------------
  // Households
  // ------------------------------------------
  households: [
    {
      id: 'HH-001',
      householdNo: 'HH-001',
      headResidentId: 'RES-1001',
      purok: 'Purok 1',
      address: 'Mabini Street',
      members: 2,
      createdAt: today
    },
    {
      id: 'HH-002',
      householdNo: 'HH-002',
      headResidentId: 'RES-1002',
      purok: 'Purok 2',
      address: 'Rizal Street',
      members: 1,
      createdAt: today
    },
    {
      id: 'HH-003',
      householdNo: 'HH-003',
      headResidentId: 'RES-1003',
      purok: 'Purok 3',
      address: 'Bonifacio Street',
      members: 1,
      createdAt: today
    },
    {
      id: 'HH-004',
      householdNo: 'HH-004',
      headResidentId: 'RES-1005',
      purok: 'Purok 4',
      address: 'Bonifacio Street',
      members: 1,
      createdAt: today
    }
  ],

  // ------------------------------------------
  // Service Requests
  // ------------------------------------------
  requests: [
    {
      id: 'REQ-2026-041',
      residentId: 'RES-1001',
      service: 'Barangay Clearance',
      purpose: 'Employment',
      date: today,
      status: 'Pending',
      assignedTo: 'Secretary',
      fee: 50,
      createdAt: today
    },
    {
      id: 'REQ-2026-042',
      residentId: 'RES-1002',
      service: 'Certificate of Residency',
      purpose: 'School enrollment',
      date: today,
      status: 'In review',
      assignedTo: 'Secretary',
      fee: 30,
      createdAt: today
    },
    {
      id: 'REQ-2026-043',
      residentId: 'RES-1003',
      service: 'Certificate of Indigency',
      purpose: 'Medical assistance',
      date: today,
      status: 'Approved',
      assignedTo: 'Barangay Staff',
      fee: 0,
      createdAt: today
    }
  ],

  // ------------------------------------------
  // Announcements
  // ------------------------------------------
  announcements: [
    {
      id: 'ANN-001',
      title: 'Barangay Assembly Meeting',
      category: 'Community',
      body: 'All residents are invited to attend the community assembly at the barangay hall.',
      date: today,
      status: 'Published'
    },
    {
      id: 'ANN-002',
      title: 'Community Health Checkup',
      category: 'Health',
      body: 'Free basic health screening at the covered court. Bring a valid ID.',
      date: today,
      status: 'Published'
    },
    {
      id: 'ANN-003',
      title: 'Garbage Collection Schedule',
      category: 'Advisory',
      body: 'Please follow the posted collection schedule and segregate waste properly.',
      date: today,
      status: 'Draft'
    }
  ],

  // ------------------------------------------
  // Complaints
  // ------------------------------------------
  complaints: [
    {
      id: 'CMP-001',
      residentName: 'Juan Dela Cruz',
      category: 'Noise complaint',
      location: 'Purok 3',
      details: 'Reported excessive noise during late hours.',
      date: today,
      status: 'Under review'
    }
  ],

  // ------------------------------------------
  // Payments
  // ------------------------------------------
  payments: [
    {
      id: 'PAY-001',
      residentName: 'Juan Dela Cruz',
      service: 'Barangay Clearance',
      amount: 50,
      method: 'Cash',
      date: today,
      status: 'Paid'
    },
    {
      id: 'PAY-002',
      residentName: 'Maria Santos',
      service: 'Certificate of Residency',
      amount: 30,
      method: 'Cash',
      date: today,
      status: 'Pending'
    }
  ]

};