import { useEffect, useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as z from 'zod';

import axios from 'axios';

import { MovieSchema } from '../../types/validations';
import { MovieData } from '../../types';

import { JwtContext } from '../../context/JwtContext';

import { GenreFormKey } from '../../constants/index';

interface Genre {
  id: number;
  genre: string;
  checked: boolean;
}

interface GenresObject {
  [key: string]: boolean;
}

const MovieForm = () => {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    axios
      .get('/genres')
      .then(({ data }) => {
        console.log('all genres data: ', data);
        setGenres(data);
      })
      .catch((err) => {
        alert(`Error in fetching results: ${err}`);
      });
  }, []);

  const navigate = useNavigate();

  const { movieId } = useParams();
  console.log('ID in Movies Form: ', movieId);

  const { jwtToken } = useContext(JwtContext);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof MovieSchema>>({
    mode: 'onChange',
    resolver: zodResolver(MovieSchema),
  });

  useEffect(() => {
    if (jwtToken === '') {
      alert('Only admins have access to this route');
      navigate('/');
      return;
    }

    if (!movieId) return;
  }, [jwtToken, navigate, movieId, reset]);

  const formSubmitHandler: SubmitHandler<z.infer<typeof MovieSchema>> = async (
    data: MovieData
  ) => {
    const checkedGenreIds: number[] = genres
      .filter((item: Genre) => data[`genre_${item.genre}` as GenreFormKey])
      .map((item: Genre) => item.id);

    if (checkedGenreIds.length === 0) {
      alert('select at least 1 genre');
      return;
    }

    const updatedGenres: Genre[] = genres.map((item: Genre) => ({
      ...item,
      checked: data[`genre_${item.genre}` as GenreFormKey],
    }));

    const movieData = {
      title: data.title,
      releaseDate: data.releaseDate,
      description: data.description,
      runtime: data.runtime,
      mpaa_rating: data.mpaa_rating,
      genres: updatedGenres,
      geners_array: checkedGenreIds,
    };

    console.log('input movie data: ', movieData);

    if (movieId) {
      // Update existing movie
      console.log('UPDATE EXISTING Movie');
    } else {
      // New Movie
      console.log('ADD NEW Movie');
    }
  };

  function inputHeader(text: string) {
    return <h2 className="text-xl mt-4 text-primary-500">{text}</h2>;
  }

  return (
    <form
      onSubmit={handleSubmit(formSubmitHandler)}
      className="mx-auto max-w-3xl grow relative"
    >
      {inputHeader('Title')}
      <input
        type="text"
        placeholder="movie name"
        {...register('title')}
        className="form-input"
      />
      {errors.title && (
        <span className="text-primary-error">{errors.title.message}</span>
      )}
      {inputHeader('Release Date')}
      <input
        type="date"
        placeholder="release date"
        {...register('releaseDate')}
        className="form-input"
      />
      {errors.releaseDate && (
        <span className="text-primary-error">{errors.releaseDate.message}</span>
      )}
      {inputHeader('Runtime')}
      <input
        type="number"
        placeholder="movie length in minutes"
        {...register('runtime')}
        className="form-input"
      />
      {errors.runtime && (
        <span className="text-primary-error">{errors.runtime.message}</span>
      )}
      {inputHeader('Rating')}
      <input
        type="text"
        placeholder="mpaa ratings accepted"
        {...register('mpaa_rating')}
        className="form-input"
      />
      {errors.mpaa_rating && (
        <span className="text-primary-error">{errors.mpaa_rating.message}</span>
      )}
      {inputHeader('Description')}
      <span className="text-gray-500 text-sm">(upto 200 characters)</span>
      <textarea
        placeholder="description of movie"
        {...register('description')}
        className="form-input h-32"
      />
      {errors.description && (
        <span className="text-primary-error">{errors.description.message}</span>
      )}
      {inputHeader('Genres')}
      <div className="grid gap-1 grid-cols-2 md:grid-cols-3 mt-2">
        {genres?.length > 0 &&
          genres.map((item: Genre) => (
            <label
              className="flex gap-1 items-center border p-4 cursor-pointer"
              key={item.id}
            >
              <input
                type="checkbox"
                key={item.id}
                id={`${item.id}`}
                {...register(`genre_${item.genre}` as GenreFormKey)}
              />
              <span>
                {item.genre.charAt(0).toUpperCase() + item.genre.slice(1)}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
            </label>
          ))}
      </div>
      <button
        className="btn btn-primary w-1/2 mx-auto absolute left-1/2 transform -translate-x-1/2 mt-16"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting
          ? movieId
            ? 'Updating Place...'
            : 'Adding Place...'
          : movieId
          ? 'Update Place'
          : 'Add Place'}
      </button>
    </form>
  );
};

export default MovieForm;
