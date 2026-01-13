import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../config/axios.config';
import { API_ENDPOINTS } from '../config/api.config';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

interface Bid {
  _id: string;
  message: string;
  price: number;
  status: 'pending' | 'hired' | 'rejected';
  gig: {
    _id: string;
    title: string;
    budget: number;
    status: string;
  };
  createdAt: string;
}

const MyBids = () => {
  const navigate = useNavigate();
  const { isAuthenticated, openAuthModal, setAuthMode } = useAuth();
  const [bids, setBids] = useState<Bid[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      setAuthMode('login');
      openAuthModal();
      navigate('/browse-gigs');
      return;
    }
    fetchMyBids();
  }, [isAuthenticated, navigate]);

  const fetchMyBids = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(API_ENDPOINTS.BIDS.MY_BIDS);
      setBids(response.data.bids || []);
    } catch (error) {
      console.error('Error fetching my bids:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  const filteredBids = {
    pending: bids.filter((bid) => bid.status === 'pending'),
    hired: bids.filter((bid) => bid.status === 'hired'),
    rejected: bids.filter((bid) => bid.status === 'rejected'),
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">My Bids</h1>
            <p className="text-gray-600">Track your bids on gigs</p>
          </div>

          {isLoading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
              <p className="mt-4 text-gray-600">Loading your bids...</p>
            </div>
          ) : bids.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl">
              <p className="text-gray-600 text-lg mb-4">You haven't placed any bids yet.</p>
              <Link
                to="/browse-gigs"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl transition-all"
              >
                Browse Gigs
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredBids.pending.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Pending ({filteredBids.pending.length})
                  </h2>
                  <div className="space-y-4">
                    {filteredBids.pending.map((bid) => (
                      <BidCard key={bid._id} bid={bid} />
                    ))}
                  </div>
                </div>
              )}

              {filteredBids.hired.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Hired ({filteredBids.hired.length})
                  </h2>
                  <div className="space-y-4">
                    {filteredBids.hired.map((bid) => (
                      <BidCard key={bid._id} bid={bid} />
                    ))}
                  </div>
                </div>
              )}

              {filteredBids.rejected.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Rejected ({filteredBids.rejected.length})
                  </h2>
                  <div className="space-y-4">
                    {filteredBids.rejected.map((bid) => (
                      <BidCard key={bid._id} bid={bid} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

const BidCard = ({ bid }: { bid: Bid }) => {
  return (
    <div
      className={`bg-white rounded-2xl p-6 border-2 ${
        bid.status === 'hired'
          ? 'border-green-500 bg-green-50'
          : bid.status === 'rejected'
          ? 'border-gray-200 bg-gray-50'
          : 'border-gray-200'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <Link
            to={`/gig/${bid.gig._id}`}
            className="text-xl font-bold text-gray-900 hover:text-purple-600 transition-colors"
          >
            {bid.gig.title}
          </Link>
          <p className="text-sm text-gray-500 mt-1">
            Budget: ${bid.gig.budget} • Status: {bid.gig.status}
          </p>
        </div>
        <div className="text-right ml-4">
          <p className="text-2xl font-bold text-orange-500">${bid.price}</p>
          <span
            className={`text-xs font-semibold px-2 py-1 rounded ${
              bid.status === 'hired'
                ? 'bg-green-100 text-green-700'
                : bid.status === 'rejected'
                ? 'bg-gray-100 text-gray-700'
                : 'bg-blue-100 text-blue-700'
            }`}
          >
            {bid.status.toUpperCase()}
          </span>
        </div>
      </div>
      <p className="text-gray-700 mb-4 whitespace-pre-wrap line-clamp-3">{bid.message}</p>
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          Bid placed on {new Date(bid.createdAt).toLocaleDateString()}
        </p>
        <Link
          to={`/gig/${bid.gig._id}`}
          className="text-purple-600 hover:text-purple-700 font-medium text-sm"
        >
          View Gig →
        </Link>
      </div>
    </div>
  );
};

export default MyBids;

