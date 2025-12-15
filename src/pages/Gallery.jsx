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
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/gallery`);
        const data = await response.json();
        if (data.status) setGalleryItems(data.data);
        else setError('Failed to fetch gallery data.');
      } catch (err) {
        setError('Error fetching gallery data.');
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const categories = ['All', ...Array.from(new Set(galleryItems.map(item => item.category_name)))];

  const filteredItems =
    filter === 'All'
      ? galleryItems
      : galleryItems.filter(item => item.category_name === filter);

  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Gallery", path: "/gallery" },
  ];

  if (loading) return <p className="text-center mt-10">Loading gallery...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-cream text-navy">
      <header className="p-6 sm:ml-24 -mb-10 mt-24">
        <h1 className="sm:text-4xl text-2xl font-bold">Gallery</h1>
        <p className="text-sm mt-2 opacity-90">Moments and Memories from Hazaribag Jesuits</p>
      </header>
      <Breadcrumb items={breadcrumbItems} />

      {/* Filter Buttons */}
      <div className="container mx-auto px-6 py-8 mt-10 sm:mt-0">
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                filter === category ? 'bg-secondary text-white shadow-lg' : 'bg-white text-navy hover:bg-gray-100 shadow-md'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
              onClick={() => navigate(`/gallery/${item.id}`)} // navigate to detail page
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
                <h3 className="text-navy font-semibold text-base line-clamp-1">{item.title}</h3>
                <span className="text-xs text-gray-500 mt-1 inline-block">{item.category_name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
