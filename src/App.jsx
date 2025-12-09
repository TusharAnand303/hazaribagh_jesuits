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


function App() {

  return (
    <>
      <BrowserRouter>
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
        </Routes>
        <Footer/>
        <ScrollToTop />
        <SocialSidebar />
      </BrowserRouter>
    </>
  )
}

export default App
