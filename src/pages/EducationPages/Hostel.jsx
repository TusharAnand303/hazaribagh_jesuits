import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import VisionStatement from './VisionStatement';
import { useNavigate } from 'react-router-dom';

const Hostel = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/education/hostel`);
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }

        const response = await res.json();

        // KEEP HTML tags for proper formatting
        const hostelSchools = (response.data || []).map(item => ({
          id: item.id,
          name: item.title,
          description: item.description || '',
          image: item.image_url || item.image,
        }));

        setSchools(hostelSchools);
      } catch (err) {
        console.error(err);
        setError('Unable to load hostels. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  if (loading) {
    return (
      <>
        <VisionStatement />
        <div className="min-h-screen flex items-center justify-center bg-linear-to-t from-cream to-white text-navy">
          <p className="text-lg font-semibold">Loading Hostels...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <VisionStatement />
        <div className="min-h-screen flex items-center justify-center bg-linear-to-t from-cream to-white text-navy">
          <p className="text-red-600 font-semibold">{error}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <VisionStatement />
      <div className="min-h-screen bg-linear-to-t from-cream to-white text-navy">
        {/* Header */}
        <header className="p-4 sm:ml-24 -mb-2 -mt-2">
          <h1 className="sm:text-4xl text-2xl font-bold">Hostels</h1>
        </header>

        {/* Main Content */}
        <main className="container mx-auto p-6 pt-12 pb-10">
          {schools.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500">No hostels found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
              {schools.map((school, index) => (
                <motion.div
                  key={school.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-cream to-cream rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer border-2 border-secondary"
                  style={{ height: '380px' }}
                  onClick={() => {
                    console.log('Navigating to:', `/educationdetails/${school.id}`);
                    navigate(`/educationdetails/${school.id}`);
                  }}
                >
                  <motion.img
                    src={school.image}
                    alt={school.name}
                    className="w-full h-52 object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=600&fit=crop';
                    }}
                  />
                  <div className="p-5 flex flex-col">
                    <h2 className="text-lg font-bold text-primary mb-2 line-clamp-2">
                      {school.name}
                    </h2>
                    {/* Render HTML description with formatting */}
                    <div
                      className="text-gray-600 text-sm line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: school.description }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Hostel;
