import { useState } from "react";
import { ChevronUp, ChevronDown, Search, Flower2 } from "lucide-react";

import { useProducts } from "@/hooks/use-products";

export function ProductSwitcher() {
    const [open, setOpen] = useState(false);
    const { products } = useProducts();

    return (
        <div className="border-b">
            <button
                onClick={() => setOpen(!open)}
                className="flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold hover:bg-accent"
            >
                <Flower2 className="h-6 w-6 shrink-0 text-rose-400" />
                <span>{products[0]?.name}</span>
                {open ? (
                    <ChevronUp className="ml-auto h-4 w-4 text-muted-foreground" />
                ) : (
                    <ChevronDown className="ml-auto h-4 w-4 text-muted-foreground" />
                )}
            </button>

            <div
                className="grid transition-[grid-template-rows] duration-500 ease-in-out"
                style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
            >
                <div className="overflow-hidden">
                <div className="flex flex-col gap-3 px-4 pb-4 pt-3">
                    <div className="relative">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Seek"
                            className="w-full rounded-md border bg-background py-2 pr-3 pl-9 text-sm outline-none focus:ring-1 focus:ring-ring"
                        />
                    </div>

                    <div>
                        <p className="mb-1 text-xs text-muted-foreground">
                            Web hosting
                        </p>
                        {products.map((p) => (
                            <button
                                key={p.id}
                                className="flex w-full items-center gap-3 rounded py-1.5 text-sm hover:bg-accent"
                            >
                                <Flower2 className="h-5 w-5 shrink-0 text-rose-400" />
                                {p.name}
                            </button>
                        ))}
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}
