// organizationsStore.js
import { defineStore } from 'pinia'

export const useOrganizationsStore = defineStore('organizations', {
  state: () => ({
    organizations: [],
    selectedOrganization: null,
  }),
  actions: {
    setOrganizations(organizations) {
      this.organizations = organizations
    },
    setSelectedOrganization(organization) {
      this.selectedOrganization = organization
    },
  },
})