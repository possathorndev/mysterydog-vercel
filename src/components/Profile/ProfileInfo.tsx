'use client';

import { useSession } from 'next-auth/react';

const ProfileInfo = () => {
  const { data } = useSession();

  return (
    <div className='my-[100px] flex items-center justify-center'>
      <div className=''>
        username: <span className='text-secondary'>{data?.user?.email}</span>
      </div>
    </div>
  );
};

export default ProfileInfo;
