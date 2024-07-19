'use client';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AuthCard from './auth-card';
import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';
import FormSuccess from './form-success';
import FormError from './form-error';
import {
  forgotPasswordSchema,
  TForgotPasswordSchema,
} from '@/types/auth-schema';
import { useState } from 'react';
import { useAction } from 'next-safe-action/hooks';
import { forgotPassword } from '@/server/actions/auth-action';
import { zodResolver } from '@hookform/resolvers/zod';

export default function ForgotPasswordForm() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const form = useForm<TForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const { execute, status } = useAction(forgotPassword, {
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
      }
    },
  });

  const onSubmit = (values: any) => {
    execute(values);
  };
  return (
    <AuthCard cardTitle="Forgot your password ?" page="signin">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormDescription>
                  We will send you a password reset link to your email
                </FormDescription>
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
          <FormSuccess message={success} />
          <FormError message={error} />
          <Button
            type="submit"
            className={cn(
              'w-full',
              status === 'executing' ? 'animate-pulse' : ''
            )}
          >
            Send password reset link
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
}
