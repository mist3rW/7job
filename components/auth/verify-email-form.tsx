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

import { toast } from 'sonner';

export default function VerifyEmailForm() {
  const params = useSearchParams();
  const token = params.get('token');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      setMessageType('error');
      setMessage('Invalid token');
      return;
    }
    const handleVerifyEmail = async () => {
      try {
        const data = await newUserVerification(token);

        if (data.error) {
          setMessageType('error');
          setMessage(data.error);
        } else if (data.success) {
          setMessageType('success');
          setMessage(data.success);
          toast.success(data.success);
        }
      } catch (error) {
        setMessageType('error');
        setMessage('An error occurred while verifying the token');
      }
    };
    handleVerifyEmail();
  }, [token]);

  return (
    <div>
      {message && messageType === 'error' && (
        <Card>
          <CardHeader>
            <CardTitle>Something went wrong</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>
                <span className="font-bold">Error:</span> {message}
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
      {message && messageType === 'success' && (
        <Card>
          <CardHeader>
            <CardTitle>Email Verified</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>Your email address was successfully verified</p>
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
