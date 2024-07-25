import { auth } from '@/server/auth';
import UserButton from './user-button';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ChevronDown, LogIn } from 'lucide-react';
import Logo from './logo';
import BookmarkMenu from './bookmark-menu';

export default async function Nav() {
  const session = await auth();

  return (
    <header className="p-4 sticky top-0 z-10 bg-primary-foreground shadow-sm rounded-t-lg">
      <nav className="">
        <ul className="flex justify-between items-center ">
          <li className="">
            <Link href="/" className="">
              <Logo />
            </Link>
          </li>

          {!session ? (
            <li className="flex items-center gap-1">
              <BookmarkMenu />
              <Button asChild>
                <Link
                  href="/jobs/new"
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-md"
                >
                  Post a new job
                </Link>
              </Button>
              <Button asChild>
                <Link href="/auth/signin" className="flex gap-2">
                  <LogIn size={16} />
                  <span className="hidden md:block">Admin</span>
                </Link>
              </Button>
            </li>
          ) : (
            <li className="space-x-2 shrink-0 flex">
              <BookmarkMenu />
              <Button asChild>
                <Link
                  href="/jobs/new"
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-md"
                >
                  Post a new job
                </Link>
              </Button>
              <UserButton user={session?.user} expires={session?.expires} />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
