import React from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Rahul Kumar',
      role: 'Alumni, Class of 2020',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
      text: 'The education and values I received at Hazaribagh Jesuit schools have shaped my life. The teachers not only taught academics but also instilled in us a sense of social responsibility.',
      rating: 5
    },
    {
      name: 'Priya Singh',
      role: 'Parent',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
      text: 'My daughter has grown so much in this nurturing environment. The holistic approach to education and the caring teachers have made all the difference in her development.',
      rating: 5
    },
    {
      name: 'Fr. Thomas Xavier',
      role: 'Community Member',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
      text: 'The social work initiatives of Hazaribagh Province have transformed countless lives in our region. Their commitment to serving the marginalized is truly inspiring.',
      rating: 5
    },
    {
      name: 'Anjali Verma',
      role: 'Student, Grade 12',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
      text: 'The teachers here are not just educators, they are mentors who genuinely care about our future. I feel prepared for both college and life beyond academics.',
      rating: 5
    },
    {
      name: 'Dr. Suresh Mahato',
      role: 'Local Physician',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
      text: 'The healthcare outreach programs run by the Jesuits have made quality medical care accessible to remote villages. Their dedication is commendable.',
      rating: 5
    },
    {
      name: 'Maria D\'Souza',
      role: 'Former Teacher',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80',
      text: 'Working with Hazaribagh Jesuits was the most fulfilling experience of my career. The focus on character development alongside academics is remarkable.',
      rating: 5
    }
  ];

  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-6 bg-linear-to-b from-cream to-white overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-linear(circle at 2px 2px, #f97316 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative">
        {/* Section Header */}
        <div className="text-center mb-12 px-4">
          <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-4">
            What People Say About Us
          </h2>
          <p className="text-gray-600 text-base max-w-2xl mx-auto">
            Hear from our students, parents, and community members
          </p>
          <div className="w-24 h-1 bg-linear-to-r from-amber-500 to-orange-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Horizontal Scrolling Testimonials */}
        <div className="relative">
          {/* linear Overlays - Hidden on mobile (md:block means hidden below 768px) */}
          <div className="hidden md:block absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="hidden md:block absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-white to-transparent z-10 pointer-events-none"></div>

          {/* Scrolling Container */}
          <div className="testimonial-scroll-container">
            <div className="flex space-x-4 animate-scroll">
              {duplicatedTestimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="shrink-0 w-80 bg-white rounded-md shadow-md p-6 border border-gray-200 hover:border-orange-500 hover:shadow-lg transition-all duration-300"
                >
                  {/* Quote Icon */}
                  <div className="mb-4">
                    <FaQuoteLeft className="text-2xl text-orange-500 opacity-50" />
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-gray-700 leading-relaxed mb-4 text-sm line-clamp-4">
                    "{testimonial.text}"
                  </p>

                  {/* Rating Stars */}
                  <div className="flex space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 text-sm" />
                    ))}
                  </div>

                  {/* User Info */}
                  <div className="flex items-center space-x-3 pt-4 border-t border-gray-200">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-orange-200"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{testimonial.name}</h4>
                      <p className="text-xs text-orange-600">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pause Notice */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-xs">
            💡 Hover over a testimonial to pause
          </p>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 40s linear infinite;
          display: flex;
        }

        .testimonial-scroll-container:hover .animate-scroll {
          animation-play-state: paused;
        }

        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .animate-scroll {
            animation-duration: 30s;
          }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
