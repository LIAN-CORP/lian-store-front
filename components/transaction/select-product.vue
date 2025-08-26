<script lang="ts" setup>
import type { PageState } from "primevue";

const { fetchAllProducts, fetchAllProductsByName } = useGetProduct();

const { t } = useI18n();

const searchResults = ref<any>();
const searchValue = ref("");
const page = ref<number>(0);
const sizePage = 6;
async function handleSearch() {
  const { products } = await fetchAllProductsByName(
    page.value,
    sizePage,
    searchValue.value
  );
  searchResults.value = products;
}
function onPageChange(event: PageState) {
  page.value = event.page;
  handleSearch();
}
watch(searchValue, async (newVal) => {
  if (newVal) {
    page.value = 0;
    await handleSearch();
  } else {
    const { products } = await fetchAllProducts(page.value, sizePage);
    searchResults.value = products;
  }
});
onMounted(async () => {
  const { products } = await fetchAllProducts(page.value, sizePage);
  searchResults.value = products;
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
      <p v-if="!searchResults?.content || searchResults?.content.length === 0">
        {{ t("transaction.noResults") }}
      </p>
      <DataView
        :value="searchResults?.content || []"
        data-key="id"
        v-if="searchResults?.content && searchResults?.content.length > 0"
      >
        <template #list="data">
          <section class="cards-container">
            <TransactionItemProduct
              v-for="product in searchResults?.content || []"
              :key="product.id"
              :id="product.id"
              :name="product.name"
              :image="product.imagePath"
              :category="product.category"
              :price="product.priceSell"
            />
          </section>
        </template>
      </DataView>
    </div>
    <article class="select-footer">
      <Paginator
        v-if="searchResults"
        :first="page * sizePage"
        :rows="sizePage"
        :total-records="searchResults.totalElements"
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
