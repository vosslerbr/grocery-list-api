import { errorResMsg, successResMsg } from '../../helpers/responseMessages';
import Category from '../../models/Category';
import List from '../../models/List';

export default async (data: { listId: string; title: string }) => {
  try {
    const { listId, title } = data;

    const category = new Category({
      title: title,
      items: [],
    });

    category.save();

    await List.findByIdAndUpdate(listId, { $push: { categories: category._id } }, { new: true });

    return successResMsg(`Successfully created category with id ${category._id}`, category);
  } catch (err) {
    console.log(err);

    return errorResMsg('Unable to add category to list', err);
  }
};
