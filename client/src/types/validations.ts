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
  release_date: z.coerce.date().refine((date) => date > new Date(), {
    message: 'Date must be in future',
  }),
  runtime: z.coerce.number().nonnegative(),
  description: z
    .string()
    .min(3, 'Description must be at least 3 characters')
    .max(200, 'Description exceeds limit of 200 characters'),
  genre_Action: z.boolean().default(false),
  genre_Adventure: z.boolean().default(false),
  genre_Animation: z.boolean().default(false),
  genre_Comedy: z.boolean().default(false),
  genre_Drama: z.boolean().default(false),
  genre_Fantasy: z.boolean().default(false),
  genre_Horror: z.boolean().default(false),
  genre_Mystery: z.boolean().default(false),
  genre_Romance: z.boolean().default(false),
  'genre_Sci-Fi': z.boolean().default(false),
  genre_Superhero: z.boolean().default(false),
  genre_Thriller: z.boolean().default(false),
  genre_Crime: z.boolean().default(false),
  mpaa_rating: z.coerce.string(),
});
