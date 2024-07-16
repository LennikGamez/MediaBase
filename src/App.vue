<script setup lang="ts">
  import { provide, ref } from 'vue';

  const language = ref('Englisch');
  provide('preferredWatchLanguage', language);
</script>

<template>
  <router-view />
</template>

<style scoped>

</style>
