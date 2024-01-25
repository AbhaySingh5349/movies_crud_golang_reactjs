import { Routes, Route } from 'react-router-dom';

import { Layout, Movies, Login, MovieInfo, Genres, MovieForm } from './index';

const App = () => {
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
