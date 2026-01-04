import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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


        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/gallery`
        );


        if (!response.ok) throw new Error('Failed to load gallery');


        const result = await response.json();


        if (result.status && result.data) {
          setGalleryItems(result.data);
        } else {
          setGalleryItems([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };


    fetchGallery();
  }, []);


  const categories = [
    'All',
    ...Array.from(new Set(galleryItems.map(i => i.category_name))),
  ];


  const filteredItems =
    filter === 'All'
      ? galleryItems
      : galleryItems.filter(i => i.category_name === filter);


  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Gallery', path: '/gallery' },
  ];


  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-cream to-white">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }


  /* ================= ERROR ================= */
  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-b from-cream to-white">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex items-center justify-center min-h-[60vh] text-red-600">
          {error}
        </div>
      </div>
    );
  }


  /* ================= UI ================= */
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


      <div className="container mx-auto px-6 py-8 mt-10 sm:mt-0">
        {/* ================= FILTERS ================= */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map(category => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 cursor-pointer ${
                filter === category
                  ? 'bg-secondary text-white shadow-lg'
                  : 'bg-white text-navy hover:bg-gray-100 shadow-md'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>


        {/* ================= GALLERY GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="wait">
            {filteredItems.map((item, index) => (
              <motion.div
                key={`${filter}-${item.id}`}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  y: 0,
                  transition: {
                    duration: 0.4,
                    delay: index * 0.05,
                    ease: [0.4, 0, 0.2, 1]
                  }
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.8,
                  transition: { duration: 0.2 }
                }}
                whileHover={{ scale: 1.05, y: -6 }}
                whileTap={{ scale: 0.95 }}
                className="group bg-white rounded-lg shadow-lg hover:shadow-2xl overflow-hidden cursor-pointer"
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
                  <h3 className="text-navy font-semibold text-base leading-snug">
                    {item.title}
                  </h3>
                  <span className="text-xs text-gray-500 mt-1 inline-block">
                    {item.category_name}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};


export default Gallery;
