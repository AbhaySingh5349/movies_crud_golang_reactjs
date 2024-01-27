import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Genre {
  id: number;
  genre: string;
  checked: boolean;
}

const Genres = () => {
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

  return (
    <div>
      <h1 className="mb-4 font-semibold">Genres</h1>
      <hr />
      <div className="mt-4 grid grid-cols-4 gap-2">
        {genres?.length > 0 &&
          genres.map((item: Genre) => (
            <Link
              to={`/genres/${item.genre}`}
              key={item.id}
              className="bg-gray-200 text-gray-800 py-1 px-2 rounded cursor-pointer hover:bg-gray-300 transition duration-300"
            >
              {item.genre}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Genres;
