'use client';

import React from 'react';

// Components
import LeftNavbar from './LeftNavbar/LeftNavbar';
import RightNavbar from './RightNavbar/RightNavbar';

const Navbar = () => {
  return (
    <div className='navbar-wrapper z-50 mx-auto h-14 border-b-[1px] border-[#303030] bg-background'>
      <div className='navbar-container max-w-screen-fullhd font-pixel mx-auto flex h-14 justify-between pl-6'>
        {/* LEFT NAVBAR */}
        <LeftNavbar />

        {/* RIGHT NAVBAR */}
        <RightNavbar />
      </div>
    </div>
  );
};

export default Navbar;
