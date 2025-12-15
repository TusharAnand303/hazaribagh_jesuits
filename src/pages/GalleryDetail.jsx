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
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/gallery/${id}`
        );
        const data = await response.json();

        if (data.status) {
          setGallery(data.gallery);
          setDetails(data.details);
        } else {
          setError('Gallery not found.');
        }
      } catch {
        setError('Error fetching gallery detail.');
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

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Gallery', path: '/gallery' },
    { label: gallery?.title || 'Detail', path: `/gallery/${id}` },
  ];

  return (
    <div className="min-h-screen bg-cream text-navy">
      {/* ================= HEADER ================= */}
      <header className="p-6 sm:ml-24 mt-24">
        <h1 className="sm:text-4xl text-2xl font-bold">{gallery?.title}</h1>
      </header>

      <Breadcrumb items={breadcrumbItems} />

     

      {/* ================= DETAIL GRID ================= */}
      <div className="container mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {details.map((img, index) => (
          <motion.div
            key={img.id}
            whileHover={{ scale: 1.04 }}
            className="cursor-pointer bg-white rounded-lg shadow-lg overflow-hidden"
            onClick={() => setSelectedIndex(index)}
          >
            <img
              src={img.image_url}
              alt={img.file_name}
              className="w-full h-64 object-cover"
            />
          </motion.div>
        ))}
      </div>

      {/* ================= POPUP SLIDER ================= */}
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
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full px-4"
            >
              {/* Image */}
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
