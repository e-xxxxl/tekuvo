"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

const Footer = () => {
  const footerRef = useRef(null)
  const linksRef = useRef(null)
  const copyrightRef = useRef(null)
  const logoRef = useRef(null)

  useEffect(() => {
    // Create a GSAP context for clean up
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(linksRef.current, { opacity: 0, y: 20 })
      gsap.set(copyrightRef.current, { opacity: 0, y: 20 })
      gsap.set(logoRef.current, { opacity: 0, scale: 0.9 })

      // Create animations
      gsap.to(logoRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
      })

      gsap.to(linksRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power2.out",
      })

      gsap.to(copyrightRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power2.out",
      })
    }, footerRef)

    return () => ctx.revert() // Clean up animations
  }, [])

  // Get current year for copyright
  const currentYear = new Date().getFullYear()

  return (
    <footer ref={footerRef} className="bg-[#070809] text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo */}
          <div ref={logoRef} className="text-2xl font-bold text-[#00FF9C]">
            Tekuvo
          </div>

          {/* Navigation links */}
          <nav ref={linksRef}>
            <ul className="flex flex-wrap justify-center gap-8">
              <li>
                <a href="#" className="text-white/70 hover:text-[#00FF9C] transition-colors duration-300">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-white/70 hover:text-[#00FF9C] transition-colors duration-300">
                  About
                </a>
              </li>
              <li>
                <a href="#services" className="text-white/70 hover:text-[#00FF9C] transition-colors duration-300">
                  Services
                </a>
              </li>
              <li>
                <a href="#brands" className="text-white/70 hover:text-[#00FF9C] transition-colors duration-300">
                  Brands
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-white/70 hover:text-[#00FF9C] transition-colors duration-300">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#contact" className="text-white/70 hover:text-[#00FF9C] transition-colors duration-300">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 my-8"></div>

        {/* Copyright */}
        <div ref={copyrightRef} className="text-center text-white/50 text-sm">
          <p>Copyright © {currentYear} Tekuvo. All rights reserved.</p>
          <p className="mt-2">
            <a href="#" className="hover:text-white/80 transition-colors duration-300">
              Privacy Policy
            </a>{" "}
            •{" "}
            <a href="#" className="hover:text-white/80 transition-colors duration-300">
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
