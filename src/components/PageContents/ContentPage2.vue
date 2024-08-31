<template>
    <div class="flex flex-col gap-3">
      <div class="bg-gray-200 p-4 flex justify-between">Город: {{ cityStore.selectedCity }} <span @click="PrevousPage()" class="hover:text-white hover:cursor-pointer">Выбрать другой город</span></div>
      <div class="bg-gray-200 p-4 flex justify-between">Организация: {{ organizationsStore.selectedOrganization.name }} <span @click="PrevousPage()" class="hover:text-white hover:cursor-pointer">Выбрать другую организацию</span></div>
      <div class="p-4 flex justify-between border-b" v-for="(specialist, index) in specialistsStore.specialists" :key="index">
        {{ specialist.name }} <button @click="AddPage(specialist)" class="bg-green-200 rounded-md p-4 hover:text-white">Выбрать</button>
      </div>
    </div>
  </template>

<script>
import { useCityStore } from '../../stores/cityStore'
import { useOrganizationsStore } from '../../stores/organizationsStore'
import { useSpecialistsStore } from '../../stores/specialistsStore'

export default {
    data(){
        return{
        currentPage: 1,
        specialists: [
      { id: 1, name: 'Специалист 1' },
      { id: 2, name: 'Специалист 2' },
      { id: 3, name: 'Специалист 3' },
      { id: 4, name: 'Специалист 4' },
      { id: 5, name: 'Специалист 5' },
        ],
    }
    },
setup() {
    const cityStore = useCityStore()
    const organizationsStore = useOrganizationsStore()
    const specialistsStore = useSpecialistsStore()
    return { cityStore, organizationsStore, specialistsStore }
  },
  mounted(){
    this.specialistsStore.setSpecialists(this.specialists)
  },
  methods: {
    PrevousPage() {
    this.currentPage = 0;
    this.$emit('update:currentPage', this.currentPage);
  },
  AddPage(specialist) {
    this.currentPage++;
    this.specialistsStore.setSelectedSpecialist(specialist)
    this.$emit('update:currentPage', this.currentPage);
  },
}
}
</script>
