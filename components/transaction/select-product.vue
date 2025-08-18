<script lang="ts" setup>
import {Icon} from "@iconify/vue/dist/iconify.js";

const { fetchAllProducts, fetchAllProductsByName } = useGetProduct();
const { data: product, refresh } = await fetchAllProducts(0, 2);
const { t } = useI18n();

const selectedProduct = ref([]);
const searchResults = ref(product);
const searchValue = ref();

const emit = defineEmits(['update:selectedProduct']);

watch(selectedProduct, (newVal) => {
  emit('update:selectedProduct', newVal);
});

console.log(searchResults);

async function handleSearch() {
  try{
    searchResults.value = await fetchAllProductsByName(0, 2, searchValue.value);
  } catch (e: any) {
    searchResults.value = null;
  }
}

function showSearch() {
  handleSearch();
}
function onProductChange() {
  console.log(selectedProduct.value);
}

watch(searchValue, async (newVal) => {
  if (newVal) {
    await handleSearch();
  } else {
    const {data, refresh} = await fetchAllProducts(0, 2);
    searchResults.value = data.value;
  }
});
</script>

<template>
  <section class="select">
    <div class="select-header">
      <InputGroup>
        <InputText
          id="in_label"
          v-model="searchValue"
          variant="filled"
          :placeholder="$t('transaction.searchProduct')"
        />
        <Button severity="info" @click="showSearch">
          <template #icon>
            <Icon icon="grommet-icons:search" width="1em" height="1em" />
          </template>
        </Button>
      </InputGroup>
    </div>
    <div class="select-content">
      <p v-if="!searchResults?.content || searchResults?.content.length === 0">
        {{t('transaction.noResults')}}
      </p>
      <DataView :value="searchResults?.content || []" data-key="id" class="algo" v-if="searchResults?.content && searchResults?.content.length > 0">
        <template #list="data">
          <section class="cards-container">
            <article
              v-for="product in searchResults?.content || []"
              class="product-card"
              :key="product.id"
              @change="onProductChange"
            >
              <label class="product-card-label">
                <Checkbox
                  v-model="selectedProduct"
                  :input-id="product.id + '-checkbox'"
                  :value="product"
                />
              </label>
              <TransactionItemProduct
                :name="product.name"
                :image="product.imagePath"
                :category="product.category"
                :price="product.priceSell"
              />
            </article>
          </section>
        </template>
      </DataView>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.select {
  background-color: #eef2ff;

  &-header {
    padding: 1rem;
  }
  &-content {
    .cards-container {
      display: grid;
      padding: 1rem;
      gap: 1rem;
      background-color: #eef2ff;
      height: 500px;
      overflow-y: auto;
      scrollbar-width: 2px;
      box-shadow: inset 0px 0px 17px 0px rgba(0, 0, 0, 0.12);

      .product-card {
        display: flex;
        height: 100%;
        &-label {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0.3rem;
          border-radius: 5px 0 0 5px;
          background-color: #a3a5f3;
          cursor: pointer;
        }
        &-label:hover {
          background-color: #8486e5;
        }
      }
    }
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
        height: 300px;
      }
    }
  }
}
</style>
