'use client';

import { signOut } from '@/server/auth';
import { Session } from 'next-auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Image from 'next/image';
import { LogOut, Moon, Router, Settings, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { Switch } from '../ui/switch';
import { useRouter } from 'next/navigation';
import { signOutUser } from '@/server/actions/auth-action';

export default function UserButton({ user }: Session) {
  const { theme, setTheme } = useTheme();
  const [checked, setChecked] = useState(true);
  const router = useRouter();

  function setSwitchState() {
    switch (theme) {
      case 'dark':
        return setChecked(true);
      case 'light':
        return setChecked(false);
      case 'system':
        return setChecked(false);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          {user?.image && (
            <Image
              src={user.image}
              alt={user.name!}
              fill
              className="rounded-full"
            />
          )}
          {!user?.image && (
            <AvatarFallback className="bg-primary/25">
              <div className="font-bold ">
                {user?.email?.charAt(0).toUpperCase()}
              </div>
            </AvatarFallback>
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 p-6" align="end">
        <div className="mb-4 p-4 flex flex-col gap-y-1 items-center bg-primary/25">
          {user?.image && (
            <Image
              src={user.image}
              alt="user profile image"
              width={36}
              height={36}
              className="rounded-full"
            />
          )}
          <p className="font-bold text-xs">{user?.name}</p>
          <span className="text-xs font-medium text-secondary-foreground rounded-md">
            {user?.email}
          </span>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => router.push('/dashboard/settings')}
          className="group py-2 font-medium cursor-pointer transition-all duration-500 ease-in-out"
        >
          <Settings
            size={14}
            className="mr-2 group-hover:rotate-180 transition-all duration-300 ease-in-out"
          />
          Settings
        </DropdownMenuItem>
        {theme && (
          <DropdownMenuItem className="py-2 font-medium cursor-pointer transition-all duration-500 ease-in-out">
            <div
              className="flex items-center group"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex mr-2">
                <Sun
                  size={14}
                  className="group-hover:text-yellow-400 absolute dark:scale-0 dark:-rotate-90 group-hover:rotate-180 transition-all duration-500 ease-in-out"
                />
                <Moon
                  size={14}
                  className="group-hover:text-blue-400 dark:scale-100 scale-0"
                />
              </div>

              <p className="dark:text-blue-400 text-secondary-foreground/75  text-yellow-400">
                {theme[0].toUpperCase() + theme.slice(1)} mode
              </p>

              <Switch
                className="scale-75"
                checked={checked}
                onCheckedChange={(e) => {
                  setChecked((prev) => !prev);
                  if (e) setTheme('dark');
                  if (!e) setTheme('light');
                }}
              />
            </div>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem
          onClick={() => signOutUser()}
          className="py-2 group focus:bg-destructive/30 font-medium cursor-pointer transition-all duration-500 ease-in-out"
        >
          <LogOut
            size={14}
            className="mr-2 group-hover:scale-75 transition-all duration-300 ease-in-out"
          />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
