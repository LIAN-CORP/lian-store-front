<script lang="ts" setup>
import type { UpdateSubcategoryRequest } from "~/interfaces/inventory/subcategory/request/update.subcategory.resquest";
import {
  UpdateSubcategoryScheme,
  type updateSubcategoryInferType,
} from "~/schemas/update.subcategory.scheme";

const props = defineProps<{
  subcategoryId: string;
}>();
const emit = defineEmits(["created"]);
const { getSubcategoryById } = useGetSubcategory();
const { update } = useUpdateSubcategory();
const { data } = await getSubcategoryById(props.subcategoryId);
const initialValues = {
  subcategory: data.value?.name,
  description: data.value?.description,
};
const { handleSubmit, meta, values } = useForm({
  name: "updateSubcategory",
  validationSchema: toTypedSchema(UpdateSubcategoryScheme),
  initialValues: initialValues,
});
const send = computed(() => {
  return (
    meta.value.dirty && JSON.stringify(values) !== JSON.stringify(initialValues)
  );
});

const onSubmit = handleSubmit((values: updateSubcategoryInferType) => {
  const updatedSubcategory: UpdateSubcategoryRequest = {
    id: data.value?.id!,
    name: values.subcategory,
    description: values.description,
    categoryId: data?.value?.category.id!,
  };
  update(updatedSubcategory);
});
</script>

<template>
  <form class="edit-category" @submit="onSubmit">
    <CustomTextField
      name="subcategory"
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
