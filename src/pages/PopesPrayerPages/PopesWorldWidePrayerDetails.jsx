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
                                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-navy">
                                    {prayer.title}
                                </h1>
                            </div>

                            <div className="p-6 md:p-8">
                                {/* Image */}
                                {prayer.image_url ? (
                                    <div className="mb-8">
                                        <div className="relative h-72 md:h-80 rounded-xl overflow-hidden shadow-lg">
                                            <img
                                                src={prayer.image_url}
                                                alt={prayer.title}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.src =
                                                        'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&h=800&fit=crop';
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
                                {prayer.description && (
                                    <div>
                                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                            <div className="w-1 h-6 bg-primary rounded"></div>
                                            About the Prayer Network
                                        </h2>
                                        <div className="p-6 bg-primary/5 rounded-xl border-l-4 border-primary">
                                            <div
                                                className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                                                dangerouslySetInnerHTML={{
                                                    __html: prayer.description,
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}

                                {prayer.link && (
                                <div className="flex justify-center mt-8">
                                    <div className="p-3 bg-linear-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
                                    <a
                                        href={prayer.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-5 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                                    >
                                        <FiLink className="w-4 h-4" />
                                        Visit Website
                                    </a>
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

export default PopesWorldWidePrayerDetails;