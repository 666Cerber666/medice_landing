<script setup lang="ts">
import { defineProps, ref } from 'vue'
import Step from './Step.vue'

// Определение типа для props
const props = defineProps<{
  currentPage: number
}>()

const steps = ref([
  { id: 1, title: 'Выбор организации' },
  { id: 2, title: 'Выбор специальности' },
  { id: 3, title: 'Выбор врача и времени' },
  { id: 4, title: 'Оформление записи' },
])

</script>

<template>
  <div class="flex justify-center gap-4">
    <Step
      v-for="(step, index) in steps"
      :key="index"
      :active="index <= props.currentPage"
      :title="step.title"
      :number="index + 1"
      :isLast="index === steps.length - 1"
    />
  </div>
</template>
