import { Button } from '@/components/ui/button';
import { auth } from '@/server/auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await auth();
  if (!user) return redirect('/auth/signin');
  if (user.user.role !== 'ADMIN')
    return (
      <div className="my-10 flex flex-col gap-4 items-center justify-center">
        <p className="font-bold text-2xl">
          You are not authorized to view this page.
        </p>
        <Button asChild>
          <Link href="/">Go back to home</Link>
        </Button>
      </div>
    );
  return <div>{children}</div>;
}
