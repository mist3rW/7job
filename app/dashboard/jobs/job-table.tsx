'use client';
import {
  Banknote,
  Briefcase,
  CircleCheck,
  Clock,
  MapPinned,
  Pencil,
  Trash2,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { daysAgo, formatSalary } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import JobActionBtn from './job-action-btn';
import { Job } from '@prisma/client';
import Image from 'next/image';

type JobTableProps = {
  jobs: Job[];
};

export default function JobTable({ jobs }: JobTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Posted</TableHead>
          <TableHead>Job title</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobs.map((job) => (
          <TableRow key={job.id}>
            <TableCell className="text-xs">{daysAgo(job.createdAt)}</TableCell>
            <TableCell>
              {!job.approved && (
                <span className="bg-yellow-500 text-white px-2 py-1 rounded-lg animate-pulse">
                  await approve
                </span>
              )}
              &nbsp;{job.title}
            </TableCell>
            <TableCell>{job.companyName}</TableCell>
            <TableCell>
              <Dialog>
                <DialogTrigger>
                  <Pencil />
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle> Company: {job.companyName}</DialogTitle>
                    <DialogDescription>
                      <div>
                        <Card>
                          <CardHeader>
                            <CardTitle>
                              <div className="flex flex-col gap-2">
                                <Image
                                  src={job.companyLogo!}
                                  alt={job.companyName}
                                  width={100}
                                  height={100}
                                  className="rounded-lg"
                                />
                                {job.title}
                              </div>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <CardDescription>
                              <div>
                                <div>
                                  <p className="flex items-center gap-1.5 ">
                                    <Briefcase size={16} className="shrink-0" />
                                    {job.type}
                                  </p>
                                  <p className="flex items-center gap-1.5 ">
                                    <MapPinned size={16} className="shrink-0" />
                                    {job.location}
                                  </p>
                                  <p className="flex items-center gap-1.5 ">
                                    <Banknote size={16} className="shrink-0" />
                                    {formatSalary(job.salary)}
                                  </p>
                                  <p className="flex items-center gap-1.5 mt-4">
                                    <Clock size={16} className="shrink-0" />
                                    Posted: {daysAgo(job.createdAt)}
                                  </p>
                                </div>

                                <div className="space-y-4 mt-2">
                                  <h2 className="font-semibold text-lg">
                                    Job Description
                                  </h2>
                                  <Separator />
                                  <div
                                    className="h-48 overflow-y-scroll"
                                    dangerouslySetInnerHTML={{
                                      __html: job.description,
                                    }}
                                  ></div>
                                </div>
                              </div>
                            </CardDescription>
                          </CardContent>
                          <CardFooter>
                            <JobActionBtn
                              jobId={job.id}
                              isApproved={job.approved}
                              updatedAt={job.updatedAt}
                            />
                          </CardFooter>
                        </Card>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
