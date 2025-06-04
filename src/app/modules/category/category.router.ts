import express from 'express';
import validateRequest from '../../middelware/validateRequest';
import auth from '../../middelware/auth';
import { CategoryController } from './category.controller';
import { CategoryValidation } from './category.validation';

const router = express.Router();

router.delete(
  '/:id',
  // auth(ENUM_USER_Role.SUPER_ADMIN, ENUM_USER_Role.USER),
  CategoryController.deleteCategory
);

router.patch(
  '/:id',
  validateRequest(CategoryValidation.UpdateCategoryZodSchema),
  // auth(ENUM_USER_Role.SUPER_ADMIN, ENUM_USER_Role.USER),
  CategoryController.updateCategory
);

router.get(
  '/:id',
  // auth(ENUM_USER_Role.SUPER_ADMIN, ENUM_USER_Role.ADMIN, ENUM_USER_Role.USER),
  CategoryController.getSingleCategory
);

router.post(
  '/',
  validateRequest(CategoryValidation.CreateCategoryZodSchema),
  // auth(ENUM_USER_Role.SUPER_ADMIN, ENUM_USER_Role.ADMIN),
  CategoryController.createCategory
);

router.get(
  '/',
  // auth(ENUM_USER_Role.SUPER_ADMIN, ENUM_USER_Role.ADMIN, ENUM_USER_Role.USER),
  CategoryController.getAllCategory
);

export const CategoryRoutes = router;
