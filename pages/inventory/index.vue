<script setup lang="ts">
function deleteProduct() {
  console.log("eliminando......");
}
function editProduct() {
  console.log("editando......");
}
</script>

<template>
  <section class="container">
    <CardProduct @delete-product="deleteProduct" @edit-product="editProduct" />
    <CardProduct @delete-product="deleteProduct" @edit-product="editProduct" />
    <CardProduct @delete-product="deleteProduct" @edit-product="editProduct" />
    <CardProduct @delete-product="deleteProduct" @edit-product="editProduct" />
    <CardProduct @delete-product="deleteProduct" @edit-product="editProduct" />
    <CardProduct @delete-product="deleteProduct" @edit-product="editProduct" />
    <CardProduct @delete-product="deleteProduct" @edit-product="editProduct" />
    <CardProduct @delete-product="deleteProduct" @edit-product="editProduct" />
  </section>
</template>

<style scoped lang="scss">
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  padding: 1rem;
  gap: 1rem;
}
@media (max-width: 768px) {
  .container {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}
</style>
