<script lang="ts" setup>
import type { NewClientRequest } from "~/interfaces/debt/request/new.client.request";
import {
  NewClientScheme,
  type NewClientInferType,
} from "~/schemas/new-client-scheme";
import { GENERIC_CLIENT } from "../../constants/transaction.constant";
import type { UpdateClientRequest } from "~/interfaces/debt/request/update.client.request";

const { t } = useI18n();
const emit = defineEmits(["created"]);
const scheme = NewClientScheme(t);
const props = defineProps<{
  id?: string;
  name: string;
  phone: string;
}>();

const { updateClient, loading } = useUpdateClient();

const initialValues = {
  clientName: props.name,
  phone: props.phone,
};
const { handleSubmit, resetForm } = useForm({
  name: "updateClient",
  validationSchema: toTypedSchema(scheme),
  initialValues: initialValues,
});

const onSubmit = handleSubmit(async (values: NewClientInferType) => {
  const newClient: UpdateClientRequest = {
    id: props.id!,
    name: values.clientName,
    phone: values.phone.replaceAll("-", ""),
  };
  await updateClient(newClient);
  resetForm();
  emit("created");
});
</script>

<template>
  <section class="debtor">
    <LoadingScreen :state="loading" in-modal />
    <div v-if="!loading" class="debtor-container">
      <p v-if="`+57${GENERIC_CLIENT.phone}` === phone">
        {{ t("transaction.NotEditableClient") }}
      </p>
      <form v-else @submit="onSubmit" class="debtor-form">
        <CustomTextField
          id="clientNameID"
          name="clientName"
          :label="$t('transaction.newClient.name')"
        />
        <CustomMaskInput
          id="clientPhoneID"
          name="phone"
          :label="$t('transaction.newClient.phone')"
          mask="+57-999-9999-999"
          slot="_"
          placeholder="+00-000-0000-000"
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
