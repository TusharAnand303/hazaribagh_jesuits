import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Breadcrumb from '../components/Breadcrumb';

const ApostolicPlannings = () => {
  const [plannings, setPlannings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlannings = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/apostolic_plannings`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const result = await response.json();
        setPlannings(result.status ? result.data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlannings();
  }, []);

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Apostolic Plannings', path: '/apostolic-plannings' },
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

  return (
    <div className="min-h-screen bg-linear-to-b from-cream to-white text-navy">
      {/* Header */}
      <header className="p-6 mt-24 sm:ml-24">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-2 bg-linear-to-r from-navy to-primary bg-clip-text text-transparent">
            Apostolic Plannings
          </h1>
          <p className="text-gray-600 text-lg">
            Universal, Conference & Province Apostolic Preferences
          </p>
        </motion.div>
      </header>

      <Breadcrumb items={breadcrumbItems} />

      {/* Content */}
      <main className="container mx-auto px-6 py-12 space-y-20">
        {plannings.map((item, index) => (
          <motion.section
            key={item.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
          >
            {/* LEFT: TEXT */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                {item.title}
              </h2>

              <div
                className="prose max-w-none prose-gray prose-p:leading-relaxed prose-strong:text-navy"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            </div>

            {/* RIGHT: IMAGE */}
            <div className="relative">
              <img
                src={
                  item.image_url ||
                  'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?w=900'
                }
                alt={item.title}
                className="w-full h-[360px] object-cover rounded-2xl shadow-xl"
                onError={(e) => {
                  e.target.src =
                    'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?w=900';
                }}
              />

              {/* Decorative overlay */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-black/10"></div>
            </div>

            {/* Divider */}
            <div className="lg:col-span-2">
              <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mt-16"></div>
            </div>
          </motion.section>
        ))}
      </main>
    </div>
  );
};

export default ApostolicPlannings;
