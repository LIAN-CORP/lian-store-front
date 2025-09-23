<script setup lang="ts">
const token = useCookie("access_token");

watch(token, async (newVal) => {
  if (!newVal) {
    await navigateTo("/");
  }
});
</script>
<template>
  <div>
    <Toast />
    <navBar />
    <slot />
  </div>
</template>
