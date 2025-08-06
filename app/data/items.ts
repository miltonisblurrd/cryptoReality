export interface Item {
  name: string;
  price: number; // in USD
  emoji: string;
}

export interface Category {
  name: string;
  emoji: string;
  items: Item[];
}

export const categories: Category[] = [
  {
    name: "Tech",
    emoji: "💻",
    items: [
      { name: "iPhone 15 Pro", price: 999, emoji: "📱" },
      { name: "MacBook Pro", price: 2000, emoji: "💻" },
      { name: "iPad Pro", price: 1099, emoji: "📱" },
      { name: "AirPods Pro", price: 249, emoji: "🎧" },
      { name: "Apple Watch Ultra", price: 799, emoji: "⌚" },
      { name: "Gaming PC", price: 2500, emoji: "🖥️" },
      { name: "Nintendo Switch", price: 300, emoji: "🎮" },
      { name: "PlayStation 5", price: 500, emoji: "🎮" },
    ]
  },
  {
    name: "Food",
    emoji: "🍔",
    items: [
      { name: "Chipotle Bowl", price: 12, emoji: "🌯" },
      { name: "Starbucks Coffee", price: 5, emoji: "☕" },
      { name: "Big Mac", price: 6, emoji: "🍔" },
      { name: "Pizza Slice", price: 3, emoji: "🍕" },
      { name: "Fine Dining Meal", price: 85, emoji: "🍽️" },
      { name: "Avocado Toast", price: 14, emoji: "🥑" },
      { name: "Bubble Tea", price: 7, emoji: "🧋" },
      { name: "Sushi Roll", price: 15, emoji: "🍣" },
    ]
  },
  {
    name: "Travel",
    emoji: "✈️",
    items: [
      { name: "Flight to Europe", price: 800, emoji: "✈️" },
      { name: "Hotel Night (Luxury)", price: 400, emoji: "🏨" },
      { name: "Hotel Night (Budget)", price: 80, emoji: "🏨" },
      { name: "Train Ticket", price: 50, emoji: "🚄" },
      { name: "Uber Ride", price: 25, emoji: "🚗" },
      { name: "Cruise (7 days)", price: 1200, emoji: "🚢" },
      { name: "Airbnb Night", price: 120, emoji: "🏠" },
      { name: "Gas Tank Fill-up", price: 60, emoji: "⛽" },
    ]
  },
  {
    name: "Luxury",
    emoji: "💎",
    items: [
      { name: "Tesla Model 3", price: 38000, emoji: "🚗" },
      { name: "Tesla Model S", price: 95000, emoji: "🚗" },
      { name: "Rolex Watch", price: 8000, emoji: "⌚" },
      { name: "Louis Vuitton Bag", price: 3000, emoji: "👜" },
      { name: "Diamond Ring", price: 5000, emoji: "💍" },
      { name: "Private Jet Hour", price: 4000, emoji: "🛩️" },
      { name: "Yacht Day Rental", price: 2500, emoji: "🛥️" },
      { name: "Designer Suit", price: 1500, emoji: "🤵" },
    ]
  },
  {
    name: "Entertainment",
    emoji: "🎭",
    items: [
      { name: "Movie Ticket", price: 15, emoji: "🎬" },
      { name: "Concert Ticket", price: 120, emoji: "🎵" },
      { name: "Netflix Subscription", price: 16, emoji: "📺" },
      { name: "Spotify Premium", price: 10, emoji: "🎵" },
      { name: "Theme Park Ticket", price: 109, emoji: "🎢" },
      { name: "Broadway Show", price: 150, emoji: "🎭" },
      { name: "Video Game", price: 60, emoji: "🎮" },
      { name: "Book", price: 20, emoji: "📖" },
    ]
  }
];

export const cryptocurrencies = [
  { symbol: "bitcoin", name: "Bitcoin", code: "BTC" },
  { symbol: "ethereum", name: "Ethereum", code: "ETH" },
  { symbol: "binancecoin", name: "BNB", code: "BNB" },
  { symbol: "solana", name: "Solana", code: "SOL" },
  { symbol: "cardano", name: "Cardano", code: "ADA" },
  { symbol: "polkadot", name: "Polkadot", code: "DOT" },
  { symbol: "chainlink", name: "Chainlink", code: "LINK" },
  { symbol: "litecoin", name: "Litecoin", code: "LTC" },
  { symbol: "dogecoin", name: "Dogecoin", code: "DOGE" },
]; 