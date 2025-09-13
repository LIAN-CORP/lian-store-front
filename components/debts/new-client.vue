<script lang="ts" setup>
import type { NewClientRequest } from "~/interfaces/debt/request/new.client.request";
import {
  NewClientScheme,
  type NewClientInferType,
} from "~/schemas/new-client-scheme";

const { saveClient, loading } = useNewClient();
const { t } = useI18n();
const scheme = NewClientScheme(t);
const emit = defineEmits(["created"]);
const { handleSubmit, resetForm } = useForm({
  name: "newClient",
  validationSchema: toTypedSchema(scheme),
});

const onSubmit = handleSubmit(async (values: NewClientInferType) => {
  const newClient: NewClientRequest = {
    name: values.clientName,
    phone: values.phone.replaceAll("-", ""),
  };
  console.log(newClient);
  await saveClient(newClient);
  resetForm();
  emit("created");
});
</script>

<template>
  <section class="debtor">
    <div class="debtor-container">
      <LoadingScreen :state="loading" in-modal />
      <form v-if="!loading" @submit="onSubmit" class="debtor-form">
        <CustomTextField
          id="clientNameID"
          name="clientName"
          :label="$t('transaction.newClient.name')"
        />
        <CustomMaskInput
          id="clientPhoneID"
          name="phone"
          :label="$t('transaction.newClient.phone')"
          mask="999-9999-999"
          slot="_"
          placeholder="000-0000-000"
          autocomplete="phone"
        />
        <Button type="submit" :label="$t('button.save')" severity="success" />
      </form>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.debtor {
  &-container {
    display: flex;
    flex-direction: column;
  }
  &-form {
    display: flex;
    border-radius: 5px;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
}
</style>
