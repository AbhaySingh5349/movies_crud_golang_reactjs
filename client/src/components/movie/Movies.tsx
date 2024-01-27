import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { JwtContext } from '../../context/JwtContext';

interface Movie {
  id: number;
  title: string;
  release_date: Date;
  mpaa_rating: string;
}

type HeadersType = {
  'Content-Type': string;
  Authorization?: string;
};

const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const navigate = useNavigate();

  const { pathname } = useLocation();
  console.log('PATHNAME IN MOVIES: ', pathname);
  const isAdminRoute = pathname.split('/')?.[1] === 'admin';
  console.log('isAdminRoute: ', isAdminRoute);

  const { jwtToken } = useContext(JwtContext);

  useEffect(() => {
    if (isAdminRoute && jwtToken === '') {
      alert('Only admins have access to this route');
      navigate('/');
    }
    const headers: HeadersType = {
      'Content-Type': 'application/json', // Specify the content type, e.g., JSON
    };

    if (isAdminRoute) {
      headers['Authorization'] = `Bearer ${jwtToken}`; // If using authorization, provide your token

      axios
        .get('/admin/movies', { headers })
        .then(({ data }) => {
          console.log('all movies: ', data);
          setMovies(data);
        })
        .catch((err) => {
          alert(`Error in fetching results for admin route: ${err}`);
        });
    } else {
      axios
        .get('/movies')
        .then(({ data }) => {
          console.log('all movies: ', data);
          setMovies(data);
        })
        .catch((err) => {
          alert(`Error in fetching results: ${err}`);
        });
    }
  }, [isAdminRoute, navigate]);

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
      {movies?.length > 0 &&
        movies.map((movie: Movie) => (
          <React.Fragment key={movie?.id}>
            <Link
              to={
                isAdminRoute
                  ? `/admin/movies/${movie?.id}`
                  : `/movies/${movie?.id}`
              }
              className="col-span-1 hover:bg-neutral-100"
            >
              <h3>
                {movie?.title.length > 30
                  ? `${movie?.title.slice(0, 30)}...`
                  : movie?.title}
              </h3>
            </Link>
            <div className="col-span-1">{formatDate(movie?.release_date)}</div>
            <div className="col-span-1">{movie?.mpaa_rating}</div>
          </React.Fragment>
        ))}
    </div>
  );
};

export default Movies;
