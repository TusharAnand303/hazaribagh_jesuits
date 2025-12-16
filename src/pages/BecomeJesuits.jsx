import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Breadcrumb from '../components/Breadcrumb';

const BecomeJesuits = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Become a Jesuit", path: "/become-a-jesuit" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const fetchPromise = fetch(`${import.meta.env.VITE_API_BASE_URL}/become-a-jesuits`);
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Request timeout')), 15000)
        );

        const response = await Promise.race([fetchPromise, timeoutPromise]);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const result = await response.json();

        if (result.status && result.data) {
          const formattedSections = result.data.map((item, index) => ({
            id: item.id,
            title: item.title,
            content: item.description, // Keep HTML
            image: item.image_url,
            imagePosition: index % 2 === 0 ? 'left' : 'right', // alternate
          }));
          setSections(formattedSections);
        } else {
          setError("No data found.");
        }
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream text-navy flex flex-col items-center justify-center">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex flex-col items-center gap-4 mt-20">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <p className="text-gray-600 text-lg">Loading content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-cream text-navy flex flex-col items-center justify-center">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex flex-col items-center gap-4 mt-20">
          <div className="text-red-500 text-4xl">⚠️</div>
          <h3 className="text-xl font-bold text-navy">Unable to Load Content</h3>
          <p className="text-gray-600">{error === 'Request timeout' ? 'The request is taking longer than expected.' : 'There was an error loading the content.'}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!sections.length) {
    return (
      <div className="min-h-screen bg-cream text-navy flex flex-col items-center justify-center">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex flex-col items-center gap-4 mt-20">
          <div className="text-gray-400 text-5xl">📖</div>
          <h3 className="text-xl font-bold text-navy">No Content Available</h3>
          <p className="text-gray-600">Check back later for updates.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream text-navy">
      <header className="p-6 sm:ml-24 mt-24 -mb-10">
        <h1 className="sm:text-4xl text-2xl font-bold">Become a Jesuit</h1>
        <p className="text-sm mt-2 opacity-90">Answer the Call to Serve God and Others</p>
      </header>

      <Breadcrumb items={breadcrumbItems} />

      <main className="container mx-auto px-6 py-12">
        {sections.map((section, index) => (
          <motion.section
            key={section.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="mb-12"
          >
            <div className={`bg-white rounded-lg shadow-lg overflow-hidden p-6 md:p-8 flex flex-col ${
              section.imagePosition === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'
            } gap-6 items-start`}>
              <div className="shrink-0">
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full md:w-[300px] h-[300px] object-cover rounded-lg shadow-md"
                />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">{section.title}</h2>
                <div
                  className="text-gray-700 text-base md:text-lg leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
              </div>
            </div>
          </motion.section>
        ))}
      </main>
    </div>
  );
};

export default BecomeJesuits;
