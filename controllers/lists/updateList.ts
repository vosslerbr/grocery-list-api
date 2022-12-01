import { errorResMsg, successResMsg } from '../../helpers/responseMessages';
import List from '../../models/List';

export default async (listdata: { id: string; owner: string; title: string }) => {
  try {
    const { id, owner, title } = listdata;

    const list = await List.findByIdAndUpdate(id, { owner, title }, { new: true });

    return successResMsg(`Successfully updated list "${title}"`, list);
  } catch (err) {
    console.error(err);

    return errorResMsg('Unable to update list', err);
  }
};
