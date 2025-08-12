export default function useDeleteCategory() {
  const { errorToast, successToast } = useCreateToast();
  async function deleteCategory(categoryId: string) {
    const url = useGetApiUrl(`category/${categoryId}`);
    try {
      const result = await $fetch.raw(url, {
        method: "DELETE",
      });
      if (result.status === 200) {
        successToast("la categoría se eliminó correctamente");
      }
    } catch (e: any) {
      errorToast("error al eliminar");
    }
  }
  return {
    deleteCategory,
  };
}
