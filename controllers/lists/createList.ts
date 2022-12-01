import { errorResMsg, successResMsg } from '../../helpers/responseMessages';
import List from '../../models/List';

export default async (listdata: { owner: string; title: string }) => {
  try {
    const { owner, title } = listdata;

    const list = new List({
      owner,
      title,
      categories: [],
    });

    await list.save();

    return successResMsg(`Successfully created new list "${title}"`, list);
  } catch (err) {
    console.error(err);

    return errorResMsg('Unable to create list', err);
  }
};
