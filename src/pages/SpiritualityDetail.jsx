import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Breadcrumb from "../components/Breadcrumb";

const SpiritualityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/spirituality/${id}`
        );

        if (!response.ok) throw new Error("Failed to load content");

        const result = await response.json();
        if (result.status && result.data) {
          setItem(result.data);
        } else {
          throw new Error("Content not found");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Spirituality", path: "/spirituality" },
    { label: item?.title || "Detail", path: "#" },
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
            Unable to load content
          </h2>
          <button
            onClick={() => navigate("/spirituality")}
            className="px-6 py-2 bg-primary text-white rounded-lg"
          >
            Back to Spirituality
          </button>
        </div>
      </div>
    );
  }

  /* ================= PAGE ================= */
  return (
    <div className="min-h-screen bg-cream text-navy">
      {/* HEADER — KEEP SAME */}
      <header className="p-6 sm:ml-24 -mb-10 mt-24">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="sm:text-4xl text-2xl font-bold">
            {item.title}
          </h1>
        </motion.div>
      </header>

      {/* BREADCRUMB — KEEP SAME */}
      <Breadcrumb items={breadcrumbItems} />

      {/* CONTENT — NEW LAYOUT */}
      <section className="container mx-auto px-6 py-10">
        {/* IMAGE (FULL, SOFT, NOT BOXED) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <img
            src={item.image_url}
            alt={item.title}
            className="w-full max-h-[480px] object-cover rounded-xl shadow-md"
          />
        </motion.div>

        {/* META */}
        <div className="text-sm text-gray-500 mb-8">
          Published on{" "}
          {new Date(item.created_at).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </div>

        {/* CONTENT TEXT (FLOWING) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="
            max-w-4xl
            text-lg
            leading-relaxed
            text-gray-700
            prose
            prose-lg
            prose-headings:text-navy
            prose-strong:text-navy
          "
          dangerouslySetInnerHTML={{ __html: item.description }}
        />

        {/* DIVIDER */}
        <div className="my-14 border-t border-primary/20"></div>

       <div className="mt-14">
            <button
              onClick={() => navigate("/spirituality")}
              className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
            >
              ← Back to Spirituality
            </button>
          </div>
      </section>
    </div>
  );
};

export default SpiritualityDetail;
