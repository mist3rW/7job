import { auth } from '@/server/auth';
import { redirect } from 'next/navigation';
import SettingsContent from './settings-content';
import Nav from '@/components/navigation/nav';

export default async function SettingsPage() {
  const session = await auth();
  if (!session) {
    redirect('/auth/signin');
  }
  if (session) {
    return (
      <div>
        <Nav />
        <div className="w-full p-4 max-w-[1050px] flex justify-center mx-auto">
          <SettingsContent session={session} />
        </div>
      </div>
    );
  }
}
