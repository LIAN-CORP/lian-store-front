<script lang="ts" setup></script>

<template>
  <section class="register">
    <h2>{{ $t("auth.register.title") }}</h2>
    <form class="register-form">
      <CustomTextField
        id="usernameId"
        name="username"
        :label="$t('auth.register.username')"
        input-color="white"
        autocomplete="username"
      />
      <CustomTextField
        id="passwordId"
        name="password"
        :label="$t('auth.register.password')"
        input-color="white"
      />
      <CustomTextField
        id="confirmPasswordId"
        name="confirmPassword"
        :label="$t('auth.register.confirmPassword')"
        input-color="white"
      />
      <Button rounded severity="success" :label="$t('auth.register.button')" />
    </form>
    <Button
      :label="$t('auth.register.changeForm')"
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
