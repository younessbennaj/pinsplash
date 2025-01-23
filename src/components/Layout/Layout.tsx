import { Link, Outlet } from 'react-router';
import logo from '../../assets/logo.svg';
import logoXs from '../../assets/logo-xs.svg';
import SearchForm from '../SearchForm/SearchForm';
import React from 'react';

function Layout() {
  const [query, setQuery] = React.useState('');
  function handleLogoClick() {
    setQuery('');
  }
  return (
    <div>
      <header className="flex gap-4 p-4 md:px-[112px] items-center">
        <nav>
          <Link to="/" onClick={handleLogoClick}>
            <img className="md:hidden" alt="pinsplash logo" src={logoXs} />
            <img className="hidden md:block" alt="pinsplash logo" src={logo} />
          </Link>
        </nav>
        <div className="grow py-3">
          <SearchForm query={query} setQuery={setQuery} />
        </div>
      </header>
      <div className="px-4 py-10 lg:py-12 lg:px-[112px]">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
