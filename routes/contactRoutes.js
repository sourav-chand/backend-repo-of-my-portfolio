import express from 'express';
import Contact from '../models/ContactModel.js';

const router = express.Router();

// Save contact form data to MongoDB
router.post('/send', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({ error: 'All fields are required!' });
        }

        const newContact = new Contact({ name, email, subject, message });
        await newContact.save();

        res.status(201).json({ message: 'Message sent successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// Fetch all messages
router.get('/', async (req, res) => {
    try {
        const messages = await Contact.find();
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' });
    }
});

export default router;
