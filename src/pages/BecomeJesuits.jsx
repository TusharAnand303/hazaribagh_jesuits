import React from 'react';
import { motion } from 'framer-motion';
import Breadcrumb from '../components/Breadcrumb';

const BecomeJesuits = () => {
  // Content sections data
  const sections = [
    {
      id: 1,
      title: 'What Does It Mean to Be a Jesuit?',
      content: 'The Society of Jesus, commonly known as the Jesuits, is a religious order of priests and brothers founded by St. Ignatius of Loyola in 1540. Jesuits are called to be "contemplatives in action," finding God in all things and serving where the need is greatest. As a Jesuit, you will be part of a global community dedicated to education, social justice, spiritual direction, and missionary work.',
      image: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      imagePosition: 'left',
    },
    {
      id: 2,
      title: 'Jesuit Formation Journey',
      content: 'The formation of a Jesuit is a comprehensive process that typically takes 12-15 years. It begins with the novitiate, a two-year period of intensive spiritual formation. This is followed by studies in philosophy, theology, and other disciplines. Between academic stages, Jesuits engage in practical ministry work called regency. The journey culminates in ordination and final vows, preparing men to serve wherever the need is greatest.',
      image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      imagePosition: 'right',
    },
    {
      id: 3,
      title: 'Life of Prayer and Service',
      content: 'Jesuit life is characterized by a deep commitment to prayer and service. Daily prayer, including the Spiritual Exercises of St. Ignatius, forms the foundation of Jesuit spirituality. This contemplative dimension is balanced with active service in education, social ministry, pastoral care, and advocacy for justice. Jesuits are called to find God in all things and to serve with love and competence.',
      image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      imagePosition: 'left',
    },
    {
      id: 4,
      title: 'Global Mission and Community',
      content: 'As a Jesuit, you become part of a worldwide community serving in over 100 countries. The Society values mobility and flexibility, with members willing to go wherever they are sent. Community life is essential, with Jesuits living, praying, and working together. This global network provides support, collaboration, and opportunities for ministry that spans cultures and continents.',
      image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      imagePosition: 'right',
    },
    {
      id: 5,
      title: 'Education and Intellectual Life',
      content: 'Jesuits have a long tradition of excellence in education. From running schools and universities to engaging in research and scholarship, intellectual development is a cornerstone of Jesuit formation. Members are encouraged to pursue advanced degrees and to integrate faith with reason in all areas of study.',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      imagePosition: 'left',
    },
    {
      id: 6,
      title: 'Begin Your Discernment',
      content: 'Discernment is a process of prayer, reflection, and conversation. If you feel God may be calling you to the Jesuit life, we invite you to reach out to our Vocation Director. We offer discernment retreats, personal accompaniment, and opportunities to experience Jesuit community life. Take the first step today and explore if this path is right for you.',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      imagePosition: 'right',
    },
  ];

  // YouTube videos data
  const videos = [
    {
      id: 1,
      title: 'Introduction to Jesuit Life',
      videoId: 'dQw4w9WgXcQ', // Replace with actual YouTube video ID
      description: 'Discover what it means to be a Jesuit and the life of service that awaits.',
    },
    {
      id: 2,
      title: 'Jesuit Formation Process',
      videoId: 'dQw4w9WgXcQ', // Replace with actual YouTube video ID
      description: 'Learn about the stages of Jesuit formation and spiritual development.',
    },
    {
      id: 3,
      title: 'Testimonies from Young Jesuits',
      videoId: 'dQw4w9WgXcQ', // Replace with actual YouTube video ID
      description: 'Hear from young Jesuits about their calling and experiences.',
    },
  ];

   const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Become a Jesuit", path: "/become-a-jesuit" },
  ];

  return (
    <div className="min-h-screen bg-cream text-navy">
      {/* Header */}
      <header className="p-6 sm:ml-24 mt-24 -mb-10">
        <h1 className="sm:text-4xl text-2xl font-bold ">Become a Jesuit</h1>
        <p className=" text-sm mt-2 opacity-90">
          Answer the Call to Serve God and Others
        </p>
      </header>

      <Breadcrumb items={breadcrumbItems} />

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        
        {/* Content Sections - Small Image + Text */}
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
              {/* Small Image */}
              <div className="shrink-0">
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full md:w-[300px] h-[300px] object-cover rounded-lg shadow-md"
                />
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">{section.title}</h2>
                <p className="text-gray-700 text-base md:text-lg leading-relaxed">{section.content}</p>
              </div>
            </div>
          </motion.section>
        ))}

        {/* YouTube Videos Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-navy mb-8 text-center">
            Watch: Life as a Jesuit
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                {/* YouTube Video Embed */}
                <div className="relative pb-[56.25%] h-0">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${video.videoId}`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>

                {/* Video Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-navy mb-2">{video.title}</h3>
                  <p className="text-gray-600 text-sm">{video.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default BecomeJesuits;
