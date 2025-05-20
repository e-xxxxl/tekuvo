"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Calendar } from 'lucide-react'

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const BookCall = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const textRef = useRef(null)
  const calendarRef = useRef(null)
  const buttonRef = useRef(null)
  const decorationRef = useRef(null)

  useEffect(() => {
    // Create a GSAP context for clean up
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(titleRef.current, { opacity: 0, y: 30 })
      gsap.set(textRef.current, { opacity: 0, y: 30 })
      gsap.set(calendarRef.current, { opacity: 0, scale: 0.9 })
      gsap.set(buttonRef.current, { opacity: 0, y: 20 })
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

      gsap.to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })

      gsap.to(calendarRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        delay: 0.3,
        scrollTrigger: {
          trigger: calendarRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })

      gsap.to(buttonRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.4,
        scrollTrigger: {
          trigger: buttonRef.current,
          start: "top 90%",
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

      // Button hover animation
      const buttonHover = gsap.to(buttonRef.current, {
        scale: 1.05,
        backgroundColor: "rgba(0, 255, 156, 1)",
        color: "#0B0C10",
        duration: 0.3,
        paused: true,
        ease: "power2.out",
      })

      buttonRef.current.addEventListener("mouseenter", () => buttonHover.play())
      buttonRef.current.addEventListener("mouseleave", () => buttonHover.reverse())
    }, sectionRef)

    return () => ctx.revert() // Clean up animations
  }, [])

  return (
    <section id="book-call" ref={sectionRef} className="relative py-24 px-6 bg-[#0B0C10] text-white overflow-hidden">
      {/* Decorative elements */}
      <div
        ref={decorationRef}
        className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-gradient-to-l from-[#00FF9C]/10 to-transparent blur-3xl"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Content */}
          <div className="md:w-1/2 text-center md:text-left">
            <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold mb-6">
              Let's Talk About <span className="text-[#00FF9C]">Your Project</span>
            </h2>
            <p ref={textRef} className="text-lg text-white/70 mb-8">
              We're happy to chat, no strings attached. Schedule a call and let's discuss how we can help bring your
              vision to life.
            </p>
            <a
              ref={buttonRef}
              href="https://calendly.com/eajejohnson"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#00FF9C]/80 text-[#0B0C10] font-bold px-8 py-4 rounded-xl transition-all duration-300"
            >
              <Calendar className="h-5 w-5" />
              Book a Free Call
            </a>
          </div>

          {/* Calendar illustration */}
          <div ref={calendarRef} className="md:w-1/2 flex justify-center">
            <div className="relative bg-white/5 backdrop-blur-sm p-6 rounded-xl w-full max-w-md">
              <div className="border-b border-white/10 pb-4 mb-4">
                <div className="text-xl font-bold mb-2">Select a time</div>
                <div className="text-white/60 text-sm">30 min | Web Conference</div>
              </div>

              {/* Mock calendar UI */}
              <div className="grid grid-cols-7 gap-1 mb-6">
                <div className="text-center text-white/40 text-xs py-1">Su</div>
                <div className="text-center text-white/40 text-xs py-1">Mo</div>
                <div className="text-center text-white/40 text-xs py-1">Tu</div>
                <div className="text-center text-white/40 text-xs py-1">We</div>
                <div className="text-center text-white/40 text-xs py-1">Th</div>
                <div className="text-center text-white/40 text-xs py-1">Fr</div>
                <div className="text-center text-white/40 text-xs py-1">Sa</div>

                {/* Calendar days */}
                {Array.from({ length: 31 }, (_, i) => (
                  <div
                    key={i}
                    className={`text-center py-2 text-sm rounded-md ${
                      i === 14
                        ? "bg-[#00FF9C]/20 text-[#00FF9C] font-medium"
                        : "hover:bg-white/10 cursor-pointer"
                    }`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>

              {/* Time slots */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="bg-white/10 hover:bg-white/20 text-center py-2 rounded-md cursor-pointer text-sm">
                  10:00 AM
                </div>
                <div className="bg-white/10 hover:bg-white/20 text-center py-2 rounded-md cursor-pointer text-sm">
                  11:00 AM
                </div>
                <div className="bg-white/10 hover:bg-white/20 text-center py-2 rounded-md cursor-pointer text-sm">
                  1:00 PM
                </div>
                <div className="bg-white/10 hover:bg-white/20 text-center py-2 rounded-md cursor-pointer text-sm">
                  2:00 PM
                </div>
              </div>

              <div className="text-center text-white/40 text-sm">
                Click the button below to see actual availability
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BookCall
