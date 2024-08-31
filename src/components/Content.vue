<script setup lang="ts">
import { ref } from 'vue'
import Navigation from "./Navigation.vue"
import ContentPage1 from "./PageContents/ContentPage1.vue"
import ContentPage2 from "./PageContents/ContentPage2.vue"
import ContentPage3 from "./PageContents/ContentPage3.vue"
import ContentPage4 from "./PageContents/ContentPage4.vue"

const currentPage = ref(0) // current page state

function updateCurrentPage(page: number) {
  currentPage.value = page
}
</script>

<template>
  <div class="flex justify-center">
    <div class="bg-slate-50 w-3/4 pt-8 p-8 flex flex-col justify-center align-center">
      <Navigation :currentPage="currentPage" @update:currentPage="updateCurrentPage" />
      <ContentPage1 v-if="currentPage === 0" @update:currentPage="updateCurrentPage" />
      <ContentPage2 v-if="currentPage === 1" @update:currentPage="updateCurrentPage" />
      <ContentPage3 v-if="currentPage === 2" @update:currentPage="updateCurrentPage" />
      <ContentPage4 v-if="currentPage === 3" @update:currentPage="updateCurrentPage" />
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
