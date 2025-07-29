:
<script lang="ts" setup>
import defaultImage from "@/assets/images/missing_product.webp";

const previewImage = ref();
const previewImageName = ref("");

function onFileSelect(event: any) {
  const file = event.files[0];
  const reader = new FileReader();
  previewImageName.value = file.name;
  reader.onload = async (e) => {
    previewImage.value = e.target?.result;
  };
  reader.readAsDataURL(file);
}
</script>

<template>
  <article class="fileUploader">
    <FileUpload
      mode="basic"
      url="/api/upload"
      accept="image/*"
      :maxFileSize="10000000"
      :chooseLabel="$t('inventory.newProduct.changeImage')"
      :fileLimit="1"
      @select="onFileSelect"
    >
      <template #filelabel>
        <span>{{
          previewImageName || $t("inventory.newProduct.imageLabel")
        }}</span>
      </template>
    </FileUpload>
    <img class="fileUploader-preview" :src="previewImage ?? defaultImage" />
  </article>
</template>

<style lang="scss" scoped>
.fileUploader {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  max-width: 400px;
  height: 100%;
  &-preview {
    height: 350px;
    width: 350px;
    object-fit: contain;
  }
}
@media (max-width: 500px) {
  .fileUploader {
    &-preview {
      height: 300px;
      width: 300px;
    }
  }
}
@media (max-width: 400px) {
  .fileUploader {
    &-preview {
      height: 200px;
      width: 200px;
    }
  }
}
</style>
