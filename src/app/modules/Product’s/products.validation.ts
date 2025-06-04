import { z } from 'zod';

// req validation for Product
const createProductZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'name is required',
    }),
    price: z.string({
      required_error: 'price is required',
    }),
    category: z.string({
      required_error: 'category is required',
    }),
    stock: z.number({
      required_error: 'stock is required',
    }),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  }),
});

const updateProductZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    price: z.string().optional(),
    category: z.string().optional(),
    stock: z.number().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  }),
});

export const ProductValidation = {
  createProductZodSchema,
  updateProductZodSchema,
};
