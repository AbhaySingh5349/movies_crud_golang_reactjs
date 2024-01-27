import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const genres = ['ABC', 'DEF', 'GHI'];

const default_movie = {
  name: '',
  description: '',
};

const MovieInfo = () => {
  const [movie, setMovie] = useState(default_movie);

  const { movieId } = useParams();
  console.log('ID in Movies Info: ', movieId);

  useEffect(() => {
    const data = {
      name: 'Intesteller',
      description: 'it is a sc-fi movie',
    };
    setMovie(data);
  }, []);

  return (
    <div className="ml-8">
      <h1 className="text-xl font-bold mb-2">{movie.name}</h1>
      <div className="mt-4 mb-4">
        {genres.map((genre) => (
          <span
            key={genre}
            className="bg-gray-200 text-gray-800 py-1 px-2 mr-2 rounded"
          >
            {genre}
          </span>
        ))}
      </div>
      <hr />
      <img
        src={`https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg`}
        alt={`movie.name`}
        className="w-full h-40 object-cover mb-4 rounded mt-4"
      />
      <hr />
      <p className="text-gray-600 mt-4">{movie.description}</p>
    </div>
  );
};

export default MovieInfo;
