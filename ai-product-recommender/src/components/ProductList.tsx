import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "../data/products";
import { ProductCard } from "./ProductCard";

interface ProductListProps {
    products: Product[];
}

export const ProductList = ({ products }: ProductListProps) => {
    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-10 text-center text-slate-500">
                <p className="text-xl font-medium">No products found matching your request.</p>
                <p className="text-sm">Try adjusting your query!</p>
            </div>
        );
    }

    return (
        <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4"
        >
            <AnimatePresence>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </AnimatePresence>
        </motion.div>
    );
};
