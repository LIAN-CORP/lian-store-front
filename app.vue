<template>
  <div>
    <Button label="verify" />
    <div class="card flex justify-center">
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam illo
        dolor dicta consequuntur, deleniti sapiente sit est, eius asperiores
        dolorem porro aspernatur! Cumque assumenda, vitae iusto cum tempore
        fugit dolorum!
      </p>
      <InputOtp v-model="value" :length="5" />
    </div>
  </div>
</template>

<style>
.algo {
  background-color: blue;
}
</style>
<script setup>
import { ref } from "vue";

const value = ref(null);
</script>
