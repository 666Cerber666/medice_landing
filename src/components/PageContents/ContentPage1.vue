<template>
    <nav>
      <ul>
        <li v-for="(city, index) in cities" :key="index">
          {{ city.name }}
        </li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    data() {
      return {
        cities: [
          { id: 1, name: 'Ижевск' },
          { id: 2, name: 'Воткинск' },
          { id: 3, name: 'Сарапул' },
          { id: 4, name: 'Глазов' },
          { id: 5, name: 'Можга' },
          // add more cities here
        ]
      }
    }
  }
  </script>