import React from 'react';
import { motion } from 'framer-motion';
import Breadcrumb from '../components/Breadcrumb';

const SupportUs = () => {
  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Support Us", path: "/about/supportus" },
  ];

  return (
    <div className="min-h-screen bg-cream text-navy">
      <header className="p-6 mt-24 sm:ml-24 -mb-10">
        <h1 className="sm:text-4xl text-2xl font-bold">Support us</h1>
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
            
            {/* LEFT SIDE – Support Areas */}
            <div className="space-y-6">
              
               <div className="p-6 bg-cream/50 rounded-lg border-l-4 border-navy">
                <p className="text-gray-700 leading-relaxed text-lg"> In formation of a Jesuit Scholastics : seminary expenses on religious studies</p>
              </div>
             
              <div className="p-6 bg-cream/50 rounded-lg border-l-4 border-navy">
                <p className="text-gray-700 leading-relaxed text-lg">In Carig the sick and old priests</p>
              </div>

              <div className="p-6 bg-cream/50 rounded-lg border-l-4 border-navy">
                <p className="text-gray-700 leading-relaxed text-lg">In educating Marginalized women and children</p>
              </div>

              <div className="p-6 bg-cream/50 rounded-lg border-l-4 border-navy">
                <p className="text-gray-700 leading-relaxed text-lg">Educational scholarship to Korwa and Nagesia children</p>
              </div>
            </div>

            {/* RIGHT SIDE – Contact Information */}
            <div className="lg:sticky lg:top-12 self-start">
              <div className="bg-gradient-to-br from-navy to-slate-800 text-white p-8 rounded-xl shadow-2xl">
                <h2 className="text-2xl font-bold mb-6 text-center">Contact us</h2>
                
                <div className="space-y-4 text-lg">
                  <div className="address font-semibold text-center">
                    <p>Arrupe Niwas, P.O. Box 6</p>
                    <p>Holy Cross Marg</p>
                    <p>Hazaribag P.O. & Dt</p>
                    <p><strong>Jharkhand 825301 India</strong></p>
                  </div>
                  
                  <div className="text-center py-4">
                    <p className="text-2xl font-bold mb-2">Phn : 06546 296119</p>
                    <a 
                      href="https://www.hazaribagjesuits.org" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block bg-white text-navy font-bold py-3 px-8 rounded-lg hover:bg-cream transition-all duration-300 shadow-lg hover:shadow-xl mt-4"
                    >
                      www.hazaribagjesuits.org
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default SupportUs;
