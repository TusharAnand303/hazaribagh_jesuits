import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiAlertCircle, FiBook, FiUser, FiAward, FiCalendar, FiClock } from 'react-icons/fi';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';

const PublicationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [publication, setPublication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPublicationDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        const fetchPromise = fetch(`${import.meta.env.VITE_API_BASE_URL}/publications/${id}`);
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Request timeout')), 15000)
        );

        const response = await Promise.race([fetchPromise, timeoutPromise]);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.status && result.data) {
          setPublication(result.data);
          document.title = `${result.data.publishers_name} - Publications`;
        } else {
          setError('Publication not found');
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching publication detail:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPublicationDetail();
  }, [id]);

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Publications', path: '/publications' },
    { label: publication?.publishers_name || 'Details', path: `/publications/${id}` },
  ];

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-cream">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <p className="text-gray-600 text-lg">Loading publication details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !publication) {
    return (
      <div className="min-h-screen bg-cream">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <FiAlertCircle className="w-16 h-16 text-red-500" />
          <h3 className="text-xl font-bold text-navy">Unable to Load Publication</h3>
          <p className="text-gray-600">
            {error === 'Request timeout'
              ? 'The request is taking longer than expected.'
              : 'This publication could not be found.'}
          </p>
          <Link to="/publications">
            <button className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors">
              Back to Publications
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-cream to-white text-navy">
      {/* Header */}
      <header className="p-6 mt-24 sm:ml-24 -mb-10">
        <h1 className="text-3xl font-bold">{publication.publishers_name}</h1>
      </header>
      <Breadcrumb items={breadcrumbItems} />

      {/* Main Content */}
      <main className="p-6 pt-12 sm:ml-24 sm:mr-24">
        {/* Flex Container */}
        <div className="flex flex-col lg:flex-row gap-6 max-w-[1800px]">
          {/* Content Section - Left - Takes more space on large screens */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 lg:flex-2"
          >
            <article className="bg-white rounded-2xl shadow-xl overflow-hidden h-full">
              {/* Header */}
              <div className="p-6 md:p-8 bg-linear-to-r from-navy/5 to-primary/5 border-b border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
                    <FiUser className="w-3.5 h-3.5" />
                    AUTHOR
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-navy mb-2 leading-tight">
                  {publication.publishers_name}
                </h1>
                {publication.qualification && (
                  <div className="flex items-center gap-2 text-secondary">
                    <FiAward className="w-5 h-5" />
                    <p className="text-base md:text-lg font-semibold">
                      {publication.qualification}
                    </p>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                {/* Short Description */}
                {publication.short_description && (
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
                      <div className="w-1 h-6 bg-primary rounded"></div>
                      About the Author
                    </h2>
                    <div className="p-6 bg-linear-to-r from-primary/5 to-transparent rounded-xl border-l-4 border-primary">
                      <p className="text-gray-700 leading-relaxed text-base">
                        {publication.short_description}
                      </p>
                    </div>
                  </div>
                )}

                {/* Long Description */}
                {publication.long_description && (
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
                      <div className="w-1 h-6 bg-secondary rounded"></div>
                      Detailed Information
                    </h2>
                    <div
                      className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                      style={{fontSize: '1rem',lineHeight: '1.8',}} 
                      dangerouslySetInnerHTML={{ __html: publication.long_description }}
                    />
                  </div>
                )}
              </div>
            </article>
          </motion.div>

          {/* Sidebar - Right - Image and Info */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-[400px] shrink-0"
          >
            <div className="flex flex-col gap-6">
              {/* Image Card */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="p-4 bg-linear-to-r from-primary to-secondary">
                  <h3 className="text-white font-bold text-sm uppercase tracking-wide flex items-center gap-2">
                    <FiBook className="w-4 h-4" />
                    Publication Image
                  </h3>
                </div>
                <div className="p-6">
                  <div className="relative h-72 md:h-80 rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={publication.image_url || 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop'}
                      alt={publication.publishers_name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop';
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Info Card */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="p-4 bg-linear-to-r from-secondary to-primary">
                  <h3 className="text-white font-bold text-sm uppercase tracking-wide">
                    Publication Info
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500 font-medium text-sm">Publication ID</span>
                        <span className="text-navy font-bold">#{publication.id}</span>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <FiCalendar className="w-4 h-4 text-primary" />
                        <span className="text-gray-500 font-medium text-sm">Published Date</span>
                      </div>
                      <span className="text-navy font-semibold text-sm block">
                        {new Date(publication.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                      <span className="text-gray-400 text-xs block mt-1">
                        {new Date(publication.created_at).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <FiClock className="w-4 h-4 text-secondary" />
                        <span className="text-gray-500 font-medium text-sm">Last Updated</span>
                      </div>
                      <span className="text-navy font-semibold text-sm block">
                        {new Date(publication.updated_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                      <span className="text-gray-400 text-xs block mt-1">
                        {new Date(publication.updated_at).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>

                    {publication.qualification && (
                      <div className="p-4 bg-linear-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
                        <div className="flex items-center gap-2 mb-2">
                          <FiAward className="w-4 h-4 text-secondary" />
                          <span className="text-gray-700 font-medium text-sm">Qualification</span>
                        </div>
                        <span className="text-navy font-bold text-sm">
                          {publication.qualification}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Back Button */}
                  <Link to="/publications">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full mt-6 px-4 py-3 bg-linear-to-r from-primary to-navy text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <FiArrowLeft className="w-4 h-4" />
                      Back to Publications
                    </motion.button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </main>
    </div>
  );
};

export default PublicationDetail;
