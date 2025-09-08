<script lang="ts" setup>
import type { NewClientRequest } from "~/interfaces/debt/request/new.client.request";
import {
  NewClientScheme,
  type NewClientInferType,
} from "~/schemas/new-client-scheme";

const { saveClient, loading } = useNewClient();
const { t } = useI18n();
const scheme = NewClientScheme(t);
const { handleSubmit, resetForm } = useForm({
  name: "newClient",
  validationSchema: toTypedSchema(scheme),
});

const onSubmit = handleSubmit(async (values: NewClientInferType) => {
  const newClient: NewClientRequest = {
    name: values.clientName,
    phone: values.phone.replaceAll("-", ""),
  };
  await saveClient(newClient);
});
</script>

<template>
  <section class="debtor">
    <LoadingScreen :state="loading" />
    <div class="debtor-container">
      <form @submit="onSubmit" class="debtor-form">
        <h3>{{ $t("transaction.formDebtor.title") }}</h3>
        <CustomTextField
          id="clientNameID"
          name="clientName"
          :label="$t('transaction.formDebtor.name')"
          input-color="#fff"
        />
        <CustomMaskInput
          id="clientPhoneID"
          name="phone"
          :label="$t('transaction.formDebtor.phone')"
          mask="999-9999-999"
          slot="000-0000-000"
          placeholder="000-0000-000"
          input-color="#fff"
        />
        <Button type="submit" :label="$t('button.save')" severity="success" />
      </form>
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
