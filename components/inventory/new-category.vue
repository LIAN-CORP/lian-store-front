<script lang="ts" setup>
import type { NewCategoryRequest } from "~/interfaces/inventory/category/request/new.category.request";
import {
  NewCategoryScheme,
  type NewCategory,
} from "~/schemas/new.category.scheme";
const emit = defineEmits(["created"]);
const { t } = useI18n();
const { createCategory, loading } = useNewCategory();
const scheme = NewCategoryScheme(t);
const { handleSubmit, resetForm } = useForm({
  name: "newCategory",
  validationSchema: toTypedSchema(scheme),
});

const onSubmit = handleSubmit(async (values: NewCategory) => {
  const category: NewCategoryRequest = {
    name: values.category.toUpperCase(),
    description: values.description,
  };
  await createCategory(category);
  resetForm();
  emit("created");
});
</script>

<template>
  <LoadingScreen :state="loading" in-modal />
  <form v-if="!loading" @submit="onSubmit" class="new-category">
    <CustomTextField
      id="categoryNameID"
      name="category"
      :label="$t('inventory.newCategory.name')"
    />
    <CustomTextAreaField
      id="description"
      name="description"
      :label="$t('inventory.newCategory.description')"
    />
    <Button :label="$t('button.save')" type="submit" severity="success" />
  </form>
</template>

<style lang="scss" scoped>
.new-category {
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  gap: 0.5rem;
}
</style>
