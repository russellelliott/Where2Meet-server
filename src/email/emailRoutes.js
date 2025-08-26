import express from 'express';
import { sendInviteEmails, sendWelcomeEmail } from './emailService.js';

const router = express.Router();

// Invite collaborator to map
router.post('/invite', async (req, res) => {
    const { senderEmail, senderName, recipientEmail, mapId, mapName } = req.body;
    if (!senderEmail || !recipientEmail || !mapId || !mapName) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    try {
        await sendInviteEmails({ senderEmail, senderName, recipientEmail, mapId, mapName });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send invite emails' });
    }
});

// Send welcome email
router.post('/welcome', async (req, res) => {
    const { email, name } = req.body;
    if (!email) {
        return res.status(400).json({ error: 'Missing email' });
    }
    try {
        await sendWelcomeEmail({ email, name });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send welcome email' });
    }
});

export default router;
