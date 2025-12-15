import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        setError(null);

        const fetchPromise = fetch(
          `${import.meta.env.VITE_API_BASE_URL}/gallery`
        );

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Request timeout')), 15000)
        );

        const response = await Promise.race([
          fetchPromise,
          timeoutPromise,
        ]);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.status && result.data) {
          setGalleryItems(result.data);
        } else {
          setGalleryItems([]);
        }
      } catch (err) {
        console.error('Gallery fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const categories = [
    'All',
    ...Array.from(new Set(galleryItems.map(item => item.category_name))),
  ];

  const filteredItems =
    filter === 'All'
      ? galleryItems
      : galleryItems.filter(item => item.category_name === filter);

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Gallery', path: '/gallery' },
  ];

  /* ===================== LOADING STATE ===================== */
  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-cream to-white">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <p className="text-gray-600 text-lg">Loading gallery...</p>
        </div>
      </div>
    );
  }

  /* ===================== ERROR STATE ===================== */
  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-b from-cream to-white">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <div className="text-red-500 text-3xl">⚠️</div>
          <h3 className="text-xl font-bold text-navy">
            Unable to Load Gallery
          </h3>
          <p className="text-gray-600 text-center">
            {error === 'Request timeout'
              ? 'The request is taking longer than expected.'
              : 'There was an error loading the gallery.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  /* ===================== PAGE UI ===================== */
  return (
    <div className="min-h-screen bg-cream text-navy">
      <header className="p-6 sm:ml-24 -mb-10 mt-24">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="sm:text-4xl text-2xl font-bold">Gallery</h1>
          <p className="text-sm mt-2 opacity-90">
            Moments and Memories from Hazaribag Jesuits
          </p>
        </motion.div>
      </header>

      <Breadcrumb items={breadcrumbItems} />

      {/* Filters */}
      <div className="container mx-auto px-6 py-8 mt-10 sm:mt-0">
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                filter === category
                  ? 'bg-secondary text-white shadow-lg'
                  : 'bg-white text-navy hover:bg-gray-100 shadow-md'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map(item => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="group relative bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
              onClick={() => navigate(`/gallery/${item.id}`)}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.file_url}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>

              <div className="p-4">
                <h3 className="text-navy font-semibold text-base leading-snug break-words">
                  {item.title}
                </h3>
                <span className="text-xs text-gray-500 mt-1 inline-block">
                  {item.category_name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
