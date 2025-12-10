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
      <section className="w-full py-16">
        <div className="max-w-[1600px] mx-auto text-center">
          <div className="animate-pulse space-y-4">
            <div className="inline-block w-32 h-8 bg-gray-200 rounded mx-auto mb-8"></div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-200 h-64 rounded-xl animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || videos.length === 0) {
    return (
      <section className="w-full py-4 sm:py-6 lg:py-8 px-6 sm:px-12 lg:px-20 xl:px-32 bg-linear-to-b from-cream to-white">
        <div className="max-w-[1600px] mx-auto text-center py-12">
          <p className="text-navy">
            {error ? 'Unable to load videos' : 'No videos available'}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-4 sm:py-6 lg:py-8 px-6 sm:px-12 lg:px-20 xl:px-32 bg-linear-to-b from-cream to-white">
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
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
                {/* Video Embed */}
                <div className="relative w-full aspect-video bg-navy overflow-hidden">
                  <iframe
                    src={video.embedUrl || `https://www.youtube.com/embed/${video.videoId}?rel=0&modestbranding=1`}
                    title={video.title || `Video ${video.id}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>

                {/* Video Title (Optional) */}
                {video.title && (
                  <div className="p-3">
                    <h3 className="text-sm font-semibold text-navy line-clamp-2">
                      {video.title}
                    </h3>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Subscribe Button */}
        <motion.div
          className="mt-10 sm:mt-12 text-center"
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
              className="px-8 py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto cursor-pointer"
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
