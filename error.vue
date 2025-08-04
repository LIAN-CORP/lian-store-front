<script lang="ts" setup>
import type { NuxtError } from "#app";
const props = defineProps({
  error: Object as () => NuxtError,
});
function onClick() {
  navigateTo("/inventory");
}
</script>

<template>
  <div class="error">
    <h2>:(</h2>
    <h2>error {{ error?.statusCode }}</h2>
    <p>{{ error?.message }}</p>
    <Button label="home" @click="onClick" raised />
  </div>
</template>

<style lang="scss" scoped>
.error {
  padding: 1rem;
  display: flex;
  gap: 1em;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #f8fbfd;
  h2 {
    font-size: 4em;
  }
  p {
    font-size: 2em;
  }
}
</style>
