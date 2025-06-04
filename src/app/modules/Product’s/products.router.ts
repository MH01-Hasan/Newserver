import express from 'express';
import validateRequest from '../../middelware/validateRequest';
// import auth from '../../middelware/auth';
// import { ENUM_USER_Role } from '../../../enums/user';
import { ProductController } from './products.controller';
import { ProductValidation } from './products.validation';

const router = express.Router();

router.delete(
  '/:id',
  // auth(ENUM_USER_Role.SUPER_ADMIN, ENUM_USER_Role.USER),
  ProductController.deleteProduct
);

router.patch(
  '/:id',
  validateRequest(ProductValidation.updateProductZodSchema),
  // auth(ENUM_USER_Role.SUPER_ADMIN, ENUM_USER_Role.USER),
  ProductController.updateProduct
);

router.get(
  '/:id',
  // auth(
  //   ENUM_USER_Role.SUPER_ADMIN,
  //   ENUM_USER_Role.ADMIN,
  //   ENUM_USER_Role.USER
  // ),
  ProductController.getSingleProduct
);

router.post(
  '/',
  validateRequest(ProductValidation.createProductZodSchema),
  // auth(ENUM_USER_Role.SUPER_ADMIN, ENUM_USER_Role.ADMIN),
  ProductController.createProduct
);

router.get(
  '/',
  // auth(
  //   ENUM_USER_Role.SUPER_ADMIN,
  //   ENUM_USER_Role.ADMIN,
  //   ENUM_USER_Role.USER
  // ),
  ProductController.getAllProduct
);

export const ProductRoutes = router;
