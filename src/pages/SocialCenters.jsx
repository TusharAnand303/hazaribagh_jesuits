import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SocialCenters = () => {
  const { id } = useParams();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSocialCenters = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/socialcenteres/${id}`
        );
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }

        const response = await res.json();
        setContent(response.data);
      } catch (err) {
        console.error(err);
        setError('Unable to load socialcenters details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSocialCenters();
    }
  }, [id]);

  if (loading) {
    return <div className="container mx-auto py-10">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto py-10 text-red-600">{error}</div>;
  }

  if (!content) {
    return <div className="container mx-auto py-10">No data found.</div>;
  }

  return (
    <div className="container mx-auto py-25 max-w-4xl px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-xl rounded-3xl overflow-hidden">
        <div className="p-6 sm:p-8 lg:p-12">
              {content.image_url && (
          <div className="w-full">
            <img 
              src={content.image_url} 
              alt={content.title}
              className="w-full h-64 sm:h-80 lg:h-96 object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        )}
          
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-gray-800 leading-tight">
            {content.title}
          </h1>
          
          {/* Description */}
          {content.description && (
            <div className="prose prose-lg max-w-none mb-8 sm:mb-12">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-base sm:text-lg">
                {content.description}
              </p>
            </div>
          )}
        </div>
        
      </div>
      
      {/* Link if available (null or # hidden) */}
      {content.link && content.link !== '#' && content.link !== null && (
        <div className="mt-8 sm:mt-12 text-center">
          <a 
            href={content.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
          >
            Visit Website
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
};

export default SocialCenters;
