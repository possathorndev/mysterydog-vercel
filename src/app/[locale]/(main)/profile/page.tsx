import React from 'react';

// Components
import ProfileInfo from '@/components/Profile/ProfileInfo';

export default async function Profile({ params }: { params: { locale: string } }) {
  return <ProfileInfo />;
}
