// src/pages/AboutPage.jsx
import React from 'react'
import Mission from '../components/Home/Mission'
import WhyChooseUs from '../components/Home/WhyChooseUs'
import AboutHero from '../components/about/AboutHero'
import AboutUs from '../components/Home/AboutUs'
import CoreValues from '../components/about/CoreValues'
import Contact from '../components/Home/Contact'

const AboutPage = () => {
  return (
    <div> 
      {/* 1. Page Header */}
      <AboutHero />
      <AboutUs />

      {/* 2. Mission Section */}
      <Mission />

      {/* 3. Stats Section */}
      
      {/* 4. Why Choose Us */}
      <WhyChooseUs />
      <CoreValues />
      <Contact />
    </div>
  )
}

export default AboutPage