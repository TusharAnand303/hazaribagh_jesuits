import React from 'react';
import { motion } from 'framer-motion';
import Breadcrumb from '../components/Breadcrumb';
import h5 from '../assets/images/web_images/h5.jpeg';
import h6 from '../assets/images/web_images/h6.jpeg';
import h7 from '../assets/images/web_images/h7.jpeg';
import h8 from '../assets/images/web_images/h8.jpeg';

const Foundation = () => {
  
  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Foundation History", path: "/foundation" },
  ];

  return (
    <div className="min-h-screen bg-cream text-navy">
      {/* Header */}
      <header className="p-4 sm:p-6 mt-20 sm:mt-24 sm:ml-24 -mb-6 sm:-mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          Foundation of Hazaribag Jesuit Mission
        </h1>
        <p className="text-start text-xs sm:text-sm mt-2 opacity-90">
          A Mission Born from Faith and Collaboration
        </p>
      </header>
      <Breadcrumb items={breadcrumbItems} />

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-xl overflow-hidden"
        >

          {/* Content */}
          <div className="p-4 sm:p-6 md:p-8 lg:p-12 max-w-5xl mx-auto">
            
            {/* Introduction */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-8 sm:mb-12"
            >
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg mb-4 sm:mb-6">
                In May, 1949, Fr. Janssens, the Jesuit Superior General wrote to Fr. Kelly, 
                the Jesuit Vice Provincial of Australia, suggesting the Australian Vice Province 
                could send men to help in the Ranchi Mission and in July 1949, Fr. Kelly replied 
                saying all his advisors agreed to take up this mission.
              </p>
            </motion.section>

            {/* Image Collage */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 sm:mb-12"
            >
              {/* Landscape Image First (h5) */}
              <div className="mb-3 sm:mb-4 md:mb-5">
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                  className="relative rounded-lg sm:rounded-xl overflow-hidden shadow-lg group bg-gray-100"
                >
                  <img
                    src={h5}
                    alt="Foundation of Hazaribag Jesuit Mission"
                    className="w-full h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72 object-contain bg-gray-100 transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-navy/70 via-transparent to-transparent pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5 lg:p-6 bg-linear-to-t from-navy/90 to-transparent">
                    <p className="text-white text-sm sm:text-base md:text-lg font-semibold">
                      The Beginning of the Mission
                    </p>
                    <p className="text-white text-xs sm:text-sm opacity-90">1949 - The Foundation Years</p>
                  </div>
                </motion.div>
              </div>

              {/* Three Portrait Images in a Row (h6, h7, h8) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
                
                {/* Image h6 - Portrait */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                  className="relative rounded-lg sm:rounded-xl overflow-hidden shadow-lg group bg-gray-100"
                >
                  <img
                    src={h6}
                    alt="First Jesuits arrival"
                    className="w-full h-56 sm:h-64 md:h-72 lg:h-80 object-contain bg-gray-100 transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-navy/70 via-transparent to-transparent pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-linear-to-t from-navy/90 to-transparent">
                    <p className="text-white text-xs sm:text-sm font-semibold">
                      Arrival from Australia
                    </p>
                    <p className="text-white text-[10px] sm:text-xs opacity-90">February 1951</p>
                  </div>
                </motion.div>

                {/* Image h7 - Portrait */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                  className="relative rounded-lg sm:rounded-xl overflow-hidden shadow-lg group bg-gray-100"
                >
                  <img
                    src={h7}
                    alt="Balmoral house purchase"
                    className="w-full h-56 sm:h-64 md:h-72 lg:h-80 object-contain bg-gray-100 transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-navy/70 via-transparent to-transparent pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-linear-to-t from-navy/90 to-transparent">
                    <p className="text-white text-xs sm:text-sm font-semibold">
                      Balmoral House
                    </p>
                    <p className="text-white text-[10px] sm:text-xs opacity-90">July 1951</p>
                  </div>
                </motion.div>

                {/* Image h8 - Portrait */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                  className="relative rounded-lg sm:rounded-xl overflow-hidden shadow-lg group bg-gray-100 sm:col-span-2 md:col-span-1"
                >
                  <img
                    src={h8}
                    alt="St. Xavier's School opening"
                    className="w-full h-56 sm:h-64 md:h-72 lg:h-80 object-contain bg-gray-100 transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-navy/70 via-transparent to-transparent pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-linear-to-t from-navy/90 to-transparent">
                    <p className="text-white text-xs sm:text-sm font-semibold">
                      St. Xavier's Opens
                    </p>
                    <p className="text-white text-[10px] sm:text-xs opacity-90">January 1952</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* The First Steps */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-8 sm:mb-12"
            >
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-1 sm:w-2 h-8 sm:h-12 bg-secondary rounded mr-2 sm:mr-4"></div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-navy">The First Steps</h2>
              </div>
              
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg mb-3 sm:mb-4">
                The first six were chosen and sailed from Melbourne on 6th February, 1951, arriving 
                in Ranchi on 28th February to begin Hindi studies.
              </p>

              <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">
                After various suggestions on starting schools in different places, it was finally 
                decided to start an English medium school in Hazaribag. In July 1951, a large house 
                called Balmoral on five acres of land was bought for the proposed school and in 
                September 1951 John Moore was informed that he was to be the principal of the school 
                which should be opened in January 1952! There was good news that Br. Nicolai Bilic s.j. 
                expert carpenter and all trades person who was working in the Kolkata mission was 
                transferred to Hazaribag to help build the school.
              </p>
            </motion.section>

            {/* Opening of St. Xavier's */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-8 sm:mb-12"
            >
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-1 sm:w-2 h-8 sm:h-12 bg-secondary rounded mr-2 sm:mr-4"></div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-navy">Opening of St. Xavier's</h2>
              </div>

              <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg mb-3 sm:mb-4">
                Hectic work by John Moore getting materials, making out a syllabus, appointing staff 
                resulted in St. Xavier's School opening for boarders on Sunday 27th January 1952 and 
                on 28th January classes began with 22 boarders and 15 dayscholars. There were four 
                standards, 3, 4, 5, 6 and the boys ages were from eight to fourteen. By the end of 
                the year, there were 70 boarders and thirty day scholars.
              </p>

              <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">
                After experience in other parishes, in 1953 Fr. Lou Lachal was appointed parish 
                priest of Mahuadanr and Fr. Kevin Grogan parish priest of Hazaribag. Fr. Lou had as 
                one of his main catechists Philip Xaxa, the father of Br. Francis Xaxa s.j. The 
                proposal to raise St. Joseph's middle school to high school level was not approved 
                by the Ranchi mission superior to the disappointment of many in the Chechari. 
                Disappointed by the decision, the government decided to open a welfare department 
                high school.
              </p>
            </motion.section>

            {/* Timeline Summary */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mb-6 sm:mb-8"
            >
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-1 sm:w-2 h-8 sm:h-12 bg-secondary rounded mr-2 sm:mr-4"></div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-navy">Timeline</h2>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {/* 1949 */}
                <div className="bg-amber-50 border-l-2 sm:border-l-4 border-secondary p-4 sm:p-6 rounded-r-lg">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-navy mb-2 sm:mb-3">1949</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-secondary font-bold mr-2 sm:mr-3 text-xs sm:text-sm">•</span>
                      <span className="text-gray-700 leading-relaxed text-xs sm:text-sm lg:text-base">
                        <strong>May 1949:</strong> Fr. Janssens, Jesuit Superior General, wrote to 
                        Fr. Kelly (Jesuit Vice Provincial of Australia) suggesting that the Australian 
                        Vice Province could send men to help in the Ranchi Mission.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary font-bold mr-2 sm:mr-3 text-xs sm:text-sm">•</span>
                      <span className="text-gray-700 leading-relaxed text-xs sm:text-sm lg:text-base">
                        <strong>July 1949:</strong> Fr. Kelly replied, confirming that all his advisors 
                        agreed to take up this mission.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* 1951 */}
                <div className="bg-amber-50 border-l-2 sm:border-l-4 border-secondary p-4 sm:p-6 rounded-r-lg">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-navy mb-2 sm:mb-3">1951</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-secondary font-bold mr-2 sm:mr-3 text-xs sm:text-sm">•</span>
                      <span className="text-gray-700 leading-relaxed text-xs sm:text-sm lg:text-base">
                        <strong>6 February:</strong> The first six Jesuits sailed from Melbourne.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary font-bold mr-2 sm:mr-3 text-xs sm:text-sm">•</span>
                      <span className="text-gray-700 leading-relaxed text-xs sm:text-sm lg:text-base">
                        <strong>28 February 1951:</strong> They arrived in Ranchi to begin Hindi studies.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary font-bold mr-2 sm:mr-3 text-xs sm:text-sm">•</span>
                      <span className="text-gray-700 leading-relaxed text-xs sm:text-sm lg:text-base">
                        <strong>July 1951:</strong> A large house called Balmoral on five acres of land 
                        was purchased in Hazaribag for the proposed English medium school.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary font-bold mr-2 sm:mr-3 text-xs sm:text-sm">•</span>
                      <span className="text-gray-700 leading-relaxed text-xs sm:text-sm lg:text-base">
                        <strong>September 1951:</strong> John Moore was informed he would be the principal 
                        of the school, scheduled to open in January 1952. Around this time, Br. Nicolai 
                        Bilic s.j., an expert carpenter and tradesman from the Kolkata mission, was 
                        transferred to Hazaribag to help build the school.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* 1952 */}
                <div className="bg-amber-50 border-l-2 sm:border-l-4 border-secondary p-4 sm:p-6 rounded-r-lg">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-navy mb-2 sm:mb-3">1952</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-secondary font-bold mr-2 sm:mr-3 text-xs sm:text-sm">•</span>
                      <span className="text-gray-700 leading-relaxed text-xs sm:text-sm lg:text-base">
                        <strong>27 January 1952 (Sunday):</strong> St. Xavier's School opened for boarders.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary font-bold mr-2 sm:mr-3 text-xs sm:text-sm">•</span>
                      <span className="text-gray-700 leading-relaxed text-xs sm:text-sm lg:text-base">
                        <strong>28 January 1952:</strong> Classes began with 22 boarders and 15-day scholars.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary font-bold mr-2 sm:mr-3 text-xs sm:text-sm">•</span>
                      <span className="text-gray-700 leading-relaxed text-xs sm:text-sm lg:text-base">
                        <strong>By the end of 1952:</strong> The school had grown to 70 boarders and 30-day 
                        scholars, covering four standards (3–6) for boys aged 8–14.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.section>

          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Foundation;
