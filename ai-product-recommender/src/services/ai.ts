import type { Product } from "../data/products";

// Function to simulate AI delay and logic (Mock Mode)
const mockAIRecommendation = async (query: string, products: Product[]): Promise<string[]> => {
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network latency

    const lowerQuery = query.toLowerCase();

    // Simple keyword matching for mock mode
    return products
        .filter((p) => {
            const text = (p.name + " " + p.description + " " + p.category).toLowerCase();
            // Check if any word in query appears in product text
            // This is very basic; real AI is semantic.
            // If query is "under $500", we should handle price?
            // Let's implement basic price logic if present

            // Regex for max price ("under", "below", "less than")
            // Handles "20,000", "20k"
            const maxPriceMatch = lowerQuery.match(/(?:under|below|less than|cheaper than)\s*(?:rs\.?|₹|\$)?\s*([\d,]+)(k?)/);
            if (maxPriceMatch) {
                let maxPrice = parseInt(maxPriceMatch[1].replace(/,/g, ''));
                if (maxPriceMatch[2] === 'k') maxPrice *= 1000;
                if (p.price > maxPrice) return false;
            }

            // Implicit "budget" or "cheap" logic
            if ((lowerQuery.includes("budget") || lowerQuery.includes("cheap")) && !maxPriceMatch) {
                // assume budget/cheap means under 30,000 for electronics context
                if (p.price > 30000) return false;
            }

            // Regex for min price ("above", "over", "more than")
            const minPriceMatch = lowerQuery.match(/(?:above|over|more than)\s*(?:rs\.?|₹|\$)?\s*([\d,]+)(k?)/);
            if (minPriceMatch) {
                let minPrice = parseInt(minPriceMatch[1].replace(/,/g, ''));
                if (minPriceMatch[2] === 'k') minPrice *= 1000;
                if (p.price < minPrice) return false;
            }

            const keywords = lowerQuery.split(" ").filter(w => !['under', 'below', 'above', 'over', 'more', 'less', 'than', 'cheaper', 'budget', 'cheap', 'price', '$', '₹', 'rs', 'rs.', 'rupees', 'want', 'i', 'a', 'the', 'for'].includes(w) && isNaN(parseInt(w.replace(/,/g, ''))));
            return keywords.some(k => text.includes(k));
        })
        .map((p) => p.id);
};

// Real OpenAI Integration
const openAIRecommendation = async (query: string, products: Product[], apiKey: string): Promise<string[]> => {
    const prompt = `
    You are an intelligent shopping assistant.
    User Query: "${query}"
    
    Here is the list of available products:
    ${JSON.stringify(products.map(p => ({ id: p.id, name: p.name, price: p.price, description: p.description, category: p.category })))}
    
    Return a valid JSON object with a single key "recommendedProductIds" which is an array of strings corresponding to the IDs of the products that best match the user's query.
    If no products match, return an empty array.
    Respond ONLY with the JSON. Do not include markdown formatting like \`\`\`json.
  `;

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: prompt }],
                temperature: 0.7,
            }),
        });

        if (!response.ok) {
            throw new Error("AI API request failed");
        }

        const data = await response.json();
        const content = data.choices[0].message.content;
        const parsed = JSON.parse(content);
        return parsed.recommendedProductIds || [];
    } catch (error) {
        console.error("AI Error:", error);
        throw error;
    }
};

export const getRecommendations = async (
    query: string,
    products: Product[],
    apiKey: string
): Promise<string[]> => {
    // If API key is not provided or is "mock", use mock mode
    if (!apiKey || apiKey.trim().toLowerCase() === "mock") {
        return mockAIRecommendation(query, products);
    }
    return openAIRecommendation(query, products, apiKey);
};
