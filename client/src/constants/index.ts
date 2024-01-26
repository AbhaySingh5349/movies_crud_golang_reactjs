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
    route: 'profile/movies/new',
  },
  {
    label: 'Manage Catalogue',
    icon: BiSolidCommentEdit,
    route: 'profile/movies',
  },
  {
    label: 'GraphQL',
    icon: PiGraphBold,
    route: 'searchMovie',
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

export const genres = [
  'Action',
  'Animation',
  'Comedy',
  'Thriller',
  'Horror',
  'Romance',
  'Sci-fi',
];
