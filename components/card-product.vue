<script setup lang="ts">
import { Icon } from "@iconify/vue";
</script>

<template>
  <div class="host">
    <article class="card">
      <div class="card-body">
        <div class="card-image">
          <img
            class="product-image"
            src="https://www.droguerialaeconomia.com/economia/site/img/1x/643297.jpg"
            alt="product-image"
          />
        </div>
        <div class="card-content">
          <dl>
            <dt>Producto:</dt>
            <dd>ARROZ</dd>
            <dt>Categoria:</dt>
            <dd>COmida</dd>
            <dt>Precio:</dt>
            <dd>$1500</dd>
            <dt>Cantidad:</dt>
            <dd>100 u/c</dd>
          </dl>
        </div>
      </div>
      <div class="card-footer">
        <Button severity="info" raised rounded>
          <template #icon>
            <Icon icon="grommet-icons:edit" width="1.5em" height="1.5em" />
          </template>
        </Button>
        <Button severity="danger" raised rounded>
          <template #icon>
            <Icon
              icon="material-symbols:delete-rounded"
              width="1.5em"
              height="1.5em"
            />
          </template>
        </Button>
      </div>
    </article>
  </div>
</template>

<style lang="scss" scoped>
.host {
  padding: 1rem;
}
.card {
  border-radius: 1rem;
  box-shadow: 0px 5px 14px 1px rgba(0, 0, 0, 0.25);
  &-body {
    display: flex;
    justify-content: center;
    align-items: center;
    .card-image {
      width: 300px;
      padding: 0.5rem;
      border-radius: 1rem;
      .product-image {
        object-fit: contain;
        width: 100%;
      }
    }
    .card-content {
      padding: 0.5rem;
      dl {
        dt {
          font-weight: bold;
        }
        dd {
        }
      }
    }
  }
  &-footer {
    display: flex;
    justify-content: center;
    gap: 1rem;
    padding: 0.5rem;
    .btn {
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      &-primary {
        background-color: #007bff;
        color: #fff;
      }
      &-danger {
        background-color: #dc3545;
        color: #fff;
      }
    }
  }
}
</style>
