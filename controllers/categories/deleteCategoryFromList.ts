import { errorResMsg, successResMsg } from '../../helpers/responseMessages';
import Category from '../../models/Category';
import List from '../../models/List';

export default async (data: { listId: string; categoryId: string }) => {
  try {
    // TODO how can we also delete all items associated with this category?
    //? looks like Mongoose might have a middleware solution for this

    const { listId, categoryId } = data;

    // delete the category
    const category = await Category.findByIdAndDelete(categoryId);

    // remove category from list
    await List.findByIdAndUpdate(listId, { $pull: { categories: categoryId } }, { new: true });

    return successResMsg(`Successfully deleted category with id ${categoryId}`, category);
  } catch (err) {
    console.error(err);

    return errorResMsg('Unable to delete category', err);
  }
};
