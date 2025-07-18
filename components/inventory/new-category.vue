<script lang="ts" setup>
import { Icon } from "@iconify/vue/dist/iconify.js";

const emit = defineEmits(["isForm", "category"]);

const showCategory = ref(false);
const chooseCategory = ref(null);

function onShowCategoryForm() {
  showCategory.value = !showCategory.value;
  chooseCategory.value = null;
  emit("isForm");
}
const { data } = useCategory().fetchCategories;
</script>

<template>
  <InputGroup>
    <InputGroupAddon>
      <Button severity="secondary" @click="onShowCategoryForm">
        <template #icon>
          <Icon icon="mingcute:add-fill" width="20" height="20" />
        </template>
      </Button>
    </InputGroupAddon>
    <Select
      optionLabel="name"
      optionValue="id"
      :placeholder="$t('inventory.form.categoryPlaceholder')"
      v-model="chooseCategory"
      :options="data?.content"
      :disabled="showCategory"
      @update:modelValue="$emit('category', chooseCategory)"
    />
  </InputGroup>
  <Form class="new-category" v-if="showCategory">
    <CustomTextField
      id="categoryNameID"
      name="Category"
      :label="$t('inventory.form.categoryName')"
    />
    <div class="formField">
      <FormField v-slot="$field">
        <FloatLabel variant="on">
          <Textarea id="description" name="description" fluid />
          <label for="description">{{
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
.new-category {
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  gap: 0.5rem;
}
</style>
