<script setup lang="ts">
const product = {
  id: 1,
  product: "Producto 1",
  category: "Categoria 1",
  price: 100,
  quantity: 10,
};
const toast = useToast();
const confirm = useConfirm();
function editProduct() {
  console.log("editando......");
}
const onDelete = () => {
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
};
</script>

<template>
  <section class="container">
    <CardProduct
      :id="product.id"
      :product="product.product"
      :category="product.category"
      :price="product.price"
      :quantity="product.quantity"
      @delete-product="onDelete"
      @edit-product="editProduct"
    />
  </section>
  <ConfirmDialog />
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
