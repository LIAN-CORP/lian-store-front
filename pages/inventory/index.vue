<script setup lang="ts">
const showForm = ref(false);
const toast = useToast();
const confirm = useConfirm();
const product = {
  id: 1,
  name: "Producto 1",
  image:
    "https://supermercadolaestacion.com/50709-large_default/arroz-diana-x-500-gramos.jpg",
  category: "Categoria 1",
  subcategory: "Subcategoria 1",
  price: 100,
  quantity: 10,
};
function onEditProduct() {
  showForm.value = true;
}
function onDelete() {
  confirm.require({
    message: "¿Desea eliminar el producto?",
    header: "Eliminar producto",
    rejectProps: {
      label: "Cancelar",
      severity: "secondary",
      outlined: true,
    },
    acceptProps: {
      label: "Eliminar",
      severity: "danger",
    },
    accept: () => {
      toast.add({
        severity: "success",
        summary: "Producto eliminado",
        detail: "El producto ha sido eliminado correctamente",
        life: 3000,
      });
    },
  });
}
</script>

<template>
  <section class="container">
    <CardProduct
      :id="product.id"
      :name="product.name"
      :image="product.image"
      :category="product.category"
      :subcategory="product.subcategory"
      :price="product.price"
      :quantity="product.quantity"
      @delete-product="onDelete"
      @edit-product="onEditProduct"
    />
  </section>
  <ConfirmDialog />
  <Dialog v-model:visible="showForm" modal maximizable header="Editar Producto">
    <template #default>
      <EditProductForm />
    </template>
  </Dialog>
</template>

<style scoped lang="scss">
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  padding: 1rem;
  gap: 1rem;
}
@media (max-width: 430px) {
  .container {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}
</style>
