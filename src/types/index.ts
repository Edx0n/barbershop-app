export type AppointmentStatus = 'scheduled' | 'completed' | 'cancelled' | 'no-show';

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  createdAt: Date;
  totalVisits: number;
  lastVisit?: Date;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
}

export interface Barber {
  id: string;
  name: string;
  phone: string;
  email: string;
  specialty: string;
  isActive: boolean;
}

export interface Appointment {
  id: string;
  customerId: string;
  barberId: string;
  serviceId: string;
  date: Date;
  status: AppointmentStatus;
  notes?: string;
  createdAt: Date;
}

