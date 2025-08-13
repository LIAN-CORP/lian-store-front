export default function useDeleteSubcategory() {
  const { errorToast, successToast } = useCreateToast();
  async function deleteSubcategory(subcategoryId: string) {
    const url = useGetApiUrl(`subcategory/${subcategoryId}`);
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
    deleteSubcategory,
  };
}
