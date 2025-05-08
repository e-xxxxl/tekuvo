"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import heroimg from "../../assets/images/omo.jpg"

const HeroSection = () => {
  // Refs for animated elements
  const sectionRef = useRef(null)
  const contentRefs = {
    headline: useRef(null),
    subtext: useRef(null),
    cta: useRef(null),
    image: useRef(null),
    decoration: useRef(null),
  }

  // Setup animations when component mounts
  useEffect(() => {
    const ctx = gsap.context(() => {
      setupInitialStates()
      createEntranceAnimations()
    }, sectionRef)

    // Clean up animations when component unmounts
    return () => ctx.revert()
  }, [])

  // Set initial states for animations
  const setupInitialStates = () => {
    // Text elements start invisible and shifted down
    gsap.set([contentRefs.headline.current, contentRefs.subtext.current, contentRefs.cta.current], {
      opacity: 0,
      y: 30,
    })

    // Image starts invisible, scaled down and shifted right
    gsap.set(contentRefs.image.current, {
      opacity: 0,
      scale: 0.9,
      x: 30,
    })

    // Decoration starts invisible and scaled down
    gsap.set(contentRefs.decoration.current, {
      opacity: 0,
      scale: 0.5,
    })
  }

  // Create the entrance animation sequence
  const createEntranceAnimations = () => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

    // Animate elements in sequence with overlapping timing
    tl.to(contentRefs.headline.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 0.2,
    })
      .to(
        contentRefs.subtext.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
        "-=0.5",
      )
      .to(
        contentRefs.cta.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
        "-=0.5",
      )
      .to(
        contentRefs.image.current,
        {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 1,
        },
        "-=0.7",
      )
      .to(
        contentRefs.decoration.current,
        {
          opacity: 0.8,
          scale: 1,
          duration: 1.2,
          ease: "elastic.out(1, 0.3)",
        },
        "-=0.9",
      )
  }

  // Handle CTA button hover animation
  const handleCtaHover = (isHovering) => {
    gsap.to(contentRefs.cta.current, {
      scale: isHovering ? 1.05 : 1,
      duration: 0.3,
      ease: "power2.out",
    })
  }

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col-reverse md:flex-row items-center px-6 py-24 md:py-32 bg-[#0B0C10] text-white overflow-hidden"
    >
      {/* Left side: Content */}
      <div className="md:w-1/2 text-center md:text-left space-y-8 z-10">
        <h1 ref={contentRefs.headline} className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
          We Solve <span className="text-[#00FF9C]">Tech</span> Problems
        </h1>

        <p ref={contentRefs.subtext} className="text-lg md:text-xl text-white/80 max-w-lg">
          From websites to branding — Tekuvo delivers modern, reliable, and affordable solutions.
        </p>

        <a
          ref={contentRefs.cta}
          href="https://calendly.com/eajejohnson"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#00FF9C] text-[#0B0C10] px-8 py-4 rounded-xl font-semibold transition-all"
          onMouseEnter={() => handleCtaHover(true)}
          onMouseLeave={() => handleCtaHover(false)}
        >
          Book a Call
        </a>
      </div>

      {/* Right side: Image */}
      <div className="md:w-1/2 flex justify-center mb-12 md:mb-0 z-10">
        <div className="relative">
          {/* Image glow effect */}
          <div className="absolute inset-0 bg-[#00FF9C]/20 rounded-xl blur-xl"></div>

          <img
            ref={contentRefs.image}
            src={heroimg || "/placeholder.svg"}
            alt="Tekuvo services"
            className="relative w-full max-w-sm md:max-w-md rounded-xl shadow-lg"
          />
        </div>
      </div>

      {/* Decorative elements */}
      <div
        ref={contentRefs.decoration}
        className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-gradient-to-r from-[#00FF9C]/20 to-transparent blur-3xl"
        aria-hidden="true"
      />

      <div
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-gradient-to-l from-[#00FF9C]/10 to-transparent blur-3xl"
        aria-hidden="true"
      />
    </section>
  )
}

export default HeroSection
