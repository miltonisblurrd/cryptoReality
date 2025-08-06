import { categories, type Item } from "~/data/items";

export interface CryptoPrice {
  usd: number;
  usd_24h_change: number;
}

export interface AffordableItem extends Item {
  quantity: number;
  category: string;
}

export async function fetchCryptoPrice(cryptoSymbol: string): Promise<CryptoPrice | null> {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoSymbol}&vs_currencies=usd&include_24hr_change=true`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data[cryptoSymbol]) {
      return {
        usd: data[cryptoSymbol].usd,
        usd_24h_change: data[cryptoSymbol].usd_24h_change || 0,
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching crypto price:', error);
    return null;
  }
}

export function calculateAffordableItems(
  totalUsdValue: number,
  selectedCategory?: string
): AffordableItem[] {
  const affordableItems: AffordableItem[] = [];
  
  const categoriesToCheck = selectedCategory 
    ? categories.filter(cat => cat.name === selectedCategory)
    : categories;
  
  categoriesToCheck.forEach(category => {
    category.items.forEach(item => {
      const quantity = Math.floor(totalUsdValue / item.price);
      if (quantity > 0) {
        affordableItems.push({
          ...item,
          quantity,
          category: category.name,
        });
      }
    });
  });
  
  // Sort by quantity (highest first) then by price (lowest first)
  return affordableItems.sort((a, b) => {
    if (b.quantity !== a.quantity) {
      return b.quantity - a.quantity;
    }
    return a.price - b.price;
  });
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toLocaleString();
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
} 