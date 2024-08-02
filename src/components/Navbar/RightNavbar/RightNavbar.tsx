import React from 'react';

// UI
import LocaleSwitcher from '@/components/Navbar/RightNavbar/LocaleSwitcher';
import AuthenticationModal from '@/components/Navbar/RightNavbar/AuthenticationModal';

const RightNavbar = () => {
  return (
    <div className='right-navbar-content flex items-center'>
      <LocaleSwitcher />
      <AuthenticationModal />
    </div>
  );
};

export default RightNavbar;
