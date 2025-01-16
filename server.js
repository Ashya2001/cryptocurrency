import express from 'express';
import connectDB from './config/db.js';
import alertRoutes from './routes/alertRoute.js';
import { checkAlert } from './controller/alertcontroller.js';
import { getCryptoPrice } from './service/cryptoService.js'; // Importing getCryptoPrice

import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());


connectDB();


app.use('/api/alerts', alertRoutes);

(async () => {
    try {
        const bitcoinPrice = await getCryptoPrice('bitcoin');
        console.log(`Bitcoin Current Price: $${bitcoinPrice}`);

        const ethereumPrice = await getCryptoPrice('ethereum');
        console.log(` etherum Current price: $${ethereumPrice}`);
    } catch (err) {
        console.error('Error:', err.message);
    }
})();
setInterval(checkAlert, 60000);

const PORT = process.env.PORT || 6002;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
