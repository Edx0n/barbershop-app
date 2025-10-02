import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Barber } from '../types';

interface BarberStore {
  barbers: Barber[];
  addBarber: (barber: Omit<Barber, 'id'>) => void;
  updateBarber: (id: string, barber: Partial<Barber>) => void;
  deleteBarber: (id: string) => void;
  getBarberById: (id: string) => Barber | undefined;
  toggleBarberStatus: (id: string) => void;
}

export const useBarberStore = create<BarberStore>()(
  persist(
    (set, get) => ({
      barbers: [
        {
          id: '1',
          name: 'João Silva',
          phone: '(11) 98765-4321',
          email: 'joao@barbershop.com',
          specialty: 'Cortes Clássicos',
          isActive: true,
        },
        {
          id: '2',
          name: 'Pedro Santos',
          phone: '(11) 98765-1234',
          email: 'pedro@barbershop.com',
          specialty: 'Barba e Bigode',
          isActive: true,
        },
      ],

      addBarber: (barber) =>
        set((state) => ({
          barbers: [
            ...state.barbers,
            {
              ...barber,
              id: crypto.randomUUID(),
            },
          ],
        })),

      updateBarber: (id, updates) =>
        set((state) => ({
          barbers: state.barbers.map((barber) =>
            barber.id === id ? { ...barber, ...updates } : barber
          ),
        })),

      deleteBarber: (id) =>
        set((state) => ({
          barbers: state.barbers.filter((barber) => barber.id !== id),
        })),

      getBarberById: (id) => {
        return get().barbers.find((barber) => barber.id === id);
      },

      toggleBarberStatus: (id) =>
        set((state) => ({
          barbers: state.barbers.map((barber) =>
            barber.id === id ? { ...barber, isActive: !barber.isActive } : barber
          ),
        })),
    }),
    {
      name: 'barber-storage',
    }
  )
);

