"use client"

import { useEffect, useState, useRef } from "react"
import { gsap } from "gsap"
import { Menu, X } from "lucide-react"

const cn = (...classes) => classes.filter(Boolean).join(" ")

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navRef = useRef(null)
  const mobileMenuRef = useRef(null)

  // Desktop nav animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".nav-item", {
        opacity: 0,
        y: -10,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.3
      })
    }, navRef)

    return () => ctx.revert()
  }, [])

  // Mobile nav animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isMenuOpen) {
        gsap.from(".nav-item-mobile", {
          opacity: 0,
          x: 10,
          duration: 0.3,
          stagger: 0.08,
          ease: "power2.out",
          delay: 0.15
        })
      }
    }, mobileMenuRef)

    return () => ctx.revert()
  }, [isMenuOpen])

  // Disable scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isMenuOpen])

  const toggleMenu = () => setIsMenuOpen((prev) => !prev)

  return (
    <nav
      ref={navRef}
      className={cn(
        "fixed top-0 left-0 w-full z-50 py-4 px-6",
        "bg-[#0B0C10] text-white shadow-lg transition-colors duration-300"
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">Tekuvo</div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6 font-medium">
          {["About", "Services", "Brands", "Contact"].map((item) => (
            <li
              key={item}
              className="nav-item hover:text-[#00FF9C] transition-colors duration-200 cursor-pointer"
            >
              <a href={`#${item.toLowerCase()}`}>{item}</a>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden p-2 rounded-full hover:bg-gray-800 transition"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <div
        ref={mobileMenuRef}
        className={cn(
          "fixed top-0 right-0 h-full w-[80%] max-w-sm bg-[#0B0C10] shadow-2xl z-50",
          "transition-transform duration-300 ease-in-out transform",
          isMenuOpen ? "translate-x-0" : "translate-x-full",
          "md:hidden flex flex-col"
        )}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-800">
          <div className="text-xl font-bold">Tekuvo</div>
          <button
            className="p-2 rounded-full hover:bg-gray-800 transition"
            onClick={toggleMenu}
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <ul className="flex flex-col p-6 space-y-6 text-lg font-medium">
          {["About", "Services", "Brands", "Contact"].map((item) => (
            <li
              key={item}
              className="nav-item-mobile hover:translate-x-1 transition-all duration-200 hover:text-[#00FF9C]"
            >
              <a href={`#${item.toLowerCase()}`} onClick={toggleMenu}>
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>

        {/* Mobile Navigation Backdrop */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={toggleMenu} aria-hidden="true" />
      )}

      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          "md:hidden fixed top-0 right-0 z-50 h-full w-[80%] max-w-sm bg-white dark:bg-[#0B0C10] shadow-xl",
          "transform transition-all duration-300 ease-in-out",
          "flex flex-col",
          isMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex justify-between items-center p-6 border-b dark:border-gray-800">
          <div className="text-xl font-bold">Tekuvo</div>
          <button
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition"
            onClick={toggleMenu}
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <ul className="flex flex-col p-6 space-y-6 text-lg font-medium">
          <li className="nav-item-mobile transform transition-all duration-300 hover:translate-x-2 hover:text-[#00FF9C] dark:hover:text-[#00FF9C]">
            <a href="#about" onClick={toggleMenu}>
              About
            </a>
          </li>
          <li className="nav-item-mobile transform transition-all duration-300 hover:translate-x-2 hover:text-[#00FF9C] dark:hover:text-[#00FF9C]">
            <a href="#services" onClick={toggleMenu}>
              Services
            </a>
          </li>
          <li className="nav-item-mobile transform transition-all duration-300 hover:translate-x-2 hover:text-[#00FF9C] dark:hover:text-[#00FF9C]">
            <a href="#brands" onClick={toggleMenu}>
              Brands
            </a>
          </li>
          <li className="nav-item-mobile transform transition-all duration-300 hover:translate-x-2 hover:text-[#00FF9C] dark:hover:text-[#00FF9C]">
            <a href="#contact" onClick={toggleMenu}>
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
