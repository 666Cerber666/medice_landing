<template>
  <nav v-if="currentStep === 0">
    <ul class="city-list">
      <li class="cursor-pointer" v-for="(city, index) in cities" :key="index" @click="NextPage(city)">
        {{ city.name }}
      </li>
    </ul>
  </nav>
  <div v-if="currentStep === 1" class="flex flex-col">
    <div class="bg-gray-200 p-4 flex justify-between">Город: {{ cityStore.selectedCity }} <span @click="PrevousPage()" class="hover:text-white hover:cursor-pointer">Выбрать другой город</span></div>
      <div class="p-4 flex justify-between border-b" v-for="(organization, index) in organizationsStore.organizations" :key="index">
        {{ organization.name }} <button @click="AddPage(organization)" class="bg-green-200 rounded-md p-4 hover:text-white">Выбрать</button>
      </div>
  </div>
</template>

<script>
import { useCityStore } from '../../stores/cityStore'
import { useOrganizationsStore } from '../../stores/organizationsStore'

export default {
  data() {
    return {
      selectedCity: null,
      organizations: [
      { id: 1, name: 'Организация 1' },
      { id: 2, name: 'Организация 2' },
      { id: 3, name: 'Организация 3' },
      { id: 4, name: 'Организация 4' },
      { id: 5, name: 'Организация 5' },
    ],
      cities: [
        { id: 1, name: 'Ижевск' },
        { id: 2, name: 'Воткинск' },
        { id: 3, name: 'Сарапул' },
        { id: 4, name: 'Глазов' },
        { id: 5, name: 'Можга' },
        { id: 6, name: 'Воткинск' },
        { id: 7, name: 'Воткинск' },
        { id: 8, name: 'Воткинск' },
        { id: 9, name: 'Воткинск' },
        { id: 10, name: 'Воткинск' },
        { id: 11, name: 'Воткинск' },
        { id: 12, name: 'Воткинск' },
        { id: 13, name: 'Воткинск' },
        { id: 14, name: 'Воткинск' },
        { id: 15, name: 'Воткинск' },
        { id: 16, name: 'Воткинск' },
      ],
      currentStep: 0,
      currentPage: 0
    }
  },
  mounted() {
    this.organizationsStore.setOrganizations(this.organizations)
  },
  setup() {
    const cityStore = useCityStore()
    const organizationsStore = useOrganizationsStore()
    return { cityStore, organizationsStore  }
  },
  methods: {
    AddPage(organization) {
    this.currentPage++;
    this.organizationsStore.setSelectedOrganization(organization)
    this.$emit('update:currentPage', this.currentPage);
  },
    PrevousPage() {
    this.currentStep--;
  },
    NextPage(city) {
      this.cityStore.setSelectedCity(city.name);
      this.currentStep++;
    }
  }
}
</script>

<style>
.city-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.city-list > li:hover {
  color:#00AA8A
}

@media (max-width: 768px) {
  .city-list {
    grid-template-columns: 1fr;
  }
}
</style>