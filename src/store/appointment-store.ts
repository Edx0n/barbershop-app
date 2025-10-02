import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Appointment, AppointmentStatus } from '../types';

interface AppointmentStore {
  appointments: Appointment[];
  addAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt'>) => void;
  updateAppointment: (id: string, appointment: Partial<Appointment>) => void;
  deleteAppointment: (id: string) => void;
  updateAppointmentStatus: (id: string, status: AppointmentStatus) => void;
  getAppointmentById: (id: string) => Appointment | undefined;
  getAppointmentsByDate: (date: Date) => Appointment[];
  getAppointmentsByCustomer: (customerId: string) => Appointment[];
  getAppointmentsByBarber: (barberId: string) => Appointment[];
}

export const useAppointmentStore = create<AppointmentStore>()(
  persist(
    (set, get) => ({
      appointments: [],

      addAppointment: (appointment) =>
        set((state) => ({
          appointments: [
            ...state.appointments,
            {
              ...appointment,
              id: crypto.randomUUID(),
              createdAt: new Date(),
            },
          ],
        })),

      updateAppointment: (id, updates) =>
        set((state) => ({
          appointments: state.appointments.map((appointment) =>
            appointment.id === id ? { ...appointment, ...updates } : appointment
          ),
        })),

      deleteAppointment: (id) =>
        set((state) => ({
          appointments: state.appointments.filter(
            (appointment) => appointment.id !== id
          ),
        })),

      updateAppointmentStatus: (id, status) =>
        set((state) => ({
          appointments: state.appointments.map((appointment) =>
            appointment.id === id ? { ...appointment, status } : appointment
          ),
        })),

      getAppointmentById: (id) => {
        return get().appointments.find((appointment) => appointment.id === id);
      },

      getAppointmentsByDate: (date) => {
        const dateStr = date.toDateString();
        return get().appointments.filter(
          (appointment) => new Date(appointment.date).toDateString() === dateStr
        );
      },

      getAppointmentsByCustomer: (customerId) => {
        return get().appointments.filter(
          (appointment) => appointment.customerId === customerId
        );
      },

      getAppointmentsByBarber: (barberId) => {
        return get().appointments.filter(
          (appointment) => appointment.barberId === barberId
        );
      },
    }),
    {
      name: 'appointment-storage',
    }
  )
);

