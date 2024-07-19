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

export default function VerifyEmailForm() {
  const params = useSearchParams();
  const token = params.get('token');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleVerifyEmail = async () => {
    if (success || error) return;
    if (!token) {
      setError('Invalid token');
      return;
    }
    newUserVerification(token).then((data) => {
      console.log('newUser: ', data);
      if (data.error) {
        setError(data.error);
      }
      if (data.success) {
        setSuccess(data.success.message);
        router.push('/auth/signin');
      }
    });
  };

  useEffect(() => {
    if (token) {
      handleVerifyEmail();
    }
  }, [token]);

  return (
    <div>
      <p>
        {!success && !error ? (
          <Card>
            <CardHeader>
              <CardTitle>Account confirmation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>Your email address was successfully verified</p>
              </div>
            </CardContent>
          </Card>
        ) : null}
      </p>
      {error && (
        <div className="bg-destructive/25 flex items-center my-2 gap-2 text-sm text-secondary-foreground p-3 rounded-md">
          <CircleMinus className="w-4 h-4" />
          <p>{error}</p>
          <Button onClick={() => router.push('/auth/signin')} asChild>
            Back to Sign In
          </Button>
        </div>
      )}
    </div>
  );
}
