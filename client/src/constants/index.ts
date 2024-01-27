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

export const genres = [
  {
    id: 5,
    label: 'Action',
  },
  {
    id: 10,
    label: 'Animation',
  },
  {
    id: 1,
    label: 'Comedy',
  },
  {
    id: 6,
    label: 'Thriller',
  },
  {
    id: 3,
    lebel: 'Horror',
  },
  {
    id: 4,
    label: 'Romance',
  },
  {
    id: 2,
    label: 'Sci-fi',
  },
];
