import React from 'react'
import HeroSlider from '../components/Home/HeroSlider'
import LoanServices from '../components/Home/LoanServices'
import AboutUs from '../components/Home/AboutUs'
import WhyChooseUs from '../components/Home/WhyChooseUs'
import Mission from '../components/Home/Mission'
import Testimonials from '../components/Home/Testimonials'
import Contact from '../components/Home/Contact'
import Footer from '../components/Footer'
import PopupForm from '../components/PopupForm'

const HeroPage = () => {
  return (
    <>
    <PopupForm />
    <HeroSlider />
    <LoanServices />
    <AboutUs />
    <WhyChooseUs />
    <Mission />
    <Testimonials />
    <Contact />
    
    
    </>
  )
}

export default HeroPage

