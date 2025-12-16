import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FiArrowLeft,
  FiAlertCircle,
  FiCalendar,
  FiAward,
  FiLink,
} from 'react-icons/fi';
import {
  useParams,
  Link,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';

const IgnatianRetreatsDetails = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const source = searchParams.get('from') || 'ignatian-retreats';

  const [retreat, setRetreat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRetreatDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const fetchPromise = fetch(
          `${import.meta.env.VITE_API_BASE_URL}/ignatian_retreats/${id}`
        );

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Request timeout')), 15000)
        );

        const res = await Promise.race([fetchPromise, timeoutPromise]);

        if (!res.ok) {
          throw new Error(`Failed to fetch retreat: ${res.status}`);
        }

        const response = await res.json();

        if (response.status && response.data) {
          const data = response.data;

          const formattedRetreat = {
            id: data.id,
            title: data.title || 'Ignatian Retreat',
            description: data.description || '',
            image_url: data.image_url || data.image || null,
            link: data.link || null,
            created_at: data.created_at || null,
            updated_at: data.updated_at || null,
          };

          setRetreat(formattedRetreat);
          document.title = `${formattedRetreat.title} - Ignatian Retreat`;
        } else {
          setError('Ignatian Retreat not found');
        }
      } catch (err) {
        console.error(err);
        setError(
          err.message ||
            'Ignatian Retreat details could not be loaded. Please try again.'
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRetreatDetails();
    }
  }, [id]);

  /* ===================== BREADCRUMB ===================== */
  const getBreadcrumbItems = () => [
    { label: 'Home', path: '/' },
   
    { label: 'Ignatian Retreats', path: '/retreats' },
    {
      label: retreat?.title || 'Details',
      path: `/ignatian-retreats/${id}`,
    },
  ];

  const getBackPath = () => '/retreats';
  const getBackLabel = () => 'Ignatian Retreats';

  /* ===================== LOADING ===================== */
  if (loading) {
    return (
      <div className="min-h-screen bg-cream">
        <Breadcrumb items={getBreadcrumbItems()} />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <p className="text-gray-600 text-lg">
            Loading Ignatian Retreat details...
          </p>
        </div>
      </div>
    );
  }

  /* ===================== ERROR ===================== */
  if (error || !retreat) {
    return (
      <div className="min-h-screen bg-cream">
        <Breadcrumb items={getBreadcrumbItems()} />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
          <FiAlertCircle className="w-16 h-16 text-red-500" />
          <h3 className="text-xl font-bold text-navy">
            Unable to Load Ignatian Retreat
          </h3>
          <p className="text-gray-600 max-w-md">
            {error === 'Request timeout'
              ? 'The request is taking longer than expected.'
              : error}
          </p>
          <Link to={getBackPath()}>
            <button className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition">
              Back to {getBackLabel()}
            </button>
          </Link>
        </div>
      </div>
    );
  }

  /* ===================== MAIN ===================== */
  return (
    <div className="min-h-screen bg-linear-to-b from-cream to-white text-navy">
      {/* Header */}
      <header className="p-6 mt-24 sm:ml-24 -mb-10">
        <h1 className="text-3xl font-bold">{retreat.title}</h1>
      </header>

      <Breadcrumb items={getBreadcrumbItems()} />

      <main className="p-6 pt-12 sm:ml-24 sm:mr-24">
        <div className="flex flex-col lg:flex-row gap-6 max-w-[1800px]">
          {/* ===================== CONTENT ===================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-6 md:p-8 bg-linear-to-r from-navy/5 to-primary/5 border-b">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-navy mt-4">
                  {retreat.title}
                </h1>
              </div>

              <div className="p-6 md:p-8">
                {/* Image */}
                {retreat.image_url ? (
                  <div className="mb-8">
                    <div className="relative h-72 md:h-80 rounded-xl overflow-hidden shadow-lg">
                      <img
                        src={retreat.image_url}
                        alt={retreat.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src =
                            'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&h=800&fit=crop';
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="mb-8 h-72 bg-gray-100 rounded-xl flex items-center justify-center">
                    <FiAward className="w-16 h-16 text-gray-300" />
                  </div>
                )}

                {/* Description */}
                {retreat.description && (
                  <div>
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <div className="w-1 h-6 bg-primary rounded"></div>
                      About the Retreat
                    </h2>
                    <div className="p-6 bg-primary/5 rounded-xl border-l-4 border-primary">
                      <div
                        className="prose prose-lg max-w-none text-gray-700"
                        dangerouslySetInnerHTML={{
                          __html: retreat.description,
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </article>
          </motion.div>
          
        </div>
      </main>
    </div>
  );
};

export default IgnatianRetreatsDetails;