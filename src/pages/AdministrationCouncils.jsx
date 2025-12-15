import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUser, FiBriefcase, FiX } from "react-icons/fi";
import Breadcrumb from "../components/Breadcrumb";

const fallbackImage =
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=600";

/* ================= ANIMATION VARIANTS ================= */
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const AdministrationCouncils = () => {
  const [groups, setGroups] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/administrative-members`)
      .then((res) => res.json())
      .then((data) => setGroups(data.data || []));
  }, []);

  const stripHtml = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html || "";
    return div.textContent || "";
  };

  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Administration Councils", path: "/administration-councils" },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-cream via-white to-cream text-navy">
      {/* HEADER */}
      <header className="mt-24 px-6 sm:ml-24">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-extrabold bg-linear-to-r from-navy to-primary bg-clip-text text-transparent"
        >
          Administration Councils
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 mt-2"
        >
          Leadership & Governance of the Province
        </motion.p>
      </header>

      <Breadcrumb items={breadcrumbItems} />

      {/* CONTENT */}
      <main className="container mx-auto px-6 py-16 space-y-24">
        {groups.map((group, gIndex) => (
          <section key={gIndex}>
            {/* SECTION TITLE */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <h2 className="text-2xl font-bold tracking-wide">
                {group.administrative_type}
              </h2>
              <div className="mx-auto mt-4 h-1 w-28 bg-primary rounded-full" />
            </motion.div>

            {/* CARDS */}
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {group.members.map((member) => (
                <motion.div
                  key={member.id}
                  variants={item}
                  onClick={() => setSelectedMember(member)}
                  className="group cursor-pointer relative bg-white rounded-3xl shadow-lg overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition-all duration-500"
                >
                  {/* Glow */}
                  <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Image */}
                  <div className="aspect-[4/3] bg-gray-50 flex items-center justify-center p-5">
                    <img
                      src={member.image_url || fallbackImage}
                      alt={member.member_name}
                      className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 relative z-10">
                    <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
                      <FiUser className="text-primary" />
                      {member.member_name}
                    </h3>

                    <p className="text-secondary font-semibold flex items-center gap-2 mb-3">
                      <FiBriefcase />
                      {member.member_designation}
                    </p>

                    <p className="text-sm text-gray-600 line-clamp-2">
                      {stripHtml(member.member_desc)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>
        ))}
      </main>

      {/* ================= MODAL ================= */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ y: 50, scale: 0.9, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 50, scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white/90 backdrop-blur-xl rounded-3xl max-w-xl w-full overflow-hidden relative shadow-2xl"
            >
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
              >
                <FiX size={22} />
              </button>

              <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center p-6">
                <img
                  src={selectedMember.image_url || fallbackImage}
                  alt={selectedMember.member_name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold mb-1">
                  {selectedMember.member_name}
                </h3>
                <p className="text-primary font-semibold mb-4">
                  {selectedMember.member_designation}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {stripHtml(selectedMember.member_desc)}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdministrationCouncils;
