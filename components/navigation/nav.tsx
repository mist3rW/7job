import { auth } from '@/server/auth';
import UserButton from './user-button';
import { Button } from '../ui/button';
import Link from 'next/link';
import { LogIn } from 'lucide-react';
import Logo from './logo';

export default async function Nav() {
  const session = await auth();

  return (
    <header className="p-4 ">
      <nav className="">
        <ul className="flex justify-between items-center">
          <li>
            <Link href="/">
              <Logo />
            </Link>
          </li>
          <li>
            <Link
              href="/jobs/new"
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md"
            >
              Post a new job
            </Link>
          </li>
          {!session ? (
            <li>
              <Button asChild>
                <Link href="/auth/signin" className="flex gap-2">
                  <LogIn size={16} />
                  <span>Sign in</span>
                </Link>
              </Button>
            </li>
          ) : (
            <li>
              <UserButton user={session?.user} expires={session?.expires} />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
