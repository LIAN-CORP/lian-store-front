<script lang="ts" setup>
import type { UpdateCategory } from "~/interfaces/inventory/category/request/update.category.request";
import {
  UpdateCategoryScheme,
  type UpdatedCategory,
} from "~/schemas/update.category.scheme";

const props = defineProps<{
  subcategoryId: string;
}>();
const emit = defineEmits(["created"]);
const { getSubcategoryById } = useGetSubcategory();
const { update } = useUpdateCategory();
const { data } = await getSubcategoryById(props.subcategoryId);
const initialValues = {
  category: data.value?.name,
  description: data.value?.description,
};
const { handleSubmit, meta, values } = useForm({
  name: "updateCategory",
  validationSchema: toTypedSchema(UpdateCategoryScheme),
  initialValues: initialValues,
});
const send = computed(() => {
  return (
    meta.value.dirty && JSON.stringify(values) !== JSON.stringify(initialValues)
  );
});

const onSubmit = handleSubmit((values: UpdatedCategory) => {
  const updatedCategory: UpdateCategory = {
    id: data.value?.id!,
    name: values.category,
    description: values.description,
  };
  update(updatedCategory);
});
</script>

<template>
  <form class="edit-category" @submit="onSubmit">
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
