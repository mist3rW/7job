import ForgotPasswordForm from '@/components/auth/forgot-password-form';

import bgSignin from '@/public/bg-signin.jpg';
import Image from 'next/image';

export default function Page() {
  return (
    <div className="flex justify-center items-center md:grid grid-cols-2 w-full min-h-screen">
      <Image
        src={bgSignin}
        fill
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
        alt="background image"
      />
      <div></div>
      <div className="flex justify-end items-center mr-8">
        <div className="w-[400px]">
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
}
