import type { ErrorResponse } from "~/interfaces/error.response";

export default function useGetResumeFile() {
  const { errorToast } = useCreateToast();
  const { getErrorTranslate } = useHandleResponse();

  async function onGenerateReport(start: string, end: string) {
    const url = useGetApiUrl(`transaction/download/report`, "transactionApi");
    try {
      const response = await $fetch.raw<Blob>(url, {
        params: {
          start: start,
          end: end,
        },
        responseType: "blob",
      });
      const blobUrl = URL.createObjectURL(response._data as Blob);
      const disposition = response.headers.get("Content-Disposition");
      const match = disposition?.match(/filename="?([^"]+)"?/);
      let filename = "reporte.xlsx";
      if (match?.[1]) filename = match[1];
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(blobUrl);
    } catch (e: any) {
      const error = e as ErrorResponse;
      const msg = getErrorTranslate(error.type);
      errorToast(msg);
    }
  }
  return {
    onGenerateReport,
  };
}
