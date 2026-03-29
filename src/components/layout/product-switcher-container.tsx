import { ProductSwitcher } from "@/components/layout/product-switcher";
import { useProducts } from "@/hooks/use-products";

export function ProductSwitcherContainer() {
    const { products, loading } = useProducts();

    return <ProductSwitcher products={products} isLoading={loading} />;
}
