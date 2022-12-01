import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './helpers/connectDB';
import listRouter from './routes/list';
import categoryRouter from './routes/category';
import itemRouter from './routes/item';
import userRouter from './routes/user';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import updateItem from './controllers/items/updateItem';
import getList from './controllers/lists/getList';
import createList from './controllers/lists/createList';
import updateList from './controllers/lists/updateList';
import deleteList from './controllers/lists/deleteList';
import addCategoryToList from './controllers/categories/addCategoryToList';
import deleteCategoryFromList from './controllers/categories/deleteCategoryFromList';

dotenv.config();

const app: Express = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('create list', async (listdata: { owner: string; title: string }) => {
    const res = await createList(listdata);

    if (!res.success) {
      // if unsuccessful, send error message to client only
      socket.emit('create list', res);
    } else {
      // if successful, send success message to all clients
      io.emit('create list', res);
    }
  });

  socket.on('get list', async (listId: string) => {
    const res = await getList(listId);

    // only the client that requested the list will receive the response
    socket.emit('get list', res);
  });

  socket.on('update list', async (listdata: { id: string; owner: string; title: string }) => {
    const res = await updateList(listdata);

    if (!res.success) {
      // if unsuccessful, send error message to client only
      socket.emit('update list', res);
    } else {
      // if successful, send success message to all clients
      io.emit('update list', res);
    }
  });

  socket.on('delete list', async (listId: string) => {
    const res = await deleteList(listId);

    if (!res.success) {
      // if unsuccessful, send error message to client only
      socket.emit('delete list', res);
    } else {
      // if successful, send success message to all clients
      io.emit('delete list', res);
    }
  });

  socket.on('add category', async (categorydata: { listId: string; title: string }) => {
    const res = await addCategoryToList(categorydata);

    if (!res.success) {
      // if unsuccessful, send error message to client only
      socket.emit('add category', res);
    } else {
      // if successful, send success message to all clients
      io.emit('add category', res);
    }
  });

  socket.on('delete category', async (categorydata: { listId: string; categoryId: string }) => {
    const res = await deleteCategoryFromList(categorydata);

    if (!res.success) {
      // if unsuccessful, send error message to client only
      socket.emit('delete category', res);
    } else {
      // if successful, send success message to all clients
      io.emit('delete category', res);
    }
  });

  // TODO add type
  socket.on('item update', async (itemdata) => {
    const res = await updateItem(itemdata);

    io.emit('item update', res);
  });
});

const port = process.env.PORT;

app.use(express.json());

app.use(cors());

connectDB();

app.use('/user', userRouter);
app.use('/list', listRouter);
app.use('/category', categoryRouter);
app.use('/item', itemRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Grocery List API');
});

httpServer.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
