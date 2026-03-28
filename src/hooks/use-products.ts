import { useEffect, useState } from "react";

import { fetchProducts, type Product } from "@/services/product.service";

interface UseProductsResult {
    products: Product[];
    loading: boolean;
    error: string | null;
}

export function useProducts(): UseProductsResult {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchProducts()
            .then(setProducts)
            .catch(() => setError("Failed to load products"))
            .finally(() => setLoading(false));
    }, []);

    return { products, loading, error };
}
