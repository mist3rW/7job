'use client';
import React, { useState } from 'react';
import AuthCard from './auth-card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';

import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { BsEyeFill } from 'react-icons/bs';
import { RiEyeCloseLine } from 'react-icons/ri';
import { signinSchema, TSigninSchema } from '@/types/auth-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAction } from 'next-safe-action/hooks';
import { signinUser } from '@/server/actions/auth-action';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import FormSuccess from './form-success';
import FormError from './form-error';

export default function SigninForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showTwoFactor, setShowTwoFactor] = useState(false);

  const form = useForm<TSigninSchema>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { execute, status } = useAction(signinUser, {
    onSuccess({ data }) {
      if (typeof data?.error === 'string') {
        setError(data.error);
        setSuccess('');
      } else if (data?.error?.message) {
        setError(data.error.message);
        setSuccess('');
      }
      if (data?.success) {
        setSuccess(data?.success?.message);
        setError('');
        toast.success(data?.success?.message);
      }
      if (data?.twoFactorRequired) {
        setShowTwoFactor(true);
      }
    },
  });

  const onSubmit = (values: TSigninSchema) => {
    execute(values);
  };
  return (
    <AuthCard cardTitle="Sign in" page="signin" showSocial>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {showTwoFactor && (
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Two-factor code sent to your email. Enter the code
                  </FormLabel>
                  <FormControl className="">
                    <div className="flex justify-center items-center">
                      <InputOTP
                        disabled={status === 'executing'}
                        {...field}
                        maxLength={6}
                        className=""
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {!showTwoFactor && (
            <>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        {...field}
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <FormDescription>
                <Link href="/auth/forgot-password" className="text-blue-500">
                  Forgot password?
                </Link>
              </FormDescription>
            </>
          )}
          {success && <FormSuccess message={success} />}
          {error && <FormError message={error} />}
          <Button
            type="submit"
            className={cn(
              'w-full',
              status === 'executing' ? 'animate-pulse' : ''
            )}
          >
            Sign In
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
}
