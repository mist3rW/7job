import Image from 'next/image';
import logo from '@/public/logo.webp';
import {
  Banknote,
  Bookmark,
  Briefcase,
  Clock,
  Globe2,
  MapPinned,
} from 'lucide-react';

export default function JobListItem() {
  return (
    <div className="p-4 border rounded-md">
      <div className="flex items-center justify-between">
        <Image
          src={logo}
          alt="company logo"
          width={64}
          height={64}
          className="rounded-full self-center"
        />
        <Bookmark />
      </div>
      <p className="font-semibold">Marketing Manager - Medical Channel</p>
      <p>FrieslandCampnia(Thailand) PCL.</p>
      <div className="text-muted-foreground">
        <p className="flex items-center gap-1.5 ">
          <Briefcase size={16} className="shrink-0" />
          Intership
        </p>
        <p className="flex items-center gap-1.5 ">
          <MapPinned size={16} className="shrink-0" />
          Bangkok
        </p>
        <p className="flex items-center gap-1.5 ">
          <Banknote size={16} className="shrink-0" />
          30,000 baht
        </p>
        <p className="flex items-center gap-1.5 mt-4">4d ago</p>
      </div>
    </div>
  );
}
