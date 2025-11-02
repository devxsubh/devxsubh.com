'use client';

import ExploreCard from './ui/ExploreCard';
import { SlideIn } from './ui/Transitions';
import { SectionHeading } from './ui/Typography';

const exploreWorlds = [
  {
    id: 'world-1',
    imgUrl: '/images/personal/img_9999.webp',
    title: 'Pitch ~ Tune',
  },
  {
    id: 'world-2',
    imgUrl: '/images/personal/f41ebe11.webp',
    title: 'Story ~ Sketch',
  },
  {
    id: 'world-3',
    imgUrl: '/images/personal/sssmc_33.webp',
    title: 'Aid ~ Service',
  },
  {
    id: 'world-4',
    imgUrl: '/images/personal/img_5430.webp',
    title: 'Artist ~ Craft',
  },
  {
    id: 'world-5',
    imgUrl: '/images/personal/dsc_3038.webp',
    title: 'Film ~ Frame',
  },
];

const ExploreSection = () => {
  return (
     <div className="relative pb-20 ">
      {/* <span className="blob absolute top-[20%] left-0 w-1/3 h-5/6 blur-[100px] -z-10" /> */}
      <SectionHeading className="pl-4 md:px-12 py-20">
        <SlideIn className="text-white/40">Discover</SlideIn>
        <br />
        <SlideIn>Journey</SlideIn>
      </SectionHeading>
      <div className="flex lg:flex-row flex-col gap-5 px-4">
        {exploreWorlds.map((world, index) => (
          <ExploreCard
            key={world.id}
            {...world}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default ExploreSection; 