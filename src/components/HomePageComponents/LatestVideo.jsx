import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiYoutube } from 'react-icons/fi';

const LatestVideo = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch YouTube videos from API
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/youtubelinks`);
        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }
        const data = await response.json();

        // API: { status: true, data: [ { ...video objects... } ] }
        const videosArray = Array.isArray(data?.data) ? data.data : [];
        
        // Take first 4 videos
        const processedVideos = videosArray.slice(0, 4).map((video) => ({
          id: video.id,
          title: video.title,
          videoId: extractVideoId(video.youtube_url || video.embed_url),
          embedUrl: video.embed_url,
          youtubeUrl: video.youtube_url,
          description: video.description
        }));

        setVideos(processedVideos);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching videos:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Extract video ID from YouTube URL
  const extractVideoId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

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

  if (loading) {
    return (
      <section className="py-6 sm:py-8 md:py-10 lg:py-12 bg-linear-to-b from-cream to-white">
        <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl">
          <div className="text-center">
            <div className="animate-pulse space-y-4">
              <div className="inline-block w-24 sm:w-32 h-6 sm:h-8 bg-gray-200 rounded mx-auto mb-6 sm:mb-8"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-gray-200 h-48 sm:h-56 md:h-64 rounded-lg sm:rounded-xl animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || videos.length === 0) {
    return (
      <section className="py-6 sm:py-8 md:py-10 lg:py-12 bg-linear-to-b from-cream to-white">
        <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl">
          <div className="text-center py-12">
            <p className="text-navy text-sm sm:text-base">
              {error ? 'Unable to load videos' : 'No videos available'}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 sm:py-8 md:py-10 lg:py-12 bg-linear-to-b from-cream to-white">
      <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={titleVariants}
        >
          <motion.span
            className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-cream border border-secondary/30 rounded-full text-primary text-xs sm:text-sm font-semibold mb-2 sm:mb-3 md:mb-4 shadow-sm"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <FiYoutube className="inline w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
            Video Gallery
          </motion.span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-2 sm:mb-3 md:mb-4">
            Latest Videos
          </h2>
          <motion.div
            className="w-16 sm:w-20 md:w-24 h-0.5 sm:h-1 bg-secondary mx-auto rounded-full mb-2 sm:mb-3 md:mb-4"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
          <p className="text-gray text-xs sm:text-sm md:text-base lg:text-lg max-w-2xl mx-auto px-4">
            Watch our journey, events, and the impact we're making in communities
          </p>
        </motion.div>

        {/* Videos Grid - Responsive: 1 col mobile, 2 col tablet, 4 col desktop */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-10"
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
              <div className="bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
                {/* Video Embed - Responsive with aspect-video */}
                <div className="relative w-full aspect-video bg-navy overflow-hidden">
                  <iframe
                    src={video.embedUrl || `https://www.youtube.com/embed/${video.videoId}?rel=0&modestbranding=1`}
                    title={video.title || `Video ${video.id}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                    loading="lazy"
                  />
                </div>

                {/* Video Title - Responsive padding and font size */}
                {video.title && (
                  <div className="p-2.5 sm:p-3 md:p-3.5">
                    <h3 className="text-xs sm:text-sm md:text-sm font-semibold text-navy line-clamp-2 group-hover:text-primary transition-colors duration-300">
                      {video.title}
                    </h3>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Subscribe Button - Responsive sizing */}
        <motion.div
          className="mt-8 sm:mt-10 md:mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.a
            href="https://youtube.com/channel/UC42hKatZ9vX_P5UxRZzr67g"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.button
              className="px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-primary hover:bg-primary/90 text-white text-sm sm:text-base md:text-base font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 sm:gap-3 mx-auto cursor-pointer"
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
              <FiYoutube className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              <span>Subscribe to Our Channel</span>
            </motion.button>
          </motion.a>
        </motion.div>
      </div>

      {/* CSS for line clamp */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>
    </section>
  );
};

export default LatestVideo;
