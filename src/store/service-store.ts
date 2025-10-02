import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Service } from '../types';

interface ServiceStore {
  services: Service[];
  addService: (service: Omit<Service, 'id'>) => void;
  updateService: (id: string, service: Partial<Service>) => void;
  deleteService: (id: string) => void;
  getServiceById: (id: string) => Service | undefined;
}

export const useServiceStore = create<ServiceStore>()(
  persist(
    (set, get) => ({
      services: [
        {
          id: '1',
          name: 'Corte Masculino',
          description: 'Corte tradicional masculino com máquina e tesoura',
          duration: 30,
          price: 35,
        },
        {
          id: '2',
          name: 'Barba',
          description: 'Aparar e modelar barba com navalha',
          duration: 20,
          price: 25,
        },
        {
          id: '3',
          name: 'Corte + Barba',
          description: 'Combo completo de corte e barba',
          duration: 45,
          price: 55,
        },
        {
          id: '4',
          name: 'Corte Infantil',
          description: 'Corte para crianças até 12 anos',
          duration: 25,
          price: 25,
        },
      ],

      addService: (service) =>
        set((state) => ({
          services: [
            ...state.services,
            {
              ...service,
              id: crypto.randomUUID(),
            },
          ],
        })),

      updateService: (id, updates) =>
        set((state) => ({
          services: state.services.map((service) =>
            service.id === id ? { ...service, ...updates } : service
          ),
        })),

      deleteService: (id) =>
        set((state) => ({
          services: state.services.filter((service) => service.id !== id),
        })),

      getServiceById: (id) => {
        return get().services.find((service) => service.id === id);
      },
    }),
    {
      name: 'service-storage',
    }
  )
);

