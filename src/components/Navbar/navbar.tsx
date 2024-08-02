'use client';

import React from 'react';

// Components
import LeftNavbar from './LeftNavbar/LeftNavbar';
import RightNavbar from './RightNavbar/RightNavbar';

const Navbar = () => {
  return (
    <div className='navbar-wrapper z-50 mx-auto h-[70px] border-b-[2px] border-[#03071208] bg-background'>
      <div className='navbar-container max-w-screen-fullhd font-pixel mx-auto flex h-[70px] justify-between px-6'>
        {/* LEFT NAVBAR */}
        <LeftNavbar />

        {/* RIGHT NAVBAR */}
        <RightNavbar />
      </div>
    </div>
  );
};

export default Navbar;
