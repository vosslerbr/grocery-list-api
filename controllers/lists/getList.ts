import { errorResMsg, successResMsg } from '../../helpers/responseMessages';
import List from '../../models/List';

export default async (listId: string) => {
  try {
    const list = await List.findById(listId).populate({
      path: 'categories',
      populate: { path: 'items' },
    });

    return successResMsg(`Successfully fetched list with id ${listId}`, list);
  } catch (err) {
    console.log(err);

    return errorResMsg('Unable to fetch list', err);
  }
};
