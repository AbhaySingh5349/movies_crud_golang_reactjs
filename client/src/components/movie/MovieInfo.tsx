import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const default_movie = {
  title: '',
  description: '',
};

interface Movie {
  id: number;
  title: string;
  description: string;
  image?: string;
  mpaa_rating: string;
  runtime: number;
  genres: {
    id: number;
    genre: string;
  }[];
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

  return (
    <div className="ml-8">
      <h1 className="text-xl font-bold mb-2">{movie?.title}</h1>
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
      {/* <img
        src={`https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg`}
        alt={`movie.name`}
        className="w-full h-1/2 object-cover mb-4 rounded mt-4"
      /> */}
      <div className="w-48 h-48 overflow-hidden my-4">
        <img
          className="w-full h-full object-cover"
          src={movie?.image}
          alt={movie?.title}
        />
      </div>
      <hr />
      <p className="text-gray-600 mt-4">{movie?.description}</p>
    </div>
  );
};

export default MovieInfo;
