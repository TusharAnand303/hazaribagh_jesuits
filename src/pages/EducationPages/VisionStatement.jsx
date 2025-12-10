import React from 'react';
import { motion } from 'framer-motion';
import Breadcrumb from '../../components/Breadcrumb';
import { FiEye, FiTarget } from 'react-icons/fi';

const VisionStatement = () => {
  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Education", path: "/education" },
  ];

  const missionPoints = [
    "give quality education to all our students, preferentially to those who are poor and marginalized,",
    "instil in our better off students a real love and concern for the poor,",
    "foster in our students, staff and parents a sensitivity and openness to our multi-religious and multicultural context and an attitude of care for the environment,",
    "share our cherished Jesuit tradition with the staff to enable them to accompany the students in their growth,",
    "invite our alumni/ae and guardians to be partners in our educational mission,",
    "encourage educational research, and",
    "collaborate and network with the dioceses, other religious, lay persons, government and other educational bodies for the promotion of our educational mission."
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-cream to-white text-navy">
      {/* Header */}
      <header className="p-6 pt-10 sm:ml-24 -mb-10">
        <h1 className="sm:text-4xl text-2xl font-bold">Education</h1>
      </header>
      <Breadcrumb items={breadcrumbItems} />

      {/* Vision & Mission Section */}
      <div className=" mx-auto -mt-10 px-2 sm:px-8 lg:px-24 py-12">
        {/* Section Title */}
        <header className="sm:p-6 p-4">
          <h1 className="sm:text-4xl text-2xl font-bold">Vison & Mission</h1>
        </header>

        {/* Vision Statement Card */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="mb-8"
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-linear-to-br from-primary to-navy rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <motion.div
                className="shrink-0 w-14 h-14 bg-secondary rounded-full flex items-center justify-center shadow-lg"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <FiEye className="w-7 h-7 text-white" />
              </motion.div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-secondary mb-4">
                  VISION STATEMENT
                </h3>
                <p className="text-cream leading-relaxed text-base">
                  Educational Ministry of the Hazaribag Province envisions the integral growth of our students which will transform them to be men and women for and with others as persons of competence, conscience, and compassion, committed to building a just society.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Mission Statement Card */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200"
          >
            <div className="flex items-start gap-4 mb-6">
              <motion.div
                className="shrink-0 w-14 h-14 bg-linear-to-br from-primary to-navy rounded-full flex items-center justify-center shadow-lg"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <FiTarget className="w-7 h-7 text-white" />
              </motion.div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-primary mb-2">
                  MISSION STATEMENT
                </h3>
                <p className="text-navy font-medium text-base">
                  The Educational Mission of Hazaribag Province is to:
                </p>
              </div>
            </div>

            {/* Mission Points */}
            <motion.ol
              className="space-y-4 ml-4"
              variants={containerVariants}
            >
              {missionPoints.map((point, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  className="flex gap-4 group"
                >
                  <span className="shrink-0 w-8 h-8 bg-linear-to-br from-secondary to-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md group-hover:scale-110 transition-transform duration-300">
                    {String.fromCharCode(97 + index)}
                  </span>
                  <p className="flex-1 text-navy leading-relaxed text-base pt-1">
                    {point}
                  </p>
                </motion.li>
              ))}
            </motion.ol>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default VisionStatement;
