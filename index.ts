import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './helpers/connectDB';
import User from './models/User';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

connectDB();

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.get('/test', async (req: Request, res: Response) => {
  const user = new User({
    email: 'test@testing.com',
    password: '123456',
    name: 'Test User',
  });

  await user.save();
});

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
