<script lang="ts" setup>
defineProps<{
  inputColor: string;
}>();
</script>

<template>
  <section class="debtor">
    <Form class="debtor-form">
      <CustomTextField
        id="clientNameID"
        name="clientName"
        label="Nombre del cliente"
        :input-color="inputColor"
      />
      <CustomTextField
        id="clientPhoneID"
        name="clientPhone"
        label="Teléfono del cliente"
        :input-color="inputColor"
      />
      <Button type="submit" label="Crear" severity="success" />
    </Form>
  </section>
</template>

<style lang="scss" scoped>
.debtor {
  &-form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 1rem 0;
    gap: 1rem;
  }
}
</style>
