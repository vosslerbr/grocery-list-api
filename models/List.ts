import mongoose, { Schema, Types } from 'mongoose';

// TODO add interface for List
interface IList {
  owner: Types.ObjectId;
  title: string;
  created_date: Date;
  modified_date: Date;
  categories: Types.ObjectId[];
}

const listSchema = new Schema<IList>({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
  modified_date: {
    type: Date,
    default: Date.now,
  },
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
  ],
});

const List = mongoose.model<IList>('List', listSchema);

export default List;
