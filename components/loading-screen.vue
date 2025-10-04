<script lang="ts" setup>
withDefaults(
  defineProps<{
    state: boolean;
    inModal?: boolean;
  }>(),
  {
    inModal: false,
  }
);
</script>

<template>
  <Teleport to="body" v-if="!inModal">
    <section class="screen" v-if="state === true">
      <ProgressSpinner stroke-width="5" animation-duration="0.7s" />
    </section>
  </Teleport>
  <div class="inModal" v-if="inModal && state === true">
    <ProgressSpinner stroke-width="5" animation-duration="0.7s" />
  </div>
</template>

<style lang="scss" scoped>
.screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 3000;
  display: grid;
  place-items: center;
  background: #0000003a;
}

.inModal {
  display: flex;
  width: 100%;
  height: 200px;
  justify-content: center;
  align-items: center;
}
</style>
