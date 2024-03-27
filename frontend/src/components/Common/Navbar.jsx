import React, { useState, useEffect } from 'react';
import logo from "../../assets/logo.png";
import { Login } from '../../screens/Login';
import { LoggedUserBar } from './LoggedUserBar';
import { UnloggedUserBar } from './UnloggedUserBar';


export const Navbar = () => {
  const [isHeaderShadow, setIsHeaderShadow] = useState(false);

const loc=window.location.href

// console.log(loc)
  useEffect(() => {
    // Add a scroll event listener to track scrolling
    const handleScroll = () => {
      if (window.scrollY > 0) {
        // User has scrolled, add the shadow class
        setIsHeaderShadow(true);
      } else {
        // User is at the top, remove the shadow class
        setIsHeaderShadow(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`sticky top-0 w-full ${isHeaderShadow ? 'header-shadow' : ''} `}>
      {localStorage.getItem('userInfo')?<LoggedUserBar/>:<UnloggedUserBar/>}
    </header>
  );
};
