import React from 'react'
import Carousel from '../components/HomePageComponents/Carousel'
import AboutHead from '../components/HomePageComponents/AboutHead'
import LatestNews from '../components/HomePageComponents/LatestNews'
import LatestVideo from '../components/HomePageComponents/LatestVideo'
import OurStats from '../components/HomePageComponents/OurStats'
import Testimonials from '../components/HomePageComponents/Testimonials'

const HomePage = () => {
  return (
    <>
    <Carousel/>
    <AboutHead/>
    <LatestNews/>
    <LatestVideo/>
    <OurStats/>
    <Testimonials/>
    </>
  )
}

export default HomePage