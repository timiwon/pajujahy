import { ProductAdapter } from "@/adapters/product.adapter";
import { ProductApi } from "@/external/product-api-v1.ts";

export interface Product {
    id: string;
    name: string;
    type: "webhosting" | "vps" | "dedicated";
}

const adapter = new ProductAdapter(new ProductApi());

export async function fetchProducts(): Promise<Product[]> {
    return adapter.getAll();
}
