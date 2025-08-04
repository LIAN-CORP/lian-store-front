<script lang="ts" setup>
definePageMeta({
  layout: "blank",
});
const activeForm = ref("login");

function onChangeForm(name: string) {
  activeForm.value = name;
}
</script>

<template>
  <section class="background">
    <div class="auth">
      <h2>Lian Corp</h2>
      <div class="auth-content">
        <AuthLogin v-if="activeForm === 'login'" @showRegister="onChangeForm" />
        <AuthRegister
          v-if="activeForm === 'register'"
          @showLogin="onChangeForm"
        />
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
    border-radius: 0.5rem;
    min-width: 400px;
    background-color: white;
    box-shadow: 0px 0px 10px -3px rgba(66, 68, 90, 1);
    h2 {
      font-family: "LibreBarCode128";
      font-size: 5em;
      text-align: center;
    }
  }
}
</style>
