import { Model } from "mongoose";

// Define the structure of an event object
export type IRole = {
  name: string;
  createdAt: Date;
  updatedAt: Date;

};

export type RoleModel = Model<IRole, Record<string, unknown>>;

// Define the structure of an event search object
export type IRoleSearch = {
  searchTerm?: string;
  name?: string;
  status?: string;
};