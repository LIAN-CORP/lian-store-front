<script lang="ts" setup></script>

<template>
  <Form class="new-category">
    <CustomTextField
      id="categoryNameID"
      name="category"
      :label="$t('inventory.form.categoryName')"
      input-color="white"
    />
    <CustomTextAreaField
      id="description"
      name="description"
      :label="$t('inventory.form.categoryDescription')"
      input-color="white"
    />
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
