/**
 * Se encarga únicamente de configurar la aplicación Express: middlewares, rutas, swagger, etc.
 * No arranca el servidor ni toca la base de datos.
 * Esto hace que la aplicación sea testeable fácilmente, porque podemos importar app en nuestros tests sin necesidad de levantar el servidor real ni conectarse a la BD.
*/

import express from "express";
import cors from "cors";
import { corsOptions } from "./config/cors";
import userRoutes from './routes/user.routes';

// 1. Importación de todas las rutas de RiwiMediCare Plus
import authRoutes from './routes/auth.routes';
import seederRoutes from './routes/seeder.routes';
import adminRoutes from './routes/admin.routes';
import requestRoutes from './routes/request.routes';

// 2. Importación de la nueva configuración de Swagger
import { swaggerDocs } from "./docs/swagger";

const app = express();

// Middlewares globales
app.use(cors(corsOptions));
app.use(express.json());

// 3. Montaje de Rutas
app.use("/api/auth", authRoutes);
app.use("/api/seeders", seederRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/requests", requestRoutes);
app.use('/api/users', userRoutes);

// 4. Inicialización de Swagger
const PORT = process.env.APP_PORT || 3000;
swaggerDocs(app, PORT);

export default app;