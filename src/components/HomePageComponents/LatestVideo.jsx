import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlay, FiEye, FiCalendar, FiYoutube } from 'react-icons/fi';

const LatestVideo = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Admin can just add YouTube video URLs here
  const adminVideoLinks = [
    'https://youtu.be/Mxz-2RONO7s?si=RGdq6PZAcnlurES0', // Replace with actual video URLs
    'https://youtu.be/9zB8HvIA9e0?si=Ymckq2r1wucRwPn1',
    'https://youtu.be/1-MJWYw0iQI?si=fQ2r2ItnlupPBeiO',
    'https://youtu.be/w3ZmmF3qV5c?si=nqwuRIYh_uLLIGtz'
  ];

  // Extract video ID from YouTube URL
  const extractVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Process admin links into video data
  useEffect(() => {
    const processVideos = async () => {
      try {
        const videoData = adminVideoLinks.slice(0, 4).map((url, index) => {
          const videoId = extractVideoId(url);
          return {
            id: index + 1,
            videoId: videoId || 'dQw4w9WgXcQ', // Fallback
            title: `Hazaribagh Jesuits Video ${index + 1}`, // Dynamic title
            description: `Watch our latest video showcasing the mission work of Hazaribagh Jesuits.`,
            duration: `${Math.floor(Math.random() * 10) + 3}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
            views: `${Math.floor(Math.random() * 5) + 1}K`,
            date: new Date(Date.now() - (index * 86400000 * 2)).toISOString().split('T')[0] // Recent dates
          };
        });
        setVideos(videoData);
      } catch (error) {
        console.error('Error processing videos:', error);
      } finally {
        setLoading(false);
      }
    };

    processVideos();
  }, []);

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
                    src={`https://www.youtube.com/embed/${video.videoId}?rel=0`}
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

        {/* Subscribe Button - Updated with your channel */}
        <motion.div
          className="mt-10 sm:mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.a
            href="https://www.youtube.com/channel/UC42hKatZ9vX_P5UxRZzr67g"
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
