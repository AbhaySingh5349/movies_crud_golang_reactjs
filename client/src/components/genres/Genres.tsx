import { Link } from 'react-router-dom';

import { genres } from '../../constants';

const Genres = () => {
  return (
    <div>
      <h1 className="mb-4 font-semibold">Genres</h1>
      <hr />
      <div className="mt-4 flex flex-col gap-2">
        {genres.map((genre) => (
          <Link
            to={`/genres/${genre}`}
            key={genre.id}
            className="bg-gray-200 text-gray-800 py-1 px-2 rounded cursor-pointer hover:bg-gray-300 transition duration-300"
          >
            {genre.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Genres;
