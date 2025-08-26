import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    }
});

export const sendInviteEmails = async ({ senderEmail, senderName, recipientEmail, mapId, mapName }) => {
    const baseUrl = process.env.CLIENT_BASE_URL || 'http://localhost:3000';
    const acceptUrl = `${baseUrl}/map/${mapId}/accept`;
    const declineUrl = `${baseUrl}/map/${mapId}/decline`;

    // Email to sender
    const senderMailOptions = {
        from: process.env.EMAIL_FROM,
        to: senderEmail,
        subject: `You invited ${recipientEmail} to collaborate on ${mapName}`,
        text: `You have invited ${recipientEmail} to collaborate on your map "${mapName}".`
    };

    // Email to recipient
    const recipientMailOptions = {
        from: process.env.EMAIL_FROM,
        to: recipientEmail,
        subject: `${senderName} invited you to collaborate on a map!`,
        html: `<p>${senderName} has invited you to collaborate on the map <strong>${mapName}</strong>.<br><br>
        Click the link below to view the map. You'll be able to accept or decline the invitation on the map page:<br>
        <a href="${baseUrl}/map/${mapId}">${baseUrl}/map/${mapId}</a></p>`
    };

    try {
        await transporter.sendMail(senderMailOptions);
        await transporter.sendMail(recipientMailOptions);
    } catch (error) {
        console.error('Error sending invite emails:', error);
        throw error;
    }
};

export const sendResponseEmails = async ({ senderEmail, senderName, ownerEmail, mapName, response }) => {
    // Email to responder
    const responderMailOptions = {
        from: process.env.EMAIL_FROM,
        to: senderEmail,
        subject: `You ${response} the invitation to ${mapName}`,
        text: `You have ${response} the invitation to collaborate on the map "${mapName}".`
    };

    // Email to map owner
    const ownerMailOptions = {
        from: process.env.EMAIL_FROM,
        to: ownerEmail,
        subject: `${senderName} ${response} your map invitation`,
        text: `${senderName} has ${response} your invitation to collaborate on the map "${mapName}".`
    };

    try {
        await transporter.sendMail(responderMailOptions);
        await transporter.sendMail(ownerMailOptions);
    } catch (error) {
        console.error('Error sending response emails:', error);
        throw error;
    }
};

export const sendWelcomeEmail = async ({ email, name }) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Welcome to Where2Meet!',
        html: `<p>Hi ${name || ''},<br>Welcome to Where2Meet! Start creating and sharing maps with your friends.</p>`
    };
    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending welcome email:', error);
        throw error;
    }
};
