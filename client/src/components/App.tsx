import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

import { Layout, Movies, Login, MovieInfo, Genres, MovieForm } from './index';

axios.defaults.baseURL = process.env.REACT_APP_AXIOS_BASE_URL;
axios.defaults.withCredentials = true; // to save cookie in browser

const App = () => {
  console.log(
    'process.env.REACT_APP_AXIOS_BASE_URL: ',
    process.env.REACT_APP_AXIOS_BASE_URL
  );
  return (
    <main>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Movies />} />
          <Route path="/movies/:movieId" element={<MovieInfo />} />
          <Route path="/profile/movies/new" element={<MovieForm />} />
          <Route path="/profile/movies" element={<Movies />} />
          <Route path="/genres" element={<Genres />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </main>
  );
};

export default App;
