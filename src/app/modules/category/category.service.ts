import { SortOrder } from 'mongoose';
import { Pagination_helper } from '../../../halper/paginationhelper';
import { IgenericResponse } from '../../../interface/common';
import { IpaginationObject } from '../../../interface/pagination';
import ApiError from '../../../error/ApiError';
import httpStatus from 'http-status';
import { ICategory, ICategorySearch } from './category.interface';
import { Category } from './category.model';
import { CategorySearchFields } from './category.conts';

const createCategory = async (payload: ICategory): Promise<ICategory> => {
  const result = await Category.create(payload);
  return result;
};

const getAllCategory = async (
  filtering: ICategorySearch,
  PaginationObject: IpaginationObject
): Promise<IgenericResponse<ICategory[]>> => {
  const { searchTerm, ...filterData } = filtering;

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: CategorySearchFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filterData).length) {
    andCondition.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    Pagination_helper.calculatePagination(PaginationObject);

  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const findCondition = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await Category.find(findCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await Category.countDocuments(findCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleCategory = async (id: string): Promise<ICategory> => {
  const result = await Category.findById(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  return result;
};

const updateCategory = async (id: string, payload: Partial<ICategory>) => {
  const isExist = await Category.findById(id);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }

  const { name, ...categoryData } = payload;

  const updateCategoryData: Partial<ICategory> = { ...categoryData };
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`;
      (updateCategoryData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await Category.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteCategory = async (id: string): Promise<ICategory | null> => {
  const result = await Category.findByIdAndDelete(id);
  return result;
};

export const CategoryService = {
  createCategory,
  getAllCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
