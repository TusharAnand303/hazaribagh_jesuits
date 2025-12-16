import React, { useEffect, useState } from 'react';
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

const PopesWorldWidePrayerDetails = () => {
    const { id } = useParams();

    const [prayer, setPrayer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPrayerDetails = async () => {
            try {
                setLoading(true);
                setError(null);

                const fetchPromise = fetch(
                    `${import.meta.env.VITE_API_BASE_URL}/popes_worldwide_prayer/${id}`
                );

                const timeoutPromise = new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Request timeout')), 15000)
                );

                const res = await Promise.race([fetchPromise, timeoutPromise]);

                if (!res.ok) {
                    throw new Error(`Failed to fetch: ${res.status}`);
                }

                const response = await res.json();

                if (response.status && response.data) {
                    const data = response.data;

                    const formattedPrayer = {
                        id: data.id,
                        title: data.title || "Pope's Worldwide Prayer",
                        description: data.description || '',
                        image_url: data.image_url || data.image || null,
                        link: data.link || null,
                        created_at: data.created_at || null,
                        updated_at: data.updated_at || null,
                    };

                    setPrayer(formattedPrayer);
                    document.title = `${formattedPrayer.title} - Pope's Worldwide Prayer`;
                } else {
                    setError("Prayer content not found");
                }
            } catch (err) {
                console.error(err);
                setError(
                    err.message ||
                    "Pope's Worldwide Prayer details could not be loaded."
                );
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchPrayerDetails();
        }
    }, [id]);

    /* ===================== BREADCRUMB ===================== */
    const breadcrumbItems = [
        { label: 'Home', path: '/' },
        {
            label: "Pope's Worldwide Prayer",
            path: '/popes-prayer',
        },
        {
            label: prayer?.title || 'Details',
            path: `/popes-prayer/${id}`,
        },
    ];

    /* ===================== LOADING ===================== */
    if (loading) {
        return (
            <div className="min-h-screen bg-cream">
                <Breadcrumb items={breadcrumbItems} />
                <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                    <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                    <p className="text-gray-600 text-lg">
                        Loading Pope&apos;s Worldwide Prayer details...
                    </p>
                </div>
            </div>
        );
    }

    /* ===================== ERROR ===================== */
    if (error || !prayer) {
        return (
            <div className="min-h-screen bg-cream">
                <Breadcrumb items={breadcrumbItems} />
                <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
                    <FiAlertCircle className="w-16 h-16 text-red-500" />
                    <h3 className="text-xl font-bold text-navy">
                        Unable to Load Prayer Details
                    </h3>
                    <p className="text-gray-600 max-w-md">{error}</p>
                    <Link to="/popes-worldwide-prayer">
                        <button className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition">
                            Back to Pope&apos;s Worldwide Prayer
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
      <h1 className="text-3xl font-bold">{prayer.title}</h1>
    </header>

    <Breadcrumb items={breadcrumbItems} />

    {/* Main Content */}
    <main className="p-6 pt-12 sm:ml-24 sm:mr-24">
      <div className="flex flex-col lg:flex-row gap-6 max-w-[1800px]">

        {/* ================= LEFT CONTENT ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          <article className="bg-white rounded-2xl shadow-xl overflow-hidden h-full">
            {/* Header */}
            <div className="p-6 md:p-8 bg-linear-to-r from-navy/5 to-primary/5 border-b">
              <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-bold mb-4">
                <FiAward className="w-4 h-4" />
                PRAYER NETWORK
              </span>

              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-navy leading-tight">
                {prayer.title}
              </h1>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              {/* Image */}
              {prayer.image_url && (
                <div className="mb-8">
                  <div className="relative h-72 md:h-80 rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={prayer.image_url}
                      alt={prayer.title}
                      className="w-full h-full object-cover"
                      onError={(e) => (e.target.style.display = 'none')}
                    />
                  </div>
                </div>
              )}

              {/* Description */}
              {prayer.description && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-primary rounded"></div>
                    About the Prayer Network
                  </h2>
                  <div className="p-6 bg-linear-to-r from-primary/5 to-transparent rounded-xl border-l-4 border-primary">
                    <div
                      className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: prayer.description }}
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
          className="w-full lg:w-[380px] shrink-0"
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-4 bg-linear-to-r from-secondary to-primary">
              <h3 className="text-white font-bold text-sm uppercase tracking-wide">
                Prayer Information
              </h3>
            </div>

            <div className="p-6 space-y-4">
              {/* Created Date */}
              {prayer.created_at && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <FiCalendar className="w-4 h-4 text-primary" />
                    <span className="text-gray-500 text-sm font-medium">
                      Added On
                    </span>
                  </div>
                  <span className="text-navy font-semibold text-sm">
                    {new Date(prayer.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              )}

              {/* Visit Website */}
              {prayer.link && (
                <div className="p-4 bg-linear-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
                  <a
                    href={prayer.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center px-4 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <FiLink className="w-4 h-4" />
                    Visit Website
                  </a>
                </div>
              )}

              {/* Back Button */}
              <Link to="/popes-prayer">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-4 px-4 py-3 bg-linear-to-r from-primary to-navy text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FiArrowLeft className="w-4 h-4" />
                  Back to Prayer List
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

export default PopesWorldWidePrayerDetails;