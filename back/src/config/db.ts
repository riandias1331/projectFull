import { Pool, PoolConfig } from 'pg';
import dotenv from 'dotenv';

dotenv.config();


// Verifica se todas as variáveis de ambiente necessárias estão definidas
const requiredEnvVars = ['DB_USER', 'DB_HOST', 'DB_NAME', 'DB_PASSWORD', 'DB_PORT'];
for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        throw new Error(`Missing required environment variable: ${envVar}`);
    }
}

const poolConfig: PoolConfig = {
 connectionString: process.env.DATABASE_URL
};

const pool = new Pool(poolConfig);

pool.on('connect', () => {
  console.log("Connection pool established with Database");
});

pool.on('error', (err: Error) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export default pool;