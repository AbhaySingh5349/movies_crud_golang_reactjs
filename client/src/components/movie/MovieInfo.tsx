import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Movie {
  id: number;
  title: string;
  release_date: Date;
  runtime: number;
  mpaa_rating: string;
  description: string;
  genres: {
    id: number;
    genre: string;
  }[];
  image?: string;
}

const MovieInfo = () => {
  const [movie, setMovie] = useState<Movie>();

  const { movieId } = useParams();
  console.log('ID in Movies Info: ', movieId);

  useEffect(() => {
    axios
      .get(`/movies/${movieId}`)
      .then(({ data }) => {
        console.log('movie by id data: ', data);
        setMovie(data);
      })
      .catch((err) => {
        alert(`Error in fetching results: ${err}`);
      });
  }, []);

  function formatDate(dateString: any) {
    if (!dateString) return;
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }

  return (
    <div className="ml-8">
      <h1 className="text-xl font-bold mb-2">{movie?.title}</h1>
      <p>
        {formatDate(movie?.release_date)} , Runtime: {movie?.runtime} Rated{' '}
        {movie?.mpaa_rating}
      </p>
      <div className="mt-4 mb-4">
        {movie?.genres.map((item: any) => (
          <span
            key={item.id}
            className="bg-gray-200 text-gray-800 py-1 px-2 mr-2 rounded"
          >
            {item.genre}
          </span>
        ))}
      </div>
      <hr />

      {movie?.image && (
        <div className="w-48 h-64 overflow-hidden my-4">
          <img
            className="w-full h-full object-cover"
            src={`https://image.tmdb.org/t/p/w200/${movie?.image}`}
            alt={movie?.title}
          />
        </div>
      )}
      <hr />
      <p className="text-gray-600 mt-4">{movie?.description}</p>
    </div>
  );
};

export default MovieInfo;
