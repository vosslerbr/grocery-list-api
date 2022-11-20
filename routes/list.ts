import express, { Request, Response } from 'express';
import Category from '../models/Category';
import List from '../models/List';

const router = express.Router();

// get a list by id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const list = await List.findById(req.params.id);

    console.log(list);

    res.json({ message: `Successfully fetched list with id ${req.params.id}`, record: list });
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: 'Unable to fetch list', err });
  }
});

// add a category to a list
router.post('/:id/category', async (req: Request, res: Response) => {
  try {
    const category = new Category({
      title: req.body.title,
      items: [],
    });

    category.save();

    await List.findByIdAndUpdate(
      req.params.id,
      { $push: { categories: category._id } },
      { new: true }
    );

    res.json({
      message: `Successfully created category with id ${category._id}`,
      record: category,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: 'Unable to add category to list', err });
  }
});

// create a new list
router.post('/', async (req: Request, res: Response) => {
  try {
    const { owner, title } = req.body;

    const list = new List({
      owner,
      title,
      categories: [],
    });

    await list.save();

    res.json({ message: `Successfully created new list "${title}"`, record: list });
  } catch (err) {
    console.error(err);

    res.status(500).json({ message: 'Unable to create list', err });
  }
});

// update a list
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { owner, title } = req.body;

    const list = await List.findByIdAndUpdate(req.params.id, { owner, title });

    res.json({ message: `Successfully updated list "${title}"`, record: list });
  } catch (err) {
    console.error(err);

    res.status(500).json({ message: 'Unable to update list', err });
  }
});

// delete a list
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    // TODO how can we also delete all categories and items associated with this list?

    const list = await List.findByIdAndDelete(req.params.id);

    res.json({ message: `Successfully deleted list with id ${req.params.id}`, record: list });
  } catch (err) {
    console.error(err);

    res.status(500).json({ message: 'Unable to delete list', err });
  }
});

export default router;
