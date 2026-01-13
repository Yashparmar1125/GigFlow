import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../config/axios.config';
import { API_ENDPOINTS } from '../config/api.config';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

const EditGig = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, user, openAuthModal, setAuthMode } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      setAuthMode('login');
      openAuthModal();
      navigate('/browse-gigs');
      return;
    }
    if (id) {
      fetchGig();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isAuthenticated]);

  const fetchGig = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(API_ENDPOINTS.GIGS.BY_ID(id!));
      const gig = response.data.gig;

      // Only owner should edit; if not, redirect
      if (gig.createdBy._id !== user?._id) {
        navigate(`/gig/${gig._id}`);
        return;
      }

      setFormData({
        title: gig.title,
        description: gig.description,
        budget: String(gig.budget),
      });
    } catch (err) {
      console.error('Error loading gig for edit:', err);
      setError('Unable to load gig details.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSaving(true);

    try {
      const budget = parseFloat(formData.budget);
      if (isNaN(budget) || budget <= 0) {
        setError('Please enter a valid budget amount');
        setIsSaving(false);
        return;
      }

      const response = await axiosInstance.put(API_ENDPOINTS.GIGS.BY_ID(id!), {
        title: formData.title,
        description: formData.description,
        budget,
      });

      navigate(`/gig/${response.data.gig._id}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to update gig');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-4xl font-bold text-gray-900">Edit Gig</h1>
            </div>
            <p className="text-gray-600 mb-8">Update your gig details.</p>

            {isLoading ? (
              <div className="text-center py-10">
                <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600" />
                <p className="mt-4 text-gray-600">Loading gig...</p>
              </div>
            ) : (
              <>
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                      Gig Title *
                    </label>
                    <input
                      id="title"
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                      placeholder="e.g., Need a React Developer for E-commerce Site"
                      maxLength={100}
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      id="description"
                      required
                      rows={8}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none"
                      placeholder="Update your project details, requirements, and expectations..."
                    />
                  </div>

                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                      Budget ($) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <input
                        id="budget"
                        type="number"
                        required
                        min="1"
                        step="0.01"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                        placeholder="0.00"
                      />
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      Adjust your budget if the project scope has changed.
                    </p>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate(id ? `/gig/${id}` : '/my-gigs')}
                      className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default EditGig;


