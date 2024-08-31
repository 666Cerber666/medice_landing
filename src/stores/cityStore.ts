import { defineStore } from 'pinia'

// Определение типа для города, если это строка
type City = string; // Замените на правильный тип, если у вас есть более сложный объект

export const useCityStore = defineStore('cityStore', {
  state: () => ({
    selectedCity: null as City | null // Явно указываем тип
  }),
  actions: {
    setSelectedCity(city: City) {
      this.selectedCity = city
    }
  }
})
