import { Pool, PoolConfig, QueryResult } from 'pg';

// Configurar objeto de conexión
const dbConfig: PoolConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    database: process.env.DB_NAME || 'attempt2',
    user: process.env.DB_USER || 'postgres',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
};

// Solo agregar password si está definido
if (process.env.DB_PASSWORD && process.env.DB_PASSWORD.trim() !== '') {
    dbConfig.password = process.env.DB_PASSWORD;
}

const pool = new Pool(dbConfig);

// Event listeners para depuración
pool.on('connect', () => {
    console.log('🔌 Nueva conexión establecida con PostgreSQL');
});

pool.on('error', (err: Error) => {
    console.error('❌ Error inesperado en el cliente PostgreSQL:', err);
});

export interface DatabaseQuery {
    query: (text: string, params?: any[]) => Promise<QueryResult>;
}

export default {
    query: (text: string, params?: any[]): Promise<QueryResult> => pool.query(text, params),
};

