<script lang="ts" setup></script>

<template>
  <section class="login">
    <h2>¡Bienvenido!</h2>
    <form class="login-form">
      <CustomTextField
        id="usernameId"
        name="username"
        label="username"
        input-color="white"
        autocomplete="username"
      />
      <CustomTextField
        id="passwordId"
        name="password"
        label="password"
        input-color="white"
      />
      <Button rounded severity="success" label="Login" />
    </form>
    <Button
      label="registrate aqui"
      variant="link"
      @click="$emit('showRegister', 'register')"
    />
  </section>
</template>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  h2 {
    text-align: center;
  }
  &-form {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1rem;
  }
}
</style>
