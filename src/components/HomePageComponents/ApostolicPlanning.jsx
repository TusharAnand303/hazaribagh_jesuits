import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiDownload } from "react-icons/fi";

const ApostolicPlanning = () => {
  const [plannings, setPlannings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [index, setIndex] = useState(0);

  /* ================= RESPONSIVE ITEMS ================= */
  const getItemsPerSlide = () => {
    const width = window.innerWidth;
    if (width < 640) return 1;      // Mobile
    if (width < 1024) return 2;     // Tablet
    return 4;                       // Desktop
  };

  const [ITEMS_PER_SLIDE, setItemsPerSlide] = useState(getItemsPerSlide());

  useEffect(() => {
    const handleResize = () => {
      setItemsPerSlide(getItemsPerSlide());
      setIndex(0); // reset slide on resize
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      <section className="py-6 sm:py-8 md:py-10 lg:py-12 bg-gradient-to-t from-cream to-white">
        <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-primary mb-3 sm:mb-4"></div>
            <p className="text-navy text-sm sm:text-base">Loading apostolic planning...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 sm:py-8 md:py-10 lg:py-12 bg-gradient-to-t from-cream to-white">
      <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl">

        {/* ================= HEADER ================= */}
        <div className="text-center mb-8 sm:mb-10">
          <span className="inline-block px-4 py-2 sm:px-5 sm:py-2 md:px-6 md:py-2 bg-cream border border-secondary/40 rounded-full text-primary text-xs sm:text-sm md:text-sm font-semibold mb-3 sm:mb-4">
            Mission Priorities
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-3 sm:mb-4">
            Hazaribagh Province Apostolic Planning
          </h2>

          <div className="w-16 sm:w-20 md:w-24 h-0.5 sm:h-1 bg-secondary mx-auto rounded-full mb-4 sm:mb-6" />

          <p className="text-navy text-xs sm:text-sm md:text-base max-w-3xl mx-auto px-4">
            Key apostolic focus areas through which the Province carries out its mission.
          </p>
        </div>

        {/* ================= SLIDER ================= */}
        <div className="relative max-w-6xl mx-auto overflow-hidden">

          {/* LEFT ARROW */}
          <button
            onClick={prevSlide}
            className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-20
                       bg-white shadow-lg rounded-full p-2 sm:p-2.5 md:p-3
                       hover:bg-primary hover:text-white transition"
          >
            <FiChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* RIGHT ARROW */}
          <button
            onClick={nextSlide}
            className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-20
                       bg-white shadow-lg rounded-full p-2 sm:p-2.5 md:p-3
                       hover:bg-primary hover:text-white transition"
          >
            <FiChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className={`grid gap-4 sm:gap-5 md:gap-6 px-8 sm:px-10 md:px-12 ${
                ITEMS_PER_SLIDE === 1
                  ? "grid-cols-1"
                  : ITEMS_PER_SLIDE === 2
                  ? "grid-cols-2"
                  : "grid-cols-4"
              }`}
            >
              {displayPlannings
                .slice(
                  index * ITEMS_PER_SLIDE,
                  index * ITEMS_PER_SLIDE + ITEMS_PER_SLIDE
                )
                .map((planning) => (
                  <div
                    key={planning.id}
                    className="group w-full max-w-md mx-auto
                               bg-gradient-to-r from-primary to-navy
                               rounded-xl sm:rounded-2xl p-5 sm:p-6 text-center
                               shadow-lg hover:shadow-2xl
                               transition-all duration-500"
                  >
                    <p className="text-white font-semibold text-sm sm:text-base leading-relaxed">
                      {planning.plan_text}
                    </p>
                  </div>
                ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ================= DOWNLOAD BUTTON ================= */}
        <div className="text-center mt-10 sm:mt-12 md:mt-14">
          {pdfUrl ? (
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-lg sm:rounded-xl
                         font-bold text-sm sm:text-base md:text-lg bg-secondary text-white shadow-lg
                         hover:shadow-2xl hover:-translate-y-1 transition-all"
            >
              <FiDownload className="w-5 h-5 sm:w-6 sm:h-6" />
              Download the PDF
            </a>
          ) : (
            <button
              disabled
              className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base md:text-lg
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
