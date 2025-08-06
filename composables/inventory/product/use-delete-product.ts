export default function useDeleteProduct() {
  const { errorToast, successToast } = useCreateToast();
  async function deleteProduct(id: string) {
    const url = useGetApiUrl(`product/${id}`);
    try {
      const result = await $fetch.raw(url, {
        method: "DELETE",
      });

      if (result.status == 200) {
        successToast("producto eliminado correctamente");
      }
    } catch (e: any) {
      errorToast("esto es un error");
    }
  }
  return {
    deleteProduct,
  };
}
