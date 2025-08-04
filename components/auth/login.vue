<script lang="ts" setup>
function prueba() {
  navigateTo("inventory");
}
</script>

<template>
  <section class="login">
    <h2>{{ $t("auth.login.title") }}</h2>
    <form class="login-form">
      <CustomTextField
        id="usernameId"
        name="username"
        :label="$t('auth.login.username')"
        input-color="white"
        autocomplete="username"
      />
      <CustomTextField
        id="passwordId"
        name="password"
        :label="$t('auth.login.password')"
        input-color="white"
      />
      <Button
        rounded
        severity="success"
        :label="$t('auth.login.button')"
        @click="prueba"
      />
    </form>
    <Button
      :label="$t('auth.login.changeForm')"
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
