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
          achievements: schoolData.achievements || schoolData.awards || ['Academic Excellence', 'Sports Achievements'],
          facilities: schoolData.facilities || schoolData.features || ['Modern Labs', 'Library', 'Sports Complex'],
          stats: {
            established: schoolData.established_year || 1951,
            students: schoolData.student_count || '1,200+'
          }
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
          <motion.nav initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-12">
            <button onClick={() => navigate('/education')} className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold text-sm transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Education
            </button>
          </motion.nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative group">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl ring-2 ring-white/50">
                <img
                  src={school.image}
                  alt={school.name}
                  className="w-full h-[400px] lg:h-[550px] object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&h=800&fit=crop'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-2 bg-white/95 backdrop-blur-sm rounded-2xl text-primary font-bold text-sm shadow-xl border border-white/50">
                    {school.medium === 'en' ? 'English Medium' : 'Regional Medium'} • CBSE
                  </span>
                </div>
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/50">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div><div className="text-2xl font-bold text-navy">{school.stats.established}</div><div className="text-xs text-gray-600 uppercase tracking-wide">Established</div></div>
                    <div><div className="text-2xl font-bold text-primary">{school.stats.students}</div><div className="text-xs text-gray-600 uppercase tracking-wide">Students</div></div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="lg:pt-12 space-y-8">
              <div>
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black bg-gradient-to-r from-navy to-primary bg-clip-text text-transparent leading-tight mb-4">
                  {school.name}
                </h1>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold border border-primary/20">
                    <FiUsers className="w-4 h-4 inline mr-1" /> Co-Education
                  </span>
                  <span className="px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-semibold border border-secondary/20">
                    <FiAward className="w-4 h-4 inline mr-1" /> Accredited
                  </span>
                </div>
              </div>

              <div className="prose prose-lg lg:prose-xl max-w-none">
                <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-secondary/30 shadow-xl">
                  <div 
                    className="text-lg lg:text-xl text-gray-800 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: school.description }}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href={school.link} target="_blank" rel="noopener noreferrer" className="flex-1 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3">
                  <FiLink className="w-5 h-5" /> Visit Website
                </a>
                <button className="flex-1 bg-white border-2 border-secondary/50 hover:border-secondary text-navy px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3">
                  <FiPhone className="w-5 h-5" /> Get Directions
                </button>
              </div>
            </motion.div>
          </div>

          <motion.section initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="mt-24 pt-20 border-t-2 border-secondary/20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div className="group">
                <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <FiAward className="w-10 h-10 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-xl font-bold text-navy mb-2">Achievements</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  {school.achievements.slice(0, 4).map((achievement, idx) => (
                    <div key={idx} className="flex items-center justify-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span>{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="group">
                <div className="w-20 h-20 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/20 transition-colors">
                  <FiMapPin className="w-10 h-10 text-secondary group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-xl font-bold text-navy mb-2">Facilities</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  {school.facilities.slice(0, 4).map((facility, idx) => (
                    <div key={idx} className="flex items-center justify-center gap-2">
                      <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                      <span>{facility}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2 grid grid-cols-2 gap-4">
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <FiCalendar className="w-6 h-6 text-primary" />
                    <span className="text-sm text-gray-600">Added</span>
                  </div>
                  <div className="text-2xl font-bold text-navy">
                    {new Date(school.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm rounded-2xl p-6 border border-primary/20 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="text-2xl font-bold text-primary mb-1">K-12</div>
                  <div className="text-sm text-primary/80 font-semibold">Grade Levels</div>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </motion.section>
    </div>
  );
};

export default EducationDetails;
