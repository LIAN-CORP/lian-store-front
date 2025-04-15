<template>
  <NuxtLoadingIndicator color="blue" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style lang="scss" scoped></style>
<script setup>
import { ref } from "vue";

const value = ref(null);
</script>
