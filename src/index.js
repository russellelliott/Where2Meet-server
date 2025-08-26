dotenv.config();
import express from 'express';
import dotenv from 'dotenv';
import emailRoutes from './email/emailRoutes.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDef from './swaggerDef.js';

dotenv.config();

const app = express();
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
