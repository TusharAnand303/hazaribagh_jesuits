import React from 'react';
import { motion } from 'framer-motion';
import Breadcrumb from '../components/Breadcrumb';
import contactUs from '../assets/images/contact_us.jpg';   // ✅ Correct image import

const Contactus = () => {

  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "About / Contact Us", path: "about/contactus" },
  ];

  return (
    <div className="min-h-screen bg-cream text-navy">
      
      <header className="p-6 mt-24 sm:ml-24 -mb-10">
        <h1 className="sm:text-4xl text-2xl font-bold">Contact Us</h1>
        <p className="text-start text-sm mt-2 opacity-90">
          Details for key Province contacts.
        </p>
      </header>

      <Breadcrumb items={breadcrumbItems} />

      <main className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-xl overflow-hidden p-8 lg:p-12 max-w-6xl mx-auto"
        >

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* LEFT SIDE – Contact Details */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Arrupe Niwas, Jesuit Provincialate</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Holy Cross Marg<br />
                P O Box 6, Hazaribag P.O & Dt. Jharkhand 825301 India<br />
                <b>Tel:</b> +91 6546 223768 / 223731<br />
                <b>Mobile:</b> 091 99108948, 9430188487<br />
                <b>Email:</b> hazprovincial@gmail.com<br />
                <b>Personal:</b> mihsanssth14@gmail.com
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Curia Hazaribag</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Arrupe Niwas, Holy Cross Marg<br />
                Hazaribag P.O & Dt. Jharkhand 825301<br />
                <b>Email:</b> hazprovincial@gmail.com<br />
                <b>Mobile:</b> 091 99108948, 9430188487
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Get Involved</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Arrupe Niwas, Holy Cross Marg<br />
                Hazaribag P.O & Dt. Jharkhand 825301<br />
                <b>Tel:</b> +91 6546 223672 / 223731<br />
                <b>Mobile:</b> 091 99108948<br />
                <b>Email:</b> hazprovincial@gmail.com<br />
                <b>Social:</b> hazcozsj@gmail.com
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Becoming a Jesuit</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                1) Vivek Sadan, Shahpur, Palamu Dt. Jharkhand – 822113<br />
                <b>Mobile:</b> 9470134490, 8809991585<br />
                <b>Email:</b> arbindjes@gmail.com
              </p>

              <p className="text-gray-700 leading-relaxed">
                2) St. Stanislaus College, Sitagarh, Hazaribag – 825301<br />
                <b>Mobile:</b> 091 99197048<br />
                <b>Email:</b> anilandi@gmail.com
              </p>
            </div>

            {/* RIGHT SIDE – Infographic IMAGE */}
            <div className="flex justify-center">
              <img
                src={contactUs}
                alt="Contact Us"
                className="rounded-lg shadow-lg max-w-full"
              />
            </div>

          </div>

        </motion.div>
      </main>
    </div>
  );
};

export default Contactus;
