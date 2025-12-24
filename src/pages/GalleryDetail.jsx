import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Breadcrumb from '../components/Breadcrumb';

/* ================= ANIMATION VARIANTS ================= */

const gridContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const gridItem = {
  hidden: { opacity: 0, scale: 0.85, y: 30 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 120 },
  },
};

const popupBackdrop = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
  exit: { opacity: 0 },
};

const popupImage = {
  hidden: { scale: 0.6, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 160,
      damping: 18,
    },
  },
  exit: { scale: 0.6, opacity: 0 },
};

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

        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/gallery/${id}`
        );

        if (!response.ok) {
          throw new Error('Failed to load gallery');
        }

        const data = await response.json();

        if (data.status) {
          setGallery(data.gallery);
          setDetails(data.details || []);
        } else {
          throw new Error('Gallery not found');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryDetail();
  }, [id]);

  /* ================= SLIDER CONTROLS ================= */
  const nextImage = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === details.length - 1 ? 0 : prev + 1
    );
  }, [details.length]);

  const prevImage = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === 0 ? details.length - 1 : prev - 1
    );
  }, [details.length]);

  /* ================= KEYBOARD SUPPORT ================= */
  useEffect(() => {
    const handleKey = (e) => {
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

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  /* ================= ERROR ================= */
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-cream text-navy">
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

      {/* ================= GALLERY GRID ================= */}
      <motion.div
        variants={gridContainer}
        initial="hidden"
        animate="show"
        className="container mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {details.map((img, index) => (
          <motion.div
            key={img.id}
            variants={gridItem}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer bg-white rounded-xl shadow-lg overflow-hidden"
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
      </motion.div>

      {/* ================= POPUP BOOM ================= */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            variants={popupBackdrop}
            initial="hidden"
            animate="show"
            exit="exit"
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            onClick={() => setSelectedIndex(null)}
          >
            <motion.div
              variants={popupImage}
              initial="hidden"
              animate="show"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full px-4"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={details[selectedIndex].image_url}
                  src={details[selectedIndex].image_url}
                  className="w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.85, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>

              {/* Close */}
              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute top-4 right-4 bg-white rounded-full px-3 py-2 text-lg"
              >
                ✕
              </button>

              {/* Prev */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full px-4 py-2 text-xl"
              >
                ❮
              </button>

              {/* Next */}
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full px-4 py-2 text-xl"
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
