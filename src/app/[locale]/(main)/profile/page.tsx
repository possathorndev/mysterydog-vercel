import React from 'react';

// Components
import ProfileInfo from '@/components/Profile/ProfileInfo';
import AuthenticationModal from '@/components/Navbar/RightNavbar/AuthenticationModal';

export default async function Profile({ params }: { params: { locale: string } }) {
  return (
    <div>
      <ProfileInfo />
      <AuthenticationModal />
    </div>
  );
}
