<script lang="ts" setup></script>

<template>
  <Form class="new-category">
    <div class="formField">
      <FloatLabel variant="on">
        <InputText inputId="Name" name="Name" fluid />
        <label for="Name">Nombre</label>
      </FloatLabel>
      <!--  <Message
        v-if="$form.stock?.invalid"
        variant="simple"
        size="small"
        severity="error"
        >{{ $form.stock.error?.message }}</Message
      > -->
    </div>
    <div class="formField">
      <FloatLabel variant="on">
        <Textarea inputId="description" name="description" fluid />
        <label for="description">Descripción</label>
      </FloatLabel>
      <!--  <Message
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
