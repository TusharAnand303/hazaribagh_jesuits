import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiAlertCircle, FiUsers, FiCalendar, FiLink } from 'react-icons/fi';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb'; // Fixed path for EducationPages

const CommunitiesDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataAvailable, setDataAvailable] = useState(false);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        setLoading(true);
        setError(null);

        const fetchPromise = fetch(`${import.meta.env.VITE_API_BASE_URL}/communitiesdetails/${id}`);
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Request timeout')), 15000)
        );

        const res = await Promise.race([fetchPromise, timeoutPromise]);
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }

        const response = await res.json();
        const dataItem = response.data[0];
        setContent(dataItem || null);
        setDataAvailable(!!dataItem);
        if (dataItem) {
          document.title = `${dataItem.community_name} - Communities`;
        }
      } catch (err) {
        console.error(err);
        setError(err.message || 'Unable to load Communities details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCommunities();
    }
  }, [id]);

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: content?.community_name || 'Details', path: `/communities/${id}` },
  ];

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-cream">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <p className="text-gray-600 text-lg">Loading community details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !content) {
    return (
      <div className="min-h-screen bg-cream">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <FiAlertCircle className="w-16 h-16 text-red-500" />
          <h3 className="text-xl font-bold text-navy">Unable to Load Community</h3>
          <p className="text-gray-600">
            {error === 'Request timeout'
              ? 'The request is taking longer than expected.'
              : error || 'Community details could not be found.'}
          </p>
          <Link to="/communities">
            <button className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors">
              Back to Communities
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
        <h1 className="text-3xl font-bold">{content.community_name}</h1>
      </header>
      <Breadcrumb items={breadcrumbItems} />

      {/* Main Content */}
      <main className="p-6 pt-12 sm:ml-24 sm:mr-24">
        {/* Flex Container */}
        <div className="flex flex-col lg:flex-row gap-6 max-w-[1800px]">
          {/* Content Section - Left */}
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
                    <FiUsers className="w-3.5 h-3.5" />
                    COMMUNITY
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-navy mb-2 leading-tight">
                  {content.community_name}
                </h1>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                {/* Image */}
                {content.image_url && (
                  <div className="mb-8">
                    <div className="relative h-72 md:h-80 rounded-xl overflow-hidden shadow-lg">
                      <img
                        src={content.image_url}
                        alt={content.community_name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Description */}
                {content.long_description && (
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
                      <div className="w-1 h-6 bg-primary rounded"></div>
                      About the Community
                    </h2>
                    <div className="p-6 bg-linear-to-r from-primary/5 to-transparent rounded-xl border-l-4 border-primary">
                      <div
                        className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                        style={{ fontSize: '1rem', lineHeight: '1.8' }}
                        dangerouslySetInnerHTML={{ __html: content.long_description }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </article>
          </motion.div>

          {/* Sidebar - Right */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-[400px] shrink-0"
          >
            <div className="flex flex-col gap-6">
              {/* Info Card */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="p-4 bg-linear-to-r from-secondary to-primary">
                  <h3 className="text-white font-bold text-sm uppercase tracking-wide flex items-center gap-2">
                    <FiUsers className="w-4 h-4" />
                    Community Information
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500 font-medium text-sm">Community Center</span>
                        <span className="text-navy font-bold">{content.community_name || community_name}</span>
                      </div>
                    </div>

                    {content.created_at && (
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <FiCalendar className="w-4 h-4 text-primary" />
                          <span className="text-gray-500 font-medium text-sm">Added On</span>
                        </div>
                        <span className="text-navy font-semibold text-sm block">
                          {new Date(content.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                    )}

                    {/* Link Button */}
                    {content.link && content.link !== '#' && content.link !== null && (
                      <div className="p-4 bg-linear-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
                        <a
                          href={content.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full text-center px-4 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <FiLink className="w-4 h-4" />
                          Visit Website
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Back Button */}
                  <Link to="/">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full mt-6 px-4 py-3 bg-linear-to-r from-primary to-navy text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <FiArrowLeft className="w-4 h-4" />
                      Back to Home
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

export default CommunitiesDetails;
