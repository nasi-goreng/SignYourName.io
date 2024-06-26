import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const isAboutPage = location.pathname === '/about';

  return (
    <header className="absolute top-5 left-0 right-0 p-4 flex justify-between items-center bg-transparent z-20">
      <Link
        to="/"
        className={`text-3xl font-semibold relative left-[14.65%] ${isAboutPage ? 'text-white yellow-hover' : 'text-black purple-hover'}`}
      >
        Sign<i>Your </i>Name
      </Link>
      <nav className="absolute right-[14.65%]">
        {location.pathname !== '/' && (
          <Link to="/" className={`mr-4 text-2xl font-medium  ${isAboutPage ? 'text-white yellow-hover' : 'text-black purple-hover'}`}>
            Home
          </Link>
        )}
        <Link to="/about" className={`text-2xl font-medium ${isAboutPage ? 'text-white yellow-hover' : 'text-black purple-hover'}`}>
          <i>About</i>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
