import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../config/axios.config';
import { API_ENDPOINTS } from '../config/api.config';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface Gig {
  _id: string;
  title: string;
  description: string;
  budget: number;
  status: 'open' | 'assigned' | 'completed';
  createdBy: {
    _id: string;
    name: string;
  };
  createdAt: string;
  bidCount?: number;
}

const BrowseGigs = () => {
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'open'>('open');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchGigs();
  }, [statusFilter]);

  const fetchGigs = async () => {
    try {
      setIsLoading(true);
      const params: { status?: string } = {};
      if (statusFilter === 'open') {
        params.status = 'open';
      }
      const response = await axiosInstance.get(API_ENDPOINTS.GIGS.BASE, { params });
      setGigs(response.data.gigs || []);
    } catch (error) {
      console.error('Error fetching gigs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredGigs = gigs.filter((gig) =>
    gig.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    gig.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Browse Gigs</h1>
            <p className="text-gray-600">Find the perfect project to work on</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search gigs by title or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-6 py-3 rounded-xl font-medium transition-all ${
                    statusFilter === 'all'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setStatusFilter('open')}
                  className={`px-6 py-3 rounded-xl font-medium transition-all ${
                    statusFilter === 'open'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Open Only
                </button>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
              <p className="mt-4 text-gray-600">Loading gigs...</p>
            </div>
          ) : filteredGigs.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl">
              <p className="text-gray-600 text-lg">No gigs found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGigs.map((gig) => (
                <Link
                  key={gig._id}
                  to={`/gig/${gig._id}`}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        gig.status === 'open'
                          ? 'bg-green-100 text-green-700'
                          : gig.status === 'assigned'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {gig.status.toUpperCase()}
                    </span>
                    {gig.bidCount !== undefined && (
                      <span className="text-sm text-gray-500">{gig.bidCount} bids</span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    {gig.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{gig.description}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-2xl font-bold text-orange-500">${gig.budget}</p>
                      <p className="text-xs text-gray-500">Budget</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-700">{gig.createdBy.name}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(gig.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BrowseGigs;

