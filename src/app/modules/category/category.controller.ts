import { Request, Response } from 'express';
import catchasync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import pick from '../../../shared/pick';
import { pagination } from '../../../conostans/pagination';
import { CategoryService } from './category.service';
import { ICategory } from './category.interface';
import { CategoryFilterFields } from './category.conts';

// ..........................Create Category.............................................
const createCategory = catchasync(async (req: Request, res: Response) => {
  const event = req.body;
  const result = await CategoryService.createCategory(event);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successfully created Category',
    data: result,
  });
});

const getAllCategory = catchasync(async (req: Request, res: Response) => {
  const filtering = pick(req.query, CategoryFilterFields);
  const PaginationObject = pick(req.query, pagination);
  const result = await CategoryService.getAllCategory(
    filtering,
    PaginationObject
  );

  sendResponse<ICategory[]>(res, {
    statusCode: 200,
    success: true,
    message: 'All Category data',
    meta: result.meta,
    data: result.data,
  });
});

// ..........................Get single Category.............................................
const getSingleCategory = catchasync(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: 'ID is required' });
  }
  const result = await CategoryService.getSingleCategory(id);

  sendResponse<ICategory>(res, {
    statusCode: 200,
    success: true,
    message: 'Category Data',
    data: result,
  });
});

// ..........................Update Category.............................................
const updateCategory = catchasync(async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const updatedata = req.body;

  const result = await CategoryService.updateCategory(id, updatedata);
  sendResponse<ICategory>(res, {
    statusCode: 200,
    success: true,
    message: 'Category Data Successfully Updated',
    data: result,
  });
});

// ...........................Delete Category.............................................
const deleteCategory = catchasync(async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const result = await CategoryService.deleteCategory(id);
  sendResponse<ICategory>(res, {
    statusCode: 200,
    success: true,
    message: 'Deleted Category Data Successfully',
    data: result,
  });
});

export const CategoryController = {
  createCategory,
  getAllCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
