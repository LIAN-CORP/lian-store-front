<script lang="ts" setup></script>

<template>
  <Form class="new-payment">
    <h3>{{ $t("movements.form.title") }}</h3>
    <CustomNumberField
      id="paymentID"
      name="payment"
      :label="$t('movements.form.amount')"
      :options="{ prefix: '$', min: 0 }"
    />
    <CustomTextField
      id="methodID"
      name="method"
      :label="$t('movements.form.method')"
    />
    <Button
      type="submit"
      :label="$t('movements.form.saveButton')"
      severity="success"
    />
  </Form>
</template>

<style lang="scss" scoped>
.new-payment {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 1rem 0;
  gap: 1rem;
}
</style>
