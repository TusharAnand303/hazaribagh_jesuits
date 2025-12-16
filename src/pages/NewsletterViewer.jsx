// NewsletterViewer.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Breadcrumb from "../components/Breadcrumb";

const NewsletterViewer = () => {
  const { id } = useParams();

  const [pdfUrl, setPdfUrl] = useState(null);
  const [newsletterTitle, setNewsletterTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Newsletter", path: "/" },
    { label: newsletterTitle || "View PDF", path: "#" },
  ];

  useEffect(() => {
    const fetchNewsletter = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/newsletter/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to load newsletter");
        }

        const data = await response.json();

        if (!data?.data?.pdf_url) {
          throw new Error("PDF not found");
        }

        setPdfUrl(data.data.pdf_url);
        setNewsletterTitle(data.data.title); // ✅ Dynamic title
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsletter();
  }, [id]);

  /* ===================== LOADING STATE ===================== */
  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-cream to-white">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <p className="text-gray-600 text-lg">Loading newsletter...</p>
        </div>
      </div>
    );
  }

  /* ===================== ERROR STATE ===================== */
  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-b from-cream to-white">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <div className="text-red-500 text-3xl">⚠️</div>
          <h3 className="text-xl font-bold text-navy">
            Unable to Load Newsletter
          </h3>
          <p className="text-gray-600 text-center">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  /* ===================== PAGE UI ===================== */
  return (
    <div className="min-h-screen bg-cream text-navy">
      {/* Header */}
      <header className="p-6 sm:ml-24 -mb-10 mt-24">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="sm:text-4xl text-2xl font-bold">
            {newsletterTitle}
          </h1>
          <p className="text-sm mt-2 opacity-90">
            Newsletter Preview
          </p>
        </motion.div>
      </header>

      <Breadcrumb items={breadcrumbItems} />

      {/* PDF Viewer */}
      <main className="container mx-auto px-6 py-8 mt-10 sm:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="
            bg-white rounded-lg shadow-xl overflow-hidden
            h-[75vh] sm:h-[85vh] lg:h-[92vh]
          "
        >
          <iframe
            src={`${encodeURI(pdfUrl)}#toolbar=0&navpanes=0&scrollbar=0`}
            title={newsletterTitle}
            className="w-full h-full"
            frameBorder="0"
          />
        </motion.div>
      </main>
    </div>
  );
};

export default NewsletterViewer;
