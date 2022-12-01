import { errorResMsg, successResMsg } from '../../helpers/responseMessages';
import List from '../../models/List';

export default async (listId: string) => {
  try {
    // TODO how can we also delete all categories and items associated with this list?
    //? looks like Mongoose might have a middleware solution for this

    const list = await List.findByIdAndDelete(listId);

    return successResMsg(`Successfully deleted list with id ${listId}`, list);
  } catch (err) {
    console.error(err);

    return errorResMsg('Unable to delete list', err);
  }
};
