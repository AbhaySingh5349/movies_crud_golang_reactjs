import { BiSolidCameraMovie, BiSolidCommentEdit } from 'react-icons/bi';

import { IoOptions } from 'react-icons/io5';
import { MdAddCard } from 'react-icons/md';
import { PiGraphBold } from 'react-icons/pi';

export const loggedInCategories = [
  {
    label: 'Movies',
    icon: BiSolidCameraMovie,
    route: '/',
  },
  {
    label: 'Genres',
    icon: IoOptions,
    route: 'genres',
  },
  {
    label: 'Add Movie',
    icon: MdAddCard,
    route: 'admin/movies/new',
  },
  {
    label: 'Manage Catalogue',
    icon: BiSolidCommentEdit,
    route: 'admin/movies',
  },
  {
    label: 'GraphQL',
    icon: PiGraphBold,
    route: 'admin/search',
  },
];

export const loggedOutCategories = [
  {
    label: 'Movies',
    icon: BiSolidCameraMovie,
    route: '/',
  },
  {
    label: 'Genres',
    icon: IoOptions,
    route: 'genres',
  },
];

export type GenreFormKey =
  | 'genre_Action'
  | 'genre_Adventure'
  | 'genre_Animation'
  | 'genre_Comedy'
  | 'genre_Drama'
  | 'genre_Fantasy'
  | 'genre_Horror'
  | 'genre_Mystery'
  | 'genre_Romance'
  | 'genre_Sci-Fi'
  | 'genre_Superhero'
  | 'genre_Thriller'
  | 'genre_Crime';
