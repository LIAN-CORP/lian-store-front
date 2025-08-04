<script lang="ts" setup>
definePageMeta({
  layout: "blank",
});
</script>

<template>
  <section class="background">
    <div class="auth">
      <h2>Lian Corp</h2>
      <div class="auth-content"></div>
      <div class="auth-actions">
        <Button label="registrate aqui" variant="text" />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.background {
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("../public/login.svg");
  background-size: cover;
  height: 100vh;
  width: 100vw;
  padding: 1rem;
  .auth {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    min-height: 70vh;
    border-radius: 0.5rem;
    min-width: 25vw;
    background-color: white;
    -webkit-box-shadow: 0px 0px 10px -3px rgba(66, 68, 90, 1);
    -moz-box-shadow: 0px 0px 10px -3px rgba(66, 68, 90, 1);
    box-shadow: 0px 0px 10px -3px rgba(66, 68, 90, 1);
    h2 {
      font-family: "LibreBarCode128";
      font-size: 4em;
      text-align: center;
    }
    &-content {
    }
  }
}
</style>
