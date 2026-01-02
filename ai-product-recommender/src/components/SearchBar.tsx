import { useState } from "react";
import type { FormEvent } from "react";
import { Search, Sparkles, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface SearchBarProps {
    onSearch: (query: string) => void;
    isAnalyzing: boolean;
}

export const SearchBar = ({ onSearch, isAnalyzing }: SearchBarProps) => {
    const [query, setQuery] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto mb-10 relative z-20">
            <form onSubmit={handleSubmit} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl blur opacity-25 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative flex items-center bg-slate-900 rounded-xl border border-slate-800 shadow-xl overflow-hidden">
                    <div className="pl-4 text-slate-400">
                        <Search size={20} />
                    </div>
                    <input
                        type="text"
                        className="w-full bg-transparent border-none text-slate-100 placeholder-slate-500 focus:ring-0 px-4 py-4 text-lg"
                        placeholder="Tell me what you're looking for..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        disabled={isAnalyzing}
                    />
                    <button
                        type="submit"
                        disabled={isAnalyzing || !query.trim()}
                        className="mr-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isAnalyzing ? (
                            <>
                                <Loader2 className="animate-spin" size={18} />
                                <span>Thinking...</span>
                            </>
                        ) : (
                            <>
                                <Sparkles size={18} />
                                <span>Ask AI</span>
                            </>
                        )}
                    </button>
                </div>
            </form>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-slate-500 text-sm mt-3"
            >
                Try: "Gaming laptop under 1,00,000", "Cheap headphones", or "Phone above 20k under 50k"
            </motion.p>
        </div>
    );
};
