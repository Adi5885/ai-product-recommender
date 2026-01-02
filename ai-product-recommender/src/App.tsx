import { useState } from "react";
import { SearchBar } from "./components/SearchBar";
import { ProductList } from "./components/ProductList";
import { PRODUCTS } from "./data/products";
import type { Product } from "./data/products";
import { getRecommendations } from "./services/ai";
import { ShoppingBag, Settings, Key } from "lucide-react";
import clsx from "clsx";

function App() {
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>(PRODUCTS);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [lastQuery, setLastQuery] = useState("");

  const handleSearch = async (query: string) => {
    setIsAnalyzing(true);
    setLastQuery(query);
    try {
      // Get IDs from AI
      const recommendedIds = await getRecommendations(query, PRODUCTS, apiKey);

      if (recommendedIds.length === 0) {
        // Fallback or empty state handled by ProductList
        setDisplayedProducts([]);
      } else {
        // Filter and reorder products based on AI return order
        const filtered = recommendedIds
          .map(id => PRODUCTS.find(p => p.id === id))
          .filter((p): p is Product => !!p);

        setDisplayedProducts(filtered);
      }
    } catch (error) {
      console.error("Error getting recommendations:", error);
      alert("Failed to get recommendations. Please check your API key or try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetFilter = () => {
    setDisplayedProducts(PRODUCTS);
    setLastQuery("");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={resetFilter}>
            <div className="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
              <ShoppingBag size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              Nexus<span className="text-indigo-500">AI</span>
            </span>
          </div>

          <button
            onClick={() => setShowSettings(!showSettings)}
            className={clsx(
              "p-2 rounded-full transition-colors",
              showSettings ? "bg-slate-800 text-indigo-400" : "text-slate-400 hover:text-white hover:bg-slate-800"
            )}
          >
            <Settings size={20} />
          </button>
        </div>

        {/* Settings Panel (API Key) */}
        {showSettings && (
          <div className="bg-slate-900 border-b border-slate-800 p-4 animate-fade-in">
            <div className="max-w-3xl mx-auto flex items-center gap-4">
              <Key size={18} className="text-slate-500" />
              <input
                type="password"
                placeholder="Enter OpenAI API Key (or leave empty for Mock Mode)"
                className="bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-sm text-slate-200 w-full focus:outline-none focus:border-indigo-500"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <div className="text-xs text-slate-500 whitespace-nowrap">
                Empty = Mock Mode
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 mb-4 tracking-tight">
            Shopping Reimagined
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Describe what you need, and our AI will find the perfect match from our premium collection.
          </p>
        </div>

        <SearchBar onSearch={handleSearch} isAnalyzing={isAnalyzing} />

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-200">
            {lastQuery ? `Results for "${lastQuery}"` : "Featured Products"}
          </h2>
          {lastQuery && (
            <button
              onClick={resetFilter}
              className="text-sm text-indigo-400 hover:text-indigo-300 hover:underline"
            >
              Show all
            </button>
          )}
        </div>

        <ProductList products={displayedProducts} />
      </main>
    </div>
  );
}

export default App;
