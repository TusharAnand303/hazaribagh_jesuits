import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';

const PopesWorldWidePrayer = () => {
  const [prayers, setPrayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrayers = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/popes_worldwide_prayer`
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }

        const response = await res.json();

        const prayerData = (response.data || []).map(item => ({
          id: item.id,
          title: item.title || "Pope's Worldwide Prayer Network",
          description: item.description || '',
          image: item.image_url
            ? item.image_url
            : item.image
            ? `${import.meta.env.VITE_API_BASE_URL}/uploads/popes_worldwide_prayer/${item.image}`
            : 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop',
          created_at: item.created_at,
        }));

        setPrayers(prayerData);
      } catch (err) {
        console.error(err);
        setError(
          "Unable to load Pope's Worldwide Prayer content. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPrayers();
  }, []);

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    
    {
      label: "Pope's Worldwide Prayer",
      path: '/popes-worldwide-prayer',
    },
  ];

  /* ===================== LOADING ===================== */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-t from-cream to-white text-navy">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-6"></div>
          <p className="text-lg font-semibold">
            Loading Pope&apos;s Worldwide Prayer...
          </p>
        </div>
      </div>
    );
  }

  /* ===================== ERROR ===================== */
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-t from-cream to-white text-navy">
        <Breadcrumb items={breadcrumbItems} />
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <p className="text-xl font-semibold text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  /* ===================== MAIN ===================== */
  return (
    <div className="min-h-screen bg-gradient-to-t from-cream to-white text-navy py-20">
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Page Header */}
      <header className="container mx-auto px-6 mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="w-3 h-12 bg-gradient-to-b from-primary to-secondary rounded-full"></div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-primary via-navy to-secondary bg-clip-text text-transparent">
              Pope&apos;s Worldwide Prayer
            </h1>
          </div>
          
        </motion.div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-6 pb-24">
        {prayers.length === 0 ? (
          <div className="text-center py-40">
            <h3 className="text-3xl font-bold mb-4">No Content Available</h3>
            <p className="text-xl text-gray-500">
              Prayer network content will appear here when available.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {prayers.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="group bg-white/90 backdrop-blur-md rounded-3xl shadow-xl hover:-translate-y-4 transition-all duration-700 overflow-hidden border border-secondary/40 cursor-pointer"
                onClick={() =>
                  navigate(`/popes-prayer/${item.id}`)
                }
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent opacity-0 group-hover:opacity-100 transition" />
                </div>

                {/* Content */}
                <div className="p-8">
                  <h2 className="text-2xl font-black mb-4 group-hover:text-primary transition">
                    {item.title}
                  </h2>

                  <div
                    className="text-navy/70 text-base leading-relaxed line-clamp-4"
                    dangerouslySetInnerHTML={{
                      __html: item.description,
                    }}
                  />

                  <div className="mt-6 pt-6 border-t border-secondary/30 flex justify-between items-center">
                    <span className="font-semibold text-navy/70">
                      View Details
                    </span>
                    <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center text-white">
                      →
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default PopesWorldWidePrayer;