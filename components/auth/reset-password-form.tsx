'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { BsEyeFill } from 'react-icons/bs';
import { RiEyeCloseLine } from 'react-icons/ri';
import { resetPasswordSchema, TResetPasswordSchema } from '@/types/auth-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAction } from 'next-safe-action/hooks';
import { cn } from '@/lib/utils';
import FormSuccess from './form-success';
import FormError from './form-error';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { useRouter, useSearchParams } from 'next/navigation';
import { resetPassword } from '@/server/actions/auth-action';

export default function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const params = useSearchParams();
  const token = params.get('token');
  const router = useRouter();
  const form = useForm<TResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const { execute, status } = useAction(resetPassword, {
    onSuccess: ({ data }) => {
      if (data?.success) {
        setSuccess(data.success.message);
        setError('');
      }
      if (data?.error) {
        setError(data.error.message);
        setSuccess('');
      }
    },
  });

  const onSubmit = (values: TResetPasswordSchema) => {
    const payload = {
      password: values.password,
      confirmPassword: values.confirmPassword,
      token,
    };
    execute(payload);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Reset your password</CardTitle>
          <CardDescription>Enter your new password to continue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Enter your password"
                          {...field}
                          type={showPassword ? 'text' : 'password'}
                        />
                        <div
                          className="absolute bottom-2 right-3 text-xl text-gray-700 cursor-pointer"
                          onClick={() => setShowPassword((prev: any) => !prev)}
                        >
                          {showPassword ? <BsEyeFill /> : <RiEyeCloseLine />}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Confirm your password"
                        {...field}
                        type={showPassword ? 'text' : 'password'}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormSuccess message={success} />
              <FormError message={error} />

              {success ? (
                <Button
                  className="w-full"
                  onClick={() => router.push('/auth/signin')}
                >
                  Back to Sign In
                </Button>
              ) : (
                <Button
                  className={cn(
                    'w-full',
                    status === 'executing' ? 'animate-pulse' : ''
                  )}
                  disabled={status === 'executing'}
                >
                  Update Password
                </Button>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
