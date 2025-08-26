dotenv.config();

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import emailRoutes from './email/emailRoutes.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDef from './swaggerDef.js';

dotenv.config();


const app = express();

// Allow CORS for frontend
app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        process.env.CLIENT_BASE_URL
    ],
    credentials: true
}));

app.use(express.json());

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDef));

// Email API routes
app.use('/api/email', emailRoutes);

const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
