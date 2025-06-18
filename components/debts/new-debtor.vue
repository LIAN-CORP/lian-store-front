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
        :label="$t('transaction.formDebtor.name')"
        :input-color="inputColor"
      />
      <CustomTextField
        id="clientPhoneID"
        name="clientPhone"
        :label="$t('transaction.formDebtor.phone')"
        :input-color="inputColor"
      />
      <Button
        type="submit"
        :label="$t('transaction.formDebtor.saveButton')"
        severity="success"
      />
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
