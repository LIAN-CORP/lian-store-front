<script lang="ts" setup>
import type { NewSubcategoryRequest } from "~/interfaces/inventory/subcategory/resquest/new.subcategory.request";
import {
  newSubcategoryScheme,
  type NewSubcategory,
} from "~/schemas/new.subcategory.scheme";

const { successToast, errorToast } = useCreateToast();
const emit = defineEmits(["created"]);
const props = defineProps<{
  categoryId: string;
}>();

const { handleSubmit } = useForm({
  name: "NewSubcategory",
  validationSchema: toTypedSchema(newSubcategoryScheme),
});

const onSubmit = handleSubmit(async (values: NewSubcategory) => {
  const subcategory: NewSubcategoryRequest = {
    name: values.subcategory,
    description: values.description,
    categoryId: props.categoryId,
  };
  console.log(subcategory);
  const response = await useNewSubcategory(subcategory);
  if (response.ok) {
    successToast("la subcategoría se creo exitosamente");
    emit("created");
  } else {
    console.log(response.data);
    errorToast("la subcategoría no se pudo crear");
  }
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
