import React from "react";

const Universal = () => {
  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-transparent">
      <div className="container mx-auto px-4 sm:px-8 lg:px-12">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-3 tracking-wide">
            Universal Apostolic Preferences
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto rounded-full mb-4" />
          <p className="text-navy text-sm sm:text-base lg:text-lg leading-relaxed">
            They are four working fields to which the Society of Jesus will pay
            special attention and in which it will invest a significant portion
            of its various resources over the next few years.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
          {[
            "SHOWING THE WAY TO GOD",
            "WALKING WITH THE EXCLUDED",
            "JOURNEYING WITH YOUTH",
            "CARING FOR OUR COMMON HOME",
          ].map((text) => (
            <div
              key={text}
              className="relative h-56 rounded-xl overflow-hidden bg-navy/80 bg-cover bg-center shadow-md hover:shadow-2xl transition-all duration-300 group"
            >
              {/* If you have images, add bg-[url('...')] or inline style here */}

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/75 transition-colors duration-300" />

              {/* Text */}
              <div className="relative z-10 flex items-end justify-center h-full p-4">
                <span className="text-center text-sm sm:text-base font-bold tracking-widest text-cream">
                  {text}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Universal;
