import mongoose, { Schema, Types } from 'mongoose';

// TODO add interface for Category
interface ICategory {
  title: string;
  created_date: Date;
  modified_date: Date;
  items: Types.ObjectId[];
}

const categorySchema = new Schema<ICategory>({
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
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Item',
    },
  ],
});

const Category = mongoose.model<ICategory>('Category', categorySchema);

export default Category;
