import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PastoralDetails = () => {
  const { id } = useParams();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPastoralDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/parishes/${id}`
        );
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }

        const response = await res.json();
        setContent(response.data);
      } catch (err) {
        console.error(err);
        setError('Unable to load pastoral details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPastoralDetails();
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
    <div className="container mx-auto py-10 max-w-4xl">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header with image and title */}
        {content.image_url && (
          <img 
            src={content.image_url} 
            alt={content.title}
            className="w-full h-64 object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        )}
        
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            {content.title}
          </h1>
          
          {content.description && (
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {content.description}
              </p>
            </div>
          )}
          
          {/* Additional info section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.id && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <span className="text-sm text-gray-500 font-medium">Parish ID</span>
                <p className="text-lg font-semibold text-gray-900">{content.id}</p>
              </div>
            )}
            
            {content.created_at && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <span className="text-sm text-gray-500 font-medium">Created</span>
                <p className="text-lg font-semibold text-gray-900">
                  {new Date(content.created_at).toLocaleDateString()}
                </p>
              </div>
            )}
            
            {content.updated_at && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <span className="text-sm text-gray-500 font-medium">Last Updated</span>
                <p className="text-lg font-semibold text-gray-900">
                  {new Date(content.updated_at).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Link if available */}
      {content.link && (
        <div className="mt-8 text-center">
          <a 
            href={content.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
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

export default PastoralDetails;
