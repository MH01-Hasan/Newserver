import { SortOrder } from 'mongoose';
import { Pagination_helper } from '../../../halper/paginationhelper';
import { IgenericResponse } from '../../../interface/common';
import { IpaginationObject } from '../../../interface/pagination';
import ApiError from '../../../error/ApiError';
import httpStatus from 'http-status';
import { IProduct, IProductSearch } from './products.interface';
import { Product } from './products.model';
import { ProductSearchValues } from './products.conts';
// import { IProduct, IProductFilters } from './product.interface';
// import { Product } from './product.model';
// import { ProductSearchvalue } from './product.consts';

const createProduct = async (payload: IProduct): Promise<IProduct> => {
  const isExist = await Product.findOne({ name: payload.name });
  if (isExist) {
    throw new ApiError(httpStatus.CONFLICT, 'Product Already Exist');
  }
  const result = await Product.create(payload);
  return result;
};

const getAllProduct = async (
  filtering: IProductSearch,
  PaginationObject: IpaginationObject
): Promise<IgenericResponse<IProduct[]>> => {
  const { searchTerm, ...filterData } = filtering;

  const andCondition = [];

  if (searchTerm) {
    // ✅ Only include fields that are of type string in your schema
    // const stringFieldsOnly = ProductSearchValues.filter(field =>
    //   ['name'].includes(field) // replace with actual string fields from your schema
    // );

    andCondition.push({
      $or: ProductSearchValues.map(field => ({
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

  const result = await Product.find(findCondition)
    .populate('category')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Product.countDocuments(findCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};



const getSingleProduct = async (id: string): Promise<IProduct> => {
  const result = await Product.findById(id)
    .populate('category')
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  return result;
};

const updateProduct = async (id: string, payload: Partial<IProduct>) => {
  const isExist = await Product.findById(id);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product Cannot find');
  }

  const { name, ...productData } = payload;
  const updateProductData: Partial<IProduct> = { ...productData };
  // dynamic data handle
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`;
      (updateProductData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await Product.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
    .populate('category')
  return result;
};

const deleteProduct = async (id: string): Promise<IProduct | null> => {
  const result = await Product.findByIdAndDelete(id);
  return result;
};

export const ProductService = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
