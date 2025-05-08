
import * as z from 'zod';

export const formSchema = z.object({
  title: z.string().min(5, { message: "Tytuł musi mieć co najmniej 5 znaków" }),
  content: z.string().min(20, { message: "Treść musi mieć co najmniej 20 znaków" }),
  excerpt: z.string().optional(),
  category: z.string(),
  tags: z.string(),
  visibility: z.enum(["public", "premium", "private"]),
  featuredImage: z.string().optional(),
});
