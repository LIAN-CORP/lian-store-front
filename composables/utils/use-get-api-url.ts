export default function useGetApiUrl(path: string): string {
  const config = useRuntimeConfig().public;
  const base = config.apiGateway;
  return `${base}/${path}`;
}
