import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';

const IgnatianRetreats = () => {
  const [retreats, setRetreats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRetreats = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/ignatian_retreats`
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }

        const response = await res.json();

        const retreatData = (response.data || []).map(item => ({
          id: item.id,
          title: item.title,
          description: item.description || '',
          image:
            item.image_url ||
            item.image ||
            'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&h=600&fit=crop',
        }));

        setRetreats(retreatData);
      } catch (err) {
        console.error(err);
        setError('Unable to load Ignatian Retreats. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRetreats();
  }, []);

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Ignatian Retreats', path: '/ignatian-retreats' },
  ];

  /* ===================== LOADING ===================== */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-t from-cream to-white text-navy">
        <p className="text-lg font-semibold">
          Loading Ignatian Retreats...
        </p>
      </div>
    );
  }

  /* ===================== ERROR ===================== */
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-t from-cream to-white text-navy">
        <p className="text-red-600 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-cream to-white text-navy">
      {/* Header */}
       <header className="p-6 mt-24 sm:ml-24 -mb-10">
      <h1 className="sm:text-4xl text-2xl font-bold mb-2">
              Ignatian Retreats
            </h1>
      </header>
      <Breadcrumb items={breadcrumbItems} />

      {/* Content */}
      <main className="container mx-auto p-6 pt-12 pb-16">
        {retreats.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">
              No Ignatian retreats available.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {retreats.map((retreat, index) => (
              <motion.div
                key={retreat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-cream rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer border-2 border-secondary"
                style={{ height: '380px' }}
                onClick={() => navigate(`/retreats/${retreat.id}`)}
              >
                {/* Image */}
                <motion.img
                  src={retreat.image}
                  alt={retreat.title}
                  className="w-full h-52 object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&h=600&fit=crop';
                  }}
                />

                {/* Content */}
                <div className="p-5 flex flex-col">
                  <h2 className="text-lg font-bold text-primary mb-2 line-clamp-2">
                    {retreat.title}
                  </h2>

                  <div
                    className="text-gray-600 text-sm line-clamp-3"
                    dangerouslySetInnerHTML={{
                      __html: retreat.description,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default IgnatianRetreats;