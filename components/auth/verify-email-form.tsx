'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '../ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { newUserVerification } from '@/server/actions/token';
import { CheckCircle2, CircleMinus } from 'lucide-react';
import { toast } from 'sonner';

export default function VerifyEmailForm() {
  const params = useSearchParams();
  const token = params.get('token');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleVerifyEmail = async () => {
    if (!token) {
      setError('Invalid token');
      return;
    }
    try {
      const data = await newUserVerification(token);
      if (data.success) {
        setSuccess(data.success.message);
        toast.success(data.success.message);
        setTimeout(() => {
          router.push('/auth/signin');
        }, 3000);
      }
      if (data.error) {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('An error occurred while verifying the token');
    }
  };

  useEffect(() => {
    if (token) {
      handleVerifyEmail();
    }
  }, [token]);

  return (
    <div>
      {success ? (
        <Card>
          <CardHeader>
            <CardTitle>Email Verified</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>Your email address was successfully verified</p>
              <p>You will be redirected to the sign-in page in a few seconds</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Something went wrong </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>
                <span className="font-bold">Error:</span> {error}
              </p>
              <Button
                onClick={() => router.push('/auth/signin')}
                className="w-full"
              >
                Back to Sign In
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
