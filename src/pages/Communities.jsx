import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Communities = () => {
  const { id } = useParams();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataAvailable, setDataAvailable] = useState(false);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/communities/${id}`
        );
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }

        const response = await res.json();
        // ✅ Check if data exists
        const dataItem = response.data[0];
        setContent(dataItem || null);
        setDataAvailable(!!dataItem); // true if data exists, false if empty
      } catch (err) {
        console.error(err);
        setError('Unable to load Communities details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCommunities();
    }
  }, [id]);

  if (loading) {
    return <div className="container mx-auto py-10">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto py-10 text-red-600">{error}</div>;
  }

  // ✅ NEW: Data not available message
  if (!dataAvailable) {
    return (
      <div className="container mx-auto py-25 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-xl rounded-3xl p-12 sm:p-16 lg:p-20 text-center max-w-2xl mx-auto">
          <div className="w-24 h-24 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">Data Not Available</h2>
          <p className="text-gray-600 text-lg mb-8">No community details found for this ID.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-25 max-w-4xl px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-xl rounded-3xl overflow-hidden">
        <div className="p-6 sm:p-8 lg:p-12">
          {/* Title FIRST */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-gray-800 leading-tight">
            {content.community_name}
          </h1>
          
          {/* Image SECOND */}
          {content.image_url && (
            <div className="w-full mb-8 sm:mb-12">
              <img 
                src={content.image_url} 
                alt={content.community_name}
                className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-2xl"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}
          
          {/* Long Description */}
          {content.long_description && (
            <div className="prose prose-lg max-w-none">
              <div 
                className="text-gray-700 leading-relaxed text-base sm:text-lg"
                dangerouslySetInnerHTML={{ __html: content.long_description }}
              />
            </div>
          )}
        </div>
      </div>
      
      {/* Link if available */}
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

export default Communities;
