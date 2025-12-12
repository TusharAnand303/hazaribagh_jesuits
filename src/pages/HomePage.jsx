import React from 'react'
import Carousel from '../components/HomePageComponents/Carousel'
import AboutHead from '../components/HomePageComponents/AboutHead'
import LatestNews from '../components/HomePageComponents/LatestNews'
import LatestVideo from '../components/HomePageComponents/LatestVideo'
import Quotes from '../components/HomePageComponents/Quotes'
import Testimonials from '../components/HomePageComponents/Testimonials'
import Universal from '../components/HomePageComponents/Universal'
import ApostolicPlanning from '../components/HomePageComponents/ApostolicPlanning'
import Maps from '../components/HomePageComponents/Maps'
import NewsLetter from '../components/HomePageComponents/NewsLetter'
import Whoweare from '../components/HomePageComponents/Whoweare'
import PopupNotice from '../components/HomePageComponents/PopupNotice'

const HomePage = () => {
  return (
    <>
    <PopupNotice/> 
    <Carousel/> 
    <AboutHead/>
    <LatestNews/>
    <NewsLetter/>
    <Whoweare/> 
    <LatestVideo/>
    <ApostolicPlanning/>
    <Universal/>
    <Quotes/> 
   <Testimonials/> 
    <Maps/> 
    </>
  )
}

export default HomePage