import React from 'react';
import { motion } from 'framer-motion';
import { FiPlay, FiEye, FiCalendar, FiYoutube } from 'react-icons/fi';

const LatestVideo = () => {
  // Sample video data - Replace with your actual YouTube video IDs
  const videos = [
    {
      id: 1,
      videoId: 'dQw4w9WgXcQ', // Replace with your YouTube video ID
      title: 'Hazaribagh Jesuits: A Journey of Faith and Service',
      description: 'Discover the inspiring story of our mission and the lives we touch across Jharkhand.',
      duration: '5:32',
      views: '2.5K',
      date: '2025-11-20'
    },
    {
      id: 2,
      videoId: 'dQw4w9WgXcQ', // Replace with your YouTube video ID
      title: 'Education for All: Building Future Leaders',
      description: 'See how our schools empower tribal communities through quality education.',
      duration: '4:15',
      views: '1.8K',
      date: '2025-11-15'
    },
    {
      id: 3,
      videoId: 'dQw4w9WgXcQ', // Replace with your YouTube video ID
      title: 'Ignatian Spirituality: Finding God in All Things',
      description: 'Experience the depth of Jesuit spirituality through retreats and prayer.',
      duration: '6:45',
      views: '3.2K',
      date: '2025-11-10'
    },
    {
      id: 4,
      videoId: 'dQw4w9WgXcQ', // Replace with your YouTube video ID
      title: 'Community Development: Transforming Lives',
      description: 'Our social justice initiatives bring hope to marginalized communities.',
      duration: '7:20',
      views: '4.1K',
      date: '2025-11-05'
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="w-full py-8 sm:py-12 lg:py-16 px-6 sm:px-12 lg:px-20 xl:px-32">
      <div className="max-w-[1600px] mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={titleVariants}
        >
          <motion.span
            className="inline-block px-4 py-2 bg-cream border border-secondary/30 rounded-full text-primary text-sm font-semibold mb-4 shadow-sm"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <FiYoutube className="inline w-4 h-4 mr-2" />
            Video Gallery
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mb-4">
            Latest Videos
          </h2>
          <motion.div
            className="w-24 h-1 bg-secondary mx-auto rounded-full mb-4"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
          <p className="text-gray text-base sm:text-lg max-w-2xl mx-auto">
            Watch our journey, events, and the impact we're making in communities
          </p>
        </motion.div>

        {/* Videos Grid */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {videos.map((video) => (
            <motion.div
              key={video.id}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col group">
                {/* Video Embed */}
                <div className="relative w-full aspect-video bg-navy overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.videoId}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                  
                  {/* Duration Badge */}
                  <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded text-white text-xs font-semibold">
                    {video.duration}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-navy mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                    {video.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray leading-relaxed mb-3 line-clamp-2 flex-1">
                    {video.description}
                  </p>

                  {/* Meta Information */}
                  <div className="flex items-center justify-between text-xs text-gray pt-3 border-t border-gray-200">
                    <span className="flex items-center gap-1">
                      <FiEye className="w-3 h-3" />
                      {video.views} views
                    </span>
                    <span className="flex items-center gap-1">
                      <FiCalendar className="w-3 h-3" />
                      {new Date(video.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Simple Subscribe Button */}
        <motion.div
          className="mt-10 sm:mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.a
            href="https://www.youtube.com/@yoursocialhandle" // Replace with your YouTube channel
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.button
              className="px-8 py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto"
              animate={{
                boxShadow: [
                  "0 10px 30px rgba(128, 0, 0, 0.2)",
                  "0 10px 40px rgba(128, 0, 0, 0.3)",
                  "0 10px 30px rgba(128, 0, 0, 0.2)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <FiYoutube className="w-6 h-6" />
              <span>Subscribe to Our Channel</span>
            </motion.button>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestVideo;
