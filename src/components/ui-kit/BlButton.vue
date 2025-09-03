<script setup lang="ts">

</script>

<template>
  <button
    class="bg-primary text-white font-medium py-2 px-4 rounded-lg hover:bg-primary-dark transition"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<style scoped>

</style>