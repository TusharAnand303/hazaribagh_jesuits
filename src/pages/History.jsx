import React from 'react';
import { motion } from 'framer-motion';
import Breadcrumb from '../components/Breadcrumb';
import h1 from '../assets/images/web_images/h1.jpeg';
import h2 from '../assets/images/web_images/h2.jpeg';
import h3 from '../assets/images/web_images/h3.jpeg';
import h4 from '../assets/images/web_images/h4.jpeg';

const History = () => {
  
  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "History", path: "/history" },
  ];

  return (
    <div className="min-h-screen bg-cream text-navy">
      {/* Header */}
      <header className="p-4 sm:p-6 mt-20 sm:mt-24 sm:ml-24 -mb-6 sm:-mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">History of Hazaribag Province</h1>
        <p className="text-start text-xs sm:text-sm mt-2 opacity-90">
          A Journey of Faith, Service, and Dedication
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
                In May 1949 Father General Jean-Baptist Janssens wrote to Father Austin Kelly, the
                Vice-Provincial of Australia asking him to take up a mission in the two Districts of
                the Ranchi Mission, Hazaribag and Palamu. This came about because during the Second
                World War and in the years that followed, the resources of the Ranchi mission were
                overstretched. Already the Ranchi Mission had in 1948 ceded a large southern area to
                the SVD Fathers, and in 1951 an area of the then Madhya Pradesh to form the new
                diocese of Raigarh-Ambikapur, and later the Province of Madhya Pradesh.
              </p>
            </motion.section>

            {/* Image Collage */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 sm:mb-12"
            >
              {/* Three Portrait Images in a Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5 mb-3 sm:mb-4 md:mb-5">
                
                {/* Image 1 - Portrait */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                  className="relative rounded-lg sm:rounded-xl overflow-hidden shadow-lg group bg-gray-100"
                >
                  <img
                    src={h1}
                    alt="Historical foundation of Hazaribag Province"
                    className="w-full h-56 sm:h-64 md:h-72 lg:h-80 object-contain bg-gray-100 transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-navy/70 via-transparent to-transparent pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-linear-to-t from-navy/90 to-transparent">
                    <p className="text-white text-xs sm:text-sm font-semibold">
                      The Foundation Years
                    </p>
                    <p className="text-white text-[10px] sm:text-xs opacity-90">1949 - 1951</p>
                  </div>
                </motion.div>

                {/* Image 2 - Portrait */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                  className="relative rounded-lg sm:rounded-xl overflow-hidden shadow-lg group bg-gray-100"
                >
                  <img
                    src={h2}
                    alt="Growth and development of the Province"
                    className="w-full h-56 sm:h-64 md:h-72 lg:h-80 object-contain bg-gray-100 transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-navy/70 via-transparent to-transparent pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-linear-to-t from-navy/90 to-transparent">
                    <p className="text-white text-xs sm:text-sm font-semibold">
                      Becoming a Province
                    </p>
                    <p className="text-white text-[10px] sm:text-xs opacity-90">1992</p>
                  </div>
                </motion.div>

                {/* Image 3 - Portrait */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                  className="relative rounded-lg sm:rounded-xl overflow-hidden shadow-lg group bg-gray-100 sm:col-span-2 md:col-span-1"
                >
                  <img
                    src={h3}
                    alt="Educational institutions and development"
                    className="w-full h-56 sm:h-64 md:h-72 lg:h-80 object-contain bg-gray-100 transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-navy/70 via-transparent to-transparent pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-linear-to-t from-navy/90 to-transparent">
                    <p className="text-white text-xs sm:text-sm font-semibold">
                      Educational Excellence
                    </p>
                    <p className="text-white text-[10px] sm:text-xs opacity-90">Expanding Mission</p>
                  </div>
                </motion.div>
              </div>

              {/* Image 4 - Landscape (Full width) */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-lg sm:rounded-xl overflow-hidden shadow-lg group bg-gray-100"
              >
                <img
                  src={h4}
                  alt="Modern day service and community work"
                  className="w-full h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72 object-contain bg-gray-100 transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-navy/70 via-transparent to-transparent pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5 lg:p-6 bg-linear-to-t from-navy/90 to-transparent">
                  <p className="text-white text-sm sm:text-base md:text-lg font-semibold">
                    Serving Communities Today
                  </p>
                  <p className="text-white text-xs sm:text-sm opacity-90">Working in 7 districts of Jharkhand</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Tilling and Seeding */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-8 sm:mb-12"
            >
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-1 sm:w-2 h-8 sm:h-12 bg-secondary rounded mr-2 sm:mr-4"></div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-navy">Tilling and Seeding</h2>
              </div>
              
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg mb-3 sm:mb-4">
                At the same time the bishop of Ranchi, (who was to be transferred to the new diocese
                of Raigarh-Ambikapur) Oscar Sevrin SJ, had made an appeal to Rome. He cited some
                reasons for getting help from another Province. He cited the newly developing
                industrial areas of Hazaribag needed new men. The new missionaries would need to be
                financially independent of Ranchi. He also pointed to the need for English speaking
                Jesuits to open a quality English medium school in either Hazaribag or Bokaro to deal
                with the new middle class an industrial area produces. This was what we now call
                Bokaro Thermal. Bokaro Steel was still far in the future. In the event Hazaribag won
                out, and St Xavier's opened in Hazaribag in February 1952.
              </p>

              <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">
                By 1950 the Australian Province had accepted the mission and at the beginning of 1951
                six priests were missioned to what began to be called the Hazaribag Mission, to work
                alongside the Belgian Jesuits with a view to accepting full responsibility for the
                two Districts.
              </p>
            </motion.section>

            {/* Sprouting and Rooting */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-8 sm:mb-12"
            >
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-1 sm:w-2 h-8 sm:h-12 bg-secondary rounded mr-2 sm:mr-4"></div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-navy">Sprouting and Rooting</h2>
              </div>

              <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg mb-3 sm:mb-4">
                The Hazaribag mission grew into its own identity, was declared a Region in 1957 and a
                Province in 1992. The year 1992 was a turning point in the history of the Hazaribag
                mission. In March Fr. R.C.Chacko finished his term as the last Superior of the
                Region, and Fr. Edward Mudavassery was appointed the first Provincial of the new
                Province. At the same time the Ranchi Province handed over the whole property of St
                Stanislaus College, Sitagarha, to the new born Province to become the Hazaribag
                Province's novitiate and Juniorate. The Hazaribag Mission had come of age, Indianised
                in its governance and with an increasing number of Indian born personnel. The
                Australian baby had grown into an adult Indian.
              </p>

              <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg mb-3 sm:mb-4">
                Within a few years Fr. General was to decide that the Hazaribag Province could
                financially stand on its own feet with sufficient funds to be able to help other
                Jesuit Provinces of the Assistancy, and offer help to other Congregations working in
                collaboration with the Jesuits of the Province. The last decades of the 20th century
                were years of relative financial security in the Province. Later the curtailment of
                donations from Australian benefactors and the world financial recession constrained us
                to practice a stricter economy.
              </p>

              <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">
                From 1952 the Australian Province had started sending scholastics, and a few priests
                and brothers to Hazaribag. In the ensuing 25 years the Australian Province was to
                send 58 Jesuits to India. It is worth noting that in the course of the development of
                the Province two dioceses, Daltonganj and Hazaribag, were formed in the area covered
                by the Province. As the number of diocesan priests increased eleven parishes or
                'stations' inherited from Ranchi or later started by the Province were handed over to
                the dioceses. In addition, the area north and east of the Grand Trunk Road, which
                included the parishes of Giridih and Maheshmunda, were ceded to Bhagalpur diocese.
                There are now twelve Jesuit communities in the Province. Of the present 170 Jesuits
                in the Province only 10 are former members of the Province of Australia, and their
                average age is around 81.
              </p>
            </motion.section>

            {/* Growth and Development */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mb-8 sm:mb-12"
            >
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-1 sm:w-2 h-8 sm:h-12 bg-secondary rounded mr-2 sm:mr-4"></div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-navy">Growth and Development</h2>
              </div>

              <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg mb-3 sm:mb-4">
                There are some notable milestones in our history. The first missionaries arrived in
                1951 and in 1952 the first group of scholastics arrived to continue their formation
                in India. Our first Indian vocation joined in 1954, followed by many others, among
                them tribals from Chotanagpur and a steady number from Kerala, Tamil Nadu and the
                west coast Catholic communities. The mission was declared a Region in 1956. We opened
                a full scale pre-novitiate Vivek Sadan in Shahpur in collaboration with Jamshedpur
                Province in 1982; an earlier pre-novitiate for the Region had been running in
                Daltonganj town. For some years Hazaribag novices were with Jamshedpur novices in
                Lupungutu and later in Mango, in both cases with the Novice Master supplied by
                Hazaribag. Hazaribag Jesuits made their contribution to the common works in the
                Assistancy by giving a scripture professor to Vidyajyoti, two tertian directors to
                the Assistancy, and later a POSA.
              </p>

              <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg mb-3 sm:mb-4">
                In 1992 when Hazaribag became a Province, the Province of Ranchi handed over to
                Hazaribag the whole complex of St Stanislaus College, Sitagarha, with its Novitiate,
                Juniorate, Tertianship and farm. The novitiate was henceforward the Hazaribag
                novitiate taking in novices also from neighboring Provinces. From 1958, with the
                official recognition of the Teachers Training Institute (now Primary Teachers
                Education College) in Sitagarha, the Hazaribag Mission was committed to tertiary
                education. In 2011 we opened our second college, St Xavier's College, Mahuadanr.
              </p>

              <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg mb-3 sm:mb-4">
                In 1971 diocese of Daltonganj was erected, covering what was then the districts of
                Palamu, and Hazaribag. Then in 1994 Hazaribag was declared a separate diocese. In
                1970 the then Archdiocese of Ranchi had ceded the district of Giridih to Bhagalpur
                diocese. For the previous half century the parish of Maheshmunda in this district had
                been served by priests from Ranchi and latterly by Hazaribag Jesuits. Under the
                Hazaribag Jesuits there had been some evangelization openings among the Santals of
                the area. This was handed over to the TOR Fathers. At the time little was known about
                the Santals of Hazaribag district. But soon the focus had shifted to the Santals
                around Charhi, and then in the area around the Konar dam, which has resulted in a
                small but flourishing Santal Church.
              </p>

              <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">
                New ground was broken in the 80's of the last century among the "dalits" of Hazaribag
                district, and the Korwas of Garhwa district. The new parish of Pakripath near
                Netarhat now caters not only for the Oraons and Mundas but is in contact, through the
                school, with the Asurs, one of the smallest of the minor tribes.
              </p>
            </motion.section>

            {/* Collaborators */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mb-8 sm:mb-12"
            >
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-1 sm:w-2 h-8 sm:h-12 bg-secondary rounded mr-2 sm:mr-4"></div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-navy">Collaborators</h2>
              </div>

              <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg mb-3 sm:mb-4">
                From the beginning of the Ranchi mission the priests had worked side by side with
                Sisters - Loreto, Daughters of Saint Anne, Ursulines, and Holy Cross Sisters, to
                mention only the main ones.
              </p>

              <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">
                When the new St Xavier's was opened in Bokaro Steel City, in 1966, the Clarist
                Sisters (FCC) came to teach in the new co-educational school, and like the Jesuits
                lived in Bokaro Steel Ltd. company quarters. This was the first coeducational Jesuit
                school in India and probably the first to have Sisters on the staff. This started a
                movement of collaboration which has developed and has become an important feature of
                the history of the Province. For example, Hazaribag St. Xavier's now has six Sisters
                from three different Congregations, two of them in administrative posts. A number of
                Jesuit Middle and Primary Schools are completely in the care of Sisters. It is
                envisaged that the St Xavier's High School and Loyola English Medium in Sitagarha
                will be partly staffed by Sisters.
              </p>
            </motion.section>

            {/* Today */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mb-8 sm:mb-12"
            >
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-1 sm:w-2 h-8 sm:h-12 bg-secondary rounded mr-2 sm:mr-4"></div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-navy">Today</h2>
              </div>

              <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">
                At present the Hazaribag Jesuits work in 7 districts of Jharkhand serving the poorest
                of the poor and the needy by imparting education, socio-pastoral work and faith
                formation among the tribes of Oraons, Santhals, Asurs, Korwas, Nagesia, Birjia,
                Munda, Kharia, Bhuiyans and Dalits.
              </p>
            </motion.section>

            {/* Challenges */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mb-6 sm:mb-8"
            >
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-1 sm:w-2 h-8 sm:h-12 bg-secondary rounded mr-2 sm:mr-4"></div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-navy">Challenges of the Hazaribag Jesuits Today</h2>
              </div>

              <div className="bg-amber-50 border-l-2 sm:border-l-4 border-secondary p-4 sm:p-6 rounded-r-lg">
                <ul className="space-y-2 sm:space-y-3">
                  <li className="flex items-start">
                    <span className="text-secondary font-bold mr-2 sm:mr-3 text-sm sm:text-base">1.</span>
                    <span className="text-gray-700 leading-relaxed text-xs sm:text-sm lg:text-base">
                      Continuously helping the socially deprived people.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary font-bold mr-2 sm:mr-3 text-sm sm:text-base">2.</span>
                    <span className="text-gray-700 leading-relaxed text-xs sm:text-sm lg:text-base">
                      Recruiting and training of young men to continue the ongoing ministerial works.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary font-bold mr-2 sm:mr-3 text-sm sm:text-base">3.</span>
                    <span className="text-gray-700 leading-relaxed text-xs sm:text-sm lg:text-base">
                      Spirituality of prayer and discernment in Socio-pastoral and educational
                      ministry of Jesuits.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary font-bold mr-2 sm:mr-3 text-sm sm:text-base">4.</span>
                    <span className="text-gray-700 leading-relaxed text-xs sm:text-sm lg:text-base">
                      To become vibrant and active like the veterans and willing to toil in all the
                      ministerial works of the society.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary font-bold mr-2 sm:mr-3 text-sm sm:text-base">5.</span>
                    <span className="text-gray-700 leading-relaxed text-xs sm:text-sm lg:text-base">
                      Ready to face the harshness of socio-economical situations of the people and
                      live with them.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary font-bold mr-2 sm:mr-3 text-sm sm:text-base">6.</span>
                    <span className="text-gray-700 leading-relaxed text-xs sm:text-sm lg:text-base">
                      Accept the realities of life and go forward with hope in the Lord.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary font-bold mr-2 sm:mr-3 text-sm sm:text-base">7.</span>
                    <span className="text-gray-700 leading-relaxed text-xs sm:text-sm lg:text-base">
                      Creeping of individualism among Jesuits.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary font-bold mr-2 sm:mr-3 text-sm sm:text-base">8.</span>
                    <span className="text-gray-700 leading-relaxed text-xs sm:text-sm lg:text-base">
                      Imbibing Jesuit Leadership quality and excel in MAGIS.
                    </span>
                  </li>
                </ul>
              </div>
            </motion.section>
          </div>
        </motion.div>
      </main>
      
    </div>
  );
};

export default History;
