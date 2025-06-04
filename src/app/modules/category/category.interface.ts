import { Model } from "mongoose";

// Define the structure of a category object
export type ICategory = {
  name: string;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
};

export type CategoryModel = Model<ICategory, Record<string, unknown>>;

// Define the structure of a category search object
export type ICategorySearch = {
  searchTerm?: string;
  name?: string;
  status?: string;
};