'use client';
import { useActionState, useState } from 'react';
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
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { BsEyeFill } from 'react-icons/bs';
import { RiEyeCloseLine } from 'react-icons/ri';
import { signupSchema, TSignupSchema } from '@/types/auth-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupUser } from '@/server/actions/auth-action';
import { useAction } from 'next-safe-action/hooks';
import { CheckCircle2, CircleMinus } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const form = useForm<TSignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { execute, status } = useAction(signupUser, {
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

  const onSubmit = (values: TSignupSchema) => {
    execute(values);
  };

  return (
    <AuthCard cardTitle="Sign up" page="signup" showSocial>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    type="email"
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
          <FormField
            control={form.control}
            name="accept"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="items-top flex space-x-2">
                    {/* @ts-ignore  */}
                    <input
                      type="checkbox"
                      id="accept"
                      className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                      {...field}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="accept"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Accept terms and conditions
                      </label>
                      <p className="text-[10px] text-muted-foreground">
                        You agree to our&nbsp;
                        <span className="text-blue-600 cursor-pointer">
                          Terms of Service
                        </span>
                        &nbsp;and&nbsp;{' '}
                        <span className="text-blue-600 cursor-pointer">
                          Privacy Policy
                        </span>
                      </p>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {success && (
            <div className="bg-teal-400/25 flex items-center my-2 gap-2 text-sm text-secondary-foreground p-3 rounded-md">
              <CheckCircle2 className="w-4 h-4" />
              <p>{success}</p>
            </div>
          )}
          {error && (
            <div className="bg-destructive/25 flex items-center my-2 gap-2 text-sm text-secondary-foreground p-3 rounded-md">
              <CircleMinus className="w-4 h-4" />
              <p>{error}</p>
            </div>
          )}
          <Button
            className={cn(
              'w-full',
              status === 'executing' ? 'animate-pulse' : ''
            )}
            disabled={status === 'executing'}
          >
            Sign Up
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
}
