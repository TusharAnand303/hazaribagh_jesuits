import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiDownload } from "react-icons/fi";

const ApostolicPlanning = () => {
  const [plannings, setPlannings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pdfUrl, setPdfUrl] = useState(null);

  const [index, setIndex] = useState(0);

  const ITEMS_PER_SLIDE = 4;

  /* ================= FETCH PLANNINGS ================= */
  useEffect(() => {
    const fetchPlannings = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/plannings`
        );
        const data = await response.json();
        setPlannings(Array.isArray(data?.data) ? data.data : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlannings();
  }, []);

  /* ================= FETCH PDF ================= */
  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/plannings_pdf`
        );
        const data = await response.json();
        if (data?.status && data?.data?.pdf_url) {
          setPdfUrl(data.data.pdf_url);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchPdf();
  }, []);

  /* ================= FALLBACK DATA ================= */
  const displayPlannings =
    plannings.length > 0
      ? plannings
      : [
          { id: 1, plan_text: "Strengthening and Expanding our Mission in North Hazaribagh" },
          { id: 2, plan_text: "Responding to Communalism and Fundamentalism" },
          { id: 3, plan_text: "Imparting Integral Formation to Youth" },
          { id: 4, plan_text: "Training in Collaboration and Leadership" },
        ];

  const totalSlides = Math.ceil(displayPlannings.length / ITEMS_PER_SLIDE);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  if (loading) {
    return (
      <section className="py-12 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
        <p className="text-navy">Loading apostolic planning...</p>
      </section>
    );
  }

  return (
    <section className="py-8 bg-linear-to-t from-cream to-white">
      <div className="container mx-auto px-6">

        {/* ================= HEADER ================= */}
        <div className="text-center mb-10">
          <span className="inline-block px-6 py-2 bg-cream border border-secondary/40 rounded-full text-primary text-sm font-semibold mb-4">
            Mission Priorities
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
            Hazaribagh Province Apostolic Planning
          </h2>

          <div className="w-24 h-1 bg-secondary mx-auto rounded-full mb-6" />

          <p className="text-navy max-w-3xl mx-auto">
            Key apostolic focus areas through which the Province carries out its mission.
          </p>
        </div>

        {/* ================= SLIDER ================= */}
        <div className="relative max-w-6xl mx-auto overflow-hidden">

          {/* Arrow Left */}
          <button
            onClick={prevSlide}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 
                       bg-white shadow-lg rounded-full p-3 hover:bg-primary hover:text-white transition"
          >
            <FiChevronLeft size={22} />
          </button>

          {/* Arrow Right */}
          <button
            onClick={nextSlide}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 
                       bg-white shadow-lg rounded-full p-3 hover:bg-primary hover:text-white transition"
          >
            <FiChevronRight size={22} />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {displayPlannings
                .slice(
                  index * ITEMS_PER_SLIDE,
                  index * ITEMS_PER_SLIDE + ITEMS_PER_SLIDE
                )
                .map((planning) => (
                  <div
                    key={planning.id}
                    className="group bg-linear-to-r from-primary to-navy rounded-2xl p-6 
                               text-center shadow-lg hover:shadow-2xl hover:-translate-y-2 
                               transition-all duration-500"
                  >
                    <p className="text-white font-semibold leading-relaxed">
                      {planning.plan_text}
                    </p>
                  </div>
                ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ================= DOWNLOAD BUTTON (OUTSIDE SLIDER) ================= */}
        <div className="text-center mt-14">
          {pdfUrl ? (
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-xl 
                         font-bold text-lg bg-secondary text-white shadow-lg 
                         hover:shadow-2xl hover:-translate-y-1 transition-all"
            >
              <FiDownload size={22} />
              Download the PDF
            </a>
          ) : (
            <button
              disabled
              className="px-10 py-4 rounded-xl font-bold text-lg 
                         bg-gray-400 text-white cursor-not-allowed"
            >
              PDF Not Available
            </button>
          )}
        </div>

      </div>
    </section>
  );
};

export default ApostolicPlanning;
