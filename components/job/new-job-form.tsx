'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Input } from '@/components/ui/input';
import { FormState, useForm } from 'react-hook-form';
import { Label } from '../ui/label';
import LoadingButton from '../ui/loading-button';
import { duration_types } from '@/lib/duration-types';
import { UploadButton } from '@/app/api/uploadthing/upload';
import { useState } from 'react';
import Image from 'next/image';
import { createJobSchema, TCreateJobSchema } from '@/types/job-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAction } from 'next-safe-action/hooks';
import { createJobAction } from '@/server/actions/job-action';

import FormSuccess from '../auth/form-success';
import FormError from '../auth/form-error';
import { useRouter } from 'next/navigation';
import Tiptap from './tiptap';
import { Banknote, MapPin, X } from 'lucide-react';
import LocationInput from '../ui/location-input';
import LocationSuggestInput from './location-suggest-input';

export default function NewJobForm() {
  const [logoUploading, setLogoUploading] = useState(false);
  const router = useRouter();
  const form = useForm<TCreateJobSchema>({
    resolver: zodResolver(createJobSchema),
    defaultValues: {
      title: '',
      type: '',
      salary: '',
      companyName: '',
      description: '',
      applyUrl: '',
      applyEmail: '',
      location: '',
      companyLogo: '',
    },
    mode: 'onChange',
  });

  const { execute, status } = useAction(createJobAction, {
    onSuccess: (data) => {
      router.push('/job-submitted');
    },
  });

  const onSubmit = (values: TCreateJobSchema) => {
    console.log(values);
    execute(values);
  };
  return (
    <Card className="my-10">
      <CardHeader>
        <CardTitle>Post a new job</CardTitle>
        <CardDescription>
          Post a job to reach the best developers in the world. We have
          thousands of developers ready to work for you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job title</FormLabel>
                  <FormControl>
                    <Input placeholder="Full Stack Developer .." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Duration" />
                      </SelectTrigger>
                      <SelectContent>
                        {duration_types.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="7jobs" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyLogo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company logo</FormLabel>
                  <div className="flex items-center gap-4">
                    {form.getValues('companyLogo') && (
                      <Image
                        className="rounded-full"
                        src={form.getValues('companyLogo')!}
                        width={64}
                        height={64}
                        alt="Company Logo Image"
                      />
                    )}
                    <UploadButton
                      className="scale-75 ut-button:bg-primary/75 hover:ut-button:bg-primary/100 ut-button:transition-all ut-button:duration-500 ut-label:hidden ut-allowed-content:hidden"
                      endpoint="companyLogoUploader"
                      onUploadBegin={() => {
                        setLogoUploading(true);
                      }}
                      onUploadError={(error) => {
                        form.setError('companyLogo', {
                          type: 'validate',
                          message: error.message,
                        });
                        setLogoUploading(false);
                        return;
                      }}
                      onClientUploadComplete={(res) => {
                        form.setValue('companyLogo', res[0].url);
                        setLogoUploading(false);
                      }}
                      content={{
                        button({ ready }) {
                          if (ready) return <div>Change Logo</div>;
                          return <div>Uploading...</div>;
                        },
                      }}
                    />
                  </div>
                  <FormControl>
                    <Input placeholder="Logo Image" type="hidden" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Office location</FormLabel>
                  <FormControl>
                    <div className="flex gap-2 items-center w-full">
                      <MapPin size={32} className="p-2 bg-muted rounded-md" />
                      <div className="w-full">
                        <LocationSuggestInput
                          onLocationChange={field.onChange}
                          value={field.value || ''}
                        />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job description</FormLabel>
                  <FormControl>
                    <Tiptap value={field.value} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Banknote size={32} className="p-2 bg-muted rounded-md" />
                      <Input {...field} type="number" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-2">
              <Label htmlFor="applicationEmail">How to apply</Label>
              <div className="flex justify-between ">
                <FormField
                  control={form.control}
                  name="applyEmail"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormControl>
                        <div className="flex items-center">
                          <Input
                            id="applicationEmail"
                            type="email"
                            placeholder="Email address"
                            {...field}
                          />
                          <span className="mx-2">or</span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="applyUrl"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="Website URL"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <LoadingButton
              type="submit"
              loading={status === 'executing'}
              disabled={status === 'executing'}
              className="w-full"
            >
              Submit
            </LoadingButton>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <p>
          After you post a job, it will be reviewed by our team before posting
          on the job board.
        </p>
      </CardFooter>
    </Card>
  );
}
