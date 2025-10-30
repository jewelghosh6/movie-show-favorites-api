import express, { Application, Request, Response } from 'express';
import { initDB } from './db/dbInstance';
import { ApiError } from './utils/ApiError';
import { errorHandler } from './middleware/errorHandler';
import dotenv from 'dotenv';
import favoriteRoutes from './routes/favorite.routes';

dotenv.config();

const app: Application = express();

app.use(express.json());

app.use('/api/entries', favoriteRoutes);


app.get("/", (req: Request, res: Response) => {
  res.send("MovieShowFavorites API is running!");
});

(async () => {
  await initDB();
})();

app.listen(3000, () => {
    console.log(`🚀 Server running on http://localhost:${3000}`);
});

app.use((req, res, next) => {
  next(
    new ApiError(404, `Route ${req.method}:'${req.originalUrl}' not exists!`)
  );
});

app.use(errorHandler);