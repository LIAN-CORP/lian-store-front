<script setup lang="ts">
import { Icon } from "@iconify/vue/dist/iconify.js";
const { fetchAllProducts } = useGetProduct();
const { deleteProduct } = useDeleteProduct();
const { data: product, refresh } = await fetchAllProducts();
const { onConfirmDelete } = useConfirmDialog();
const { t } = useI18n();

const searchValue = ref("");
async function onRedirectNewProduct() {
  await navigateTo("product");
}
function showSearch() {
  console.log(product.value);
}
async function onEditProduct(productId: string) {
  await navigateTo(`product/${productId}`);
}

function onDelete(id: string, name: string) {
  if (!id || !name) return;
  onConfirmDelete({
    message: t("confirm.delete.product.message", { name: name }),
    onAccept: async () => {
      await deleteProduct(id);
      refresh();
    },
  });
}
</script>

<template>
  <ConfirmDialog />
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
        :label="$t('inventory.newProductButton')"
        @click="onRedirectNewProduct"
      >
        <template #icon>
          <Icon icon="grommet-icons:add" width="1.5em" height="1.5em" />
        </template>
      </Button>
    </div>
    <article class="inventory-products">
      <InventoryCardProduct
        v-for="product in product?.content || []"
        :id="product.id"
        :name="product.name"
        :image="product.imagePath || ''"
        :category="product.category"
        :subcategory="product.subcategory"
        :price="product.priceSell"
        :quantity="product.stock"
        @delete-product="onDelete"
        @edit-product="onEditProduct"
      />
      <p v-if="(product?.content || []).length === 0">
        No se encontraron productos.
      </p>
    </article>
    <div class="inventory-footer">
      <Paginator
        v-if="product?.totalElements"
        :rows="10"
        :totalRecords="product!.totalElements"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
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
