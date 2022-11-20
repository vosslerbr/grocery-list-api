import mongoose, { Schema } from 'mongoose';

// interface for Item
interface IItem {
  name: string;
  quantity: number;
  checked: boolean;
  created_date: Date;
  modified_date: Date;
}

const itemSchema = new Schema<IItem>({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  checked: {
    type: Boolean,
    required: true,
    default: false,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
  modified_date: {
    type: Date,
    default: Date.now,
  },
});

const Item = mongoose.model<IItem>('Item', itemSchema);

export default Item;
