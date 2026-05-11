import { setServers } from "node:dns/promises";
// Configuración de DNS para asegurar compatibilidad con MongoDB Atlas en diferentes redes
try {
    setServers(["1.1.1.1", "8.8.8.8"]);
} catch (error) {
    console.error("Error configurando DNS:", error);
}
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import catalogRoutes from './routes/catalogRoutes.js';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

connectDB();

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json()); // Necesario para leer el cuerpo de las peticiones POST (JSON)

// Definición de Rutas de la API
// Todas las rutas dentro de authRoutes empezarán con /api/auth
app.use('/api/auth', authRoutes);
app.use('/api/catalog', catalogRoutes);
app.use('/api/users', userRoutes);

// Ruta de prueba inicial
app.get('/', (req, res) => {
    res.send('API de VR IN SITU - Estado: Operacional');
});

// --- Middlewares de Manejo de Errores ---
app.use(notFound);
app.use(errorHandler);

// Encendido del Servidor
const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});