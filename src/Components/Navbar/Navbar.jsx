"use client"

import { useEffect, useState } from "react"
import { gsap } from "gsap"
import { Menu, X, Sun, Moon } from "lucide-react"

// Utility function for conditional class names
const cn = (...classes) => {
  return classes.filter(Boolean).join(" ")
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [theme, setTheme] = useState("dark")

  useEffect(() => {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle("dark", savedTheme === "dark")
    } else {
      setTheme(prefersDark ? "dark" : "light")
      document.documentElement.classList.toggle("dark", prefersDark)
    }
  }, [])

  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.toggle("dark", theme === "dark")

    // Save theme preference
    localStorage.setItem("theme", theme)
  }, [theme])

  useEffect(() => {
    // GSAP animations for nav items
    gsap.fromTo(
      ".nav-item",
      { opacity: 0, y: -20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.6,
        ease: "power3.out",
      },
    )
  }, [])

  useEffect(() => {
    // GSAP animations for mobile nav items
    if (isMenuOpen) {
      gsap.fromTo(
        ".nav-item-mobile",
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.4,
          ease: "power2.out",
          delay: 0.2,
        },
      )
    }
  }, [isMenuOpen])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 shadow-lg py-4 px-6",
        "transition-colors duration-300",
        "dark:bg-[#0B0C10] dark:text-white",
        "bg-white text-[#0B0C10]",
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold">Tekuvo</div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6 font-medium">
          <li className="nav-item hover:text-[#00FF9C] dark:hover:text-[#00FF9C] transition cursor-pointer">
            <a href="#about">About</a>
          </li>
          <li className="nav-item hover:text-[#00FF9C] dark:hover:text-[#00FF9C] transition cursor-pointer">
            <a href="#services">Services</a>
          </li>
          <li className="nav-item hover:text-[#00FF9C] dark:hover:text-[#00FF9C] transition cursor-pointer">
            <a href="#brands">Brands</a>
          </li>
          <li className="nav-item hover:text-[#00FF9C] dark:hover:text-[#00FF9C] transition cursor-pointer">
            <a href="#contact">Contact</a>
          </li>
        </ul>

        <div className="flex items-center space-x-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
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
