import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

// ==========================================
// Data Definitions
// ==========================================

// Data for the four achievement cards matching the design
const achievementsData = [
  {
    number: '7,468',
    label: 'Freelance Developers',
    theme: 'yellow',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    number: '8,368',
    label: 'Projects Added',
    theme: 'pink',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
  {
    number: '7,468',
    label: 'Completed Projects',
    theme: 'blue',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    number: '7,458',
    label: 'Companies Registered',
    theme: 'green',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
];
const colorVariants: Record<string, { border: string; bg: string; text: string }> = {
  yellow: { border: 'border-yellow-400', bg: 'bg-yellow-100', text: 'text-yellow-600' },
  pink: { border: 'border-pink-400', bg: 'bg-pink-100', text: 'text-pink-600' },
  blue: { border: 'border-blue-400', bg: 'bg-blue-100', text: 'text-blue-600' },
  green: { border: 'border-green-400', bg: 'bg-green-100', text: 'text-green-600' },
};

// ==========================================
// Reusable Child Components
// ==========================================

interface BannerCardProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  imageSrc: string;
  imageAlt: string;
  blobColorClass: string;
}

// The top horizontal banner cards
const BannerCard = ({ title, description, buttonText, buttonLink, imageSrc, imageAlt, blobColorClass }: BannerCardProps) => {
  return (
    <div className="bg-white rounded-3xl p-8 lg:p-12 flex flex-col-reverse lg:flex-row items-center justify-between gap-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden relative group">
      {/* Text Content Side */}
      <div className="flex-1 text-center lg:text-left z-10">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 group-hover:text-purple-700 transition-colors duration-300">
          {title}
        </h2>
        <p className="text-gray-600 mb-8 text-lg max-w-md mx-auto lg:mx-0 leading-relaxed">
          {description}
        </p>
        <Link
          to={buttonLink}
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
        >
          {buttonText}
        </Link>
      </div>

      {/* Illustration Side */}
      <div className="flex-1 flex justify-center lg:justify-end relative z-10">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full max-w-sm object-contain group-hover:scale-105 transition-transform duration-500"
        />
         {/* Decorative themed blob background positioned behind the image */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full mix-blend-multiply filter blur-3xl opacity-40 -z-10 ${blobColorClass} group-hover:opacity-60 transition-opacity duration-300`}></div>
      </div>
    </div>
  );
};

interface AchievementCardProps {
  number: string;
  label: string;
  icon: ReactNode;
  theme: string;
}

// The bottom vertical stats cards
const AchievementCard = ({ number, label, icon, theme }: AchievementCardProps) => {
  // Get color classes based on theme prop, fallback to yellow if undefined
  const colors = colorVariants[theme] || colorVariants.yellow;

  return (
    <div className={`bg-white rounded-2xl p-8 flex flex-col items-center text-center border-t-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group ${colors.border}`}>
      {/* Icon Container with dynamic background and text color */}
      <div className={`h-20 w-20 rounded-2xl flex items-center justify-center mb-6 ${colors.bg} ${colors.text} group-hover:scale-110 group-hover:shadow-md transition-all duration-300`}>
        {icon}
      </div>
      <h3 className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors duration-300">{number}</h3>
      <p className="text-gray-600 font-medium">{label}</p>
    </div>
  );
};

// ==========================================
// Main Section Component
// ==========================================

const StatsAndBannersSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- Part 1: Top Banners Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {/* Banner 1: For Clients (Using Purple theme accent matching logo) */}
          <BannerCard 
            title="I Need a Developed Project"
            description="Get the perfect Developed project for your budget from our creative community."
            buttonText="Browse Professionals"
            buttonLink="/browse-freelancers"
            // Note: Replace these URLs with your actual local assets
            imageSrc="Image (1).png"
            imageAlt="Client looking for talent"
            blobColorClass="bg-purple-200"
          />

          {/* Banner 2: For Freelancers (Using Orange theme accent matching logo) */}
          <BannerCard 
            title="Find Your Next Great Job Opportunity!"
            description="Do you want to earn money, find unlimited clients and build your freelance career?"
            buttonText="Browse Jobs"
            buttonLink="/browse-jobs"
             // Note: Replace these URLs with your actual local assets
            imageSrc="Image (2).png"
            imageAlt="Freelancer looking for work"
            blobColorClass="bg-orange-200"
          />
        </div>

        {/* --- Part 2: Achievements Grid --- */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Achievement We Have Earned
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            At Freelancer, we believe that talent is borderless and opportunity should be too.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievementsData.map((item, index) => (
            <AchievementCard
              key={index}
              number={item.number}
              label={item.label}
              icon={item.icon}
              theme={item.theme}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default StatsAndBannersSection;