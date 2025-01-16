import axios from 'axios';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 60 });


const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/simple/price';
console.log('cryptoService is loaded'); 

export const getCryptoPrice = async (crypto) => {
    const cachedPrice = cache.get(crypto);
    if (cachedPrice) {
        console.log(`Cache hit for ${crypto}: $${cachedPrice}`);
        return cachedPrice;
    }

    try {
        const response = await axios.get(COINGECKO_API_URL, {
            params: { ids: crypto, vs_currencies: 'usd' },
        });

        const price = response.data[crypto]?.usd;

        if (price) {
            cache.set(crypto, price);
            console.log(`Cache updated for ${crypto}: $${price}`);
            return price;
        } else {
            throw new Error(`Price data for ${crypto} is unavailable.`);
        }
    } catch (err) {
        console.error(`Error fetching price for ${crypto}:`, err.message);
        throw new Error(`Failed to fetch price for ${crypto}.`);
    }
};