import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Customer } from '../types';

interface CustomerStore {
  customers: Customer[];
  addCustomer: (customer: Omit<Customer, 'id' | 'createdAt' | 'totalVisits'>) => void;
  updateCustomer: (id: string, customer: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;
  getCustomerById: (id: string) => Customer | undefined;
  incrementVisits: (id: string) => void;
}

export const useCustomerStore = create<CustomerStore>()(
  persist(
    (set, get) => ({
      customers: [],

      addCustomer: (customer) =>
        set((state) => ({
          customers: [
            ...state.customers,
            {
              ...customer,
              id: crypto.randomUUID(),
              createdAt: new Date(),
              totalVisits: 0,
            },
          ],
        })),

      updateCustomer: (id, updates) =>
        set((state) => ({
          customers: state.customers.map((customer) =>
            customer.id === id ? { ...customer, ...updates } : customer
          ),
        })),

      deleteCustomer: (id) =>
        set((state) => ({
          customers: state.customers.filter((customer) => customer.id !== id),
        })),

      getCustomerById: (id) => {
        return get().customers.find((customer) => customer.id === id);
      },

      incrementVisits: (id) =>
        set((state) => ({
          customers: state.customers.map((customer) =>
            customer.id === id
              ? {
                  ...customer,
                  totalVisits: customer.totalVisits + 1,
                  lastVisit: new Date(),
                }
              : customer
          ),
        })),
    }),
    {
      name: 'customer-storage',
    }
  )
);

