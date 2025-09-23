<script setup lang="ts">
import { Icon } from "@iconify/vue/dist/iconify.js";
import type { PageState } from "primevue";

const { fetchAllProducts, fetchAllProductsByName, products } = useGetProduct();
const { deleteProduct, loading } = useDeleteProduct();
const { onConfirmDelete } = useConfirmDialog();

const { t } = useI18n();
const searchValue = ref("");
const page = ref<number>(0);
const sizePage = 14;
let debounceTimeOut: number | undefined;

async function onRedirectNewProduct() {
  await navigateTo("product");
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
      await fetchAllProducts(page.value, sizePage);
    },
  });
}

async function onPageChange(event: PageState) {
  page.value = event.page;
  await fetchAllProductsByName(page.value, sizePage, searchValue.value);
}
watch(searchValue, async (newVal) => {
  if (debounceTimeOut) clearTimeout(debounceTimeOut);

  debounceTimeOut = setTimeout(async () => {
    if (newVal) {
      page.value = 0;
      await fetchAllProductsByName(page.value, sizePage, searchValue.value);

      console.log(products);
    } else {
      await fetchAllProducts(page.value, sizePage);
    }
  }, 500);
});

onMounted(async () => {
  await fetchAllProducts(page.value, sizePage);
});
</script>

<template>
  <ConfirmDialog />
  <LoadingScreen :state="loading" />
  <section class="inventory">
    <div class="inventory-header">
      <InputText
        class="input-search"
        id="in_label"
        v-model="searchValue"
        variant="filled"
        fluid
        :placeholder="$t('inventory.search')"
      />
      <Button
        severity="success"
        :label="$t('inventory.newProductButton')"
        @click="onRedirectNewProduct"
        size="small"
      >
        <template #icon>
          <Icon icon="grommet-icons:add" width="1.5em" height="1.5em" />
        </template>
      </Button>
    </div>
    <article class="inventory-products">
      <InventoryCardProduct
        v-for="p in products?.content || []"
        :id="p.id"
        :name="p.name"
        :image="p.imagePath || ''"
        :category="p.category"
        :subcategory="p.subcategory"
        :price="p.priceSell"
        :quantity="p.stock"
        @delete-product="onDelete"
        @edit-product="onEditProduct"
      />
      <p v-if="(products?.content || []).length === 0">
        {{ $t("records.notFound") }}
      </p>
    </article>
    <div class="inventory-footer">
      <Paginator
        v-if="products"
        :first="page * sizePage"
        :rows="sizePage"
        :total-records="products.totalElements"
        @page="onPageChange"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
.input-search {
  text-align: center;
}
.inventory {
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
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
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
    &-header {
      flex-direction: column;
      padding: 0.5rem;
      gap: 0.5rem;
    }
  }
}
</style>
