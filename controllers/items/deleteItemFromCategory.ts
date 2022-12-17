import { errorResMsg, successResMsg } from '../../helpers/responseMessages';
import Category from '../../models/Category';
import Item from '../../models/Item';

export default async (data: { itemId: string; categoryId: string }) => {
  try {
    const { itemId, categoryId } = data;

    // delete the item
    const item = await Item.findByIdAndDelete(itemId);

    // remove category from list
    await Category.findByIdAndUpdate(categoryId, { $pull: { items: itemId } }, { new: true });

    return successResMsg(`Successfully deleted item with id ${itemId}`, item);
  } catch (err) {
    console.error(err);

    return errorResMsg('Unable to delete item', err);
  }
};
