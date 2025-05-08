import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Herosection from '../Components/Herosection/Herosection'
import AboutUs from '../Components/AboutUs/Aboutus'
import Brands from '../Components/Brands/Brands'
import Testimonials from '../Components/Testimonials/Testimonials'
import BookCall from '../Components/BookCall/BookCall'
import ContactUs from '../Components/ContactUs/ContactUs'
import Footer from '../Components/Footer/Footer'

const Page = () => {
  return (
    <>
    
    <Navbar/>
    <Herosection/>
    <AboutUs/>
    <Brands/>
    <Testimonials/>
    <BookCall/>
    <ContactUs/>
    <Footer/>
    </>
  )
}

export default Page