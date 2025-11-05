import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import cors from 'cors';
import 'dotenv/config';

import db from './config/database';
import userRoutes from './routes/users';
import postRoutes from './routes/posts';
import todoRoutes from './routes/todos';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas API
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/todos', todoRoutes);

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Manejo de errores
const errorHandler: ErrorRequestHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo salió mal!' });
};

app.use(errorHandler);

// Iniciar servidor
app.listen(PORT, async () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📊 Conectando a: ${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
    
    // Probar conexión a la base de datos
    try {
        await db.query('SELECT NOW()');
        console.log('✅ Conexión a PostgreSQL establecida');
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('❌ Error al conectar con PostgreSQL:', errorMessage);
        console.error('💡 Verifica que el contenedor Docker esté corriendo');
    }
});

