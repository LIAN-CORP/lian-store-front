:
<script lang="ts" setup>
import defaultImage from "@/assets/images/missing_product.webp";

const props = defineProps<{
  name: string;
  image?: string;
  disabled?: boolean;
  show?: boolean;
}>();

const previewImage = ref();
const previewImageName = ref("");
const { errorMessage, setValue } = useField<File | null>(() => props.name);

function onFileSelect(event: any) {
  const file = event.files[0];
  const reader = new FileReader();
  if (!file) {
    setValue(null);
    previewImageName.value = "";
    previewImage.value = null;
  }
  setValue(file);
  previewImageName.value = file.name;
  reader.onload = async (e) => {
    previewImage.value = e.target?.result;
  };
  reader.readAsDataURL(file);
}
</script>

<template>
  <div class="fileUploader">
    <FileUpload
      v-if="show"
      mode="basic"
      url="/api/upload"
      accept="image/*"
      :maxFileSize="10000000"
      :chooseLabel="$t('inventory.newProduct.changeImage')"
      :fileLimit="1"
      @select="onFileSelect"
      :disabled="disabled"
    >
      <template #filelabel>
        <span>{{
          previewImageName || $t("inventory.newProduct.imageLabel")
        }}</span>
      </template>
    </FileUpload>
    <img
      class="fileUploader-preview"
      :src="(previewImage || image) ?? defaultImage"
    />
    <Message v-if="errorMessage" severity="error" size="small">
      {{ errorMessage }}
    </Message>
  </div>
</template>

<style lang="scss" scoped>
.fileUploader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  max-width: 400px;

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
