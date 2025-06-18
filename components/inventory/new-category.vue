<script lang="ts" setup></script>

<template>
  <Form class="new-category">
    <CustomTextField
      id="categoryNameID"
      name="Category"
      :label="$t('inventory.form.categoryName')"
    />
    <div class="formField">
      <FloatLabel variant="on">
        <Textarea inputId="description" name="description" fluid />
        <label for="description">{{
          $t("inventory.form.categoryDescription")
        }}</label>
      </FloatLabel>
      <!-- <Message
        v-if="$form.stock?.invalid"
        variant="simple"
        size="small"
        severity="error"
        >{{ $form.stock.error?.message }}</Message
      > -->
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
