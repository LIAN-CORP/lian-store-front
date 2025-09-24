<script lang="ts" setup>
import type { PageState } from "primevue";

const { fetchAllProducts, fetchAllProductsByName, products } = useGetProduct();

const { t } = useI18n();
let debounceTimeOut: number | undefined;
const searchValue = ref("");
const page = ref<number>(0);
const sizePage = 6;
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
  <section class="select">
    <div class="select-header">
      <InputText
        class="input-search"
        id="in_label"
        v-model="searchValue"
        variant="filled"
        fluid
        :placeholder="$t('transaction.searchProduct')"
      />
    </div>
    <div class="select-content">
      <p v-if="!products?.content || products?.content.length === 0">
        {{ t("transaction.noResults") }}
      </p>
      <DataView
        :value="products?.content || []"
        data-key="id"
        v-if="products?.content && products?.content.length > 0"
      >
        <template #list="data">
          <section class="cards-container">
            <TransactionItemProduct
              v-for="product in products?.content || []"
              :key="product.id"
              :id="product.id"
              :name="product.name"
              :image="product.imagePath"
              :price-buy="product.priceBuy"
              :category="product.category"
              :price="product.priceSell"
              :stock="product.stock"
            />
          </section>
        </template>
      </DataView>
    </div>
    <article class="select-footer">
      <Paginator
        v-if="products"
        :first="page * sizePage"
        :rows="sizePage"
        :total-records="products.totalElements"
        @page="onPageChange"
      ></Paginator>
    </article>
  </section>
</template>

<style lang="scss" scoped>
.input-search {
  text-align: center;
}
.select {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  &-header {
    border-bottom: 1rem;
  }
  .cards-container {
    background-color: #eef2ff;
    display: grid;
    height: auto;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    flex: 1;
  }
  &-footer {
    margin-top: auto;
  }
}
@media (max-width: 800px) {
  .select {
    &-header {
      padding: 0.5rem;
    }
    &-content {
      .cards-container {
        padding: 0.2rem;
        gap: 1rem;
      }
    }
  }
}
@media (max-width: 600px) {
  .select {
    &-header {
      padding: 0.5rem;
    }
    &-content {
      .cards-container {
        grid-template-columns: auto;
      }
    }
  }
}
</style>
