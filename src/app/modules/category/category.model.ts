import { Schema, model, Model } from 'mongoose';
import { ICategory, CategoryModel } from './category.interface';

export const CategorySchema = new Schema<ICategory, CategoryModel>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
   
    status: {
      type: String,
      required: true,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Category = model<ICategory, CategoryModel>('Category', CategorySchema);
