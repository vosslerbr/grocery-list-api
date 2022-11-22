import express, { Request, Response } from 'express';
import List from '../models/List';
import User from '../models/User';

const router = express.Router();

// get a user by id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    // TODO don't return password
    const user = await User.findById(req.params.id);

    res.json({ message: `Successfully fetched user with id ${req.params.id}`, record: user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Unable to fetch user', err });
  }
});

// get a user's lists
router.get('/:id/lists', async (req: Request, res: Response) => {
  try {
    const lists = await List.find({ owner: req.params.id }).populate({
      path: 'categories',
      populate: { path: 'items' },
    });

    res.json({
      message: `Successfully fetched lists for user with id ${req.params.id}`,
      record: lists,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Unable to fetch lists', err });
  }
});

// create a new user
router.post('/', async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    const user = new User({
      email,
      password,
      name,
    });

    await user.save();

    res.json({ message: `Successfully created user with id ${user._id}`, record: user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Unable to create user', err });
  }
});

// delete a user
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    // TODO how can we also delete all lists, categories, and items associated with this user?
    //? looks like Mongoose might have a middleware solution for this

    const user = await User.findByIdAndDelete(req.params.id);

    res.json({ message: `Successfully deleted User with id ${req.params.id}`, record: user });
  } catch (err) {
    console.error(err);

    res.status(500).json({ message: 'Unable to delete user', err });
  }
});

export default router;
