import { Route, Routes } from 'react-router';
import Favorites from './Favorites.tsx';
import Home from './Home.tsx';
import Layout from './Layout.tsx';
import PageNotFound from './PageNotFound.tsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/search/:query" element={<Home />} />
        <Route
          path="/search/:query/department/:departmentId"
          element={<Home />}
        />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}
