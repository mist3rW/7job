'use client';

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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { Session } from 'next-auth';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { BsEyeFill } from 'react-icons/bs';
import { RiEyeCloseLine } from 'react-icons/ri';
import { useAction } from 'next-safe-action/hooks';
import FormError from '@/components/auth/form-error';
import FormSuccess from '@/components/auth/form-success';
import {
  TUserSettingsNewPasswordSchema,
  userSettingsNewPasswordSchema,
} from '@/types/auth-schema';
import { userSettingsNewPassword } from '@/server/actions/auth-action';
import TwoFactorBtn from './two-factor-btn';
import { Label } from '@/components/ui/label';

type SettingsContentProps = {
  session: Session;
};

export default function SettingsContent({ session }: SettingsContentProps) {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<TUserSettingsNewPasswordSchema>({
    resolver: zodResolver(userSettingsNewPasswordSchema),
    defaultValues: {
      password: undefined,
      newPassword: undefined,
      confirmNewPassword: undefined,
    },
  });
  console.log('settings session', session);

  const { execute, status } = useAction(userSettingsNewPassword, {
    onSuccess({ data }) {
      if (typeof data?.error === 'string') {
        setError(data.error);
        setSuccess('');
      } else if (data?.error?.message) {
        setError(data.error.message);
        setSuccess('');
      }
      if (data?.success) {
        setSuccess(data.success.message);
        setError('');
      }
    },
  });

  const onSubmit = (values: TUserSettingsNewPasswordSchema) => {
    execute(values);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>
          Update your account settings. You can change your password here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Enter your current password"
                        {...field}
                        type={showPassword ? 'text' : 'password'}
                        disabled={session.user.isOAuth === true}
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
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="New Password"
                      {...field}
                      type={showPassword ? 'text' : 'password'}
                      disabled={session.user.isOAuth === true}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmNewPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm new password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirm New Password"
                      {...field}
                      type={showPassword ? 'text' : 'password'}
                      disabled={session.user.isOAuth === true}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button
              type="submit"
              disabled={status === 'executing' || session.user.isOAuth === true}
              className="cursor-pointer"
            >
              Update your password
            </Button>
          </form>
        </Form>
        <div className="py-8">
          <TwoFactorBtn
            isOAuth={session.user.isOAuth}
            is2FA={session.user.isTwoFactorEnabled}
          />
        </div>
      </CardContent>
    </Card>
  );
}
