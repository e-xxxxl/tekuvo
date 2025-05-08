"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const Brands = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const logosRef = useRef(null)
  const logoRefs = useRef([])
  const decorationRef = useRef(null)

  // Create placeholder logos
  const logos = [
    {
      name: "TAGWURLD",
      type: "wordmark",
      industry: "Entertainment",
    },
    {
      name: "GenPay",
      type: "wordmark",
      industry: "Technology",
    },
    {
      name: "Vista",
      type: "wordmark",
      industry: "Entertainment",
    },
    {
      name: "Autodreefts",
      type: "bloom",
      industry: "Automotive",
    },
    {
      name: "AEC",
      type: "wordmark",
      industry: "Entertainment",
    },
    
  ]

  useEffect(() => {
    // Create a GSAP context for clean up
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(titleRef.current, { opacity: 0, y: 30 })
      gsap.set(subtitleRef.current, { opacity: 0, y: 30 })
      gsap.set(logoRefs.current, { opacity: 0, y: 20, scale: 0.9 })
      gsap.set(decorationRef.current, { opacity: 0, scale: 0.8 })

      // Create scroll-triggered animations
      gsap.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })

      gsap.to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: subtitleRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })

      gsap.to(decorationRef.current, {
        opacity: 0.6,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      })

      // Animate logos with stagger
      gsap.to(logoRefs.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.08,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: logosRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })

      // Create subtle floating animation for decoration
      gsap.to(decorationRef.current, {
        x: "20px",
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    }, sectionRef)

    return () => ctx.revert() // Clean up animations
  }, [])

  // Handle logo hover animations
  const handleLogoHover = (index, isHovering) => {
    gsap.to(logoRefs.current[index], {
      scale: isHovering ? 1.05 : 1,
      filter: isHovering ? "brightness(1.2)" : "brightness(1)",
      duration: 0.3,
      ease: "power2.out",
    })
  }

  // Function to generate logo SVG based on type
  const renderLogo = (logo, index) => {
    const colors = ["#FFFFFF", "#F5F5F5", "#EEEEEE", "#E0E0E0", "#D0D0D0"]
    const color = colors[index % colors.length]

    // Different logo styles based on type
    if (logo.type === "symbol") {
      return (
        <div className="flex flex-col items-center justify-center">
          <div className="w-16 h-16 flex items-center justify-center mb-3">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <circle cx="50" cy="50" r="40" fill="none" stroke={color} strokeWidth="5" />
              <path
                d={`M30,50 L45,65 L70,35`}
                fill="none"
                stroke={color}
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="text-sm font-medium text-white/80">{logo.name}</div>
        </div>
      )
    } else if (logo.type === "wordmark") {
      return (
        <div className="flex flex-col items-center justify-center">
          <div className="text-2xl font-bold tracking-tight mb-1" style={{ color }}>
            {logo.name}
          </div>
          <div className="text-xs text-white/60">{logo.industry}</div>
        </div>
      )
    } else {
      // Combination mark
      return (
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 mr-2">
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <rect x="25" y="25" width="50" height="50" rx="10" fill="none" stroke={color} strokeWidth="5" />
                <circle cx="50" cy="50" r="15" fill={color} />
              </svg>
            </div>
            <div className="text-xl font-bold" style={{ color }}>
              {logo.name}
            </div>
          </div>
          <div className="text-xs text-white/60">{logo.industry}</div>
        </div>
      )
    }
  }

  return (
    <section id="brands" ref={sectionRef} className="relative py-24 px-6 bg-[#0B0C10] text-white overflow-hidden">
      {/* Decorative elements */}
      <div
        ref={decorationRef}
        className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-gradient-to-r from-[#00FF9C]/10 to-transparent blur-3xl"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold inline-block relative">
              Trusted by Forward-Thinking Brands
            </h2>
            <span className="text-4xl" aria-hidden="true">
              🏆
            </span>
          </div>

          <p ref={subtitleRef} className="text-lg text-white/70 max-w-3xl mx-auto">
            We're proud to support both startups and established businesses in achieving their digital goals.
          </p>
        </div>

        {/* Logos grid */}
        <div ref={logosRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-10 relative">
          {/* Subtle grid pattern background */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
            aria-hidden="true"
          />

          {logos.map((logo, index) => (
            <div
              key={index}
              ref={(el) => (logoRefs.current[index] = el)}
              className="relative bg-white/5 backdrop-blur-sm rounded-lg p-6 flex items-center justify-center min-h-[120px] transition-all duration-300"
              onMouseEnter={() => handleLogoHover(index, true)}
              onMouseLeave={() => handleLogoHover(index, false)}
            >
              {renderLogo(logo, index)}
            </div>
          ))}
        </div>

        {/* Optional CTA */}
        <div className="mt-16 text-center">
          <p className="text-white/60 mb-4">Want to join our list of successful clients?</p>
          <a
            href="#contact"
            className="inline-block px-8 py-3 rounded-lg bg-white/10 hover:bg-white/15 text-[#00FF9C] font-medium transition-all duration-300 hover:scale-105"
          >
            Let's Work Together
          </a>
        </div>
      </div>
    </section>
  )
}

export default Brands
