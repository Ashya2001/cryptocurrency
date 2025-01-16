import { getCryptoPrice } from '../service/cryptoService.js';
import Alert from '../model/Alert.js';
import { validInput } from '../utile/validator.js';

export async function checkAlert() {
    try {
        const alerts = await Alert.find();
        for (const alert of alerts) {
            const price = await getCryptoPrice(alert.currency); 
            if (
                (alert.direction === 'above' && price > alert.price) ||
                (alert.direction === 'below' && price < alert.price)
            ) {
                console.log(`Alert for ${alert.email}: ${alert.currency} is ${alert.direction} ${alert.price}`);
           }
        }
    } catch (err) {
        console.error('Error processing alerts:', err.message);
    }
}
async function createAlert(req, res) {
    try {
        const { email, currency, price, direction } = req.body;
const validation = validInput({ email, currency, price, direction });
        if (!validation.valid) {
            return res.status(400).json({ error: validation.message });
        }

        const newAlert = new Alert({ email, currency, price, direction });
        await newAlert.save();

        res.status(201).json({ message: 'Alert created successfully', alert: newAlert });
    } catch (err) {
        console.error('Error creating alert:', err.message);
        res.status(500).json({ error: 'Failed to create alert' });
    }
}


async function getAlerts(req, res) {
    try {
        const alerts = await Alert.find();
        res.status(200).json(alerts);
    } catch (error) {
      
        res.status(500).json({ error: 'Failed to fetch alerts' });
    }
}


async function deleteAlert(req, res) {
    try {
        const { id } = req.params;
        await Alert.findByIdAndDelete(id);
        res.status(200).json({ message: 'Alert deleted successfully' });
    } catch (err) {
       
        res.status(500).json({ error: 'Failed to delete alert' });
    }
}

export default {
    checkAlert,
    createAlert,
    getAlerts,
    deleteAlert,
};
