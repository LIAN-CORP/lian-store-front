<script lang="ts" setup>
import { Icon } from "@iconify/vue/dist/iconify.js";

const props = defineProps<{
  category: string;
  showForm: boolean;
}>();
const subCategories = ref();

const chooseSubcategory = ref(null);

const showSubCategoryForm = ref();

watch(
  () => props.showForm,
  (newValue) => {
    showSubCategoryForm.value = newValue;
  },
  { immediate: true }
);

watch(
  () => props.category,
  async (auxValue) => {
    if (auxValue) {
      const data = await useSubcategory(auxValue);
      subCategories.value = data.content;
    }
  },
  {
    immediate: true,
  }
);

function onShowCategoryForm() {
  showSubCategoryForm.value = !showSubCategoryForm.value;
  chooseSubcategory.value = null;
}
</script>

<template>
  <InputGroup v-if="showForm === true || category != ''">
    <InputGroupAddon>
      <Button severity="secondary" @click="onShowCategoryForm">
        <template #icon>
          <Icon icon="mingcute:add-fill" width="20" height="20" />
        </template>
      </Button>
    </InputGroupAddon>
    <Select
      optionLabel="name"
      :placeholder="$t('inventory.form.categoryPlaceholder')"
      v-model="chooseSubcategory"
      :options="subCategories"
      :disabled="showSubCategoryForm"
    />
  </InputGroup>
  <Form class="new-subcategory" v-if="showSubCategoryForm">
    <CustomTextField
      id="subcategoryNameID"
      name="Category"
      :label="$t('inventory.form.categoryName')"
    />
    <div class="formField">
      <FormField v-slot="$field">
        <FloatLabel variant="on">
          <Textarea id="subcategoryDescription" name="description" fluid />
          <label for="subcategoryDescription">{{
            $t("inventory.form.categoryDescription")
          }}</label>
        </FloatLabel>
        <Message
          v-if="$field.invalid"
          variant="simple"
          size="small"
          severity="error"
          >{{ $field.error?.message }}
        </Message>
      </FormField>
    </div>
  </Form>
</template>

<style lang="scss" scoped>
.new-subcategory {
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  gap: 0.5rem;
}
</style>
