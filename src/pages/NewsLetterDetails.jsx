import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiFileText, FiEye, FiAlertCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';

const NewsLetterDetails = () => {
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Newsletters', path: '/newsletter-details' },
  ];

  // Fetch newsletter data
  useEffect(() => {
    const fetchNewsletterData = async () => {
      try {
        setLoading(true);
        setError(null);

        const fetchPromise = fetch(`${import.meta.env.VITE_API_BASE_URL}/newsletter`);
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Request timeout')), 15000)
        );

        const response = await Promise.race([fetchPromise, timeoutPromise]);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const newslettersArray = Array.isArray(data?.data) ? data.data : [];
        setNewsletters(newslettersArray);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching newsletter data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchNewsletterData();
  }, []);

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric',
      year: 'numeric' 
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-cream">
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <p className="text-gray-600 text-lg">Loading newsletters...</p>
        </div>
        <Breadcrumb items={breadcrumbItems} />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <div className="min-h-screen bg-cream">
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <FiAlertCircle className="w-16 h-16 text-red-500" />
            <h3 className="text-xl font-bold text-navy">Unable to Load Newsletters</h3>
            <p className="text-gray-600">
              {error === 'Request timeout'
                ? 'The request is taking longer than expected.'
                : 'There was an error loading the newsletters.'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
        <Breadcrumb items={breadcrumbItems} />
      </>
    );
  }

  // No newsletters state
  if (!newsletters || newsletters.length === 0) {
    return (
      <>
        <div className="min-h-screen bg-cream">
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <FiFileText className="w-16 h-16 text-gray-400" />
            <h3 className="text-xl font-bold text-navy">No Newsletters Available</h3>
            <p className="text-gray-600">Check back later for updates.</p>
          </div>
        </div>
        <Breadcrumb items={breadcrumbItems} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-cream to-white text-navy">
      {/* Header */}
      <header className="p-6 mt-24 sm:ml-24 -mb-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="sm:text-4xl text-2xl font-bold mb-2 bg-linear-to-r from-navy to-primary bg-clip-text text-transparent">
            All Newsletters
          </h1>
          <p className="text-gray-600 text-lg">Browse through our complete collection of newsletters</p>
        </motion.div>
      </header>
      <Breadcrumb items={breadcrumbItems} />

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 mt-10">
        {/* Desktop Table View */}
        <motion.div
          className="hidden md:block bg-white rounded-2xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-linear-to-r from-navy to-primary text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Preview</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Description</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {newsletters.map((newsletter, index) => (
                  <motion.tr
                    key={newsletter.id}
                    className="hover:bg-cream/50 transition-colors duration-200"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <td className="px-6 py-4">
                      <img
                        src={newsletter.image_url}
                        alt={newsletter.title}
                        className="w-24 h-20 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-navy font-semibold text-sm line-clamp-2 max-w-xs">
                        {newsletter.title}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-600 text-sm line-clamp-2 max-w-md">
                        {newsletter.description}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-600 text-sm whitespace-nowrap">
                        <FiCalendar className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{formatDate(newsletter.newsletter_date)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Link to={`/newsletter/view/${newsletter.id}`}>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-linear-to-r from-primary to-navy hover:from-navy hover:to-primary text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                          >
                            <FiEye className="w-4 h-4" />
                            View PDF
                          </motion.button>
                        </Link>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {newsletters.map((newsletter, index) => (
            <motion.div
              key={newsletter.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="flex gap-4 p-4">
                <img
                  src={newsletter.image_url}
                  alt={newsletter.title}
                  className="w-28 h-24 object-cover rounded-lg shadow-md flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-navy font-bold text-sm mb-2 line-clamp-2">
                    {newsletter.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-gray-600 text-xs mb-3">
                    <FiCalendar className="w-3 h-3 text-primary flex-shrink-0" />
                    <span>{formatDate(newsletter.newsletter_date)}</span>
                  </div>
                  <Link to={`/newsletter/view/${newsletter.id}`}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center gap-1.5 px-3 py-2 bg-linear-to-r from-primary to-navy text-white text-xs font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                    >
                      <FiEye className="w-3 h-3" />
                      View PDF
                    </motion.button>
                  </Link>
                </div>
              </div>
              {newsletter.description && (
                <div className="px-4 pb-4 border-t border-gray-100 pt-3">
                  <p className="text-gray-600 text-xs line-clamp-2">
                    {newsletter.description}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Total Count */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-gray-600 text-sm">
            Showing <span className="font-semibold text-primary">{newsletters.length}</span> newsletter{newsletters.length !== 1 ? 's' : ''}
          </p>
        </motion.div>
      </main>

      {/* CSS for line clamping */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default NewsLetterDetails;
