// specialistsStore.js
import { defineStore } from 'pinia'

export const useSpecialistsStore = defineStore('specialists', {
  state: () => ({
    specialists: [],
    selectedSpecialist: null,
  }),
  actions: {
    setSpecialists(specialists) {
      this.specialists = specialists
    },
    setSelectedSpecialist(specialist) {
      this.selectedSpecialist = specialist
    },
  },
})