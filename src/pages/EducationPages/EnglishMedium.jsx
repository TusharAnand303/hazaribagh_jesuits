import { motion } from 'framer-motion';
import VisionStatement from './VisionStatement';


const EnglishMedium = () => {
    // Sample data - replace with API data later
  const schools = [
    {
      id: 1,
      name: "St. Xavier's School, Hazaribag",
      description:
        "A premier English medium school providing quality education with a focus on holistic development. Excellence in academics, sports, and character formation.",
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop',
    },
    {
      id: 2,
      name: "St. Xavier's College, Mahuadanr",
      description:
        "Offering undergraduate programs in Arts, Science, and Commerce. Focus on quality higher education with emphasis on research and community service.",
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop',
    },
    {
      id: 3,
      name: "Loyola School, Bokaro",
      description:
        "One of the leading educational institutions in Bokaro Steel City. Known for academic excellence, discipline, and all-round development of students.",
      image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=600&fit=crop',
    },
    {
      id: 4,
      name: "St. Stanislaus College, Sitagarha",
      description:
        "Jesuit Novitiate and Juniorate providing spiritual and academic formation. A center for discernment and growth in Jesuit spirituality.",
      image: 'https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=800&h=600&fit=crop',
    },
    {
      id: 5,
      name: "St. Joseph's School, Daltonganj",
      description:
        "Serving the tribal and rural communities with quality education. Focus on empowerment through education and skill development.",
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop',
    },
    {
      id: 6,
      name: "Sacred Heart School, Charhi",
      description:
        "Educational center for Santal tribal children providing foundational education. Focus on cultural preservation and modern education integration.",
      image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=600&fit=crop',
    },
    {
      id: 7,
      name: "De Nobili School, Dhanbad",
      description:
        "Excellence in education for over five decades. Nurturing young minds with values, discipline and modern teaching methodologies.",
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop',
    },
    {
      id: 8,
      name: "Holy Cross School, Hazaribag",
      description:
        "Committed to providing quality education to rural and tribal students. Building futures through knowledge and character development.",
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop',
    },
  ];

  return (
     <>
     <VisionStatement />
     <div className="min-h-screen bg-linear-to-t from-cream to-white text-navy">

      {/* Header */}
      <header className="p-4 sm:ml-24 -mb-2 -mt-2">
        <h1 className="sm:text-4xl text-2xl font-bold">English Medium School's</h1>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto p-6 pt-12 pb-10">
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
                alert(`Clicked on ${school.name}`);
              }}
            >
              <motion.img
                src={school.image}
                alt={school.name}
                className="w-full h-52 object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=600&fit=crop';
                }}
              />
              <div className="p-5 flex flex-col">
                <h2 className="text-lg font-bold text-primary mb-2 line-clamp-2">{school.name}</h2>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {school.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
     </>
  )
}

export default EnglishMedium