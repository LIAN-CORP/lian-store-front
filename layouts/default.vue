<template>
  <div>
    <navBar />
    <slot />
  </div>
</template>

<script setup lang="ts">
  import navBar from '~/components/nav-bar.vue';
</script>