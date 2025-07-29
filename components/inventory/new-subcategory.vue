<script lang="ts" setup></script>

<template>
  <Form class="new-subcategory">
    <CustomTextField
      id="subcategoryNameID"
      name="subcategory"
      :label="$t('inventory.newSubcategory.name')"
      input-color="white"
    />
    <CustomTextAreaField
      id="subcategoryDescriptionID"
      name="description"
      :label="$t('inventory.newSubcategory.description')"
      input-color="white"
    />
    <Button :label="$t('button.save')" type="submit" severity="success" />
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
