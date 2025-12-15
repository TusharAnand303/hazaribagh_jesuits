import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Formation = () => {
  const [formations, setFormations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/formation`);
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }

        const response = await res.json();

        const formationData = (response.data || []).map(item => ({
          id: item.id,
          name: item.title,
          description: item.description || '',
          image: item.image_url || item.image,
        }));

        setFormations(formationData);
      } catch (err) {
        console.error(err);
        setError('Unable to load formation programs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchFormations();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-t from-cream to-white text-navy py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-6 mx-auto"></div>
          <p className="text-lg font-semibold">Loading Formation Programs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-t from-cream to-white text-navy py-12">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <p className="text-xl font-semibold text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-t from-cream to-white text-navy py-20">
      {/* Fixed Header - Full prominence */}
      <header className="container mx-auto px-4 sm:px-6 lg:px-12 mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-4 mb-6 pb-6">
            <div className="w-3 h-12 bg-gradient-to-b from-primary to-secondary rounded-full shadow-lg"></div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-primary via-navy to-secondary bg-clip-text text-transparent drop-shadow-lg">
              Formation
            </h1>
          </div>
          <div className="w-28 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full shadow-md mb-8"></div>
          <p className="text-xl sm:text-2xl text-navy/80 max-w-3xl mx-auto font-medium leading-relaxed">
            Our Spiritual & Leadership Programs
          </p>
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-12 pb-24">
        {formations.length === 0 ? (
          <div className="text-center py-40">
            <motion.div 
              className="w-28 h-28 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </motion.div>
            <motion.h3 
              className="text-3xl font-bold text-navy mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              No Programs Available
            </motion.h3>
            <motion.p 
              className="text-xl text-gray-500 max-w-lg mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Formation programs will appear here when available.
            </motion.p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {formations.map((formation, index) => (
              <motion.div
                key={formation.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="group bg-white/80 backdrop-blur-md rounded-3xl shadow-xl hover:shadow-3xl hover:-translate-y-4 transition-all duration-700 overflow-hidden border border-secondary/40 cursor-pointer"
                style={{ height: '440px' }}
                whileHover={{ scale: 1.03 }}
                onClick={() => navigate(`/formation/${formation.id}`)}
              >
                {/* Enhanced Image Section */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                  <motion.img
                    src={formation.image}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-1000"
                    whileHover={{ scale: 1.15 }}
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
                  
                  {/* Category Badge */}
                  <motion.div 
                    className="absolute top-6 left-6 bg-white/95 backdrop-blur-lg px-4 py-2 rounded-2xl shadow-2xl border border-white/50"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-sm font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      Formation Program
                    </span>
                  </motion.div>
                </div>

                {/* Enhanced Content */}
                <div className="p-8 flex flex-col h-[176px] justify-between">
                  <div>
                    <motion.h2 
                      className="text-2xl font-black text-navy mb-4 line-clamp-2 group-hover:text-primary transition-all duration-500"
                      whileHover={{ y: -2 }}
                    >
                      {formation.name}
                    </motion.h2>
                    <div className="text-navy/70 text-base leading-relaxed line-clamp-3 mb-0">
                      <div dangerouslySetInnerHTML={{ __html: formation.description }} />
                    </div>
                  </div>
                  
                  {/* Enhanced CTA */}
                  <motion.div 
                    className="mt-6 pt-6 border-t border-secondary/30"
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <div className="flex items-center justify-between group-hover:gap-4 transition-all duration-300">
                      <span className="text-lg font-semibold text-navy/70 group-hover:text-navy transition-colors">View Details</span>
                      <motion.div 
                        className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500"
                        whileHover={{ rotate: 180, scale: 1.1 }}
                      >
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Formation;
