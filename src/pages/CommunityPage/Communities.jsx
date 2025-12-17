import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';

const Communities = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

        const communityData = (response.data || []).map(item => ({
          id: item.id,
          title: item.title,
          description: item.long_description || item.short_description || '',
          image:
            item.image_url ||
            item.image ||
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
          community_name: item.community_name,
          created_at: item.created_at,
        }));

        setCommunities(communityData);

        if (communityData.length > 0) {
          document.title = `${communityData[0].community_name} - Communities`;
        }
      } catch (err) {
        console.error(err);
        setError('Unable to load Communities.');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCommunities();
  }, [id]);

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Communities', path: '/communities' },
    { label: communities[0]?.community_name || 'Details', path: `/communities/${id}` },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-t from-cream to-white">
        <p className="text-lg font-semibold">Loading Communities...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-t from-cream to-white">
        <p className="text-red-600 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-cream to-white text-navy">
      {/* Header */}
      <header className="p-6 mt-24 sm:ml-24 -mb-10">
        <h1 className="sm:text-4xl text-2xl font-bold mb-2">
          {communities[0]?.community_name || 'Communities'}
        </h1>
      </header>

      <Breadcrumb items={breadcrumbItems} />

      {/* Content */}
      <main className="container mx-auto p-6 pt-12 pb-16 sm:ml-24 sm:mr-24">
        {communities.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">
              No communities available.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {communities.map((community, index) => (
              <motion.div
                key={community.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-cream rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer border-2 border-secondary"
                style={{ height: '380px' }}
                onClick={() => navigate(`/communitiesdetails/${community.id}`)}
              >
                {/* Image */}
                <motion.img
                  src={community.image}
                  alt={community.title}
                  className="w-full h-52 object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop';
                  }}
                />

                {/* Content */}
                <div className="p-5 flex flex-col">
                  <h2 className="text-lg font-bold text-primary mb-2 line-clamp-2">
                    {community.title}
                  </h2>

                  <div
                    className="text-gray-600 text-sm line-clamp-3"
                    dangerouslySetInnerHTML={{
                      __html: community.description,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Communities;