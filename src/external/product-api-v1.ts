export interface ExternalProduct {
    id: string;
    display_name: string;
    product_type: string;
}

const MOCK_PRODUCTS: ExternalProduct[] = [
    { id: "pajujahy", display_name: "pajujahy", product_type: "webhosting" },
];

export class ProductApi {
    async getProducts(): Promise<ExternalProduct[]> {
        await new Promise((resolve) => setTimeout(resolve, 300));
        return MOCK_PRODUCTS;
    }
}
