<script lang="ts" setup>
const props = defineProps<{
  state: boolean;
}>();
</script>

<template>
  <section class="screen" v-if="state === true">
    <ProgressSpinner stroke-width="5" animation-duration="0.7s" />
  </section>
</template>

<style lang="scss" scoped>
.screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 30;
  display: grid;
  place-items: center;
  background: #0000003a;
}
</style>
