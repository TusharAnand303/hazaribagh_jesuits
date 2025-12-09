import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Breadcrumb from '../components/Breadcrumb';

const Book = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [flippedBook, setFlippedBook] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError(null);

        const fetchPromise = fetch(`${import.meta.env.VITE_API_BASE_URL}/books`);
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Request timeout')), 15000)
        );

        const response = await Promise.race([fetchPromise, timeoutPromise]);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.status && result.data) {
          setBooks(result.data);
        } else {
          setBooks([]);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching books:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Books", path: "/book" },
  ];

  // Handle click for mobile devices
  const handleBookClick = (bookId) => {
    setFlippedBook(flippedBook === bookId ? null : bookId);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-cream">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <p className="text-gray-600 text-lg">Loading books...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-cream">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <div className="text-red-500 text-xl">⚠️</div>
          <h3 className="text-xl font-bold text-navy">Unable to Load Books</h3>
          <p className="text-gray-600">
            {error === 'Request timeout'
              ? 'The request is taking longer than expected.'
              : 'There was an error loading the books.'}
          </p>
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

  // No books state
  if (!books || books.length === 0) {
    return (
      <div className="min-h-screen bg-cream">
        <header className="p-6 mt-8 sm:ml-24 -mb-10">
          <h1 className="sm:text-4xl text-2xl font-bold">
            Books for distribution from the Jesuit Archives of Hazaribag
          </h1>
        </header>
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <div className="text-gray-400 text-5xl">📚</div>
          <h3 className="text-xl font-bold text-navy">No Books Available</h3>
          <p className="text-gray-600">Check back later for updates.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream text-navy">
      <Breadcrumb items={breadcrumbItems} />

      {/* Header */}
      <header className="p-6 mt-8 sm:ml-24 -mb-10">
        <h1 className="sm:text-4xl text-2xl font-bold">
          Books for distribution from the Jesuit Archives of Hazaribag
        </h1>
      </header>

      {/* Distribution Info */}
      <div className="container mx-auto p-6 text-start sm:ml-24 mt-10">
        <p className="text-lg mb-4">
          Books for distribution from the Jesuit Archives of Hazaribag.
        </p>
        <p className="text-lg mb-4">
          These following books are available at the Provincialate of the Jesuits in Hazaribag: Loyola Mandir, 96 Lavelle Road, 3rd Cross, Bengaluru - 560001.
        </p>
        <p className="text-lg">
          Write to us at{' '}
          <a
            href="mailto:hazaribagjesuitarchives@gmail.com"
            className="text-secondary underline"
          >
            hazaribagjesuitarchives@gmail.com
          </a>{' '}
          or send a message to this number: 09483074475
        </p>
      </div>

      {/* Books Grid */}
      <main className="container mx-auto px-6 py-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-16 md:gap-20">
          {books.map((book, index) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group cursor-pointer mx-auto"
              style={{ 
                height: '380px',
                width: '280px',
                perspective: '2000px'
              }}
              onClick={() => handleBookClick(book.id)}
            >
              {/* Book Card Container */}
              <motion.div
                className="relative w-full h-full"
                style={{
                  transformStyle: 'preserve-3d',
                }}
                animate={{
                  rotateY: flippedBook === book.id ? -180 : 0
                }}
                whileHover={{
                  rotateY: -180,
                }}
                transition={{
                  duration: 1,
                  ease: [0.43, 0.13, 0.23, 0.96]
                }}
              >
                {/* Front Side - Book Cover */}
                <div
                  className="absolute inset-0 w-full h-full rounded-lg shadow-2xl overflow-hidden"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden'
                  }}
                >
                  <img
                    src={book.image_url || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=600&fit=crop'}
                    alt={book.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=600&fit=crop';
                    }}
                  />
                  {/* Book cover overlay with title */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
                    <h3 className="text-white text-xl font-bold drop-shadow-lg">
                      {book.title}
                    </h3>
                  </div>
                  {/* Page edge effect */}
                  <div className="absolute top-0 right-0 w-2 h-full bg-linear-to-r from-black/20 to-transparent"></div>
                  {/* Tap/Hover instruction */}
                  <div className="absolute top-3 right-3 bg-white/90 text-navy px-2 py-1 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 md:opacity-0 transition-opacity duration-300">
                    <span className="hidden md:inline">Hover to open</span>
                    <span className="md:hidden">Tap to open</span>
                  </div>
                </div>

                {/* Back Side - Book Page with Description */}
                <div
                  className="absolute inset-0 w-full h-full rounded-lg shadow-2xl bg-white overflow-hidden"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  {/* Paper texture overlay */}
                  <div className="absolute inset-0 bg-linear-to-br from-amber-50/50 via-white to-amber-50/30"></div>
                  
                  {/* Content */}
                  <div className="relative h-full p-5 flex flex-col">
                    {/* Book Title */}
                    <div className="border-b-2 border-secondary pb-3 mb-3 shrink-0">
                      <h2 className="text-lg font-bold text-secondary">
                        {book.title}
                      </h2>
                      {book.author && (
                        <p className="text-sm text-gray-600 mt-1">
                          by {book.author}
                        </p>
                      )}
                    </div>

                    {/* Description with custom scrollbar */}
                    <div className="flex-1 overflow-y-auto pr-2 description-scroll">
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {book.description || 'No description available.'}
                      </p>
                      
                      {/* Scroll indicator at bottom */}
                      {book.description && book.description.length > 200 && (
                        <div className="mt-3 text-center">
                          <span className="text-xs text-gray-400 italic">
                            ↓ Scroll for more ↓
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="mt-4 pt-3 border-t border-gray-200 shrink-0">
                      <p className="text-xs text-gray-500 italic text-center">
                        Available at Jesuit Archives, Hazaribag
                      </p>
                    </div>
                  </div>

                  {/* Page binding shadow */}
                  <div className="absolute top-0 left-0 w-2 h-full bg-linear-to-r from-black/10 to-transparent"></div>
                  
                  {/* Page lines effect */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="h-full flex flex-col justify-around px-6 py-20 opacity-10">
                      {[...Array(12)].map((_, i) => (
                        <div key={i} className="h-px bg-blue-300"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Shadow under the book */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-black/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .description-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .description-scroll::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .description-scroll::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        .description-scroll::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
};

export default Book;
