
// ==========================================
// Data Definitions
// ==========================================

interface Developer {
  id: number;
  name: string;
  role: string;
  rating: number;
  reviews: number;
  image: string;
  skills: string[];
  hourlyRate: number;
  location: string;
  isFavorite: boolean;
  isButtonFilled?: boolean;
}

interface DeveloperCardProps {
  developer: Developer;
}

const developers: Developer[] = [
  {
    id: 1,
    name: 'Michael Stewart',
    role: 'React Developer',
    rating: 5.0,
    reviews: 30,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    skills: ['Web Design', 'UI', 'React'],
    hourlyRate: 45,
    location: 'Newyork, USA',
    isFavorite: false,
  },
  {
    id: 2,
    name: 'Anna Mackinolty',
    role: 'Python Developer',
    rating: 5.0,
    reviews: 30,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    skills: ['Web Design', 'HTML', 'React'],
    hourlyRate: 46,
    location: 'Newyork, USA',
    isFavorite: false,
  },
  {
    id: 3,
    name: 'Austin Slessor',
    role: 'PHP Developer',
    rating: 5.0,
    reviews: 30,
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    skills: ['Web Design', 'HTML', 'React'],
    hourlyRate: 35,
    location: 'Newyork, USA',
    isFavorite: true, 
    isButtonFilled: false, 
  },
  {
    id: 4,
    name: 'Michael Stewart',
    role: 'React Developer',
    rating: 5.0,
    reviews: 30,
    image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    skills: ['.NET', 'HTML', 'React'],
    hourlyRate: 40,
    location: 'Newyork, USA',
    isFavorite: false,
  },
];

// ==========================================
// Reusable Component
// ==========================================

const DeveloperCard = ({ developer }: DeveloperCardProps) => {
  return (
    <div className="bg-gray-50 rounded-2xl p-6 relative border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
      {/* Favorite Icon */}
      <button className="absolute top-5 right-5 p-2 rounded-full bg-white text-gray-400 hover:text-orange-500 transition-all duration-300 shadow-sm hover:shadow-md hover:scale-110 active:scale-95 z-10">
        <svg xmlns="http://www.w3.org/2000/svg" fill={developer.isFavorite ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 transition-colors duration-300 ${developer.isFavorite ? 'text-orange-500' : ''}`}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      </button>

      {/* Profile Image & Verification */}
      <div className="relative w-24 h-24 mx-auto mb-4 group-hover:scale-105 transition-transform duration-300">
        <img src={developer.image} alt={developer.name} className="w-full h-full object-cover rounded-xl ring-2 ring-transparent group-hover:ring-purple-200 transition-all duration-300" />
        <div className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-green-500">
            <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.498 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.491 4.491 0 013.497-1.307zm4.45 4.45a.75.75 0 00-1.06-1.06L6.75 12.44l-1.81-1.81a.75.75 0 00-1.06 1.06l2.34 2.34a.75.75 0 001.06 0l5.34-5.34z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      {/* Name, Role, Rating */}
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold text-gray-900">{developer.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{developer.role}</p>
        <div className="flex items-center justify-center gap-1 text-sm font-medium text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-400">
            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.005Z" clipRule="evenodd" />
          </svg>
          <span>{developer.rating.toFixed(1)}</span>
          <span className="text-gray-500">({developer.reviews})</span>
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {developer.skills.map((skill: string, index: number) => (
          <span key={index} className="px-3 py-1 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-full hover:border-purple-300 hover:text-purple-600 transition-colors duration-200">
            {skill}
          </span>
        ))}
      </div>

      {/* Rate & Location */}
      <div className="flex items-center justify-between text-sm font-bold text-gray-900 mb-6">
        <span>${developer.hourlyRate} Hourly</span>
        <div className="flex items-center text-gray-500 font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z" />
          </svg>
          <span>{developer.location}</span>
        </div>
      </div>

      {/* View Profile Button */}
      <button className={`w-full py-3 text-sm font-bold rounded-xl transition-all duration-300 ${developer.isButtonFilled ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-md hover:shadow-lg' : 'bg-white text-orange-500 border-2 border-orange-500 hover:bg-orange-50 hover:shadow-md'} hover:scale-[1.02] active:scale-[0.98]`}>
        View Profile
      </button>
    </div>
  );
};

// ==========================================
// Main Section Component
// ==========================================

const MostHiredDevelopers = () => {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Most Hired Developers
            </h2>
            <p className="text-gray-600 text-lg">
              Work with talented people at the most affordable price
            </p>
          </div>
          {/* Navigation Arrows */}
          <div className="hidden md:flex gap-4">
            <button className="p-2 rounded-full border border-gray-300 text-gray-400 hover:border-orange-500 hover:text-orange-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button className="p-2 rounded-full border border-gray-300 text-gray-400 hover:border-orange-500 hover:text-orange-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>

        {/* Developers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {developers.map((developer) => (
            <DeveloperCard key={developer.id} developer={developer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MostHiredDevelopers;