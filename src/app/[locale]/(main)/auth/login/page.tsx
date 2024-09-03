import LoginPage from '@/components/Authentication/LoginPage';
import AuthenticationModal from '@/components/Navbar/RightNavbar/AuthenticationModal';

export default async function Login() {
  return (
    <div className='flex w-full flex-row items-center justify-center'>
      <LoginPage />
    </div>
  );
}
