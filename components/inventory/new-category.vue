<script lang="ts" setup>
import type { NewCategoryRequest } from "~/interfaces/inventory/category/request/new.category.request";
import {
  NewCategoryScheme,
  type NewCategory,
} from "~/schemas/new.category.scheme";
const emit = defineEmits(["created"]);
const { successToast, errorToast } = useCreateToast();
const { t } = useI18n();
const scheme = NewCategoryScheme(t);
const { handleSubmit } = useForm({
  name: "newCategory",
  validationSchema: toTypedSchema(scheme),
});

const onSubmit = handleSubmit(async (values: NewCategory) => {
  const category: NewCategoryRequest = {
    name: values.category,
    description: values.description,
  };
  const response = await useNewCategory(category);
  if (response.ok) {
    successToast("la categoría se creo exitosamente");
    emit("created");
  } else {
    errorToast("la categoría no se pudo crear");
  }
});
</script>

<template>
  <form @submit="onSubmit" class="new-category">
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
