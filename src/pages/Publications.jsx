import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiBook, FiUser, FiAward, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';

const Publications = () => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        setLoading(true);
        setError(null);

        const fetchPromise = fetch(`${import.meta.env.VITE_API_BASE_URL}/publications`);
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Request timeout')), 15000)
        );

        const response = await Promise.race([fetchPromise, timeoutPromise]);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.status && result.data) {
          setPublications(result.data);
        } else {
          setPublications([]);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching publications:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPublications();
  }, []);

  // Function to truncate description
  const truncateDescription = (text, maxLength = 120) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  // Strip HTML tags from long_description
  const stripHtml = (html) => {
    if (!html) return '';
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Publications", path: "/publications" },
  ];

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-cream to-white">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <p className="text-gray-600 text-lg">Loading publications...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-b from-cream to-white">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <div className="text-red-500 text-xl">⚠️</div>
          <h3 className="text-xl font-bold text-navy">Unable to Load Publications</h3>
          <p className="text-gray-600">
            {error === 'Request timeout'
              ? 'The request is taking longer than expected.'
              : 'There was an error loading the publications.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // No publications state
  if (!publications || publications.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-b from-cream to-white">
        <header className="p-6 mt-24 sm:ml-24 -mb-10">
          <h1 className="text-4xl font-bold">Publications</h1>
        </header>
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <div className="text-gray-400 text-5xl">📚</div>
          <h3 className="text-xl font-bold text-navy">No Publications Available</h3>
          <p className="text-gray-600">Check back later for updates.</p>
        </div>
      </div>
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
          <h1 className="text-4xl font-bold mb-2 bg-linear-to-r from-navy to-primary bg-clip-text text-transparent">
            Publications
          </h1>
          <p className="text-gray-600 text-lg">Explore our scholarly works and research</p>
        </motion.div>
      </header>
      <Breadcrumb items={breadcrumbItems} />

      {/* Main Content */}
      <main className="container mx-auto p-6 pt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {publications.map((pub, index) => (
            <motion.div
              key={pub.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group h-full"
            >
              <Link to={`/publications/${pub.id}`} className="block h-full">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 h-[480px] flex flex-col">
                  {/* Image Section */}
                  <div className="relative h-56 overflow-hidden shrink-0">
                    <img
                      src={pub.image_url || 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop'}
                      alt={pub.publishers_name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop';
                      }}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                    
                    {/* Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/95 backdrop-blur-sm text-primary px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5">
                        <FiBook className="w-3.5 h-3.5" />
                        PUBLICATION
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 flex flex-col grow">
                    {/* Publisher Name */}
                    <div className="flex items-start gap-2 mb-3">
                      <FiUser className="w-4 h-4 text-primary mt-1 shrink-0" />
                      <h3 className="text-lg font-bold text-navy line-clamp-2 leading-tight">
                        {pub.publishers_name}
                      </h3>
                    </div>

                    {/* Qualification */}
                    {pub.qualification && (
                      <div className="flex items-center gap-2 mb-3">
                        <FiAward className="w-4 h-4 text-secondary shrink-0" />
                        <p className="text-sm font-semibold text-secondary line-clamp-1">
                          {pub.qualification}
                        </p>
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-gray-600 text-sm line-clamp-4 mb-4 grow leading-relaxed">
                      {truncateDescription(pub.short_description || stripHtml(pub.long_description), 120)}
                    </p>

                    {/* Read More Button */}
                    <motion.div
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-linear-to-r from-primary to-navy  text-white py-3 rounded-xl font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-xl flex items-center justify-center gap-2 mt-auto"
                    >
                      View Details
                      <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Publications;
