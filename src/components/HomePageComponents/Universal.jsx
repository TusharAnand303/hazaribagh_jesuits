import React from "react";

const Universal = () => {
  const cards = [
    { 
      text: "SHOWING THE WAY TO GOD", 
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=400&fit=crop"
    },
    { 
      text: "WALKING WITH THE EXCLUDED", 
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=500&h=400&fit=crop"
    },
    { 
      text: "JOURNEYING WITH YOUTH", 
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=500&h=400&fit=crop"
    },
    { 
      text: "CARING FOR OUR COMMON HOME", 
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=400&fit=crop"
    }
  ];

  return (
    <section className="py-8 sm:py-6 lg:py-8 bg-linear-to-b from-white to-primary">
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
          {cards.map((item) => (
            <div
              key={item.text}
              className="relative h-60 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer"
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                style={{ 
                  backgroundImage: `url(${item.image})`,
                  backgroundBlendMode: 'multiply'
                }}
              />
              
              {/* Minimal dark gradient overlay for subtle text readability */}
           
              
              {/* Content container */}
              <div className="relative z-10 flex flex-col items-center justify-end h-full p-6 pb-8">
                {/* Decorative line */}
                <div className="w-16 h-0.5 mb-4 group-hover:w-24 transition-all duration-500" style={{ backgroundColor: '#D4AF37' }} />
                
                {/* Text */}
                <h3 className="text-center text-base sm:text-lg font-bold tracking-wider leading-tight transition-colors duration-300 text-shadow" style={{ 
                  color: '#F8F4E3', 
                  textShadow: '0 1px 2px rgba(0,0,0,0.6)'
                }}>
                  <span className="group-hover:text-secondary transition-colors duration-300">
                    {item.text}
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
