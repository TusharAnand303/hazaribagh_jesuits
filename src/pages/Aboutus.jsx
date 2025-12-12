import React from "react";
import { motion } from "framer-motion";
import Breadcrumb from "../components/Breadcrumb";
import aboutImg from "../assets/images/about_us.jpg";
import indiaMap from "../assets/images/india_map.jpg";
import hazaribagMap from "../assets/images/hz_map.jpg";

const Aboutus = () => {
  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/aboutus" },
  ];

  return (
    <div className="min-h-screen bg-cream text-navy">
      <header className="p-6 mt-24 sm:ml-24 -mb-10">
        <h1 className="sm:text-4xl text-2xl font-bold">About Us</h1>
        <p className="text-start text-sm mt-2 opacity-90">
          The Jesuits are a religious order committed to the service of Christ
          and His people.
        </p>
      </header>

      <Breadcrumb items={breadcrumbItems} />

      <main className="container mx-auto px-6 py-12">
        {/* TOP HERO IMAGE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-lg overflow-hidden mb-12 flex justify-center"
        >
          <img
            src={aboutImg}
            className="w-full max-w-4xl rounded-xl shadow-lg"
            alt="About us"
          />
        </motion.div>

        {/* HISTORY */}
        <motion.div
          className="bg-white p-8 rounded-xl shadow-lg mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">
            History of Hazaribag Jesuits
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            In May 1949, Father General Jean-Baptist Janssens wrote to Father
            Austin Kelly, the Vice-Provincial of Australia, requesting him to
            take up a mission in the two districts of Ranchi Mission: Hazaribag
            and Palamu.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            This mission began during the Second World War when resources at the
            Ranchi mission were overstretched. Over time, the Hazaribag mission
            grew into a strong and vibrant Province.
          </p>
        </motion.div>

        {/* SOCIETY OF JESUS SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <motion.div
            className="bg-white p-8 rounded-xl shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h3 className="text-2xl font-bold mb-4">Society of Jesus</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Society of Jesus is a worldwide Roman Catholic religious order
              founded by St. Ignatius of Loyola. Jesuits are known for their
              emphasis on education, spiritual depth, and missionary work.
            </p>

            <h3 className="text-2xl font-bold mt-6 mb-4">
              History of the Province
            </h3>
            <p className="text-gray-700 leading-relaxed">
              In the 19th century, Hazaribag was under the diocese of Kolkata.
              In 1847, the Capuchins began serving the region, followed by
              further missionary expansion in the 20th century.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <img
              src={aboutImg}
              alt="Society of Jesus"
              className="rounded-xl shadow-lg"
            />
          </motion.div>
        </div>

        {/* MAP + VISION + MISSION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <motion.div
            className="bg-white p-8 rounded-xl shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <img
              src={hazaribagMap}
              className="rounded-xl shadow mb-4"
              alt="Hazaribag Province Map"
            />
          </motion.div>

          <motion.div
            className="bg-white p-8 rounded-xl shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h3 className="text-2xl font-bold mb-4">Vision Statement</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              The educational ministry of the Hazaribag Province envisions
              holistic development rooted in justice, faith, and service.
            </p>

            <h3 className="text-2xl font-bold mb-4">Mission Statement</h3>
            <p className="text-gray-700 leading-relaxed">
              The mission of the Hazaribag Province is to provide quality
              education preferentially to the poor and the marginalized, forming
              men and women for others.
            </p>
          </motion.div>
        </div>

        {/* PROVINCIAL LIST + INDIA MAP RIGHT SIDE */}
        <motion.div
          className="bg-white p-8 rounded-xl shadow-lg mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* LEFT SIDE LIST */}
            <div>
              <h2 className="text-3xl font-bold mb-6">
                List of Regional Superiors And Provincials
              </h2>

              <ul className="list-disc ml-6 text-gray-700 leading-relaxed">
                <li>1951 – 1956 : Fr. Phil McInerney</li>
                <li>1956 – 1962 : Fr. Austin Kelly</li>
                <li>1962 – 1968 : Fr. Edward O’Connor</li>
                <li>1968 – 1974 : Fr. Maurice Dullard</li>
                <li>1974 – 1980 : Fr. Bernard Donnelly</li>
                <li>1980 – 1986 : Fr. Phillip Crotty</li>
                <li>1986 – 1992 : Fr. R. C. Cacko</li>
                <li>1992 – 1998 : Fr. Edward Mudavassery</li>
                <li>1998 – 2004 : Fr. Gaudentius Kongari</li>
                <li>2004 – 2010 : Fr. Thomas Vennad</li>
                <li>2010 – 2016 : Fr. Francis Kurien</li>
                <li>2016 – present : Fr. Santosh Minj</li>
              </ul>
            </div>

            {/* RIGHT SIDE INDIA MAP */}
            <div className="flex justify-center items-start">
              <img
                src={indiaMap}
                className="rounded-xl shadow-lg w-3/4 lg:w-2/3"
                alt="Jesuits in India"
              />
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Aboutus;
