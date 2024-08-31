import { defineStore } from 'pinia'

// Определение типа для организации, если это простой объект с полями id и name
interface Organization {
  id: number;
  name: string;
}

// Определение типа для хранилища
interface OrganizationsState {
  organizations: Organization[];
  selectedOrganization: Organization | null;
}

export const useOrganizationsStore = defineStore('organizations', {
  state: (): OrganizationsState => ({
    organizations: [],
    selectedOrganization: null,
  }),
  actions: {
    setOrganizations(organizations: Organization[]) {
      this.organizations = organizations;
    },
    setSelectedOrganization(organization: Organization | null) {
      this.selectedOrganization = organization;
    },
  },
});
