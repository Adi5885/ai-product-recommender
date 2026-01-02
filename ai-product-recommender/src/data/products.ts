export interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    description: string;
    image: string;
}

export const PRODUCTS: Product[] = [
    {
        id: "1",
        name: "Quantum X1 Laptop",
        price: 154999,
        category: "Electronics",
        description: "Ultra-slim 14-inch laptop with AI-enhanced processor, 32GB RAM, and 1TB SSD. Perfect for creative professionals.",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: "2",
        name: "SonicPro Noice Cancelling Headphones",
        price: 28999,
        category: "Audio",
        description: "Industry-leading noise cancellation with 40-hour battery life and immersive spatial audio.",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: "3",
        name: "PixelWatch Elite",
        price: 24999,
        category: "Wearables",
        description: "Advanced health tracking smartwatch with sapphire crystal display and ECG capability.",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: "4",
        name: "GamerPro Mechanical Keyboard",
        price: 9999,
        category: "Gaming",
        description: "RGB mechanical keyboard with hot-swappable switches and aircraft-grade aluminum frame.",
        image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: "5",
        name: "Vision 4K Monitor",
        price: 39999,
        category: "Electronics",
        description: "27-inch 4K IPS display for stunning color accuracy and bezel-less design.",
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: "6",
        name: "Lumina Smart Bulb Kit",
        price: 6999,
        category: "Smart Home",
        description: "WiFi-enabled smart LED bulbs with 16 million colors, voice control compatible.",
        image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: "7",
        name: "AeroDrone Max",
        price: 64999,
        category: "Electronics",
        description: "4K camera drone with obstacle avoidance and 30-minute flight time.",
        image: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: "8",
        name: "NeoFit Smart Scale",
        price: 4999,
        category: "Health",
        description: "Tracks weight, body fat %, and water mass. Syncs with major health apps.",
        image: "https://images.unsplash.com/photo-1576435728678-38d01d52e38e?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: "9",
        name: "CoffeeMaster Pro",
        price: 16499,
        category: "Home",
        description: "Programmatic burr grinder coffee maker for the perfect morning brew.",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: "10",
        name: "Endurance Running Shoes",
        price: 9999,
        category: "Wearables",
        description: "Lightweight, cushioned running shoes designed for marathon distances.",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
    },
];
