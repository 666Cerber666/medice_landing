import { defineStore } from 'pinia'

// Определение типа для специалиста
interface Specialist {
  id: number;
  name: string;
  // Добавьте другие поля, которые присутствуют у специалиста
}

// Определение типа для хранилища
interface SpecialistsState {
  specialists: Specialist[];
  selectedSpecialist: Specialist | null;
}

export const useSpecialistsStore = defineStore('specialists', {
  state: (): SpecialistsState => ({
    specialists: [],
    selectedSpecialist: null,
  }),
  actions: {
    setSpecialists(specialists: Specialist[]) {
      this.specialists = specialists;
    },
    setSelectedSpecialist(specialist: Specialist | null) {
      this.selectedSpecialist = specialist;
    },
  },
});

