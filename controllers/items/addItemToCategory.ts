import { errorResMsg, successResMsg } from '../../helpers/responseMessages';
import Category from '../../models/Category';
import Item from '../../models/Item';

export default async (itemdata: {
  categoryId: string;
  name: string;
  quantity: number;
  checked: boolean;
}) => {
  try {
    const { categoryId, name, quantity, checked } = itemdata;

    const item = new Item({
      name,
      quantity,
      checked,
    });

    item.save();

    await Category.findByIdAndUpdate(categoryId, { $push: { items: item._id } }, { new: true });

    return successResMsg(`Successfully created item with id ${item._id}`, item);
  } catch (err) {
    console.log(err);

    return errorResMsg('Unable to add item to category', err);
  }
};
