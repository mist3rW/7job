import { Banknote, Briefcase, Clock, Globe2, MapPinned } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';

export default function JobItemContent() {
  return (
    <section className="my-4 p-4 sticky top-0 space-y-4 ">
      <h1 className="font-bold text-2xl">
        Marketing Manager - Medical Channel
      </h1>
      <p>FrieslandCampnia(Thailand) PCL.</p>
      <div>
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
        <p className="flex items-center gap-1.5 mt-4">
          <Clock size={16} className="shrink-0" />
          Posted: 4d ago
        </p>
      </div>
      <div className="flex gap-2">
        <Button>Apply Now</Button>
        <Button className="bg-zinc-400">Save</Button>
      </div>
      <div>
        <h2 className="font-semibold text-lg">Job Description</h2>
        <p>
          Job Description Create Medical Marketing Strategy that align with
          Brand Strategy to achieve OMG growth agenda. Provide clear guidance
          and strong leadership to drive best in class medical marketing way of
          work across organization and partners. Ensuring a strong collaboration
          with regulatory team, compliance and other function at all levels.
          Developing and enhancing medical marketing plans to upgrade nutrition
          and scientific creditability with education platforms and partnership
          via both offline and online channels Monitoring, tracking and
          assessing the effectiveness of Medical Marketing activities with
          agility to ensure the best performance Qualifications Experience in
          Medical/Marketing/ Excellence team at least 5 years and have exposure
          to Pharmaceutical/Nutrition industry Understand nutrition market
          conditions, products approaches, to ensure that all activities reflect
          the actual needs of the targeted audiences Understand customers, the
          competition, WHO and Regulatory framework Strategically drive OMG
          growth with experience of working directly with customers/HCPs,
          opinion leaders, technical experts and professional staff as well as
          broad exposure to the healthcare industry and its competitors Through
          understanding of marketplace dynamics including healthcare customer
          base; and comparative strengths and weaknesses of competitor’s
          product. Demonstrated ability to effectively communicate to a diverse
          audience, at multiple levels within the company
        </p>
      </div>
    </section>
  );
}
