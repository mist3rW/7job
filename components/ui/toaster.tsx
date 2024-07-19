'use client';
import { useTheme } from 'next-themes';
import { Toaster as SonnerToast } from 'sonner';

export default function Toaster() {
  const { theme } = useTheme();
  if (typeof theme === 'string') {
    return (
      <SonnerToast
        richColors
        theme={theme as 'light' | 'dark' | 'system' | undefined}
      />
    );
  }
}
