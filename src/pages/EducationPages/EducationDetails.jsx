import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { FiMapPin, FiPhone, FiLink, FiCalendar, FiUsers, FiAward } from 'react-icons/fi';

const EducationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [school, setSchool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchool = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/educationdetails/${id}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch school: ${res.status}`);
        }

        const response = await res.json();
        const schoolData = response.data || response;

        const formattedSchool = {
          id: schoolData.id,
          name: schoolData.title || schoolData.name,
          description: schoolData.description || '',
          image: schoolData.image_url || schoolData.image || 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&h=800&fit=crop',
          link: schoolData.website || schoolData.link || '#',
          created_at: schoolData.created_at || new Date().toISOString(),
          medium: schoolData.medium || 'en',
        };

        setSchool(formattedSchool);
      } catch (err) {
        console.error(err);
        setError('School not found. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSchool();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream via-white to-secondary/10 flex items-center justify-center text-navy">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-xl font-semibold">Loading school details...</p>
        </motion.div>
      </div>
    );
  }

  if (error || !school) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream via-white to-secondary/10 flex items-center justify-center text-navy">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md mx-auto px-6">
          <div className="w-24 h-24 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4">School Not Found</h2>
          <p className="text-gray-600 mb-8">{error}</p>
          <button onClick={() => navigate('/education')} className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-semibold hover:bg-primary/90 transition-all duration-300">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Education
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-white to-secondary/10 text-navy overflow-hidden">
      <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative pt-20 pb-16">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-xl -translate-x-20"></div>
        </div>

        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
          {/* Back Navigation */}

          {/* 1. School Name & Tags - FIRST */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-16 text-center">
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-black bg-gradient-to-r from-navy to-primary bg-clip-text text-transparent leading-tight mb-8">
              {school.name}
            </h2>
          </motion.div>

          {/* 2. Hero Image Section - SECOND */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-20 relative group">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl ring-2 ring-white/50 mx-auto max-w-4xl">
              <img
                src={school.image}
                alt={school.name}
                className="w-full h-[400px] lg:h-[500px] xl:h-[600px] object-cover group-hover:scale-105 transition-transform duration-700"
                onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&h=800&fit=crop'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-6 left-6">
                <span className="px-4 py-2 bg-white/95 backdrop-blur-sm rounded-2xl text-primary font-bold text-sm shadow-xl border border-white/50">
                  {school.medium === 'hi' ? 'Hindi Medium' : 
                  (school.medium === 'hostel'? 'Hostel' : 
                    (school.medium === 'en' ? 'English Medium' : 'Higher Institute')
                  )
                  }
                </span>
              </div>
            </div>
          </motion.div>

          {/* 3. Description Section - THIRD */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-20">
            <div className="prose prose-lg lg:prose-xl max-w-none">
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 lg:p-12 border border-secondary/30 shadow-xl">
                <div 
                  className="text-lg lg:text-xl text-gray-800 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: school.description }}
                />
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mb-20">
            {school.link && school.link !== '#' && school.link !== '#' && (
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href={school.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex-1 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <FiLink className="w-5 h-5" /> Visit Website
                </a>
              </div>
            )}

          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default EducationDetails;
