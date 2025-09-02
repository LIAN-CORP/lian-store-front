<script lang="ts" setup>
defineProps<{}>();
</script>

<template>
  <section class="debtor">
    <div class="debtor-container">
      <Form class="debtor-form">
        <h3>{{ $t("transaction.formDebtor.title") }}</h3>
        <CustomTextField
          id="clientNameID"
          name="clientName"
          :label="$t('transaction.formDebtor.name')"
        />
        <CustomMaskInput
          id="clientPhoneID"
          name="clientPhone"
          :label="$t('transaction.formDebtor.phone')"
          mask="999-9999-999"
          placeholder="999-9999-999"
        />
        <Button type="submit" :label="$t('button.save')" severity="success" />
      </Form>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.debtor {
  &-container {
    display: grid;
    place-items: center;
  }
  &-form {
    display: flex;
    border-radius: 5px;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    border: 1px solid #a3a3a3;
    h3 {
      text-align: center;
    }
  }
}
</style>
