import { Request, Response } from 'express';
import catchasync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import pick from '../../../shared/pick';
import { pagination } from '../../../conostans/pagination';

import { cloudinaryDestroy } from '../../../halper/ImageUploadHelper';
import { ProductService } from './products.service';
import { ProductFilterFields } from './products.conts';
import { IProduct } from './products.interface';

// ..........................Create Product.............................................
const createProduct = catchasync(async (req: Request, res: Response) => {
  const product = req.body;
  console.log(product);
  const result = await ProductService.createProduct(product);
  console.log(result);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successfully created Product',
    data: result,
  });
});

const getAllProduct = catchasync(async (req: Request, res: Response) => {
  const filtering = pick(req.query, ProductFilterFields);
  const PaginationObject = pick(req.query, pagination);
  const result = await ProductService.getAllProduct(
    filtering,
    PaginationObject
  );

  sendResponse<IProduct[]>(res, {
    statusCode: 200,
    success: true,
    message: 'All Product data',
    meta: result.meta,
    data: result.data,
  });
});

// ..........................Get single Product.............................................
const getSingleProduct = catchasync(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: 'ID is required' });
  }
  const result = await ProductService.getSingleProduct(id);

  sendResponse<IProduct>(res, {
    statusCode: 200,
    success: true,
    message: 'Product Data',
    data: result,
  });
});

// ..........................Update Product.............................................
const updateProduct = catchasync(async (req: Request, res: Response) => {
  const { oldprofileImage, profileImage } = req.body;

  if (profileImage.mediaId === null) {
    delete req.body.oldprofileImage;
  } else if (profileImage.mediaId && oldprofileImage?.mediaId) {
    if (oldprofileImage?.mediaId !== profileImage?.mediaId) {
      await cloudinaryDestroy(oldprofileImage?.mediaId);
    }
  } else if (profileImage.mediaId) {
    delete req.body.oldprofileImage;
  }

  const id: string = req.params.id;
  const updatedata = req.body;

  const result = await ProductService.updateProduct(id, updatedata);
  console.log(result);
  sendResponse<IProduct>(res, {
    statusCode: 200,
    success: true,
    message: 'Update Product Data Successfully',
    data: result,
  });
});

// ...........................Delete Product.............................................
const deleteProduct = catchasync(async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const result = await ProductService.deleteProduct(id);
  sendResponse<IProduct>(res, {
    statusCode: 200,
    success: true,
    message: 'Delete Product Data Successfully',
    data: result,
  });
});

export const ProductController = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
