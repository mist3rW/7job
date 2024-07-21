'use client';

import { signIn } from 'next-auth/react';
import { Button } from '../ui/button';
import { FcGoogle } from 'react-icons/fc';
import { FaDiscord, FaFacebook, FaGithub, FaLine } from 'react-icons/fa';

export default function SocialLogin() {
  return (
    <div className="flex flex-col items-center w-full gap-4">
      <div className="w-full flex items-center justify-between mx-4">
        <div className="w-full h-[1px] bg-[#333]"></div>
        <span className="text-sm uppercase mx-6 text-gray-400">Or</span>
        <div className="w-full h-[1px] bg-[#333]"></div>
      </div>
      <Button
        variant={'outline'}
        className="flex gap-4 w-full"
        onClick={() =>
          signIn('google', {
            redirect: false,
            callbackUrl: '/',
          })
        }
      >
        <FcGoogle size={24} className="w-1/4 ml-8" color="#4285F4" />
        <p className="text-left  w-full">Continue with Google</p>
      </Button>
      <Button
        variant={'outline'}
        className="flex gap-4 w-full"
        onClick={() =>
          signIn('github', {
            redirect: false,
            callbackUrl: '/',
          })
        }
      >
        <FaGithub size={24} className="w-1/4 ml-8" />
        <p className="text-left  w-full">Continue with Github</p>
      </Button>

      <Button
        variant={'outline'}
        className="flex gap-4 w-full"
        onClick={() =>
          signIn('facebook', {
            redirect: false,
            callbackUrl: '/',
          })
        }
      >
        <FaFacebook size={24} className="w-1/4 ml-8" />
        <p className="text-left  w-full">Continue with Facebook</p>
      </Button>
    </div>
  );
}
