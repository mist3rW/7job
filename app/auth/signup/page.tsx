import SignupForm from '@/components/auth/signup-form';
import Image from 'next/image';
import bgSignup from '@/public/bg-signup.jpg';

export default function Page() {
  return (
    <div className="flex justify-center items-center md:grid grid-cols-2 w-full min-h-screen">
      <Image
        src={bgSignup}
        fill
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
        alt="background image"
      />
      <div className="flex justify-start items-center lg:ml-8">
        <div className="w-[400px]">
          <SignupForm />
        </div>
      </div>
      <div></div>
    </div>
  );
}
