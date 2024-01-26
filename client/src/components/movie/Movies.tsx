import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Movie {
  id: number;
  title: string;
  release_date: Date;
  rating: string;
}

const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    axios
      .get('/movies')
      .then(({ data }) => {
        console.log('all movies: ', data);
        setMovies(data);
      })
      .catch((err) => {
        alert(`Error in fetching results: ${err}`);
      });
  }, []);

  function formatDate(dateString: any) {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }

  return (
    <div className="mx-auto grid grid-cols-3 gap-4 items-center">
      {/* Header */}
      <div className="col-span-1 border-b pb-2">
        <h2 className="font-bold">Movie Title</h2>
      </div>
      <div className="col-span-1 border-b pb-2">
        <h2 className="font-bold">Release Date</h2>
      </div>
      <div className="col-span-1 border-b pb-2">
        <h2 className="font-bold">Average Rating</h2>
      </div>

      {/* Movie Data */}
      {movies.length > 0 &&
        movies?.map((movie: Movie) => (
          <React.Fragment key={movie?.id}>
            <Link
              key={movie?.title}
              to={`/movies/${movie?.title}`}
              className="col-span-1 hover:bg-neutral-100"
            >
              <h3>
                {movie?.title.length > 30
                  ? `${movie?.title.slice(0, 30)}...`
                  : movie?.title}
              </h3>
            </Link>
            <div className="col-span-1">{formatDate(movie?.release_date)}</div>
            <div className="col-span-1">{movie?.rating}</div>
          </React.Fragment>
        ))}
    </div>
  );
};

export default Movies;
