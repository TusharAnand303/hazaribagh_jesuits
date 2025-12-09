import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiArrowLeft, FiAlertCircle, FiTag, FiEdit } from 'react-icons/fi';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newsDetail, setNewsDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch single news details
  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        const fetchPromise = fetch(`${import.meta.env.VITE_API_BASE_URL}/news/${id}`);
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Request timeout')), 15000)
        );

        const response = await Promise.race([fetchPromise, timeoutPromise]);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.status && result.data) {
          setNewsDetail(result.data);
          // Set document title
          document.title = `${result.data.title} - Hazaribag Jesuits`;
        } else {
          setError('News not found');
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching news detail:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [id]);

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'News', path: '/news' },
    { label: newsDetail?.title || 'Details', path: `/news/${id}` },
  ];

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-cream">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <p className="text-gray-600 text-lg">Loading news details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !newsDetail) {
    return (
      <div className="min-h-screen bg-cream">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <FiAlertCircle className="w-16 h-16 text-red-500" />
          <h3 className="text-xl font-bold text-navy">Unable to Load News</h3>
          <p className="text-gray-600">
            {error === 'Request timeout'
              ? 'The request is taking longer than expected.'
              : 'This news article could not be found.'}
          </p>
          <Link to="/news">
            <button className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors">
              Back to News
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
        <h1 className="text-3xl font-bold">{newsDetail.title}</h1>
      </header>
      <Breadcrumb items={breadcrumbItems} />

      {/* Main Content */}
      <main className="p-6 pt-12 sm:ml-24">
        <div className="flex flex-col xl:flex-row gap-6 max-w-[1600px]">
          {/* Content Section - Left - 45% */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full xl:w-[45%]"
          >
            <article className="bg-white rounded-2xl shadow-xl overflow-hidden h-full">
              {/* Header Section */}
              <div className="p-6 border-b border-gray-100">
                {/* Badges */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
                    <FiTag className="w-3.5 h-3.5" />
                    NEWS
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-xl lg:text-2xl font-bold text-navy mb-4 leading-tight">
                  {newsDetail.title}
                </h2>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <FiCalendar className="w-3.5 h-3.5 text-primary" />
                    <span className="font-medium">Published:</span>
                    <span>
                      {new Date(newsDetail.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  {newsDetail.updated_at !== newsDetail.created_at && (
                    <div className="flex items-center gap-2">
                      <FiEdit className="w-3.5 h-3.5 text-secondary" />
                      <span className="font-medium">Updated:</span>
                      <span>
                        {new Date(newsDetail.updated_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 overflow-y-auto" style={{ maxHeight: '700px' }}>
                {/* Content Text */}
                <div
                  className="text-gray-700 leading-relaxed whitespace-pre-line text-sm"
                  style={{
                    lineHeight: '1.8',
                  }}
                >
                  {newsDetail.content}
                </div>

                {/* Short Description if available */}
                {newsDetail.short_description && (
                  <div className="mt-6 p-4 bg-cream/50 rounded-xl border-l-4 border-primary">
                    <h3 className="text-xs font-bold text-primary mb-2 uppercase tracking-wide">
                      Summary
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      {newsDetail.short_description}
                    </p>
                  </div>
                )}

                {/* Back Button */}
                <Link to="/news">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-6 px-4 py-3 bg-linear-to-r from-primary to-navy text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <FiArrowLeft className="w-4 h-4" />
                    Back to All News
                  </motion.button>
                </Link>
              </div>
            </article>
          </motion.div>

          {/* Right Side - Featured and Gallery - 55% */}
          <div className="w-full xl:w-[55%] flex flex-col lg:flex-row gap-6">
            {/* Featured Image Card - 60% of right side */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full lg:w-[60%] bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="p-4 bg-linear-to-r from-primary to-secondary">
                <h3 className="text-white font-bold text-sm uppercase tracking-wide">
                  Featured Image
                </h3>
              </div>
              <div className="p-6">
                <div className="relative h-80 rounded-xl overflow-hidden shadow-md mb-6">
                  <img
                    src={newsDetail.main_image_url || 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=600&fit=crop'}
                    alt={newsDetail.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=600&fit=crop';
                    }}
                  />
                </div>

                {/* Details Card */}
                <div className="space-y-3 text-sm">
                  <div className="p-4 bg-gray-50 rounded-lg flex justify-between items-center">
                    <span className="text-gray-500 font-medium">Article No</span>
                    <span className="text-navy font-bold">#{newsDetail.id}</span>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-500 font-medium block mb-1">Created</span>
                    <span className="text-navy font-semibold text-xs">
                      {new Date(newsDetail.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })} at {new Date(newsDetail.created_at).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-500 font-medium block mb-1">Updated</span>
                    <span className="text-navy font-semibold text-xs">
                      {new Date(newsDetail.updated_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })} at {new Date(newsDetail.updated_at).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Photo Gallery Section - 40% of right side - Vertical */}
            {newsDetail.gallery && newsDetail.gallery.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="w-full lg:w-[40%] bg-white rounded-2xl shadow-xl overflow-hidden"
              >
                <div className="p-4 bg-linear-to-r from-secondary to-primary">
                  <h3 className="text-white font-bold text-sm uppercase tracking-wide flex items-center gap-2">
                    <FiTag className="w-4 h-4" />
                    Gallery ({newsDetail.gallery.length})
                  </h3>
                </div>
                <div className="p-4">
                  <div className="flex flex-col gap-4 overflow-y-auto" style={{ maxHeight: '700px' }}>
                    {newsDetail.gallery.map((image, index) => (
                      <motion.div
                        key={image.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="relative h-48 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer"
                      >
                        <img
                          src={image.image_url}
                          alt={`Gallery ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=600&fit=crop';
                          }}
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                          <span className="text-white text-sm font-semibold">
                            Image {index + 1}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewsDetail;
