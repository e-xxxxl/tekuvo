"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const sliderRef = useRef(null)
  const testimonialRefs = useRef([])
  const decorationRef = useRef(null)

  // Testimonial data
  const testimonials = [
    {
      quote:
        "Working with Tekuvo on two development projects was seamless from start to finish. They moved fast, hit every detail with precision, and made the entire process feel effortless. A reliable partner that always delivers beyond expectations.",
      name: "Ajiboso Toluwanimi",
      role: "Startup Founder",
      company: "GenPay",
      rating: 4,
    },
    {
      quote:
        "Working with Tekuvo transformed our online presence. Their design work consistently receives compliments from our clients and has directly contributed to our growth.",
      name: "Erioluwatobi Raymond",
      role: "Founder",
      company: "Vista Dance Company",
      rating: 5,
    },
    {
      quote:
        "The team at Tekuvo delivered our pitch deck on a tight deadline and it was instrumental in securing our Series A funding. Professional, creative, and highly recommended.",
      name: "Michael Rodriguez",
      role: "CEO",
      company: "Fusion Analytics",
      rating: 5,
    },
  ]

  useEffect(() => {
    // Create a GSAP context for clean up
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(titleRef.current, { opacity: 0, y: 30 })
      gsap.set(testimonialRefs.current, { opacity: 0, y: 50 })
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

      // Create subtle floating animation for decoration
      gsap.to(decorationRef.current, {
        y: "20px",
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })

      // Initial animation for the first testimonial
      gsap.to(testimonialRefs.current[activeIndex], {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sliderRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })
    }, sectionRef)

    return () => ctx.revert() // Clean up animations
  }, [activeIndex])

  // Handle testimonial navigation
  const goToTestimonial = (index) => {
    // If it's the same index, do nothing
    if (index === activeIndex) return

    // Animate out current testimonial
    gsap.to(testimonialRefs.current[activeIndex], {
      opacity: 0,
      y: 50,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        setActiveIndex(index)
        // Animate in new testimonial
        gsap.to(testimonialRefs.current[index], {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        })
      },
    })
  }

  const nextTestimonial = () => {
    const nextIndex = (activeIndex + 1) % testimonials.length
    goToTestimonial(nextIndex)
  }

  const prevTestimonial = () => {
    const prevIndex = (activeIndex - 1 + testimonials.length) % testimonials.length
    goToTestimonial(prevIndex)
  }

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial()
    }, 8000) // Change testimonial every 8 seconds

    return () => clearInterval(interval) // Clean up on unmount
  }, [activeIndex])

  // Render star rating
  const renderRating = (rating) => {
    return (
      <div className="flex gap-1 mt-3">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 ${i < rating ? "text-[#00FF9C]" : "text-gray-400"}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    )
  }

  return (
    <section id="testimonials" ref={sectionRef} className="relative py-24 px-6 bg-[#0B0C10] text-white overflow-hidden">
      {/* Decorative elements */}
      <div
        ref={decorationRef}
        className="absolute top-40 left-10 w-72 h-72 rounded-full bg-gradient-to-b from-[#00FF9C]/10 to-transparent blur-3xl"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold inline-block relative">
            What Our Clients Say
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#00FF9C]/50 rounded-full"></span>
          </h2>
        </div>

        {/* Testimonials slider */}
        <div ref={sliderRef} className="relative max-w-4xl mx-auto">
          {/* Large quote mark */}
          <div className="absolute -top-10 -left-4 md:-left-10 text-[#00FF9C]/20">
            <Quote size={80} strokeWidth={1} />
          </div>

          {/* Testimonials */}
          <div className="relative min-h-[300px] flex items-center justify-center">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                ref={(el) => (testimonialRefs.current[index] = el)}
                className={`absolute inset-0 flex flex-col items-center justify-center text-center p-6 transition-opacity duration-500 ${
                  index === activeIndex ? "z-10" : "opacity-0"
                }`}
              >
                <p className="text-xl md:text-2xl font-light italic mb-8 leading-relaxed text-white/90">
                  "{testimonial.quote}"
                </p>
                <div className="flex flex-col items-center">
                  <div className="font-semibold text-lg text-[#00FF9C]">{testimonial.name}</div>
                  <div className="text-white/70">
                    {testimonial.role}, {testimonial.company}
                  </div>
                  {renderRating(testimonial.rating)}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 bg-white/5 hover:bg-white/10 rounded-full p-2 transition-all duration-300"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6 text-white/80" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 bg-white/5 hover:bg-white/10 rounded-full p-2 transition-all duration-300"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6 text-white/80" />
          </button>

          {/* Navigation dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "bg-[#00FF9C] w-6" : "bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={index === activeIndex ? "true" : "false"}
              />
            ))}
          </div>
        </div>

        {/* Optional CTA */}
        <div className="mt-16 text-center">
          <a
            href="#contact"
            className="inline-block px-8 py-3 rounded-lg bg-[#00FF9C]/10 hover:bg-[#00FF9C]/20 text-[#00FF9C] font-medium transition-all duration-300 hover:scale-105"
          >
            Become Our Next Success Story
          </a>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
