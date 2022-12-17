import { errorResMsg, successResMsg } from '../../helpers/responseMessages';
import Category from '../../models/Category';

export default async (categorydata: { id: string; title: string }) => {
  try {
    const { id, title } = categorydata;

    const category = await Category.findByIdAndUpdate(id, { title });

    return successResMsg(`Successfully updated category "${title}"`, category);
  } catch (err) {
    console.error(err);

    return errorResMsg('Unable to update category', err);
  }
};
