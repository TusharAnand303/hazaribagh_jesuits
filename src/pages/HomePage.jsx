import React from 'react'
import Carousel from '../components/HomePageComponents/Carousel'
import AboutHead from '../components/HomePageComponents/AboutHead'
import LatestNews from '../components/HomePageComponents/LatestNews'
import LatestVideo from '../components/HomePageComponents/LatestVideo'
import OurStats from '../components/HomePageComponents/OurStats'
import Testimonials from '../components/HomePageComponents/Testimonials'
import Universal from '../components/HomePageComponents/Universal'
import ApostolicPlanning from '../components/HomePageComponents/ApostolicPlanning'
import Maps from '../components/HomePageComponents/Maps'
import NewsLetter from '../components/HomePageComponents/NewsLetter'
import Whoweare from '../components/HomePageComponents/Whoweare'

const HomePage = () => {
  return (
    <>
    <Carousel/>
    <AboutHead/>
    <LatestNews/>
    <NewsLetter/>
    <Whoweare/>
    <LatestVideo/>
    <OurStats/>
    <Testimonials/>
    <Maps/>
    <ApostolicPlanning/>
    <Universal/>
    </>
  )
}

export default HomePage