import { z } from "zod";

export const favoriteSchema = z.object({
  title: z.string().min(1, "Title is required"),
  type: z.enum(["Movie", "TV Show"], {
    errorMap: () => ({ message: "Type must be either 'Movie' or 'TV Show'" }),
  }),
  director: z.string().min(1, "Director is required"),
  budget: z.number().positive("Budget must be a positive number"),
  location: z.string().min(1, "Location is required"),
  duration: z.string().min(1, "Duration is required"),
  year_or_time: z.string().min(1, "Year/Time is required"),
});

export type FavoriteInput = z.infer<typeof favoriteSchema>;

// Pagination query schema
export const paginationSchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 1))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Page must be a positive integer",
    }),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 10))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Limit must be a positive integer",
    }),
});
