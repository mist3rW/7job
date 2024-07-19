import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import SocialLogin from './social-login';

type AuthCardProps = {
  children: React.ReactNode;
  cardTitle: string;
  showSocial?: boolean;
  page: string;
};

export default function AuthCard({
  children,
  cardTitle,
  showSocial,
  page,
}: AuthCardProps) {
  return (
    <Card className="dark:bg-[#18181B] border-none shadow-lg">
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {children}
        {showSocial && <SocialLogin />}
      </CardContent>

      <CardFooter className="flex justify-center items-center">
        {page === 'signin' ? (
          <>
            Need to create an account?&nbsp;
            <Link href="/auth/signup" className="text-blue-600">
              Sign up
            </Link>
          </>
        ) : (
          <>
            Already have an account?&nbsp;
            <Link href="/auth/signin" className="text-blue-600">
              Sign in
            </Link>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
