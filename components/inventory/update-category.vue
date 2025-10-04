<script lang="ts" setup>
import type { UpdateCategory } from "~/interfaces/inventory/category/request/update.category.request";
import {
  UpdateCategoryScheme,
  type UpdateCategoryInferType,
} from "~/schemas/update.category.scheme";

const props = defineProps<{
  categoryId: string;
}>();
const emit = defineEmits(["created"]);
const { t } = useI18n();
const { hasChanges } = useFormChangeHandle();
const { fetchCategoryById } = useGetCategory();
const { updateCategory, loading } = useUpdateCategory();
const { data } = await fetchCategoryById(props.categoryId);
const scheme = UpdateCategoryScheme(t);

const initialValues = {
  category: data.value?.name,
  description: data.value?.description,
};
const { handleSubmit, meta, values } = useForm({
  name: "updateCategory",
  validationSchema: toTypedSchema(scheme),
  initialValues: initialValues,
});
const send = hasChanges({ ...initialValues }, values, meta);
const onSubmit = handleSubmit(async (values: UpdateCategoryInferType) => {
  const updatedCategory: UpdateCategory = {
    id: data.value?.id!,
    name: values.category.toUpperCase(),
    description: values.description,
  };
  await updateCategory(updatedCategory);
  emit("created");
});
</script>

<template>
  <LoadingScreen :state="loading" in-modal />
  <form v-if="!loading" class="edit-category" @submit="onSubmit">
    <CustomTextField
      name="category"
      id="categoryEditId"
      :label="$t('inventory.updateCategory.name')"
    />
    <CustomTextAreaField
      name="description"
      id="categoryDescription"
      :label="$t('inventory.updateCategory.description')"
    />
    <Button
      :label="$t('button.save')"
      type="submit"
      severity="success"
      :disabled="!send"
    />
  </form>
</template>

<style lang="scss" scoped>
.edit-category {
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  gap: 0.5rem;
}
</style>
