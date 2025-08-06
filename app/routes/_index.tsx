import { useState, useEffect, useCallback } from "react";
import type { MetaFunction } from "@remix-run/node";
import { categories, cryptocurrencies } from "~/data/items";
import { 
  fetchCryptoPrice, 
  calculateAffordableItems, 
  formatNumber, 
  formatCurrency,
  type CryptoPrice,
  type AffordableItem 
} from "~/utils/crypto";

export const meta: MetaFunction = () => {
  return [
    { title: "What's My Crypto Worth?" },
    { name: "description", content: "See what real-world items you can buy with your cryptocurrency!" },
  ];
};

export default function Index() {
  const [selectedCrypto, setSelectedCrypto] = useState("bitcoin");
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [cryptoPrice, setCryptoPrice] = useState<CryptoPrice | null>(null);
  const [affordableItems, setAffordableItems] = useState<AffordableItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const selectedCryptoInfo = cryptocurrencies.find(c => c.symbol === selectedCrypto);
  const totalUsdValue = cryptoPrice && amount ? parseFloat(amount) * cryptoPrice.usd : 0;

  const handleCalculate = useCallback(async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const price = await fetchCryptoPrice(selectedCrypto);
      if (!price) {
        setError("Failed to fetch crypto price. Please try again.");
        return;
      }

      setCryptoPrice(price);
      const usdValue = parseFloat(amount) * price.usd;
      const items = calculateAffordableItems(usdValue, selectedCategory || undefined);
      setAffordableItems(items);
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [selectedCrypto, amount, selectedCategory]);

  // Auto-calculate when inputs change
  useEffect(() => {
    if (amount && parseFloat(amount) > 0) {
      const timeoutId = setTimeout(() => {
        handleCalculate();
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [selectedCrypto, amount, selectedCategory, handleCalculate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            What&apos;s My Crypto Worth? 💰
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover what real-world items you can buy with your cryptocurrency holdings
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Cryptocurrency Selection */}
            <div>
              <label htmlFor="crypto-select" className="block text-sm font-medium text-gray-700 mb-2">
                Cryptocurrency
              </label>
              <select
                id="crypto-select"
                value={selectedCrypto}
                onChange={(e) => setSelectedCrypto(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {cryptocurrencies.map((crypto) => (
                  <option key={crypto.symbol} value={crypto.symbol}>
                    {crypto.name} ({crypto.code})
                  </option>
                ))}
              </select>
            </div>

            {/* Amount Input */}
            <div>
              <label htmlFor="amount-input" className="block text-sm font-medium text-gray-700 mb-2">
                Amount ({selectedCryptoInfo?.code})
              </label>
              <input
                id="amount-input"
                type="number"
                step="0.00001"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.5"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label htmlFor="category-select" className="block text-sm font-medium text-gray-700 mb-2">
                Category (Optional)
              </label>
              <select
                id="category-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.name} value={category.name}>
                    {category.emoji} {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}
        </div>

        {/* Current Value Display */}
        {cryptoPrice && amount && parseFloat(amount) > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-2">Current Value</div>
              <div className="text-3xl font-bold text-green-600">
                {formatCurrency(totalUsdValue)}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {amount} {selectedCryptoInfo?.code} × {formatCurrency(cryptoPrice.usd)}
                {cryptoPrice.usd_24h_change !== 0 && (
                  <span className={`ml-2 ${cryptoPrice.usd_24h_change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ({cryptoPrice.usd_24h_change > 0 ? '+' : ''}{cryptoPrice.usd_24h_change.toFixed(2)}% 24h)
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Fetching current prices...</p>
          </div>
        )}

        {/* Results */}
        {!loading && affordableItems.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              What You Could Buy 🛍️
            </h2>
            
                         <div className="grid gap-4">
               {affordableItems.slice(0, 20).map((item) => (
                 <div
                   key={`${item.category}-${item.name}`}
                   className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                 >
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">{item.emoji}</span>
                    <div>
                      <div className="font-semibold text-gray-800">{item.name}</div>
                      <div className="text-sm text-gray-600">
                        {item.category} • {formatCurrency(item.price)} each
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600">
                      {formatNumber(item.quantity)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {item.quantity === 1 ? 'item' : 'items'}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {affordableItems.length > 20 && (
              <div className="text-center mt-6 text-gray-600">
                And {affordableItems.length - 20} more items...
              </div>
            )}

            {affordableItems.length === 0 && amount && parseFloat(amount) > 0 && (
              <div className="text-center py-8 text-gray-600">
                <div className="text-4xl mb-4">😅</div>
                                 <p>Your crypto isn&apos;t quite enough for any items in the selected category.</p>
                 <p className="text-sm mt-2">Try a different category or add more crypto!</p>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>Prices are estimates and may vary. Crypto prices from CoinGecko API.</p>
          <p className="mt-2">
            Built with Remix.js • Data updates every few seconds
          </p>
        </div>
      </div>
    </div>
  );
}
