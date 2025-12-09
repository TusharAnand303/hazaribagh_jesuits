import React from 'react';
import { motion } from 'framer-motion';

const Blog = () => {
  // Blog sections data
  const blogSections = [
    {
      id: 1,
      title: 'Early Life and Medical Studies',
      content: 'Pedro Arrupe was born in Bilbao, Spain, on 14 November 1907. After receiving his bachelor\'s degree with the Piarists, he began his medical career. He studied medicine in Madrid for four years, with excellent results, while, at the same time, visiting the poor quarters of the city and getting to know firsthand situations of great need and misery.',
      image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      imagePosition: 'left',
    },
    {
      id: 2,
      title: 'Spiritual Awakening at Lourdes',
      content: 'His religious formation and temperament led him to ask many questions, such as, for example, questions about sickness and the physical and spiritual healing of persons. After a profound spiritual experience in Lourdes, France, he came to understand that the best way for him to respond to these realities was to abandon his earlier plans and to enter the Society of Jesus, which he did in 1927.',
      image: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      imagePosition: 'right',
    },
    {
      id: 3,
      title: 'Jesuit Formation and Ordination',
      content: 'During his years of formation, beginning in Loyola, he spent time in Spain (shortly before the Jesuits were expelled), Belgium, Holland, and the United States. He was ordained a priest in 1936. His formation period was marked by deep spiritual growth and intellectual development, preparing him for the challenging mission work that lay ahead.',
      image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      imagePosition: 'left',
    },
    {
      id: 4,
      title: 'Mission to Japan',
      content: 'After having made several requests, he was finally sent to Japan in 1938. From the start, he made efforts to adapt himself to the local culture. However, those were politically difficult years. Being a foreigner in a time of war, he was even accused of spying and imprisoned for several months.',
      image: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      imagePosition: 'right',
    },
    {
      id: 5,
      title: 'Witness to Hiroshima',
      content: 'In Hiroshima, where he was in charge of forming young Japanese Jesuits, he experienced the terrible atomic bomb explosion in August 1945. He responded by taking many of the wounded to his residence, where he cured and accompanied them. This experience profoundly shaped his understanding of human suffering and compassion.',
      image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      imagePosition: 'left',
    },
    {
      id: 6,
      title: 'Superior General of the Jesuits',
      content: 'In 1965, Pedro Arrupe was elected Superior General of the Society of Jesus. During his tenure, he emphasized the need for Jesuits to work for social justice and to stand with the poor and marginalized. His leadership transformed the Society and inspired countless Jesuits to live out their faith through action.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      imagePosition: 'right',
    },
  ];

  // YouTube videos data
  const videos = [
    {
      id: 1,
      title: 'Pedro Arrupe: Life and Legacy',
      videoId: 'dQw4w9WgXcQ', // Replace with actual YouTube video ID
      description: 'Documentary about the life and work of Pedro Arrupe SJ.',
    },
    {
      id: 2,
      title: 'Witness to Hiroshima',
      videoId: 'dQw4w9WgXcQ', // Replace with actual YouTube video ID
      description: 'Pedro Arrupe\'s experience during the atomic bombing of Hiroshima.',
    },
    {
      id: 3,
      title: 'Faith That Does Justice',
      videoId: 'dQw4w9WgXcQ', // Replace with actual YouTube video ID
      description: 'Arrupe\'s vision for a faith that does justice in the modern world.',
    },
  ];

  return (
    <div className="min-h-screen bg-cream text-navy">
      {/* Header */}
      <header className="bg-primary text-white p-4 shadow-md mt-24">
        <h1 className="text-3xl font-bold text-center">Hazaribag Jesuits Blog</h1>
        <p className="text-center text-sm mt-2 opacity-90">
          Stories, Reflections, and News from the Jesuit Community
        </p>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
       

        {/* Content Sections - Small Image + Text */}
        {blogSections.map((section, index) => (
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
              <div className="hrink-0">
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full md:w-[300px] h-[300px] object-cover rounded-lg shadow-md"
                />
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-bold text-navy mb-4">{section.title}</h3>
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
            Watch: Pedro Arrupe Documentary
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

        {/* Quote Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white rounded-lg shadow-lg p-8 text-center border-l-4 border-secondary">
            <svg
              className="w-12 h-12 text-secondary mx-auto mb-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="text-2xl text-navy font-serif italic mb-4">
              "Nothing is more practical than finding God, that is, than falling in love in a quite absolute, final way."
            </p>
            <p className="text-gray-600">— Pedro Arrupe SJ</p>
          </div>
        </motion.section>

        {/* Related Articles */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold text-navy mb-8 text-center">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'St. Ignatius of Loyola',
                excerpt: 'The founder of the Society of Jesus and his vision...',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                category: 'History',
              },
              {
                title: 'Jesuit Spirituality',
                excerpt: 'Finding God in all things through Ignatian spirituality...',
                image: 'https://images.unsplash.com/photo-1501139083538-0139583c060f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                category: 'Spirituality',
              },
              {
                title: 'Social Justice Mission',
                excerpt: 'The Jesuit commitment to faith that does justice...',
                image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                category: 'Mission',
              },
            ].map((article, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <span className="inline-block bg-secondary text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    {article.category}
                  </span>
                  <h3 className="text-xl font-bold text-navy mb-2">{article.title}</h3>
                  <p className="text-gray-600 text-sm">{article.excerpt}</p>
                  <button className="mt-4 text-primary font-semibold text-sm hover:underline">
                    Read More →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default Blog;
