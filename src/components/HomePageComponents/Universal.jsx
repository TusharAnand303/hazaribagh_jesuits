import React, { useState, useEffect } from "react";

const Universal = () => {
  // API states
  const [uapData, setUapData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch UAP data
  useEffect(() => {
    const fetchUapData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/uap`);
        if (!response.ok) {
          throw new Error('Failed to fetch UAP data');
        }
        const data = await response.json();

        // API: { status: true, data: [ { ...uap objects... } ] }
        const uapArray = Array.isArray(data?.data) ? data.data : [];
        
        setUapData(uapArray);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching UAP data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUapData();
  }, []);

  // Loading state
  if (loading) {
    return (
      <section className="py-8 sm:py-6 lg:py-8 bg-linear-to-b from-cream to-white">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
            <p className="text-navy">Loading Universal Apostolic Preferences...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error or no data state
  if (error || uapData.length === 0) {
    return (
      <section className="py-8 sm:py-6 lg:py-8 bg-linear-to-b from-cream to-white">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <div className="text-center py-12">
            <p className="text-navy text-lg">
              {error ? 'Unable to load Universal Apostolic Preferences' : 'No preferences available'}
            </p>
            <p className="text-gray-600 text-sm mt-2">
              {error ? 'Please try again later' : 'Check back soon for updates'}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 sm:py-6 lg:py-8 bg-linear-to-b from-cream to-white">
      <div className="container mx-auto px-4 sm:px-8 lg:px-12 pb-10">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 tracking-wide" style={{ color: '#800000' }}>
            Universal Apostolic Preferences
          </h2>
          <div className="w-24 h-1 mx-auto rounded-full mb-4" style={{ backgroundColor: '#D4AF37' }} />
          <p className="text-sm sm:text-base lg:text-lg leading-relaxed" style={{ color: '#01082F' }}>
            They are four working fields to which the Society of Jesus will pay
            special attention and in which it will invest a significant portion
            of its various resources over the next few years.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {uapData.map((item) => (
            <div
              key={item.id}
              className="relative h-60 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer"
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                style={{ 
                  backgroundImage: `url('${item.image_url}')`
                }}
              />
              
              {/* Dark overlay for better text visibility */}
              <div className="absolute inset-0 bg-black/30"></div>
              
              {/* Content container */}
              <div className="relative z-10 flex flex-col items-center justify-end h-full p-6 pb-8">
                {/* Decorative line */}
                <div className="w-16 h-0.5 mb-4 group-hover:w-24 transition-all duration-500" style={{ backgroundColor: '#D4AF37' }} />
                
                {/* Text */}
                <h3 className="text-center text-base sm:text-lg font-bold tracking-wider leading-tight transition-colors duration-300 text-shadow" style={{ 
                  color: '#F8F4E3', 
                  textShadow: '0 2px 4px rgba(0,0,0,0.8)'
                }}>
                  <span className="group-hover:text-secondary transition-colors duration-300">
                    {item.title}
                  </span>
                </h3>
              </div>

              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 bg-linear-to-t from-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Universal;
