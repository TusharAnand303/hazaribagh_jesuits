import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiAlertCircle, FiAward, FiCalendar, FiLink, FiMapPin } from 'react-icons/fi';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom'; // ✅ FIXED: Added useSearchParams
import Breadcrumb from '../../components/Breadcrumb';

const EducationDetails = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const source = searchParams.get('from') || 'education';
  const [school, setSchool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ FIXED: Added missing useEffect
  useEffect(() => {
    const fetchSchool = async () => {
      try {
        setLoading(true);
        setError(null);

        const fetchPromise = fetch(`${import.meta.env.VITE_API_BASE_URL}/educationdetails/${id}`);
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Request timeout')), 15000)
        );

        const res = await Promise.race([fetchPromise, timeoutPromise]);
        if (!res.ok) {
          throw new Error(`Failed to fetch school: ${res.status}`);
        }

        const response = await res.json();
        if (response.status && response.data) {
          const schoolData = response.data;
          const formattedSchool = {
            id: schoolData.id,
            name: schoolData.title || schoolData.name,
            description: schoolData.description || '',
            image_url: schoolData.image_url || schoolData.image || 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&h=800&fit=crop',
            link: schoolData.website || schoolData.link || '#',
            created_at: schoolData.created_at || new Date().toISOString(),
            medium: schoolData.medium || 'en',
          };
          setSchool(formattedSchool);
          document.title = `${formattedSchool.name} - Education Details`;
        } else {
          setError('School not found');
        }
      } catch (err) {
        console.error(err);
        setError(err.message || 'School not found. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSchool();
    }
  }, [id]);

  // ✅ FIXED: Added default education config & consistent paths
  const getBreadcrumbItems = () => {
    const sourceConfig = {
      HindiMedium: { label: 'Hindi Medium', backPath: '/education/hindi-medium-school' },
      EnglishMedium: { label: 'English Medium', backPath: '/education/english-medium-school' },
      Hostel: { label: 'Hostel', backPath: '/education/hostels' },
      HigherInstitution: { label: 'Higher Institution', backPath: '/education/higher-institution' },
      education: { label: 'Education', backPath: '/education' } // ✅ FIXED: Added default
    };

    const config = sourceConfig[source] || sourceConfig.education;
    
    return [
      { label: 'Home', path: '/' },
      { label: config.label, path: config.backPath },
      { label: school?.name || 'Details', path: `/educationdetails/${id}?from=${source}` },
    ];
  };

  // ✅ FIXED: Consistent back paths with breadcrumb
  const getBackPath = () => {
    const backPaths = {
      hindimedium: '/education/hindi-medium-school',
      englishmedium: '/education/english-medium-school',
      hostel: '/education/hostels',
      higherinstitution: '/education/higher-institution',
      education: '/education'
    };
    return backPaths[source] || '/education';
  };

  const getBackLabel = () => {
    const labels = {
      hindimedium: 'Hindi Medium',
      englishmedium: 'English Medium',
      hostel: 'Hostel',
      higherinstitution: 'Higher Institution',
      education: 'Education'
    };
    return labels[source] || 'Education';
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-cream">
        <Breadcrumb items={getBreadcrumbItems()} />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <p className="text-gray-600 text-lg">Loading school details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !school) {
    return (
      <div className="min-h-screen bg-cream">
        <Breadcrumb items={getBreadcrumbItems()} />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <FiAlertCircle className="w-16 h-16 text-red-500" />
          <h3 className="text-xl font-bold text-navy">Unable to Load School</h3>
          <p className="text-gray-600">
            {error === 'Request timeout'
              ? 'The request is taking longer than expected.'
              : error || 'School details could not be found.'}
          </p>
          <Link to={getBackPath()}>
            <button className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors">
              Back to {getBackLabel()}
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-cream to-white text-navy">
      {/* Header */}
      <header className="p-6 mt-24 sm:ml-24 -mb-10">
        <h1 className="text-3xl font-bold">{school.name}</h1>
      </header>
      <Breadcrumb items={getBreadcrumbItems()} />

      {/* Main Content */}
      <main className="p-6 pt-12 sm:ml-24 sm:mr-24">
        <div className="flex flex-col lg:flex-row gap-6 max-w-[1800px]">
          {/* Content Section - Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 lg:flex-2"
          >
            <article className="bg-white rounded-2xl shadow-xl overflow-hidden h-full">
              <div className="p-6 md:p-8 bg-linear-to-r from-navy/5 to-primary/5 border-b border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
                    <FiAward className="w-3.5 h-3.5" />
                    SCHOOL
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-navy mb-2 leading-tight">
                  {school.name}
                </h1>
                <div className="flex items-center gap-2 text-secondary">
                  <span className="text-base md:text-lg font-semibold">
                    {school.medium === 'hi' ? 'Hindi Medium' : 
                     (school.medium === 'hostel' ? 'Hostel' : 
                      (school.medium === 'en' ? 'English Medium' : 'Higher Institute')
                    )}
                  </span>
                </div>
              </div>

              <div className="p-6 md:p-8">
                {school.image_url && (
                  <div className="mb-8">
                    <div className="relative h-72 md:h-80 rounded-xl overflow-hidden shadow-lg">
                      <img
                        src={school.image_url}
                        alt={school.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&h=800&fit=crop';
                        }}
                      />
                    </div>
                  </div>
                )}

                {school.description && (
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
                      <div className="w-1 h-6 bg-primary rounded"></div>
                      About the School
                    </h2>
                    <div className="p-6 bg-linear-to-r from-primary/5 to-transparent rounded-xl border-l-4 border-primary">
                      <div
                        className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                        style={{ fontSize: '1rem', lineHeight: '1.8' }}
                        dangerouslySetInnerHTML={{ __html: school.description }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </article>
          </motion.div>

          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-[400px] shrink-0"
          >
            <div className="flex flex-col gap-6">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="p-4 bg-linear-to-r from-secondary to-primary">
                  <h3 className="text-white font-bold text-sm uppercase tracking-wide flex items-center gap-2">
                    <FiAward className="w-4 h-4" />
                    School Information
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500 font-medium text-sm">School ID</span>
                        <span className="text-navy font-bold">#{school.id}</span>
                      </div>
                    </div>

                    {school.created_at && (
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <FiCalendar className="w-4 h-4 text-primary" />
                          <span className="text-gray-500 font-medium text-sm">Added On</span>
                        </div>
                        <span className="text-navy font-semibold text-sm block">
                          {new Date(school.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                    )}

                    {school.link && school.link !== '#' && school.link !== null && (
                      <div className="p-4 bg-linear-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
                        <a
                          href={school.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full text-center px-4 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <FiLink className="w-4 h-4" />
                          Visit Website
                        </a>
                      </div>
                    )}
                  </div>

                  <Link to={getBackPath()}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full mt-6 px-4 py-3 bg-linear-to-r from-primary to-navy text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <FiArrowLeft className="w-4 h-4" />
                      Back to {getBackLabel()}
                    </motion.button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </main>
    </div>
  );
};

export default EducationDetails;
