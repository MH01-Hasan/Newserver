import { Model, Schema } from "mongoose";

export interface IProduct {
  name: string;
  price: string; // Changed to number for price
  category: Schema.Types.ObjectId;
  stock: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ProductsModel = Model<IProduct, Record<string, unknown>>;

// Define the structure of a category search object
export type IProductSearch = {
  searchTerm?: string;
  name?: string;
  category?: Schema.Types.ObjectId;
  status?: string;
};
