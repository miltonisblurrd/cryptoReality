# What's My Crypto Worth? 💰

A fun and interactive web app that shows you what real-world items you can buy with your cryptocurrency holdings!

## Features

- **Live Crypto Prices**: Fetches real-time cryptocurrency prices from the CoinGecko API
- **Multiple Cryptocurrencies**: Support for Bitcoin, Ethereum, BNB, Solana, Cardano, and more
- **Categorized Items**: Browse items across Tech, Food, Travel, Luxury, and Entertainment categories
- **Real-time Calculations**: See what you can afford as you type
- **Responsive Design**: Works great on desktop and mobile devices
- **Playful UI**: Emojis and visual elements make exploring fun

## How It Works

1. **Select a cryptocurrency** (e.g., Bitcoin, Ethereum)
2. **Enter the amount** you own (e.g., 0.5 BTC)
3. **Choose a category** (optional) to filter results
4. **See what you can buy** with current market prices!

## Example Items

- 🍔 **Food**: Chipotle bowls, Starbucks coffee, pizza slices
- 💻 **Tech**: iPhones, MacBooks, gaming PCs, consoles
- ✈️ **Travel**: Flights, hotels, train tickets, cruises
- 💎 **Luxury**: Tesla cars, Rolex watches, designer items
- 🎭 **Entertainment**: Movie tickets, concerts, streaming services

## Tech Stack

- **Remix.js** - Full-stack React framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **CoinGecko API** - Live cryptocurrency prices

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Development

```bash
# Type checking
npm run typecheck

# Linting
npm run lint
```

## API

The app uses the [CoinGecko API](https://www.coingecko.com/en/api) to fetch live cryptocurrency prices. No API key required for basic usage.

## Contributing

Feel free to add more cryptocurrencies, items, or categories! All data is stored in TypeScript files for easy modification.

---

Built with ❤️ using Remix.js
