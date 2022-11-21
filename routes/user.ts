import express, { Request, Response } from 'express';
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

export default router;
