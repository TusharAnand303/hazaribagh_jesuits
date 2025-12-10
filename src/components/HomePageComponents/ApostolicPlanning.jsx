import React, { useState, useEffect } from "react";

const ApostolicPlanning = () => {
  // API states
  const [plannings, setPlannings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch apostolic planning data
  useEffect(() => {
    const fetchPlannings = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/plannings`);
        if (!response.ok) {
          throw new Error('Failed to fetch planning data');
        }
        const data = await response.json();

        // API: { status: true, data: [ { ...planning objects... } ] }
        const planningsArray = Array.isArray(data?.data) ? data.data : [];
        
        setPlannings(planningsArray);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching planning data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPlannings();
  }, []);

  // Loading state
  if (loading) {
    return (
      <section className="py-8 sm:py-6 lg:py-8 bg-linear-to-t from-cream to-white">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
            <p className="text-navy">Loading apostolic planning...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error or no data - show default content
  const displayPlannings = plannings.length > 0 ? plannings : [
    { id: 1, plan_text: "Strengthening and Expanding our Mission in North Hazaribagh" },
    { id: 2, plan_text: "Responding to Communalism and Fundamentalism" },
    { id: 3, plan_text: "Imparting Integral Formation to Youth" },
    { id: 4, plan_text: "Training in Collaboration and Leadership" }
  ];

  return (
    <section className="py-8 sm:py-6 lg:py-8 bg-linear-to-t from-cream to-white">
      <div className="container mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-6 py-2 bg-cream border border-secondary/40 rounded-full text-primary text-sm font-semibold mb-4 shadow-sm">
            Mission Priorities
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4 tracking-wide">
            Hazaribagh Province Apostolic Planning
          </h2>

          <div className="w-24 h-1 bg-secondary mx-auto rounded-full mb-6" />

          <p className="text-navy text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Key apostolic focus areas through which the Province carries out its
            mission of faith, justice, and service among the people.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {displayPlannings.map((planning, index) => (
            <div
              key={planning.id}
              className="group text-white bg-linear-to-r from-primary to-navy backdrop-blur-sm rounded-2xl p-4 flex flex-col justify-center items-center text-center cursor-pointer 
                         shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-cream hover:border-cream"
            >
              <p className="text-white font-semibold text-sm sm:text-base leading-relaxed group-hover:text-white transition-colors duration-300">
                {planning.plan_text}
              </p>
            </div>
          ))}
        </div>

        {/* Download button */}
        <div className="text-center mt-12">
          <button
            className="px-10 py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 
          bg-secondary text-white cursor-pointer hover:shadow-2xl hover:-translate-y-1"
          >
            Download the PDF
          </button>
        </div>
      </div>
    </section>
  );
};

export default ApostolicPlanning;
