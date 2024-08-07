import React from 'react';

// UI
import LocaleSwitcher from '@/components/Navbar/RightNavbar/LocaleSwitcher';
import AuthenticationModal from '@/components/Navbar/RightNavbar/AuthenticationModal';

const RightNavbar = () => {
  return (
    <div className='flex items-center gap-4'>
      <LocaleSwitcher />
      {/* <AuthenticationModal /> */}
    </div>
  );
};

export default RightNavbar;
