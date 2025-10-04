<script lang="ts" setup>
import type { RegisterRequest } from "~/interfaces/auth/request/register.request";
import {
  RegisterScheme,
  type RegisterInferType,
} from "~/schemas/register.scheme";
const emit = defineEmits(["showLogin"]);
const { onRegister } = useRegister();
const { t } = useI18n();
const scheme = RegisterScheme(t);
const { handleSubmit, resetForm } = useForm({
  name: "Register",
  validationSchema: toTypedSchema(scheme),
});

const onSubmit = handleSubmit(async (values: RegisterInferType) => {
  const register: RegisterRequest = {
    firstName: values.firstName,
    lastName: values.lastName,
    birthday: toLocalISODate(values.birthday)!,
    email: values.email,
    password: values.password,
  };
  await onRegister(register);
  resetForm();
  emit("showLogin", "login");
});
</script>

<template>
  <section class="register">
    <h2>{{ $t("auth.register.title") }}</h2>
    <form class="register-form" @submit="onSubmit">
      <CustomTextField
        id="firstNameId"
        name="firstName"
        :label="$t('auth.register.firstName')"
        input-color="white"
        autocomplete="username"
      />
      <CustomTextField
        id="lastNameId"
        name="lastName"
        :label="$t('auth.register.lastName')"
        input-color="white"
        autocomplete="username"
      />
      <CustomTextField
        id="emailId"
        name="email"
        :label="$t('auth.register.email')"
        input-color="white"
        autocomplete="username"
      />
      <CustomDatePicker
        id="birthdayID"
        name="birthday"
        :label="$t('auth.register.birthdate')"
        input-color="white"
      />
      <CustomInputPassword
        id="passwordId"
        name="password"
        :label="$t('auth.register.password')"
        input-color="white"
      />
      <CustomInputPassword
        id="confirmPasswordId"
        name="confirmPassword"
        :label="$t('auth.register.confirmPassword')"
        input-color="white"
      />
      <Button
        type="submit"
        rounded
        severity="success"
        :label="$t('auth.register.button')"
      />
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
