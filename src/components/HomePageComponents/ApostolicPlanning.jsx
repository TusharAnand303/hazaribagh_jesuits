import React from "react";

const ApostolicPlanning = () => {
  return (
    <section className="py-8 sm:py-12 lg:py-14 bg-gradient-to-t from-white to-[#F8F4E3]">
      <div className="container mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-6 py-2 bg-[#F8F4E3] border border-[#D4AF37]/40 rounded-full text-[#800000] text-sm font-semibold mb-4 shadow-sm">
            Mission Priorities
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#800000] mb-4 tracking-wide">
            Hazaribagh Province Apostolic Planning
          </h2>

          <div className="w-24 h-1 bg-[#D4AF37] mx-auto rounded-full mb-6" />

          <p className="text-[#01082F] text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Key apostolic focus areas through which the Province carries out its
            mission of faith, justice, and service among the people.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            "Strengthening and Expanding our Mission in North Karnataka",
            "Responding to Communalism and Fundamentalism",
            "Imparting Integral Formation to Youth",
            "Training in Collaboration and Leadership",
          ].map((text, index) => (
            <div
              key={index}
              className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 flex flex-col justify-center items-center text-center cursor-pointer 
                         shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-white/50 hover:border-[#D4AF37]/30"
            >
              <p className="text-[#01082F] font-semibold text-sm sm:text-base leading-relaxed group-hover:text-[#800000] transition-colors duration-300">
                {text}
              </p>
            </div>
          ))}
        </div>

        {/* Download button */}
        <div className="text-center mt-12">
          <button
            className="px-10 py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 
                       bg-[#800000] text-[#F8F4E3] hover:bg-[#01082F] hover:shadow-2xl hover:-translate-y-1"
          >
            Download the PDF
          </button>
        </div>
      </div>
    </section>
  );
};

export default ApostolicPlanning;
