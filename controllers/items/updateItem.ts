import { errorResMsg, successResMsg } from '../../helpers/responseMessages';
import Item from '../../models/Item';

export default async (itemdata: {
  id: string;
  name: string;
  quantity: number;
  checked: boolean;
}) => {
  try {
    const { id, name, quantity, checked } = itemdata;

    const item = await Item.findByIdAndUpdate(
      id,
      { name, quantity, checked, modified_date: new Date() },
      { new: true }
    );

    return successResMsg(`Successfully updated item with id ${id}`, item);
  } catch (err) {
    console.error(err);

    return errorResMsg('Unable to update item', err);
  }
};
