import React from 'react';
import { motion } from 'framer-motion';

const Book = () => {
  // Sample data with demo images
  const books = [
    {
      id: 1,
      title: 'The Spiritual Exercises',
      description:
        'A guide for spiritual retreats and reflection sessions. This book is a cornerstone of Jesuit spirituality and provides deep insights into meditation and prayer practices. Perfect for those seeking spiritual growth and deeper connection with faith. The Spiritual Exercises of St. Ignatius have guided millions through contemplative prayer and discernment. This comprehensive guide includes detailed instructions for retreat directors and individuals seeking personal spiritual growth through Ignatian contemplation methods.',
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
    },
    {
      id: 2,
      title: 'Jesuit Education Today',
      description:
        'Exploring modern methodologies in Jesuit education and their impact on students and society. A comprehensive look at educational philosophy and practice in contemporary times, bridging tradition with innovation in the classroom.',
      image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
    },
    {
      id: 3,
      title: 'History of the Jesuits',
      description:
        'A comprehensive review of the Jesuit order from its founding to the present day. Explores the rich history and contributions of the Society of Jesus to education, missions, and social justice worldwide. From the founding by St. Ignatius of Loyola in 1540 to the present day, the Jesuits have played a crucial role in education, missionary work, and social justice. This volume traces their remarkable journey through centuries of service, persecution, suppression, and restoration.',
      image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
    },
    {
      id: 4,
      title: 'Saints and Scholars',
      description:
        'Stories of Jesuit saints and their scholarly contributions to theology, science, and the arts throughout history. Inspiring tales of faith, dedication, and intellectual pursuit that shaped our world.',
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
    },
    {
      id: 5,
      title: 'Mission and Ministry',
      description:
        'An exploration of Jesuit missionary work and ministry across the world, highlighting stories of faith and service. Discover how Jesuits have served communities globally with compassion and dedication to the marginalized.',
      image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
    },
    {
      id: 6,
      title: 'Ignatian Spirituality',
      description:
        'Understanding the spiritual wisdom of St. Ignatius of Loyola and how it applies to modern life and faith journeys. A practical guide to living an Ignatian life in today\'s fast-paced world.',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
    },
  ];

  return (
    <div className="min-h-screen bg-cream text-navy">
      {/* Header */}
      <header className="bg-primary text-white p-4 shadow-md mt-24">
        <h1 className="text-3xl font-bold text-center items-center">
          Books for distribution from the Jesuit Archives of Hazaribag
        </h1>
      </header>

      {/* Distribution Info */}
      <div className="container mx-auto p-6 text-center">
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
            >
              {/* Book Card Container */}
              <motion.div
                className="relative w-full h-full"
                style={{
                  transformStyle: 'preserve-3d',
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
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Book cover overlay with title */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
                    <h3 className="text-white text-xl font-bold drop-shadow-lg">
                      {book.title}
                    </h3>
                  </div>
                  {/* Page edge effect */}
                  <div className="absolute top-0 right-0 w-2 h-full bg-linear-to-r from-black/20 to-transparent"></div>
                  {/* Hover instruction */}
                  <div className="absolute top-3 right-3 bg-white/90 text-navy px-2 py-1 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Hover to open
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
                    </div>

                    {/* Description with custom scrollbar */}
                    <div className="flex-1 overflow-y-auto pr-2 description-scroll">
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {book.description}
                      </p>
                      
                      {/* Scroll indicator at bottom */}
                      {book.description.length > 200 && (
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
    </div>
  );
};

export default Book;
