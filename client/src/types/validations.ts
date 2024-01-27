import * as z from 'zod';

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email('This is not a valid email.'),
  password: z
    .string()
    .min(4, { message: 'Password should have min 4 characters' }),
});

export const MovieSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title exceeds limit of 50 characters'),
  releaseDate: z.coerce.date().refine((date) => date > new Date(), {
    message: 'Date must be in future',
  }),
  description: z
    .string()
    .min(3, 'Description must be at least 3 characters')
    .max(200, 'Description exceeds limit of 200 characters'),
  genre_action: z.boolean().default(false),
  genre_animation: z.boolean().default(false),
  genre_comedy: z.boolean().default(false),
  genre_thriller: z.boolean().default(false),
  genre_horror: z.boolean().default(false),
  genre_romance: z.boolean().default(false),
  genre_scifi: z.boolean().default(false),
  mpaa_rating: z.coerce.string(),
});
