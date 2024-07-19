import VerifyEmailForm from '@/components/auth/verify-email-form';
import bgSignin from '@/public/bg-signin.jpg';
import Image from 'next/image';

export default function Page() {
  return (
    <div className="w-full h-ful flex justify-center items-center min-h-screen">
      <Image
        src={bgSignin}
        fill
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
        alt="background image"
      />
      <VerifyEmailForm />
    </div>
  );
}
