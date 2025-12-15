import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Breadcrumb from '../components/Breadcrumb';

const GalleryDetail = () => {
  const { id } = useParams();

  const [gallery, setGallery] = useState(null);
  const [details, setDetails] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    const fetchGalleryDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        const fetchPromise = fetch(
          `${import.meta.env.VITE_API_BASE_URL}/gallery/${id}`
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

        const data = await response.json();

        if (data.status) {
          setGallery(data.gallery);
          setDetails(data.details || []);
        } else {
          throw new Error('Gallery not found');
        }
      } catch (err) {
        console.error('Gallery detail error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryDetail();
  }, [id]);

  /* ================= SLIDER CONTROLS ================= */
  const nextImage = useCallback(() => {
    setSelectedIndex(prev =>
      prev === details.length - 1 ? 0 : prev + 1
    );
  }, [details.length]);

  const prevImage = useCallback(() => {
    setSelectedIndex(prev =>
      prev === 0 ? details.length - 1 : prev - 1
    );
  }, [details.length]);

  /* ================= KEYBOARD SUPPORT ================= */
  useEffect(() => {
    const handleKey = e => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedIndex, nextImage, prevImage]);

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Gallery', path: '/gallery' },
    { label: gallery?.title || 'Detail', path: `/gallery/${id}` },
  ];

  /* ================= LOADING STATE ================= */
  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-cream to-white">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <p className="text-gray-600 text-lg">Loading gallery details...</p>
        </div>
      </div>
    );
  }

  /* ================= ERROR STATE ================= */
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
              : error}
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

  /* ================= PAGE UI ================= */
  return (
    <div className="min-h-screen bg-cream text-navy">
      {/* Header */}
      <header className="p-6 sm:ml-24 mt-24">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="sm:text-4xl text-2xl font-bold"
        >
          {gallery?.title}
        </motion.h1>
      </header>

      <Breadcrumb items={breadcrumbItems} />

      {/* Detail Grid */}
      <div className="container mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {details.map((img, index) => (
          <motion.div
            key={img.id}
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer bg-white rounded-lg shadow-lg overflow-hidden"
            onClick={() => setSelectedIndex(index)}
          >
            <img
              src={img.image_url}
              alt={img.file_name}
              className="w-full h-64 object-cover"
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>

      {/* Popup Slider */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            onClick={() => setSelectedIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              onClick={e => e.stopPropagation()}
              className="relative max-w-5xl w-full px-4"
            >
              <img
                src={details[selectedIndex].image_url}
                alt=""
                className="w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
              />

              {/* Close */}
              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute top-4 right-4 bg-white/90 rounded-full p-2"
              >
                ✕
              </button>

              {/* Prev */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full"
              >
                ❮
              </button>

              {/* Next */}
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full"
              >
                ❯
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryDetail;
