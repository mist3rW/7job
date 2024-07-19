import Image from 'next/image';
import mainBg from '@/public/7auth-bg.jpg';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <div className="relative z-10">{children}</div>
    </div>
  );
}
