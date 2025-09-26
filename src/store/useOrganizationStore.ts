import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Organization = {
  id: string;
  name: string;
  logo: string;
  // You can add more organization fields as needed
};

export type OrganizationState = {
  selectedOrganization: Organization | null;
  setSelectedOrganization: (org: Organization) => void;
  resetSelectedOrganization: () => void;
};

export const useOrganizationStore = create<OrganizationState>()(
  persist(
    (set) => ({
      selectedOrganization: null,
      setSelectedOrganization: (org) => set({ selectedOrganization: org }),
      resetSelectedOrganization: () => set({ selectedOrganization: null }),
    }),
    {
      name: 'organization-storage', // key in localStorage
    }
  )
);
