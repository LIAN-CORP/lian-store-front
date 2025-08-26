type ApiService = 'stockApi' | 'transactionApi';

export default function useGetApiUrl(path: string, service: ApiService): string {
    const config = useRuntimeConfig().public;
    const apis = {
        stockApi: config.stockApi,
        transactionApi: config.transactionApi,
        paymentApi: config.paymentApi,
        userApi: config.userApi,
    }
    return `${apis[service]}/${path}`;
}
