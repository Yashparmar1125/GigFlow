import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../config/axios.config';
import { API_ENDPOINTS } from '../config/api.config';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

interface DashboardStats {
  myGigs: number;
  activeGigs: number;
  myBids: number;
  pendingBids: number;
  hiredBids: number;
}

interface DashboardGig {
  _id: string;
  title: string;
  budget: number;
  status: string;
  createdAt: string;
  bidCount?: number;
}

interface DashboardBid {
  _id: string;
  price: number;
  status: 'pending' | 'hired' | 'rejected';
  createdAt: string;
  gig: {
    _id: string;
    title: string;
    budget: number;
    status: string;
  };
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    myGigs: 0,
    activeGigs: 0,
    myBids: 0,
    pendingBids: 0,
    hiredBids: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [recentGigs, setRecentGigs] = useState<DashboardGig[]>([]);
  const [recentBids, setRecentBids] = useState<DashboardBid[]>([]);
  const [realtimeMessage, setRealtimeMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }
    fetchDashboardData();
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (!isAuthenticated || !user?._id) return;

    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const socket = io(baseUrl, {
      withCredentials: true,
      auth: {
        userId: user._id,
      },
    });

    socket.on('notification', (payload: { type: string; message?: string; gigTitle?: string }) => {
      if (payload.type === 'hire') {
        setRealtimeMessage(
          payload.message || (payload.gigTitle ? `You have been hired for ${payload.gigTitle}!` : 'You have been hired!')
        );
        // Refresh dashboard data so counts reflect new state
        fetchDashboardData();
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [isAuthenticated, user?._id]);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const [gigsResponse, bidsResponse] = await Promise.all([
        axiosInstance.get(API_ENDPOINTS.GIGS.MY_GIGS),
        axiosInstance.get(API_ENDPOINTS.BIDS.MY_BIDS),
      ]);

      const gigs = gigsResponse.data.gigs || [];
      const bids = bidsResponse.data.bids || [];

      setStats({
        myGigs: gigs.length,
        activeGigs: gigs.filter((gig: any) => gig.status === 'open').length,
        myBids: bids.length,
        pendingBids: bids.filter((bid: any) => bid.status === 'pending').length,
        hiredBids: bids.filter((bid: any) => bid.status === 'hired').length,
      });

      setRecentGigs(gigs.slice(0, 3));
      setRecentBids(bids.slice(0, 3));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mb-4"></div>
                <p className="text-gray-600">Loading dashboard...</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-6">
          {realtimeMessage && (
            <div className="mb-4 rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-800 flex items-center justify-between">
              <span>{realtimeMessage}</span>
              <button
                type="button"
                className="text-xs font-medium text-green-700 hover:text-green-900"
                onClick={() => setRealtimeMessage(null)}
              >
                Dismiss
              </button>
            </div>
          )}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.name?.split(' ')[0]}! 👋
            </h1>
            <p className="text-gray-600">Here's what's happening with your gigs and bids today.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <Link
              to="/my-gigs"
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">My Gigs</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-purple-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 14.15v4.25c0 .414-.336.75-.75.75h-4.5a.75.75 0 01-.75-.75v-4.25m0 0h4.5m-4.5 0l-6 6m6-6l-6-6m6 6l6-6"
                  />
                </svg>
              </div>
              <p className="text-3xl font-bold text-gray-900">{stats.myGigs}</p>
              <p className="text-xs text-gray-500 mt-1">{stats.activeGigs} active</p>
            </Link>

            <Link
              to="/my-gigs"
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Active Gigs</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-green-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                  />
                </svg>
              </div>
              <p className="text-3xl font-bold text-gray-900">{stats.activeGigs}</p>
              <p className="text-xs text-gray-500 mt-1">Open for bids</p>
            </Link>

            <Link
              to="/my-bids"
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">My Bids</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-blue-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.311-.06m-2.699 2.7c.103.021.207.041.311.06a15.09 15.09 0 002.448-2.448 14.9 14.9 0 00-.311-.06"
                  />
                </svg>
              </div>
              <p className="text-3xl font-bold text-gray-900">{stats.myBids}</p>
              <p className="text-xs text-gray-500 mt-1">Total submitted</p>
            </Link>

            <Link
              to="/my-bids"
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Pending</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-yellow-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-3xl font-bold text-gray-900">{stats.pendingBids}</p>
              <p className="text-xs text-gray-500 mt-1">Awaiting response</p>
            </Link>

            <Link
              to="/my-bids"
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Hired</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-green-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-3xl font-bold text-gray-900">{stats.hiredBids}</p>
              <p className="text-xs text-gray-500 mt-1">Successfully hired</p>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Link
              to="/post-gig"
              className="bg-gradient-to-br from-purple-600 to-orange-500 rounded-xl shadow-lg p-8 text-white hover:shadow-xl transition-all transform hover:scale-[1.02]"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Post a New Gig</h2>
                  <p className="text-white/90 text-sm">
                    Create a new project and start receiving bids from talented freelancers
                  </p>
                </div>
                <div className="bg-white/20 rounded-xl p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </div>
              </div>
              <div className="flex items-center text-white/80 text-sm font-medium">
                Get started
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4 ml-2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </Link>

            <Link
              to="/browse-gigs"
              className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Browse Gigs</h2>
                  <p className="text-gray-600 text-sm">
                    Discover exciting projects and submit your bids to get hired
                  </p>
                </div>
                <div className="bg-purple-100 rounded-xl p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8 text-purple-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex items-center text-purple-600 text-sm font-medium">
                Explore gigs
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4 ml-2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Recent Gigs</h2>
                <Link to="/my-gigs" className="text-sm text-purple-600 hover:text-purple-700">
                  View all
                </Link>
              </div>
              {recentGigs.length === 0 ? (
                <p className="text-gray-500 text-sm">You haven't posted any gigs yet.</p>
              ) : (
                <div className="space-y-3">
                  {recentGigs.map((gig) => (
                    <Link
                      key={gig._id}
                      to={`/gig/${gig._id}`}
                      className="flex items-center justify-between px-3 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{gig.title}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(gig.createdAt).toLocaleDateString()} · ${gig.budget}{' '}
                          {gig.bidCount ? `· ${gig.bidCount} bids` : ''}
                        </p>
                      </div>
                      <span
                        className={`ml-3 px-2 py-1 rounded-full text-[10px] font-semibold ${
                          gig.status === 'open'
                            ? 'bg-green-100 text-green-700'
                            : gig.status === 'assigned'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {gig.status.toUpperCase()}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Recent Bids</h2>
                <Link to="/my-bids" className="text-sm text-purple-600 hover:text-purple-700">
                  View all
                </Link>
              </div>
              {recentBids.length === 0 ? (
                <p className="text-gray-500 text-sm">You haven't placed any bids yet.</p>
              ) : (
                <div className="space-y-3">
                  {recentBids.map((bid) => (
                    <Link
                      key={bid._id}
                      to={`/gig/${bid.gig._id}`}
                      className="flex items-center justify-between px-3 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {bid.gig.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          You bid ${bid.price} · {new Date(bid.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span
                        className={`ml-3 px-2 py-1 rounded-full text-[10px] font-semibold ${
                          bid.status === 'hired'
                            ? 'bg-green-100 text-green-700'
                            : bid.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {bid.status.toUpperCase()}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Dashboard;

