import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from './pages/HomePage.jsx'
import Navbar from "./components/Navbar.jsx"
import Footer from "./components/Footer.jsx"
import ScrollToTop from "./components/ScrollToTop.jsx"
import SocialSidebar from "./components/SocialSidebar.jsx"


function App() {

  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
        <Footer/>
        <ScrollToTop />
        <SocialSidebar />
      </BrowserRouter>
    </>
  )
}

export default App
