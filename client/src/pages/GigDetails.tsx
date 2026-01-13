import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
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
  createdBy: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
}

interface Bid {
  _id: string;
  message: string;
  price: number;
  status: 'pending' | 'hired' | 'rejected';
  freelancer: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
}

const GigDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated, user, openAuthModal, setAuthMode } = useAuth();
  const [gig, setGig] = useState<Gig | null>(null);
  const [bids, setBids] = useState<Bid[]>([]);
  const [bidForm, setBidForm] = useState({ message: '', price: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showBidForm, setShowBidForm] = useState(false);

  useEffect(() => {
    if (id) {
      fetchGigDetails();
      fetchBids();
    }
  }, [id]);

  const fetchGigDetails = async () => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.GIGS.BY_ID(id!));
      setGig(response.data.gig);
    } catch (error) {
      console.error('Error fetching gig:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBids = async () => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.GIGS.BIDS(id!));
      setBids(response.data.bids || []);
    } catch (error) {
      console.error('Error fetching bids:', error);
    }
  };

  const handleBidSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setAuthMode('login');
      openAuthModal();
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      const price = parseFloat(bidForm.price);
      if (isNaN(price) || price <= 0) {
        setError('Please enter a valid bid amount');
        setIsSubmitting(false);
        return;
      }

      await axiosInstance.post(API_ENDPOINTS.GIGS.BIDS(id!), {
        message: bidForm.message,
        price: price,
      });

      setBidForm({ message: '', price: '' });
      setShowBidForm(false);
      fetchBids();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleHire = async (bidId: string) => {
    if (!confirm('Are you sure you want to hire this freelancer? This will reject all other bids.')) {
      return;
    }

    try {
      await axiosInstance.post(API_ENDPOINTS.BIDS.HIRE(bidId));
      fetchGigDetails();
      fetchBids();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const isOwner = gig && user && gig.createdBy._id === user._id;
  const canBid = isAuthenticated && gig && !isOwner && gig.status === 'open';

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            <p className="mt-4 text-gray-600">Loading gig details...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!gig) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Gig not found</h1>
            <Link to="/browse-gigs" className="text-purple-600 hover:text-purple-700">
              Browse all gigs
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${
                    gig.status === 'open'
                      ? 'bg-green-100 text-green-700'
                      : gig.status === 'assigned'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {gig.status.toUpperCase()}
                </span>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{gig.title}</h1>
                <div className="flex items-center gap-4 text-gray-600 mb-6">
                  <span>Posted by {gig.createdBy.name}</span>
                  <span>•</span>
                  <span>{new Date(gig.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-orange-500">${gig.budget}</p>
                <p className="text-sm text-gray-500">Budget</p>
              </div>
            </div>

            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{gig.description}</p>
            </div>

            {canBid && !showBidForm && (
              <button
                onClick={() => setShowBidForm(true)}
                className="mt-8 w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
              >
                Place a Bid
              </button>
            )}
          </div>

          {showBidForm && canBid && (
            <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Place Your Bid</h2>
              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                  {error}
                </div>
              )}
              <form onSubmit={handleBidSubmit} className="space-y-4">
                <div>
                  <label htmlFor="bid-price" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Price ($) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                      id="bid-price"
                      type="number"
                      required
                      min="1"
                      step="0.01"
                      value={bidForm.price}
                      onChange={(e) => setBidForm({ ...bidForm, price: e.target.value })}
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="bid-message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="bid-message"
                    required
                    rows={5}
                    value={bidForm.message}
                    onChange={(e) => setBidForm({ ...bidForm, message: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
                    placeholder="Tell the client why you're the right fit for this project..."
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Bid'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowBidForm(false);
                      setError('');
                    }}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {isOwner && (
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Bids ({bids.length})
              </h2>
              {bids.length === 0 ? (
                <p className="text-gray-600">No bids yet.</p>
              ) : (
                <div className="space-y-4">
                  {bids.map((bid) => (
                    <div
                      key={bid._id}
                      className={`p-6 rounded-xl border-2 ${
                        bid.status === 'hired'
                          ? 'border-green-500 bg-green-50'
                          : bid.status === 'rejected'
                          ? 'border-gray-200 bg-gray-50'
                          : 'border-gray-200 bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{bid.freelancer.name}</h3>
                          <p className="text-sm text-gray-500">{bid.freelancer.email}</p>
                        </div>
                        <div className="text-right">
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
                      <p className="text-gray-700 mb-4 whitespace-pre-wrap">{bid.message}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                          {new Date(bid.createdAt).toLocaleDateString()}
                        </p>
                        {bid.status === 'pending' && gig.status === 'open' && (
                          <button
                            onClick={() => handleHire(bid._id)}
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-xl transition-all"
                          >
                            Hire
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
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

export default GigDetails;

