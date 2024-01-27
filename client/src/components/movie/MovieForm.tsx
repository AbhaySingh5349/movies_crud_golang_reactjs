import { useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as z from 'zod';

import { MovieSchema } from '../../types/validations';
import { MovieData } from '../../types';

import { JwtContext } from '../../context/JwtContext';

interface GenresObject {
  [key: string]: boolean;
}

const MovieForm = () => {
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
    }

    if (!movieId) return;
  }, [jwtToken, navigate, movieId, reset]);

  const formSubmitHandler: SubmitHandler<z.infer<typeof MovieSchema>> = async (
    data: MovieData
  ) => {
    console.log('input movie data: ', data);
    const movieData = {
      title: data.title,
      releaseDate: data.releaseDate,
      description: data.description,
      genre_action: data.genre_action,
      genre_animation: data.genre_animation,
      genre_comedy: data.genre_comedy,
      genre_thriller: data.genre_thriller,
      genre_horror: data.genre_horror,
      genre_romance: data.genre_romance,
      genre_scifi: data.genre_scifi,
      mpaa_rating: data.mpaa_rating,
    };

    if (movieId) {
      // Update existing Place
      //   console.log('UPDATE EXISTING PLACE');
      //   try {
      //     await axios.put('/movies', {
      //       movieId,
      //       ...placeData,
      //     });
      //     alert('form submitted with updates');
      //     reset();
      //     navigate('/profile/accomodations');
      //   } catch (err) {
      //     alert(`Failed to login: ${err}`);
      //     navigate('/login');
      //   }
    } else {
      // New Place
      console.log('ADD NEW PLACE: ');
      //   try {
      //     await axios.post('/accomodations', placeData);
      //     alert('form submitted');
      //     reset();
      //     navigate('/profile/accomodations');
      //   } catch (err) {
      //     alert(`Failed to upload, please check if you are logged-in: ${err}`);
      //   }
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
        <label className="flex gap-1 items-center border p-4 cursor-pointer">
          <input type="checkbox" {...register('genre_action')} />
          <span>Wifi</span>
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
        <label className="flex gap-1 items-center border p-4 cursor-pointer">
          <input type="checkbox" {...register('genre_animation')} />
          <span>LCD</span>
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
        <label className="flex gap-1 items-center border p-4 cursor-pointer">
          <input type="checkbox" {...register('genre_comedy')} />
          <span>Comedy</span>
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
        <label className="flex gap-1 items-center border p-4 cursor-pointer">
          <input type="checkbox" {...register('genre_thriller')} />
          <span>Thriller</span>
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
        <label className="flex gap-1 items-center border p-4 cursor-pointer">
          <input type="checkbox" {...register('genre_horror')} />
          <span>Horror</span>
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
        <label className="flex gap-1 items-center border p-4 cursor-pointer">
          <input type="checkbox" {...register('genre_romance')} />
          <span>Romance</span>
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
        <label className="flex gap-1 items-center border p-4 cursor-pointer">
          <input type="checkbox" {...register('genre_scifi')} />
          <span>Sci-fi</span>
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
      </div>
      {inputHeader('Rating')}
      <input
        type="number"
        placeholder="rate movie on scale of 1-10"
        {...register('mpaa_rating')}
        className="form-input"
      />
      {errors.mpaa_rating && (
        <span className="text-primary-error">{errors.mpaa_rating.message}</span>
      )}
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
