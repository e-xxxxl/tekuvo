"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import heroimg from "../../assets/images/omo.jpg"

const HeroSection = () => {
  // Single ref for the entire animation context
  const containerRef = useRef(null)
  const animationRefs = {
    headline: useRef(null),
    subtext: useRef(null),
    cta: useRef(null),
    image: useRef(null),
    decoration: useRef(null),
  }

  // Animation setup with performance optimizations
  useEffect(() => {
    // Register GSAP plugins and set will-change properties
    gsap.registerPlugin({
      /* any plugins would go here */
    })

    const ctx = gsap.context(() => {
      // Set initial states with will-change for GPU acceleration
      gsap.set([
        animationRefs.headline.current,
        animationRefs.subtext.current,
        animationRefs.cta.current
      ], {
        opacity: 0,
        y: 20,
        willChange: "opacity, transform"
      })

      gsap.set(animationRefs.image.current, {
        opacity: 0,
        scale: 0.95,
        x: 20,
        willChange: "opacity, transform"
      })

      gsap.set(animationRefs.decoration.current, {
        opacity: 0,
        scale: 0.5,
        willChange: "opacity, transform"
      })

      // Create optimized animation timeline
      const tl = gsap.timeline({
        defaults: { 
          ease: "power3.out",
          duration: 0.8 
        },
        onStart: () => {
          // Force GPU acceleration at animation start
          gsap.set(containerRef.current, { willChange: "contents" })
        },
        onComplete: () => {
          // Clean up will-change after animation
          gsap.set(containerRef.current, { willChange: "auto" })
        }
      })

      // Optimized animation sequence
      tl.addLabel("start", 0)
        .fromTo(animationRefs.headline.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1 },
          "start+=0.2"
        )
        .fromTo(animationRefs.subtext.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1 },
          "start+=0.4"
        )
        .fromTo(animationRefs.cta.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1 },
          "start+=0.6"
        )
        .fromTo(animationRefs.image.current,
          { x: 20, scale: 0.95, opacity: 0 },
          { x: 0, scale: 1, opacity: 1 },
          "start+=0.3"
        )
        .fromTo(animationRefs.decoration.current,
          { scale: 0.5, opacity: 0 },
          { 
            scale: 1,
            opacity: 0.8,
            ease: "elastic.out(1, 0.3)",
            duration: 1.2
          },
          "start+=0.5"
        )

    }, containerRef)

    return () => ctx.revert()
  }, [])

  // Optimized hover animation using transforms
  const handleCtaHover = (isHovering) => {
    gsap.to(animationRefs.cta.current, {
      scale: isHovering ? 1.03 : 1,
      duration: 0.25,
      ease: "power1.out",
      overwrite: "auto" // Prevent animation conflicts
    })
  }

  return (
    <section
      ref={containerRef}
      className="relative flex flex-col-reverse md:flex-row items-center px-6 py-24 md:py-32 bg-[#0B0C10] text-white overflow-hidden"
      style={{ 
        backfaceVisibility: 'hidden',
        transformStyle: 'preserve-3d' 
      }}
    >
      {/* Content Section */}
      <div className="md:w-1/2 text-center md:text-left space-y-8 z-10">
        <h1 
          ref={animationRefs.headline} 
          className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
          style={{ willChange: 'transform, opacity' }}
        >
          We Solve <span className="text-[#00FF9C]">Tech</span> Problems
        </h1>

        <p 
          ref={animationRefs.subtext} 
          className="text-lg md:text-xl text-white/80 max-w-lg"
          style={{ willChange: 'transform, opacity' }}
        >
          From websites to branding — Tekuvo delivers modern, reliable, and affordable solutions.
        </p>

        <a
          ref={animationRefs.cta}
          href="https://calendly.com/eajejohnson"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#00FF9C] text-[#0B0C10] px-8 py-4 rounded-xl font-semibold transition-transform duration-200 will-change-transform"
          style={{ transformOrigin: 'center center' }}
          onMouseEnter={() => handleCtaHover(true)}
          onMouseLeave={() => handleCtaHover(false)}
        >
          Book a Call
        </a>
      </div>

      {/* Image Section */}
      <div className="md:w-1/2 flex justify-center mb-12 md:mb-0 z-10">
        <div className="relative" style={{ willChange: 'transform, opacity' }}>
          <div className="absolute inset-0 bg-[#00FF9C]/20 rounded-xl blur-xl"></div>
          <img
            ref={animationRefs.image}
            src={heroimg || "/placeholder.svg"}
            alt="Tekuvo services"
            className="relative w-full max-w-sm md:max-w-md rounded-xl shadow-lg"
            style={{ 
              transformOrigin: 'center center',
              backfaceVisibility: 'hidden'
            }}
          />
        </div>
      </div>

      {/* Decorative Elements */}
      <div
        ref={animationRefs.decoration}
        className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-gradient-to-r from-[#00FF9C]/20 to-transparent blur-3xl"
        aria-hidden="true"
        style={{ willChange: 'transform, opacity' }}
      />

      <div
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-gradient-to-l from-[#00FF9C]/10 to-transparent blur-3xl"
        aria-hidden="true"
      />
    </section>
  )
}

export default HeroSection