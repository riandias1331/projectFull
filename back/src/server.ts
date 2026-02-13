import dotenv from "dotenv"
import express, { Express } from "express"
import pool, { connectMongo } from './config/db';
import createUserTable from './data/createUserTable'
import userRoutes from "./routes/userRoutes"
import authRoutes from './routes/authRoutes';
import cors from "cors"
import path from "path"
import axios from "axios"
// import errorHandler from './middlewares/errorHandler';

// Config
dotenv.config()
const app: Express = express()
const port = process.env.PORT ? Number(process.env.PORT) : 8080;

// Middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


// Servir arquivos estáticos (opcional, para success.html ou frontend build)
app.use(express.static(path.join(__dirname, "../public")));
// Serve static files (if needed)
// app.use('/static', express.static(path.join(__dirname, 'public')));  
app.set('views', path.resolve(__dirname, 'src', 'views')) // define o caminho das views (arquivos que renderizam na tela)
app.set('view engine', 'ejs') // define o EJS como engine para renderizar HTML

// Routes
app.use('/api/auth', authRoutes)
app.use('/api', userRoutes);

// Health Check
app.get('/health/db', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.status(200).json({ postgres: 'ok' });
  } catch (error) {
     res.status(500).json({ postgres: (error as Error).message })
  }
});


// Error Handler
// app.use(errorHandler)


// Databases
(async () => {
  try {
  await connectMongo();

  // testar postgres
  await pool.query('SELECT 1');
  console.log('✅ PostgreSQL testado');

   // Cria tabela de usuários se não existir
   await createUserTable();
  } catch (error) {
    console.error('Erro ao conectar nos bancos:', (error as Error).message);
    process.exit(1); // Encerra o processo com erro
  }
})();

app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Server rodando na porta ${port}`);
});
