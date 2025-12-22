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
import EducationDetails from "./pages/EducationPages/EducationDetails.jsx"
import HindiMedium from "./pages/EducationPages/HindiMedium.jsx"
import HigherInstitute from "./pages/EducationPages/HigherInstitute.jsx"
import Hostel from "./pages/EducationPages/Hostel.jsx"
import Contactus from "./pages/Contactus.jsx"
import Aboutus from "./pages/Aboutus.jsx"
import PastoralDetails from "./pages/PastoralDetails.jsx"
import SocialCenters from "./pages/SocialCenters.jsx"
import MassCenters from "./pages/MassCenters.jsx"
import Communities from "./pages/CommunityPage/Communities.jsx"
import CommunitiesDetails from "./pages/CommunityPage/CommunitiesDetails.jsx"
import AdministrationCouncils from "./pages/AdministrationCouncils.jsx"
import GalleryDetail from "./pages/GalleryDetail.jsx"
import SupportUs from "./pages/Supportus.jsx"
import Foundation from "./pages/Foundation.jsx"
import Legacy from "./pages/Legacy.jsx"
import ApostolicPlannings from "./pages/ApostolicPlannings.jsx"
import NewsletterViewer from "./pages/NewsletterViewer";
import Formation from "./pages/FormatonPages/Formation.jsx"
import FormationDetails from "./pages/FormatonPages/FormationDetails.jsx"
import Youth from "./pages/YouthPages/Youth.jsx"
import YouthDetails from "./pages/YouthPages/YouthDetails.jsx"
import IgnatianRetreats from "./pages/IgnatianRetreatsPages/IgnatianRetreats.jsx"
import IgnatianRetreatsDetails from "./pages/IgnatianRetreatsPages/IgnatianRetreatsDetails.jsx"
import VocationPromotion from "./pages/VocationPromotionPages/VocationPromotion.jsx"
import VocationPromotionDetails from "./pages/VocationPromotionPages/VocationPromotionDetails.jsx"
import PopesWorldWidePrayer from "./pages/PopesPrayerPages/PopesWorldWidePrayer.jsx"
import PopesWorldWidePrayerDetails from "./pages/PopesPrayerPages/PopesWorldWidePrayerDetails.jsx"
import Spirituality from "./pages/Spirituality.jsx"
import SpiritualityDetail from "./pages/SpiritualityDetail.jsx"
import JesuitsMembers from "./pages/JesuitsMembersPages/JesuitsMembers.jsx"
import JesuitsMembersDetails from "./pages/JesuitsMembersPages/JesuitsMembersDetails.jsx"


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
          <Route path="about/contactus" element={<Contactus />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/educationdetails/:id" element={<EducationDetails />} />
          <Route path="/pastoral/:id" element={<PastoralDetails />} />
          <Route path="/socialcenters/:id" element={<SocialCenters />} />
          <Route path="/masscenteres/:id" element={<MassCenters />} />
          <Route path="/communities/:id" element={<Communities />} />
          <Route path="/communitiesdetails/:id" element={<CommunitiesDetails />} />
          <Route path="/administration-councils" element={<AdministrationCouncils />} />
          <Route path="/gallery/:id" element={<GalleryDetail />} /> {/* <-- Add this */}
          <Route path="about/supportus" element={<SupportUs />} />
          <Route path="about/foundation" element={<Foundation />} />
          <Route path="about/legacy" element={<Legacy />} />
          <Route path="/apostolic-plannings" element={<ApostolicPlannings />} />
          <Route path="/newsletter/view/:id" element={<NewsletterViewer />} />
          <Route path="/formation" element={<Formation />} />
          <Route path="/youth" element={<Youth />} />
          <Route path="/formation/:id" element={<FormationDetails />} />
          <Route path="/youth/:id" element={<YouthDetails />} />
          <Route path="/retreats" element={<IgnatianRetreats />} />
          <Route path="/retreats/:id" element={<IgnatianRetreatsDetails />} />
          <Route path="/vocation" element={<VocationPromotion />} />
          <Route path="/vocation/:id" element={<VocationPromotionDetails />} />
          <Route path="/popes-prayer" element={<PopesWorldWidePrayer />} />
          <Route path="/popes-prayer/:id" element={<PopesWorldWidePrayerDetails />} />
          <Route path="/spirituality" element={<Spirituality />} />
          <Route path="/spirituality/:id" element={<SpiritualityDetail />} />
          <Route path="/jesuits-member" element={<JesuitsMembers />} />
          <Route path="/jesuits-member/:id" element={<JesuitsMembersDetails />} />


        </Routes>
        <Footer/> 
        <ScrollToTop />
         <SocialSidebar />
      </BrowserRouter>
    </>
  )
}

export default App
