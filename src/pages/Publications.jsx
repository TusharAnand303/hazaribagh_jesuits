import React from 'react';
import { motion } from 'framer-motion';

const Publications = () => {
  // Sample data (can be fetched from admin panel)
  const publications = [
    {
      id: 1,
      name: 'Jesuit Press',
      title: 'Annual Report 2025',
      description:
        'A comprehensive review of our activities and achievements in 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      image: 'https://via.placeholder.com/300x200',
    },
    {
      id: 2,
      name: 'Jesuit Research',
      title: 'Research Paper on Education',
      description:
        'Exploring new methodologies in Jesuit education for better outcomes. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      image: 'https://via.placeholder.com/300x200',
    },
    {
      id: 3,
      name: 'Spiritual Publications',
      title: 'Spiritual Retreat Guide',
      description:
        'A guidebook for spiritual retreats and reflection sessions. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      image: 'https://via.placeholder.com/300x200',
    },
  ];

  // Function to truncate description after 5 lines
  const truncateDescription = (text, lines = 5) => {
    const words = text.split(' ');
    const truncated = [];
    let currentLine = '';
    let lineCount = 0;

    for (const word of words) {
      if (currentLine.length + word.length + 1 > 30) {
        truncated.push(currentLine.trim());
        currentLine = word;
        lineCount++;
        if (lineCount >= lines) break;
      } else {
        currentLine += ' ' + word;
      }
    }

    if (lineCount < lines && currentLine.trim()) {
      truncated.push(currentLine.trim());
    }

    return truncated.join(' ') + (lineCount >= lines ? '...' : '');
  };

  return (
    <div className="min-h-screen bg-cream text-navy">
      {/* Header */}
      <header className="bg-primary text-white p-4 shadow-md mt-24">
        <h1 className="text-3xl font-bold text-center items-center">Publications</h1>
      </header>

      {/* Main Content with Top Margin */}
      <main className="container mx-auto p-6 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publications.map((pub, index) => (
            <motion.div
              key={pub.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer"
              style={{ height: '400px' }}
              onClick={() => {
                // Handle card click (e.g., navigate or open modal)
                alert(`Clicked on ${pub.title}`);
              }}
            >
              <img
                src={pub.image}
                alt={pub.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 flex flex-col h-52">
                <h3 className="text-lg font-medium text-secondary mb-1">{pub.name}</h3>
                <h2 className="text-xl font-semibold text-secondary mb-2">{pub.title}</h2>
                <p className="text-gray-600 line-clamp-5">
                  {truncateDescription(pub.description, 5)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
     
    </div>
  );
};

export default Publications;
