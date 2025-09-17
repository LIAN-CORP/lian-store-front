<script lang="ts" setup>
import type { NewPaymentRequest } from "~/interfaces/payment/request/new.payment.request";
import {
  NewPaymentScheme,
  type NewPaymentInferType,
} from "~/schemas/new-payment.scheme";

const props = defineProps<{
  clientId: string;
  transactionId: string;
  debtId: string;
}>();

const { loading, savePayment } = useNewPayment();

const { t } = useI18n();
const scheme = NewPaymentScheme(t);
const emit = defineEmits(["created"]);
const { handleSubmit, resetForm } = useForm({
  name: "NewPayment",
  validationSchema: toTypedSchema(scheme),
});
const onSubmit = handleSubmit(async (values: NewPaymentInferType) => {
  const payment: NewPaymentRequest = {
    amount: values.amount,
    paymentMethod: values.method,
    clientId: props.clientId,
    debtId: props.debtId,
    transactionId: props.transactionId,
  };
  await savePayment(payment);
  resetForm();
  emit("created");
});
</script>

<template>
  <LoadingScreen :state="loading" in-modal />
  <form v-if="!loading" @submit="onSubmit" class="new-payment">
    <h3>{{ $t("movements.form.title") }}</h3>
    <CustomNumberField
      id="amountID"
      name="amount"
      :label="$t('movements.form.amount')"
      :options="{ prefix: '$', min: 0 }"
    />
    <CustomSelectInput
      id="methodID"
      name="method"
      :label="$t('movements.form.method')"
    />
    <Button type="submit" :label="$t('button.save')" severity="success" />
  </form>
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
