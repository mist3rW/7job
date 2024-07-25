'use client';

import { Input } from '../ui/input';
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
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import { jobFilterSchema, TJobFilterSchema } from '@/types/job-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAction } from 'next-safe-action/hooks';
import { jobFilterAction } from '@/server/actions/job-action';
import { duration_types } from '@/lib/duration-types';
import LocationSuggestInput from './location-suggest-input';

type JobFilterProps = {
  defaultValues: TJobFilterSchema;
};

export default function JobFilter({ defaultValues }: JobFilterProps) {
  const form = useForm<TJobFilterSchema>({
    resolver: zodResolver(jobFilterSchema),
    defaultValues: {
      query: defaultValues.query || '',
      type: defaultValues.type || '',
      location: defaultValues.location || '',
    },
  });

  const { execute, status } = useAction(jobFilterAction);

  const onSubmit = (values: TJobFilterSchema) => {
    execute(values);
  };

  return (
    <section className="w-full  border rounded-md p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row items-center gap-4 justify-around"
        >
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/3">
                <FormLabel>Search</FormLabel>
                <FormControl>
                  <Input placeholder="Job title, company .." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="w-full md:w-fit">
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) =>
                      field.onChange(value === 'all' ? '' : value)
                    }
                    value={field.value || ''}
                  >
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="All duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All durations</SelectItem>
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
            name="location"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/3">
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <div>
                    <LocationSuggestInput
                      onLocationChange={field.onChange}
                      value={field.value || ''}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full md:w-fit md:self-end ">
            Find jobs
          </Button>
        </form>
      </Form>
    </section>
  );
}
