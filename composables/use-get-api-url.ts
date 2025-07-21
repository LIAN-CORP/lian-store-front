export default function useGetApiUrl(path: string): string {
  const url = useRuntimeConfig().public.apiBase;
  return `${url}/${path}`;
}
