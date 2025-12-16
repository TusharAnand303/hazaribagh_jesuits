import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiAlertCircle, FiAward, FiCalendar, FiLink } from 'react-icons/fi';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';

const YouthDetails = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const source = searchParams.get('from') || 'youth';
  const [youthProgram, setYouthProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchYouthProgram = async () => {
      try {
        setLoading(true);
        setError(null);

        const fetchPromise = fetch(`${import.meta.env.VITE_API_BASE_URL}/youth_ministry/${id}`);
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Request timeout')), 15000)
        );

        const res = await Promise.race([fetchPromise, timeoutPromise]);
        if (!res.ok) {
          throw new Error(`Failed to fetch youth program: ${res.status}`);
        }

        const response = await res.json();
        if (response.status && response.data) {
          const youthData = response.data;
          const formattedYouth = {
            id: youthData.id,
            name: youthData.title || youthData.name || 'Unnamed Youth Program',
            description: youthData.description || '',
            image_url: youthData.image_url || youthData.image || null,
            link: youthData.link || null,
            created_at: youthData.created_at || new Date().toISOString(),
            updated_at: youthData.updated_at || null,
          };
          setYouthProgram(formattedYouth);
          document.title = `${formattedYouth.name} - Youth Program Details`;
        } else {
          setError('Youth program not found');
        }
      } catch (err) {
        console.error(err);
        setError(err.message || 'Youth program not found. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchYouthProgram();
    }
  }, [id]);

  const getBreadcrumbItems = () => {
    const sourceConfig = {
      youth: { label: 'Youth Programs', backPath: '/youth' }
    };

    const config = sourceConfig[source] || sourceConfig.youth;
    
    return [
      { label: 'Home', path: '/' },
      { label: 'Formation', path: '/formation' },
      { label: config.label, path: config.backPath },
      { label: youthProgram?.name || 'Details', path: `/youth/${id}?from=${source}` },
    ];
  };

  const getBackPath = () => '/youth';

  const getBackLabel = () => 'Youth Programs';

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-cream">
        <Breadcrumb items={getBreadcrumbItems()} />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <p className="text-gray-600 text-lg">Loading youth program details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !youthProgram) {
    return (
      <div className="min-h-screen bg-cream">
        <Breadcrumb items={getBreadcrumbItems()} />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <FiAlertCircle className="w-16 h-16 text-red-500" />
          <h3 className="text-xl font-bold text-navy">Unable to Load Youth Program</h3>
          <p className="text-gray-600">
            {error === 'Request timeout'
              ? 'The request is taking longer than expected.'
              : error || 'Youth program details could not be found.'}
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
        <h1 className="text-3xl font-bold">{youthProgram.name}</h1>
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
                    YOUTH PROGRAM
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-navy mb-2 leading-tight">
                  {youthProgram.name}
                </h1>
                <div className="flex items-center gap-2 text-secondary">
                  <span className="text-base md:text-lg font-semibold">Jesuit Youth Initiative</span>
                </div>
              </div>

              <div className="p-6 md:p-8">
                {/* Image Section - Conditional with fallback */}
                {youthProgram.image_url ? (
                  <div className="mb-8">
                    <div className="relative h-72 md:h-80 rounded-xl overflow-hidden shadow-lg">
                      <img
                        src={youthProgram.image_url}
                        alt={youthProgram.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop';
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="mb-8 h-72 md:h-80 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center shadow-lg">
                    <div className="text-center text-gray-500">
                      <FiAward className="w-16 h-16 mx-auto mb-4 opacity-40" />
                      <p className="text-lg font-medium">No image available</p>
                    </div>
                  </div>
                )}

                {youthProgram.description && (
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
                      <div className="w-1 h-6 bg-primary rounded"></div>
                      About the Youth Program
                    </h2>
                    <div className="p-6 bg-linear-to-r from-primary/5 to-transparent rounded-xl border-l-4 border-primary">
                      <div
                        className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                        style={{ fontSize: '1rem', lineHeight: '1.8' }}
                        dangerouslySetInnerHTML={{ __html: youthProgram.description }}
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
                    Program Information
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500 font-medium text-sm">Program ID</span>
                        <span className="text-navy font-bold">#{youthProgram.id}</span>
                      </div>
                    </div>

                    {youthProgram.created_at && (
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <FiCalendar className="w-4 h-4 text-primary" />
                          <span className="text-gray-500 font-medium text-sm">Created</span>
                        </div>
                        <span className="text-navy font-semibold text-sm block">
                          {new Date(youthProgram.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                    )}

                    {youthProgram.updated_at && (
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <FiCalendar className="w-4 h-4 text-secondary" />
                          <span className="text-gray-500 font-medium text-sm">Updated</span>
                        </div>
                        <span className="text-navy font-semibold text-sm block">
                          {new Date(youthProgram.updated_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                    )}

                    {youthProgram.link && (
                      <div className="p-4 bg-linear-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
                        <a
                          href={youthProgram.link}
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

export default YouthDetails;
