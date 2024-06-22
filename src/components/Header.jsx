import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const isAboutPage = location.pathname === '/about';

  return (
    <header className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center bg-transparent z-10">
      <Link to="/" className={`text-2xl font-bold ${isAboutPage ? 'text-white' : 'text-black'}`}>
        Sign<i>Your </i>Name
      </Link>
      <nav>
        {location.pathname !== '/' && (
          <Link to="/" className={`mr-4 text-lg font-semibold ${isAboutPage ? 'text-white' : 'text-black'}`}>
            Home
          </Link>
        )}
        <Link to="/about" className={`text-lg font-semibold ${isAboutPage ? 'text-white' : 'text-black'}`}>
          <i>About</i>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
