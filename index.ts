import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './helpers/connectDB';
import listRouter from './routes/list';
import categoryRouter from './routes/category';
import itemRouter from './routes/item';
import userRouter from './routes/user';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

connectDB();

app.use('/user', userRouter);
app.use('/list', listRouter);
app.use('/category', categoryRouter);
app.use('/item', itemRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Grocery List API');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
