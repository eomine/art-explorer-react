import { Route, Routes } from 'react-router';
import Layout from './Layout.tsx';
import Favorites from './pages/Favorites.tsx';
import Home from './pages/Home.tsx';
import PageNotFound from './pages/PageNotFound.tsx';

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
