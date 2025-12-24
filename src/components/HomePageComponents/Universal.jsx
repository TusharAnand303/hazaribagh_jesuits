import React, { useState, useEffect } from "react";

const Universal = () => {
  const [uapData, setUapData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUapData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/uap`);
        if (!response.ok) throw new Error('Failed to fetch UAP data');
        const data = await response.json();
        const uapArray = Array.isArray(data?.data) ? data.data : [];
        setUapData(uapArray);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.message);
        setLoading(false);
      }
    };
    fetchUapData();
  }, []);

  if (loading) {
    return (
      <section className="py-8 sm:py-6 lg:py-8 bg-gradient-to-b from-cream to-white">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
            <p className="text-navy">Loading Universal Apostolic Preferences...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || uapData.length === 0) {
    return (
      <section className="py-8 sm:py-6 lg:py-8 bg-gradient-to-b from-cream to-white">
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
    <section className="py-8 sm:py-6 lg:py-8 bg-gradient-to-b from-cream to-white">
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

        {/* Flip Cards */}
        <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {uapData.map((item) => (
            <div key={item.id} className="group perspective-1000 cursor-pointer">
              <div className="relative w-full h-60 transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
                
                {/* Front Side */}
                <div
                  className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg backface-hidden bg-cover bg-center flex flex-col justify-end"
                  style={{ backgroundImage: `url(${item.image_url})` }}
                >
                  {/* Bottom text overlay */}
                  <div className="p-3">
                    <h3
                      className="text-center text-base sm:text-lg font-bold tracking-wider leading-tight transition-colors duration-300 px-3 py-1 rounded-md"
                      style={{
                        color: '#FFFFFF',
                        backgroundColor: 'rgba(0, 0, 0, 0.45)',
                        textShadow: '0 2px 3px rgba(0,0,0,0.8)',
                      }}
                    >
                      <span className="group-hover:text-secondary transition-colors duration-300">
                        {item.title}
                      </span>
                    </h3>
                  </div>
                  
                  {/* Subtle gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg backface-hidden rotate-y-180 bg-primary flex items-center justify-center p-4">
                  <h3 className="text-white text-center text-lg font-bold">{item.description}</h3>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inline CSS for 3D Flip */}
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  );
};

export default Universal;
