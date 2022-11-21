import express, { Request, Response } from 'express';
import Item from '../models/Item';

const router = express.Router();

// update an item
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { name, quantity, checked } = req.body;

    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { name, quantity, checked },
      { new: true }
    );

    res.json({ message: `Successfully updated category "${name}"`, record: item });
  } catch (err) {
    console.error(err);

    res.status(500).json({ message: 'Unable to update list', err });
  }
});

export default router;
