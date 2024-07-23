import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

export default function Page() {
  return (
    <main className="m-auto max-w-5xl my-10 space-y-5 text-center">
      <div className="border py-10 space-y-4 rounded-lg">
        <h1 className="text-3xl font-bold">
          Your new job post has been submitted successfully!
        </h1>
        <p>We will review it and post it to the job board soon.</p>
        <Button asChild>
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </main>
  );
}
