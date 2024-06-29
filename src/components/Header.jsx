import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getDistanceFromEdge } from '../utils/design';

const Header = () => {
  const location = useLocation();
  const isAboutPage = location.pathname === '/about';

  return (
    <header className="absolute top-5 left-0 right-0 p-4 flex justify-between items-center bg-transparent z-20">
      <Link
        to="/"
        className={`bg-[#FEF5F1] text-3xl font-semibold relative ${isAboutPage ? 'text-white yellow-hover' : 'text-black purple-hover'}`}
        style={{ left: `${getDistanceFromEdge()}%` }}
      >
        Sign<i>Your </i>Name
      </Link>
      <nav className={`absolute`} style={{ right: `${getDistanceFromEdge()}%` }}>
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
