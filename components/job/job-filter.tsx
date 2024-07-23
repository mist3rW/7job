'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '../ui/label';
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

export default function JobFilter() {
  const form = useForm();

  const onSubmit = (data) => {
    console.log(data);
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
            name="username"
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
            name="username"
            render={({ field }) => (
              <FormItem className="w-full md:w-fit">
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Select>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/3">
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="area district province" {...field} />
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
