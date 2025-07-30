<script lang="ts" setup>
import {
  NewCategoryScheme,
  type NewCategory,
} from "~/schemas/new.category.scheme";

const { handleSubmit } = useForm({
  name: "newCategory",
  validationSchema: toTypedSchema(NewCategoryScheme),
});

const onSubmit = handleSubmit((values: NewCategory) => {
  console.log("Formulario enviado:", values);
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
