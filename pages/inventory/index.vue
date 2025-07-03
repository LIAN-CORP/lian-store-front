<script setup lang="ts">
import { Icon } from "@iconify/vue/dist/iconify.js";
const { data } = useProduct();

const showForm = ref(false);
const searchValue = ref("");
function showSearch() {
  console.log(searchValue.value);
  console.log(data.value?.content);
}
function onEditProduct() {
  showForm.value = true;
}
function onDelete() {}
</script>

<template>
  <section class="inventory">
    <div class="inventory-header">
      <InputGroup>
        <InputText
          id="in_label"
          v-model="searchValue"
          variant="filled"
          :placeholder="$t('inventory.search')"
        />
        <Button severity="info" @click="showSearch">
          <template #icon>
            <Icon icon="grommet-icons:search" width="1.5em" height="1.5em" />
          </template>
        </Button>
      </InputGroup>
      <Button
        severity="success"
        :label="$t('inventory.newProduct')"
        raised
        rounded
      >
        <template #icon>
          <Icon icon="grommet-icons:add" width="1.5em" height="1.5em" />
        </template>
      </Button>
    </div>
    <article class="inventory-products">
      <InventoryCardProduct
        v-for="product in data?.content"
        :id="1"
        :name="product.name"
        :image="product.image"
        :category="product.subcategory.category.name"
        :subcategory="product.subcategory.name"
        :price="product.priceSell"
        :quantity="product.stock"
        @delete-product="onDelete"
        @edit-product="onEditProduct"
      />
    </article>
    <div class="inventory-footer">
      <Paginator :rows="10" :totalRecords="data!.totalElements" />
    </div>
  </section>
  <ConfirmDialog />
  <Dialog v-model:visible="showForm" modal maximizable header="Editar Producto">
    <template #default>
      <InventoryUpdateProduct />
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
