import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './helpers/connectDB';
import listRouter from './routes/list';
import categoryRouter from './routes/category';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

connectDB();

app.use('/list', listRouter);
app.use('/category', categoryRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Grocery List API');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
