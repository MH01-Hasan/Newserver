import { z } from 'zod';

// Create Category zod schema
const CreateCategoryZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'name is required',
    }),
  }),
});

// Update Category zod schema
const UpdateCategoryZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    status: z.string().optional(),
  }),
});

// Export Category validation schemas
export const CategoryValidation = {
  CreateCategoryZodSchema,
  UpdateCategoryZodSchema,
};
