import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FiArrowLeft,
  FiAlertCircle,
  FiCalendar,
  FiAward,
  FiLink,
} from 'react-icons/fi';
import { useParams, Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';

const IgnatianRetreatsDetails = () => {
  const { id } = useParams();

  const [retreat, setRetreat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRetreat = async () => {
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
          throw new Error(`Failed to fetch: ${res.status}`);
        }

        const response = await res.json();

        if (response?.data) {
          const data = response.data;
          setRetreat({
            id: data.id,
            title: data.title || 'Ignatian Retreat',
            description: data.description || '',
            image_url: data.image_url || data.image || null,
            link: data.link || null,
            created_at: data.created_at || null,
          });
          document.title = `${data.title} - Ignatian Retreat`;
        } else {
          throw new Error('Ignatian Retreat not found');
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchRetreat();
  }, [id]);

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Ignatian Retreats', path: '/retreats' },
    { label: retreat?.title || 'Details', path: `/ignatian-retreats/${id}` },
  ];

  /* ===================== LOADING ===================== */
  if (loading) {
    return (
      <div className="min-h-screen bg-cream">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  /* ===================== ERROR ===================== */
  if (error || !retreat) {
    return (
      <div className="min-h-screen bg-cream">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
          <FiAlertCircle className="w-16 h-16 text-red-500" />
          <h3 className="text-xl font-bold text-navy">
            Unable to Load Ignatian Retreat
          </h3>
          <p className="text-gray-600">{error}</p>
          <Link to="/retreats">
            <button className="px-6 py-2 bg-primary text-white rounded-lg">
              Back to Ignatian Retreats
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

      <Breadcrumb items={breadcrumbItems} />

      <main className="p-6 pt-12 sm:ml-24 sm:mr-24">
        <div className="flex flex-col lg:flex-row gap-6 max-w-[1800px]">
          {/* ================= LEFT CONTENT ================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-6 md:p-8 bg-linear-to-r from-navy/5 to-primary/5 border-b">
                <span className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-bold inline-flex items-center gap-1.5 mb-4">
                  <FiAward className="w-3.5 h-3.5" />
                  IGNATIAN RETREAT
                </span>

                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                  {retreat.title}
                </h1>
              </div>

              <div className="p-6 md:p-8">
                {/* Image */}
                {retreat.image_url && (
                  <div className="mb-8">
                    <div className="relative h-72 md:h-80 rounded-xl overflow-hidden shadow-lg">
                      <img
                        src={retreat.image_url}
                        alt={retreat.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}

                {/* Description */}
                {retreat.description && (
                  <div>
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <div className="w-1 h-6 bg-primary rounded"></div>
                      About the Retreat
                    </h2>
                    <div className="p-6 bg-linear-to-r from-primary/5 to-transparent rounded-xl border-l-4 border-primary">
                      <div
                        className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
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

          {/* ================= RIGHT SIDEBAR ================= */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-[400px]"
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-4 bg-linear-to-r from-secondary to-primary">
                <h3 className="text-white font-bold text-sm uppercase tracking-wide">
                  Retreat Information
                </h3>
              </div>

              <div className="p-6 space-y-4">
                {retreat.created_at && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <FiCalendar className="w-4 h-4 text-primary" />
                      <span className="text-gray-500 text-sm font-medium">
                        Created On
                      </span>
                    </div>
                    <span className="font-semibold text-sm">
                      {new Date(retreat.created_at).toLocaleDateString(
                        'en-IN',
                        { day: 'numeric', month: 'long', year: 'numeric' }
                      )}
                    </span>
                  </div>
                )}

                {/* Website */}
                {retreat.link && (
                  <div className="p-4 bg-linear-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
                    <a
                      href={retreat.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center px-4 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold transition flex items-center justify-center gap-2 text-sm"
                    >
                      <FiLink className="w-4 h-4" />
                      Visit Website
                    </a>
                  </div>
                )}

                {/* Back Button */}
                <Link to="/retreats">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-4 py-3 bg-linear-to-r from-primary to-navy text-white rounded-xl font-semibold shadow-lg flex items-center justify-center gap-2"
                  >
                    <FiArrowLeft className="w-4 h-4" />
                    Back to Ignatian Retreats
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.aside>
        </div>
      </main>
    </div>
  );
};

export default IgnatianRetreatsDetails;