import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NewInitiative = () => {
  const [selectedInitiative, setSelectedInitiative] = useState(null);

  // Initiatives data (can be fetched from admin panel)
  const initiatives = [
    {
      id: 1,
      title: 'Digital Learning Program',
      shortDescription: 'Empowering students with digital skills and technology education',
      fullDescription: 'Our Digital Learning Program aims to bridge the digital divide by providing quality technology education to underprivileged students. We are setting up computer labs, training teachers, and introducing coding and digital literacy courses across all our schools in Hazaribag.',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      status: 'Active',
      year: '2025',
      category: 'Education',
    },
    {
      id: 2,
      title: 'Tribal Empowerment Initiative',
      shortDescription: 'Supporting tribal communities through skill development and healthcare',
      fullDescription: 'Working closely with tribal communities in Jharkhand to provide vocational training, healthcare services, and educational opportunities. This initiative focuses on preserving tribal culture while empowering them with modern skills.',
      image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      status: 'Active',
      year: '2024',
      category: 'Social',
    },
    {
      id: 3,
      title: 'Green Campus Project',
      shortDescription: 'Creating sustainable and eco-friendly educational environments',
      fullDescription: 'An ambitious project to transform our campuses into green, sustainable spaces. Includes rainwater harvesting, solar energy installation, organic farming, and environmental education programs for students.',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      status: 'Active',
      year: '2025',
      category: 'Environment',
    },
    {
      id: 4,
      title: 'Women Empowerment Program',
      shortDescription: 'Empowering women through education and entrepreneurship',
      fullDescription: 'Providing skill training, microfinance support, and educational opportunities to women in rural areas. The program focuses on making women economically independent and socially empowered.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      status: 'Upcoming',
      year: '2025',
      category: 'Social',
    },
    {
      id: 5,
      title: 'Mental Health Support',
      shortDescription: 'Counseling and mental health services for students and community',
      fullDescription: 'Establishing counseling centers and training counselors to provide mental health support to students, families, and community members. Includes awareness programs and workshops on mental wellness.',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      status: 'Active',
      year: '2024',
      category: 'Healthcare',
    },
    {
      id: 6,
      title: 'Youth Leadership Academy',
      shortDescription: 'Training young leaders for social transformation',
      fullDescription: 'A comprehensive leadership development program for young people, focusing on values-based leadership, social justice, and community service. Includes mentorship, workshops, and practical exposure.',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      status: 'Upcoming',
      year: '2025',
      category: 'Education',
    },
  ];

  return (
    <div className="min-h-screen bg-cream text-navy">
      {/* Header */}
      <header className="bg-primary text-white p-4 shadow-md mt-24">
        <h1 className="text-3xl font-bold text-center">New Initiatives</h1>
        <p className="text-center text-sm mt-2 opacity-90">
          Innovative Programs Transforming Lives in Hazaribag
        </p>
      </header>
      {/* Initiatives Grid */}
      <main className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {initiatives.map((initiative, index) => (
            <motion.div
              key={initiative.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer group"
              onClick={() => setSelectedInitiative(initiative)}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={initiative.image}
                  alt={initiative.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      initiative.status === 'Active'
                        ? 'bg-green-500 text-white'
                        : 'bg-yellow-500 text-white'
                    }`}
                  >
                    {initiative.status}
                  </span>
                </div>
                {/* Category Badge */}
                <div className="absolute top-4 right-4">
                  <span className="bg-secondary text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {initiative.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-navy mb-2 group-hover:text-secondary transition-colors">
                  {initiative.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {initiative.shortDescription}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Started: {initiative.year}</span>
                  <button className="text-secondary font-semibold text-sm hover:underline flex items-center">
                    Learn More
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 bg-linear-to-r from-primary to-secondary text-white rounded-lg p-8 md:p-12 text-center shadow-xl"
        >
          <h2 className="text-3xl font-bold mb-4">Join Us in Making a Difference</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Your support can help us expand these initiatives and reach more communities. Together, we
            can create lasting change.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg">
              Support Our Work
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              Get Involved
            </button>
          </div>
        </motion.div>
      </main>

      {/* Modal for Initiative Details */}
      <AnimatePresence>
        {selectedInitiative && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedInitiative(null)}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-white rounded-lg overflow-hidden shadow-2xl my-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedInitiative(null)}
                className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 transition-colors shadow-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-navy"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Modal Image */}
              <img
                src={selectedInitiative.image}
                alt={selectedInitiative.title}
                className="w-full h-80 object-cover"
              />

              {/* Modal Content */}
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      selectedInitiative.status === 'Active'
                        ? 'bg-green-500 text-white'
                        : 'bg-yellow-500 text-white'
                    }`}
                  >
                    {selectedInitiative.status}
                  </span>
                  <span className="bg-secondary text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {selectedInitiative.category}
                  </span>
                  <span className="text-gray-500 text-sm">Started: {selectedInitiative.year}</span>
                </div>

                <h2 className="text-3xl font-bold text-navy mb-4">
                  {selectedInitiative.title}
                </h2>

                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {selectedInitiative.fullDescription}
                </p>

                <div className="bg-amber-50 border-l-4 border-secondary p-6 rounded-r-lg">
                  <p className="text-gray-700 italic">
                    "Every initiative we undertake is guided by our commitment to serve the
                    marginalized and promote social justice in our communities."
                  </p>
                  <p className="text-sm text-gray-600 mt-2">— Hazaribag Jesuit Community</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NewInitiative;
