type ApiService = 'stockApi' | 'transactionApi';

export default function useGetApiUrl(path: string, service: ApiService): string {
    const config = useRuntimeConfig().public;
    const apis = {
        stockApi: config.stockApi,
        transactionApi: config.transactionApi,
    }
    return `${apis[service]}/${path}`;
    //const url = useRuntimeConfig().public.stockApi;
  //return `${url}/${path}`;
}
