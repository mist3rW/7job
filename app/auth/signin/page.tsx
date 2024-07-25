import SigninForm from '@/components/auth/signin-form';

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center md:grid grid-cols-2 w-full my-10">
      <div></div>
      <div className="flex justify-end items-center md:mr-24">
        <div className="w-[400px]">
          <SigninForm />
        </div>
      </div>
    </div>
  );
}
