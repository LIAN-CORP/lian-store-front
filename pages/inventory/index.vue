<script setup lang="ts">
import { Icon } from "@iconify/vue/dist/iconify.js";

const showForm = ref(false);
const searchValue = ref("");
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
function showSearch() {
  console.log(searchValue.value);
}
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
  <section class="inventory">
    <div class="inventory-header">
      <InputGroup>
        <InputText
          id="in_label"
          v-model="searchValue"
          variant="filled"
          placeholder="Buscar producto"
        />
        <Button severity="info" @click="showSearch">
          <template #icon>
            <Icon icon="grommet-icons:search" width="1.5em" height="1.5em" />
          </template>
        </Button>
      </InputGroup>
      <Button severity="success" label="Nuevo producto" raised rounded>
        <template #icon>
          <Icon icon="grommet-icons:add" width="1.5em" height="1.5em" />
        </template>
      </Button>
    </div>
    <article class="inventory-products">
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
    </article>
    <div class="inventory-footer">
      <Paginator
        :rows="10"
        :totalRecords="120"
        template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="Mostrado {first} a {last} de {totalRecords}"
      />
    </div>
  </section>
  <ConfirmDialog />
  <Dialog v-model:visible="showForm" modal maximizable header="Editar Producto">
    <template #default>
      <EditProductForm />
    </template>
  </Dialog>
</template>

<style scoped lang="scss">
@use "../../assets/styles/colors.scss";
.inventory {
  .p-inputgroup {
    width: 40%;
  }
  &-header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    gap: 2rem;
  }
  &-products {
    display: grid;
    align-items: start;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    padding: 1rem;
    gap: 1rem;
  }
  &-footer {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

@media (max-width: 800px) {
  .inventory {
    .p-inputgroup {
      width: 100%;
    }
    &-header {
      flex-direction: column;
      padding: 0.5rem;
      gap: 0.5rem;
    }
  }
}

@media (max-width: 430px) {
  .inventory {
    &-products {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
  }
}
</style>
