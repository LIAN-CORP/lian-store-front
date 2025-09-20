<script lang="ts" setup>
import type { LoginRequest } from "~/interfaces/auth/request/login.request";
import { LoginScheme, type LoginInferType } from "~/schemas/login-scheme";

const { loading, login } = useLogin();
const { t } = useI18n();
const scheme = LoginScheme(t);
const { handleSubmit, resetForm } = useForm({
  name: "Login",
  validationSchema: toTypedSchema(scheme),
});

const onSubmit = handleSubmit(async (values: LoginInferType) => {
  const auth: LoginRequest = {
    email: values.email,
    password: values.password,
  };
  await login(auth);
  resetForm();
});
async function prueba() {
  await navigateTo("inventory");
}
</script>

<template>
  <section class="login">
    <h2>{{ $t("auth.login.title") }}</h2>
    <form class="login-form" @submit="onSubmit">
      <CustomTextField
        id="emailId"
        name="email"
        :label="$t('auth.login.email')"
        input-color="white"
        autocomplete="email"
      />
      <CustomInputPassword
        id="passwordId"
        name="password"
        :label="$t('auth.login.password')"
        input-color="white"
        type="password"
      />
      <Button
        rounded
        severity="success"
        :label="$t('auth.login.button')"
        type="submit"
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
    max-width: 370px;
    gap: 1rem;
  }
}
</style>
