import express, { Request, Response } from 'express';
import Category from '../models/Category';
import List from '../models/List';

const router = express.Router();

// get a list by id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const list = await List.findById(req.params.id).populate({
      path: 'categories',
      populate: { path: 'items' },
    });

    res.json({ message: `Successfully fetched list with id ${req.params.id}`, record: list });
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: 'Unable to fetch list', err });
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

    const list = await List.findByIdAndUpdate(req.params.id, { owner, title }, { new: true });

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
    //? looks like Mongoose might have a middleware solution for this

    const list = await List.findByIdAndDelete(req.params.id);

    res.json({ message: `Successfully deleted list with id ${req.params.id}`, record: list });
  } catch (err) {
    console.error(err);

    res.status(500).json({ message: 'Unable to delete list', err });
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

// delete a category from a list
router.delete('/:listId/category/:id', async (req: Request, res: Response) => {
  try {
    // TODO how can we also delete all items associated with this category?
    //? looks like Mongoose might have a middleware solution for this

    // delete the category
    const category = await Category.findByIdAndDelete(req.params.id);

    // remove category from list
    await List.findByIdAndUpdate(
      req.params.listId,
      { $pull: { categories: req.params.id } },
      { new: true }
    );

    res.json({
      message: `Successfully deleted category with id ${req.params.id}`,
      record: category,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({ message: 'Unable to delete category', err });
  }
});

export default router;
