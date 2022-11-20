import express, { Request, Response } from 'express';
import Category from '../models/Category';
import List from '../models/List';

const router = express.Router();

// update a category
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { title } = req.body;

    const category = await Category.findByIdAndUpdate(req.params.id, { title });

    res.json({ message: `Successfully updated category "${title}"`, record: category });
  } catch (err) {
    console.error(err);

    res.status(500).json({ message: 'Unable to update list', err });
  }
});

// delete a category
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    // TODO how can we also delete all items associated with this category, and remove any refs to this Category?

    const category = await Category.findByIdAndDelete(req.params.id);

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
