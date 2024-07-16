<script setup lang="ts">
  import { provide, ref } from 'vue';

  const language = ref('Deutsch');
  provide('preferredWatchLanguage', language);
</script>

<template>
  <router-view />
</template>

<style scoped>

</style>
