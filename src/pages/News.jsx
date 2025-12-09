import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiTag, FiAlertCircle, FiArrowRight, FiImage } from 'react-icons/fi';
import Breadcrumb from '../components/Breadcrumb';
import { Link } from 'react-router-dom';

const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all news from API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);

        const fetchPromise = fetch(`${import.meta.env.VITE_API_BASE_URL}/news`);
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Request timeout')), 15000)
        );

        const response = await Promise.race([fetchPromise, timeoutPromise]);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.status && result.data) {
          setNewsData(result.data);
        } else {
          setNewsData([]);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Strip HTML tags and limit text
  const stripHtml = (html) => {
    if (!html) return '';
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const truncateText = (text, maxLength = 120) => {
    const cleanText = stripHtml(text);
    if (cleanText.length <= maxLength) return cleanText;
    return cleanText.substring(0, maxLength).trim() + '...';
  };

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'News', path: '/news' },
  ];

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-cream">
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <p className="text-gray-600 text-lg">Loading news...</p>
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
          <h3 className="text-xl font-bold text-navy">Unable to Load News</h3>
          <p className="text-gray-600">
            {error === 'Request timeout'
              ? 'The request is taking longer than expected.'
              : 'There was an error loading the news.'}
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

  // No news state
  if (!newsData || newsData.length === 0) {
    return (
     <>
      <div className="min-h-screen bg-cream">
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <FiTag className="w-16 h-16 text-gray-400" />
          <h3 className="text-xl font-bold text-navy">No News Available</h3>
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
            Latest News & Updates
          </h1>
          <p className="text-gray-600 text-lg">Stay connected with our community stories</p>
        </motion.div>
      </header>
      <Breadcrumb items={breadcrumbItems} />

      {/* News Grid */}
      <main className="container mx-auto px-6 py-8 mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {newsData.map((news, index) => (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-[480px] group"
            >
              {/* Image Container - Fixed Height */}
              <div className="relative h-52 overflow-hidden shrink-0">
                <motion.img
                  src={news.main_image_url || 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=600&fit=crop'}
                  alt={news.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.6 }}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=600&fit=crop';
                  }}
                />
                
                {/* linear Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                  <span className="bg-white/95 backdrop-blur-sm text-primary px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5">
                    <FiTag className="w-3.5 h-3.5" />
                    NEWS
                  </span>
                  
                  {news.gallery && news.gallery.length > 0 && (
                    <span className="bg-secondary/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5">
                      <FiImage className="w-3.5 h-3.5" />
                      {news.gallery.length}
                    </span>
                  )}
                </div>

                {/* Date Badge - Bottom */}
                <div className="absolute bottom-3 left-3">
                  <span className="bg-primary/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1.5">
                    <FiCalendar className="w-3.5 h-3.5" />
                    {new Date(news.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </div>

              {/* Content Container - Flexible Height */}
              <div className="p-5 flex flex-col grow">
                {/* Title - Fixed 2 Lines */}
                <h3 className="text-lg font-bold text-navy mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300 leading-snug min-h-14">
                  {news.title}
                </h3>

                {/* Description - Fixed 3 Lines */}
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4 grow">
                  {truncateText(news.content, 120)}
                </p>

                {/* Button - Fixed at Bottom */}
                <Link to={`/news/${news.id}`} className="mt-auto">
                  <motion.button
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-linear-to-r from-primary to-navy text-white py-3 rounded-xl font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-xl flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    Read Full Story
                    <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default News;
