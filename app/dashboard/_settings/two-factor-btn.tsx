import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { userSettings2FA } from '@/server/actions/auth-action';
import { TTwoFactorSchema, twoFactorSchema } from '@/types/auth-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAction } from 'next-safe-action/hooks';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function TwoFactorBtn({
  isOAuth,
  is2FA,
}: {
  isOAuth: boolean;
  is2FA: boolean;
}) {
  const form = useForm<TTwoFactorSchema>({
    resolver: zodResolver(twoFactorSchema),
    defaultValues: {
      isTwoFactorEnabled: false,
    },
  });

  const { execute, status } = useAction(userSettings2FA);

  const onToggle = (enabled: boolean) => {
    const myPromise = new Promise(async (resolve, reject) => {
      try {
        await execute({ isTwoFactorEnabled: enabled });
        resolve(enabled);
      } catch (error) {
        reject(error);
      }
    });

    toast.promise(myPromise, {
      loading: 'Updating 2FA settings...',
      success: enabled
        ? '2-Factor Authentication has been enabled successfully'
        : '2-Factor Authentication has been disabled successfully',
      error: 'An error occurred, please try again',
    });
  };

  useEffect(() => {
    form.setValue('isTwoFactorEnabled', is2FA);
  }, []);

  return (
    <Form {...form}>
      <form className="space-y-8">
        <FormField
          control={form.control}
          name="isTwoFactorEnabled"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">
                Enable 2-Factor Authentication
              </FormLabel>
              <FormDescription>
                During your next sign-in, you will be required to enter a
                verification code that will be sent to your email.
              </FormDescription>
              <FormControl>
                <Switch
                  disabled={isOAuth || status === 'executing'}
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                    onToggle(checked);
                  }}
                />
              </FormControl>
              <FormMessage />
              {is2FA && <p className="text-sm "></p>}
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
