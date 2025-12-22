import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";

const Spirituality = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpirituality = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/spirituality`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch spirituality content");
        }

        const result = await response.json();

        if (result.status && result.data) {
          setItems(result.data);
        } else {
          setItems([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSpirituality();
  }, []);

  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Spirituality", path: "/spirituality" },
  ];

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen bg-cream">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  /* ================= ERROR ================= */
  if (error) {
    return (
      <div className="min-h-screen bg-cream">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <h2 className="text-xl font-semibold text-red-600">
            Unable to load spirituality content
          </h2>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-primary text-white rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  /* ================= PAGE ================= */
  return (
    <div className="min-h-screen bg-cream text-navy">
      <header className="p-6 sm:ml-24 -mb-10 mt-24">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="sm:text-4xl text-2xl font-bold">Spirituality</h1>
                
              </motion.div>
            </header>

      <Breadcrumb items={breadcrumbItems} />

      {/* Content Grid */}
      <section className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
            >
              {/* Image */}
              <div className="h-56 overflow-hidden">
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col h-full">
                <h2 className="text-lg font-semibold leading-snug mb-3">
                  {item.title}
                </h2>

                <div
                  className="text-sm text-gray-600 line-clamp-4"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />

                <button
                  onClick={() => navigate(`/spirituality/${item.id}`)}
                  className="mt-6 self-start text-primary font-medium hover:underline"
                >
                  Read More →
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Spirituality;
