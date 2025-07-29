<script lang="ts" setup></script>

<template>
  <Form class="new-category">
    <CustomTextField
      id="categoryNameID"
      name="category"
      :label="$t('inventory.newCategory.name')"
      input-color="white"
    />
    <CustomTextAreaField
      id="description"
      name="description"
      :label="$t('inventory.newCategory.description')"
      input-color="white"
    />
    <Button :label="$t('button.save')" type="submit" severity="success" />
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
