<script setup lang="ts">
import { defineProps } from 'vue'
import { ref } from 'vue'
import Step from './Step.vue'

defineProps({
  currentPage: Number,
})

const steps = ref([
    { title: 'Выбор организации' },
    { title: 'Выбор специальности' },
    { title: 'Выбор врача и времени' },
    { title: 'Оформление записи' },
  ])
</script>

<template>
  <div class="flex">
    <Step v-for="(step, index) in steps" :key="index" :active="index === currentPage" :title="step.title" :number="index + 1" />
  </div>
</template>