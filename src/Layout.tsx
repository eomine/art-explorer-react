import { Link, Outlet } from 'react-router';

export default function Layout() {
  return (
    <>
      <h1>The Met Art Museum Art Explorer</h1>
      <nav>
        <Link to="/">Search</Link>
        <Link to="/favorites">Favorites</Link>
      </nav>
      <Outlet />
    </>
  );
}
