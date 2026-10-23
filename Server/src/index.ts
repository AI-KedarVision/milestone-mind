import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import healthRoutes from './routes/healthRoutes.js';

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL ?? 'http://localhost:5173',
  }),
);

app.use(express.json());

app.use('/api/health', healthRoutes);

const port = Number(process.env.PORT ?? 5000);

app.listen(port, () => {
  console.log(`MilestoneMind API running on port ${port}`);
});