import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

export default function NotFound() {
  return (
    <div className="my-10 flex flex-col justify-center items-center ">
      <h1 className="text-2xl font-bold">404: NotFound</h1>
      <p>
        The page you are looking for does not exist or has been moved to a
        different location.
      </p>
      <Button asChild className="mt-4">
        <Link href="/">Go back to home</Link>
      </Button>
    </div>
  );
}
