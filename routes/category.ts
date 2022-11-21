import express, { Request, Response } from 'express';
import Category from '../models/Category';
import Item from '../models/Item';

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

// add an item to a category
router.post('/:id/item', async (req: Request, res: Response) => {
  try {
    const { name, quantity, checked } = req.body;

    const item = new Item({
      name,
      quantity,
      checked,
    });

    item.save();

    await Category.findByIdAndUpdate(req.params.id, { $push: { items: item._id } }, { new: true });

    res.json({
      message: `Successfully created item with id ${item._id}`,
      record: item,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: 'Unable to add item to category', err });
  }
});

// delete an item from a category
router.delete('/:categoryId/item/:id', async (req: Request, res: Response) => {
  try {
    // delete the item
    const item = await Item.findByIdAndDelete(req.params.id);

    // remove category from list
    await Category.findByIdAndUpdate(
      req.params.categoryId,
      { $pull: { items: req.params.id } },
      { new: true }
    );

    res.json({
      message: `Successfully deleted item with id ${req.params.id}`,
      record: item,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({ message: 'Unable to delete item', err });
  }
});

export default router;
