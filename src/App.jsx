import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from './pages/HomePage.jsx'
import Navbar from "./components/Navbar.jsx"
import Footer from "./components/Footer.jsx"
import ScrollToTop from "./components/ScrollToTop.jsx"
import SocialSidebar from "./components/SocialSidebar.jsx"
import NotFound from "./pages/NotFound.jsx"
import Publications from "./pages/Publications.jsx"
import Book from "./pages/Book.jsx"
import Blog from "./pages/Blog.jsx"
import History from "./pages/History.jsx"
import Gallery from "./pages/Gallery.jsx"
import NewInitiative from "./pages/NewInitiative.jsx"
import BecomeJesuits from "./pages/BecomeJesuits.jsx"
import ScrollOnRouteChange from "./components/ScrollOnRouteChange.jsx"
import News from "./pages/News.jsx"
import NewsDetail from "./pages/NewsDetail.jsx"
import PublicationDetail from "./pages/PublicationDetail.jsx"
import EnglishMedium from "./pages/EducationPages/EnglishMedium.jsx"
import HindiMedium from "./pages/EducationPages/HindiMedium.jsx"
import HigherInstitute from "./pages/EducationPages/HigherInstitute.jsx"
import Hostel from "./pages/EducationPages/Hostel.jsx"


function App() {

  return (
    <>
      <BrowserRouter>
      <ScrollOnRouteChange />
      <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/book" element={<Book />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/history" element={<History />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/new-initiatives" element={<NewInitiative />} />
          <Route path="/become-a-jesuit" element={<BecomeJesuits />} />
          <Route path="/education/english-medium-school" element={<EnglishMedium />} />
          <Route path="/education/hindi-medium-school" element={<HindiMedium />} />
          <Route path="/education/higher-institution" element={<HigherInstitute />} />
          <Route path="/education/hostels" element={<Hostel />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/publications/:id" element={<PublicationDetail />} />
        </Routes>
        <Footer/>
        <ScrollToTop />
        <SocialSidebar />
      </BrowserRouter>
    </>
  )
}

export default App
