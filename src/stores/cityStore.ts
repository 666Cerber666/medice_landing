import { defineStore } from 'pinia'

export const useCityStore = defineStore('cityStore', {
  state: () => ({
    selectedCity: null
  }),
  actions: {
    setSelectedCity(city) {
      this.selectedCity = city
    }
  }
})