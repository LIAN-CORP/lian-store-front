<script lang="ts" setup>
import type { NewPaymentRequest } from "~/interfaces/payment/request/new.payment.request";
import { PAYMENT_METHOD } from "../../constants/transaction.constant";
import {
  NewPaymentScheme,
  type NewPaymentInferType,
} from "~/schemas/new-payment.scheme";

const props = defineProps<{
  clientId: string;
  transactionId: string;
  debtId: string;
  amount: number;
}>();

const { loading, savePayment } = useNewPayment();
const emit = defineEmits(["created"]);
const { t } = useI18n();
const scheme = NewPaymentScheme(t);
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
  <div class="container">
    <BadgeDisplay
      v-if="!loading"
      :label="$t('debtors.remaining')"
      :value="`$${formatAmount(amount)}`"
    />
    <form v-if="!loading" @submit="onSubmit" class="new-payment">
      <h3>{{ $t("debtors.form.title") }}</h3>
      <CustomNumberField
        id="amountID"
        name="amount"
        currency="COP"
        mode="currency"
        :max="amount"
        :label="$t('debtors.form.amount')"
        :options="{ prefix: '$', min: 0 }"
      />
      <CustomSelectInput
        :prop-options="PAYMENT_METHOD"
        :optionLabel="(option) => $t(option.name)"
        option-value="code"
        id="methodID"
        name="method"
        :label="$t('debtors.form.method')"
      />
      <Button type="submit" :label="$t('button.save')" severity="success" />
    </form>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.new-payment {
  display: flex;
  gap: 0.5em;
  flex-direction: column;
  margin-top: 1em;
  max-width: 350px;
  h3 {
    text-align: center;
  }
}
</style>
