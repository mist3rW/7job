import Nav from '@/components/navigation/nav';
import { redirect } from 'next/navigation';

export default async function Home() {
  redirect('/dashboard/settings');
}
