import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import prisma from '@/server/db';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PublishedJobs from './published-jobs';
import JobTable from './job-table';

export default async function DashboardPage() {
  const approvedJobs = await prisma.job.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    where: {
      approved: true,
    },
  });

  const pendingJobs = await prisma.job.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    where: {
      approved: false,
    },
  });

  return (
    <section className="my-10">
      <Card>
        <CardHeader>
          <CardTitle>7job Admin Dashboard</CardTitle>
          <CardDescription>
            Welcome to the 7job dashboard. Here you can manage your job listings
            and applications.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pending" className="w-full">
            <TabsList>
              <TabsTrigger value="pending">
                Pending approval&nbsp;&nbsp;
                <span className="bg-yellow-500 text-white rounded-full w-8 ">
                  {pendingJobs.length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="published">
                Published jobs&nbsp;&nbsp;
                <span className="bg-blue-500 text-white rounded-full w-8 ">
                  {approvedJobs.length}
                </span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="pending">
              <JobTable jobs={pendingJobs} />
            </TabsContent>
            <TabsContent value="published">
              <PublishedJobs jobs={approvedJobs} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  );
}
