import express from 'express';
import Alert from '../model/Alert.js';
import { validInput } from '../utile/validator.js'; 
import alertController from '../controller/alertcontroller.js'; 

const router = express.Router();

router.post('/', async (req, res) => {
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
});

router.get('/', async (req, res) => {
    try {
        const alerts = await Alert.find();
        res.status(200).json(alerts);
    } catch (err) {
        console.error('Error fetching alerts:', err.message);
        res.status(500).json({ error: 'Failed to fetch alerts ' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deletedAlert = await Alert.findByIdAndDelete(id);
        if (!deletedAlert) {
            return res.status(404).json({ error: 'Alert is not found' });
        }

        res.status(200).json({ message: 'Alert deleted successfully....' });
    } catch (err) {
        console.error('Error deleting alert:', err.message);
        res.status(500).json({ error: 'data is not deleted' });
    }
});

router.post('/check', async (req, res) => {
    try {
        await alertController.checkAlert();
        res.status(200).json({ message: 'check alert and send notification' });
    } catch (err) {
        console.error('Error :', err.message);
        res.status(500).json({ error: 'unsuccess  check alerts' });
    }
});

export default router;
