<!-- Step.vue -->
<template>
  <div class="flex items-center mb-4" :class="{ active: active }">
    <div class="text-3xl font-bold mr-2">{{ number }}</div>
    <div class="title w-1/2 text-lg">{{ title }}</div>
    <div class="ml-auto text-gray-400 relative" :class="{ 'text-00AA8A': active }">
      <div class="absolute top-1/2 transform -translate-y-1/2 w-full border-t border-gray-400"></div>
      <i v-if="!isLast" class="fas fa-chevron-right relative z-10 text-lg" :class="{ 'text-00AA8A': active }"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    number: Number,
    active: Boolean,
    isLast: Boolean,
  }
}
</script>
