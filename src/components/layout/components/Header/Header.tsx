import React, { useEffect, useState } from 'react';
import {
  SignOutButton,
  SignedIn,
  SignedOut,
  useSession,
} from '@clerk/clerk-react';

import CartBadge from '../../../generic/Badge/Badge';
import FavoriteBadge from '../../../generic/FavoriteBadge/FavoriteBadge';
import Icon from '../../../generic/Icon/Icon';
import { Icons } from '../../../../types';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import Loader from '../../../generic/Loader/Loader';
import SearchBar from '../../../pages/HomePage/components/SearchBar/SearchBar';

interface HeaderProps {
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [icon, setIcon] = useState(isNavbarOpen ? Icons.CLOSE : Icons.BURGER);
  const [isLoaded, setIsLoaded] = useState(false);
  const { session } = useSession();

  useEffect(() => {
    setIcon(isNavbarOpen ? Icons.CLOSE : Icons.BURGER);
  }, [isNavbarOpen]);

  useEffect(() => {
    if (session !== undefined) {
      setIsLoaded(true);
    }
  }, [session]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 640) {
        setIsNavbarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!isLoaded) {
    return <Loader />;
  }

  return (
    <header className={styles['header']}>
      {children}
      <NavLink to="/">
        <img
          className={styles['header-logo']}
          src="https://storage.googleapis.com/group_project_images/img/Logo.png"
          alt="logo"
        />
      </NavLink>
      <nav
        className={`${styles['header-navbar']} ${isNavbarOpen ? styles['header-navbar--active'] : ''}`}
      >
        <ul className={styles['header-navlinks']}>
          <li>
            <NavLink
              onClick={() => setIsNavbarOpen(false)}
              to="/"
              className={({ isActive }) => (isActive ? styles['active'] : '')}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => setIsNavbarOpen(false)}
              to="/phones"
              className={({ isActive }) => (isActive ? styles['active'] : '')}
            >
              Phones
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => setIsNavbarOpen(false)}
              to="/tablets"
              className={({ isActive }) => (isActive ? styles['active'] : '')}
            >
              Tablets
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => setIsNavbarOpen(false)}
              to="/accessories"
              className={({ isActive }) => (isActive ? styles['active'] : '')}
            >
              Accessories
            </NavLink>
          </li>
          <SignedOut>
            <li>
              <NavLink
                to="/signin"
                className={({ isActive }) => (isActive ? styles['active'] : '')}
              >
                Sign In
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/signup"
                className={({ isActive }) => (isActive ? styles['active'] : '')}
              >
                Sign Up
              </NavLink>
            </li>
          </SignedOut>
          <SignedIn>
            <li>
              <SignOutButton>
                <span>Sign Out</span>
              </SignOutButton>
            </li>
          </SignedIn>

          {isNavbarOpen && (
            <>
              <div className={styles['header-burger-icons']}>
                <NavLink
                  to="/favorites"
                  className={styles['header-burger-icon']}
                  onClick={() => setIsNavbarOpen(false)}
                >
                  <Icon
                    iconId={Icons.HEART}
                    className={styles['header-icon-heart']}
                  />
                </NavLink>
                <NavLink
                  to="/cart"
                  className={styles['header-burger-icon']}
                  onClick={() => setIsNavbarOpen(!isNavbarOpen)}
                >
                  <Icon
                    iconId={Icons.CART}
                    className={styles['header-icon-cart']}
                  />
                </NavLink>
              </div>
            </>
          )}
        </ul>
      </nav>
      <SearchBar />
      <div className={styles['header-icons']}>
        <NavLink to="/favorites">
          <Icon iconId={Icons.HEART} className={styles['header-icon-heart']} />
          <FavoriteBadge />
        </NavLink>
        <NavLink to="/cart">
          <Icon iconId={Icons.CART} className={styles['header-icon-cart']} />
          <CartBadge />
        </NavLink>
        <div
          className={styles['header-burger']}
          onClick={() => setIsNavbarOpen(!isNavbarOpen)}
        >
          <Icon iconId={icon} className={styles['header-burger']} />
        </div>
      </div>
    </header>
  );
};

export default Header;
