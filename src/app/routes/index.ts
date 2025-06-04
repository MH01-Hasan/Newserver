import express from 'express';
import { UserRoutes } from '../modules/user/user.router';
import { AuthRoutes } from '../modules/auth/auth.router';
import { CategoryRoutes } from '../modules/category/category.router';
import { ProductRoutes } from '../modules/Product’s/products.router';


const router = express.Router();

const apiroutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/category',
    route: CategoryRoutes,
  },
  {
    path: '/product',
    route: ProductRoutes,
  }


 

];

apiroutes.forEach(route => router.use(route.path, route.route));

export default router;
