import React from "react";

const ApostolicPlanning = () => {
  return (
    <section className="py-4 sm:py-8 lg:py-10">
      <div className="container mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-10">
          {/* Pill like "Updates & Events" */}
          <span className="inline-block px-4 py-2 bg-cream border border-secondary/40 rounded-full text-primary text-sm font-semibold mb-4 shadow-sm">
            Mission Priorities
          </span>

          {/* Main heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4 tracking-wide">
            Hazaribagh Province Apostolic Planning
          </h2>

          {/* Gold underline bar */}
          <div className="w-24 h-1 bg-secondary mx-auto rounded-full mb-4" />

          {/* Description text */}
          <p className="text-navy text-base sm:text-lg max-w-3xl mx-auto">
            Key apostolic focus areas through which the Province carries out its
            mission of faith, justice, and service among the people.
          </p>
        </div>

        {/* Cards Row */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-5xl mx-auto">
          <div className="bg-secondary text-navy font-semibold text-sm sm:text-base rounded-lg px-4 py-6 shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center text-center">
            Strengthening and Expanding our Mission in North Karnataka
          </div>

          <div className="bg-secondary text-navy font-semibold text-sm sm:text-base rounded-lg px-4 py-6 shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center text-center">
            Responding to Communalism and Fundamentalism
          </div>

          <div className="bg-secondary text-navy font-semibold text-sm sm:text-base rounded-lg px-4 py-6 shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center text-center">
            Imparting Integral Formation to Youth
          </div>

          <div className="bg-secondary text-navy font-semibold text-sm sm:text-base rounded-lg px-4 py-6 shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center text-center">
            Training in Collaboration and Leadership
          </div>
        </div>

        {/* Download button */}
        <div className="text-center mt-10">
          <button className="px-8 py-3 bg-primary hover:bg-navy text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            Download the PDF
          </button>
        </div>
      </div>
    </section>
  );
};

export default ApostolicPlanning;
