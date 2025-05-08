"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const AboutUs = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const textRef = useRef(null)
  const taglineRef = useRef(null)
  const statsRef = useRef(null)
  const decorationRef = useRef(null)
  const cardRefs = useRef([])

  // Services/values cards
  const cards = [
    {
      icon: "🌐",
      title: "Website Development",
      description: "Custom websites built with modern technologies for optimal performance and user experience.",
    },
    {
      icon: "🎨",
      title: "Graphic & Brand Design",
      description: "Memorable visual identities and graphics that communicate your brand values.",
    },
    {
      icon: "📱",
      title: "Social Media Design",
      description: "Engaging visual content optimized for social platforms to boost your online presence.",
    },
    {
      icon: "📈",
      title: "Pitch Decks & Business Proposals",
      description: "Compelling presentations that help you win clients and secure investments.",
    },
    {
      icon: "💡",
      title: "Tech Consulting",
      description: "Expert guidance on technology solutions to solve your business challenges.",
    },
  ]

  useEffect(() => {
    // Create a GSAP context for clean up
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(titleRef.current, { opacity: 0, y: 30 })
      gsap.set(textRef.current, { opacity: 0, y: 30 })
      gsap.set(taglineRef.current, { opacity: 0, y: 30 })
      gsap.set(statsRef.current, { opacity: 0, y: 30 })
      gsap.set(decorationRef.current, { opacity: 0, scale: 0.8 })
      gsap.set(cardRefs.current, { opacity: 0, y: 50, stagger: 0.1 })

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

      gsap.to(taglineRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.3,
        scrollTrigger: {
          trigger: taglineRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })

      gsap.to(statsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.4,
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })

      gsap.to(decorationRef.current, {
        opacity: 0.7,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      })

      // Animate cards with stagger
      gsap.to(cardRefs.current, {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardRefs.current[0],
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })

      // Create floating animation for decoration
      gsap.to(decorationRef.current, {
        y: "20px",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    }, sectionRef)

    return () => ctx.revert() // Clean up animations
  }, [])

  // Handle card hover animations
  const handleCardHover = (index, isHovering) => {
    gsap.to(cardRefs.current[index], {
      y: isHovering ? -10 : 0,
      boxShadow: isHovering ? "0 10px 30px rgba(0, 255, 156, 0.2)" : "0 4px 20px rgba(0, 0, 0, 0.1)",
      duration: 0.3,
      ease: "power2.out",
    })
  }

  return (
    <section id="about" ref={sectionRef} className="relative py-24 px-6 bg-[#0B0C10] text-white overflow-hidden">
      {/* Decorative elements */}
      <div
        ref={decorationRef}
        className="absolute top-40 right-10 w-72 h-72 rounded-full bg-gradient-to-b from-[#00FF9C]/10 to-transparent blur-3xl"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold mb-6 inline-block relative">
            About Us
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#00FF9C]/50 rounded-full"></span>
          </h2>

          <p ref={textRef} className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-6 leading-relaxed">
            Tekuvo is a full-service creative tech agency helping startups and businesses build strong digital
            identities through design and development.
          </p>

          <p ref={taglineRef} className="text-xl md:text-2xl font-medium text-[#00FF9C] italic">
            "Transforming ideas into digital experiences that matter."
          </p>
        </div>

        {/* Stats section */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          <div className="text-center p-4 rounded-lg bg-white/5 backdrop-blur-sm">
            <div className="text-3xl md:text-4xl font-bold text-[#00FF9C]">10+</div>
            <div className="text-sm md:text-base text-white/70">Projects Completed</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-white/5 backdrop-blur-sm">
            <div className="text-3xl md:text-4xl font-bold text-[#00FF9C]">10+</div>
            <div className="text-sm md:text-base text-white/70">Happy Clients</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-white/5 backdrop-blur-sm">
            <div className="text-3xl md:text-4xl font-bold text-[#00FF9C]">3+</div>
            <div className="text-sm md:text-base text-white/70">Years Experience</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-white/5 backdrop-blur-sm">
            <div className="text-3xl md:text-4xl font-bold text-[#00FF9C]">5</div>
            <div className="text-sm md:text-base text-white/70">Expert Services</div>
          </div>
        </div>

        {/* Cards section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className="bg-white/5 backdrop-blur-sm p-6 rounded-xl transition-all duration-300"
              onMouseEnter={() => handleCardHover(index, true)}
              onMouseLeave={() => handleCardHover(index, false)}
            >
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-[#00FF9C]">{card.title}</h3>
              <p className="text-white/70">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutUs
