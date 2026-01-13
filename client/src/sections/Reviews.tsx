// ==========================================
// Data Definitions
// ==========================================

interface Review {
  id: number;
  name: string;
  location: string;
  image: string;
  quote: string;
  rating: number;
}

interface ReviewCardProps {
  review: Review;
}

const reviews: Review[] = [
  {
    id: 1,
    name: 'Amelie Hannah',
    location: 'Australia',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
    quote: 'Look for reviews that mention clear and effective communication, as good for successful projects.',
    rating: 4.0,
  },
  {
    id: 2,
    name: 'Alexander Hickson',
    location: 'New York',
    image: 'https://images.unsplash.com/photo-1590649880785-945d0e3d1312?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
    quote: 'Assess whether the developer consistently delivers high-quality work that aligns with project needs.',
    rating: 5.0,
  },
  {
    id: 3,
    name: 'Cameron Morley',
    location: 'Canada',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
    quote: 'Evaluate the developer\'s ability to solve technical challenges and changes in project requirements.',
    rating: 4.0,
  },
];

const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 relative hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <img
            src={review.image}
            alt={review.name}
            className="w-16 h-16 rounded-full object-cover ring-2 ring-transparent group-hover:ring-purple-200 transition-all duration-300"
          />
          <div>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors duration-300">{review.name}</h3>
            <p className="text-gray-600">{review.location}</p>
          </div>
        </div>
        {/* Quote Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 text-orange-100 opacity-50 group-hover:opacity-70 transition-opacity duration-300">
          <path fillRule="evenodd" d="M4.5 5.25C4.5 3.593 5.843 2.25 7.5 2.25h1.5c1.657 0 3 1.343 3 3v1.5c0 1.657-1.343 3-3 3H7.5v4.5h3.75c1.657 0 3 1.343 3 3v1.5c0 1.657-1.343 3-3 3h-1.5c-1.657 0-3-1.343-3-3v-1.5c0-1.657 1.343-3 3-3H12V7.5H7.5c-1.657 0-3-1.343-3-3v-1.5zm11.25 0c0-1.657 1.343-3 3-3h1.5c1.657 0 3 1.343 3 3v1.5c0 1.657-1.343 3-3 3h-1.5v4.5h3.75c1.657 0 3 1.343 3 3v1.5c0 1.657-1.343 3-3 3h-1.5c-1.657 0-3-1.343-3-3v-1.5c0-1.657 1.343-3 3-3h1.5V7.5h-4.5c-1.657 0-3-1.343-3-3v-1.5z" clipRule="evenodd" />
        </svg>
      </div>

      <p className="text-gray-600 text-lg leading-relaxed mb-6">
        {review.quote}
      </p>

      <div className="flex items-center gap-2">
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={i < Math.floor(review.rating) ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
              <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.005Z" clipRule="evenodd" />
            </svg>
          ))}
        </div>
        <span className="text-lg font-bold text-gray-900">{review.rating.toFixed(1)}</span>
      </div>
    </div>
  );
};

// ==========================================
// Main Section Component
// ==========================================

const TestimonialsSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Top Reviews
          </h2>
          <p className="text-gray-600 text-lg">
            High performing developers to your
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center gap-4">
          <button className="p-3 rounded-full border border-gray-300 text-gray-400 hover:border-orange-500 hover:text-orange-500 hover:bg-orange-50 transition-all duration-300 hover:shadow-md hover:scale-110 active:scale-95">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button className="p-3 rounded-full border border-gray-300 text-gray-400 hover:border-orange-500 hover:text-orange-500 hover:bg-orange-50 transition-all duration-300 hover:shadow-md hover:scale-110 active:scale-95">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;