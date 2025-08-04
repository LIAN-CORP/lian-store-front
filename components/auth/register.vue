<script lang="ts" setup></script>

<template>
  <section class="register">
    <h2>crear usuario</h2>
    <form class="register-form">
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
      <CustomTextField
        id="confirmPasswordId"
        name="confirmPassword"
        label="confirm password"
        input-color="white"
      />
      <Button rounded severity="success" label="register" />
    </form>
    <Button
      label="registrate aqui"
      variant="link"
      @click="$emit('showLogin', 'login')"
    />
  </section>
</template>

<style lang="scss" scoped>
.register {
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
