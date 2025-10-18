import { Link, Outlet } from 'react-router';
import DarkModeToggle from './components/DarkModeToggle';

export default function Layout() {
  return (
    <>
      <h1>The Met Art Museum Art Explorer</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites</Link>
        <DarkModeToggle />
      </nav>
      <Outlet />
    </>
  );
}
