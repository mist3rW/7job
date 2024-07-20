import SigninForm from '@/components/auth/signin-form';
import Image from 'next/image';
import bgSignin from '@/public/bg-signin.jpg';

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
      <div className="flex justify-end items-center md:mr-24">
        <div className="w-[400px]">
          <SigninForm />
        </div>
      </div>
    </div>
  );
}
