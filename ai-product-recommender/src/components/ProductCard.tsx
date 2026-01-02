import { motion } from "framer-motion";
import type { Product } from "../data/products";
import clsx from "clsx";

interface ProductCardProps {
    product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className={clsx(
                "group relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg",
                "hover:shadow-2xl hover:border-indigo-500/50 hover:-translate-y-1 transition-all duration-300"
            )}
        >
            {/* Image Container */}
            <div className="aspect-w-16 aspect-h-9 h-48 overflow-hidden relative">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-60" />

                <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-sm px-3 py-1 rounded-full border border-slate-700">
                    <span className="text-xs font-medium text-emerald-400">₹{product.price.toLocaleString('en-IN')}</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1 block">
                            {product.category}
                        </span>
                        <h3 className="text-lg font-bold text-slate-100 group-hover:text-indigo-300 transition-colors">
                            {product.name}
                        </h3>
                    </div>
                </div>

                <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed mb-4">
                    {product.description}
                </p>

                <button className="w-full py-2 bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white rounded-lg text-sm font-medium transition-colors border border-slate-700 hover:border-indigo-500">
                    View Details
                </button>
            </div>
        </motion.div>
    );
};
