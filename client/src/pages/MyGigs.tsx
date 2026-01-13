import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../config/axios.config';
import { API_ENDPOINTS } from '../config/api.config';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

interface Gig {
  _id: string;
  title: string;
  description: string;
  budget: number;
  status: 'open' | 'assigned' | 'completed';
  createdAt: string;
  bidCount?: number;
}

const MyGigs = () => {
  const navigate = useNavigate();
  const { isAuthenticated, openAuthModal, setAuthMode } = useAuth();
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      setAuthMode('login');
      openAuthModal();
      navigate('/browse-gigs');
      return;
    }
    fetchMyGigs();
  }, [isAuthenticated, navigate]);

  const fetchMyGigs = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(API_ENDPOINTS.GIGS.MY_GIGS);
      setGigs(response.data.gigs || []);
    } catch (error) {
      console.error('Error fetching my gigs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">My Gigs</h1>
              <p className="text-gray-600">Manage your posted gigs</p>
            </div>
            <Link
              to="/post-gig"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
            >
              + Post New Gig
            </Link>
          </div>

          {isLoading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
              <p className="mt-4 text-gray-600">Loading your gigs...</p>
            </div>
          ) : gigs.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl">
              <p className="text-gray-600 text-lg mb-4">You haven't posted any gigs yet.</p>
              <Link
                to="/post-gig"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl transition-all"
              >
                Post Your First Gig
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gigs.map((gig) => (
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
                      <p className="text-sm text-gray-500">
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

export default MyGigs;

