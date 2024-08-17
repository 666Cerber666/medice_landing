<script setup lang="ts">
import { ref } from 'vue'
import Navigation from "./Navigation.vue"
import ContentPage1 from "./PageContents/ContentPage1.vue"
import ContentPage2 from "./PageContents/ContentPage2.vue"
import ContentPage3 from "./PageContents/ContentPage3.vue"
import ContentPage4 from "./PageContents/ContentPage4.vue"

const currentPage = ref(0) // current page state
</script>

<template>
  <div class="bg-slate-50 w-full">
    <Navigation :currentPage="currentPage" />
    <ContentPage1 v-if="currentPage === 0" />
    <ContentPage2 v-if="currentPage === 1" />
    <ContentPage3 v-if="currentPage === 2" />
    <ContentPage4 v-if="currentPage === 3" />
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
