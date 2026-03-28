import { ProductApi } from "@/external/product-api-v1";
import { type Product } from "@/services/product.service";

export interface IProductPort {
    getAll(): Promise<Product[]>;
}

export class ProductAdapter implements IProductPort {
    private readonly api: ProductApi;

    constructor(api: ProductApi) {
        this.api = api;
    }

    async getAll(): Promise<Product[]> {
        const raw = await this.api.getProducts();
        return raw.map((p) => ({
            id: p.id,
            name: p.display_name,
            type: p.product_type as Product["type"],
        }));
    }
}
