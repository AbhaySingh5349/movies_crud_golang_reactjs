import { Link } from 'react-router-dom';

const movies = [
  {
    name: 'm1sssssssssssssssssssssssssssssssssssssssssssssssssssss',
    date: 'd1',
    rating: 'r1',
  },
  {
    name: 'm2',
    date: 'd2',
    rating: 'r2',
  },
  {
    name: 'm3',
    date: 'd3',
    rating: 'r3',
  },
];

const Movies = () => {
  return (
    <div className="mx-auto grid grid-cols-3 gap-4 items-center">
      {/* Header */}
      <div className="col-span-1 border-b pb-2">
        <h2 className="font-bold">Movie Name</h2>
      </div>
      <div className="col-span-1 border-b pb-2">
        <h2 className="font-bold">Release Date</h2>
      </div>
      <div className="col-span-1 border-b pb-2">
        <h2 className="font-bold">Average Rating</h2>
      </div>

      {/* Movie Data */}
      {movies.map((movie) => (
        <Link key={movie.name} to={`/movies/${movie.name}`}>
          <div className="col-span-1 hover:bg-neutral-100">
            {movie.name.length > 30
              ? `${movie.name.slice(0, 30)}...`
              : movie.name}
          </div>
          <div className="col-span-1">{movie.date}</div>
          <div className="col-span-1">{movie.rating}</div>
        </Link>
      ))}
    </div>
  );
};

export default Movies;
