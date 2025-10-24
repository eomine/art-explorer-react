import { BrowserRouter, Route, Routes } from 'react-router';
import Layout from './Layout';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';

export default function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}
