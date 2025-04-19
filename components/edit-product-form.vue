<script lang="ts" setup>
const price = ref(null);
const quantity = ref(null);
</script>

<template>
  <form class="edit-product" action="">
    <FileUpload
      name="demo[]"
      url="/api/upload"
      :multiple="false"
      accept="image/*"
      :maxFileSize="3000000"
      :show-cancel-button="false"
      :show-upload-button="false"
    >
      <template #empty>
        <span>Drag and drop files to here to upload.</span>
      </template>
    </FileUpload>
    <FloatLabel variant="on">
      <InputNumber v-model="price" inputId="price" fluid />
      <label for="price">Precio</label>
    </FloatLabel>
    <FloatLabel variant="on">
      <InputNumber v-model="quantity" inputId="quantity" fluid />
      <label for="quantity">Cantidad</label>
    </FloatLabel>
    <Button type="submit" label="Guardar" />
  </form>
</template>

<style lang="scss" scoped>
.edit-product {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0;
}
</style>
