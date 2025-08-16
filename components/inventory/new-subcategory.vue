<script lang="ts" setup>
import type { NewSubcategoryRequest } from "~/interfaces/inventory/subcategory/request/new.subcategory.request";
import {
  newSubcategoryScheme,
  type NewSubcategoryInferType,
} from "~/schemas/new.subcategory.scheme";
const { t } = useI18n();
const { createSubcategory } = useNewSubcategory();
const emit = defineEmits(["created"]);
const props = defineProps<{
  categoryId: string;
}>();
const scheme = newSubcategoryScheme(t);
const { handleSubmit, resetForm } = useForm({
  name: "NewSubcategory",
  validationSchema: toTypedSchema(scheme),
});

const onSubmit = handleSubmit(async (values: NewSubcategoryInferType) => {
  const subcategory: NewSubcategoryRequest = {
    name: values.subcategory.toUpperCase(),
    description: values.description,
    categoryId: props.categoryId,
  };
  await createSubcategory(subcategory);
  resetForm();
  emit("created");
});
</script>

<template>
  <form @submit="onSubmit" class="new-subcategory">
    <CustomTextField
      id="subcategoryID"
      name="subcategory"
      :label="$t('inventory.newSubcategory.name')"
    />
    <CustomTextAreaField
      id="subcategoryDescriptionID"
      name="description"
      :label="$t('inventory.newSubcategory.description')"
    />
    <Button :label="$t('button.save')" type="submit" severity="success" />
  </form>
</template>

<style lang="scss" scoped>
.new-subcategory {
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  gap: 0.5rem;
}
</style>
