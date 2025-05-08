"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Mail, Phone, Send, Github, Linkedin, Twitter, Instagram } from "lucide-react"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const formRef = useRef(null)
  const infoRef = useRef(null)
  const socialRef = useRef(null)
  const decorationRef = useRef(null)

  useEffect(() => {
    // Create a GSAP context for clean up
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(titleRef.current, { opacity: 0, y: 30 })
      gsap.set(formRef.current, { opacity: 0, x: -30 })
      gsap.set(infoRef.current, { opacity: 0, x: 30 })
      gsap.set(socialRef.current, { opacity: 0, y: 20 })
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

      gsap.to(formRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })

      gsap.to(infoRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: 0.3,
        scrollTrigger: {
          trigger: infoRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })

      gsap.to(socialRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.4,
        scrollTrigger: {
          trigger: socialRef.current,
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
        x: "-20px",
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    }, sectionRef)

    return () => ctx.revert() // Clean up animations
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically handle form submission
    console.log("Form submitted:", formData)
    alert("Thanks for your message! We'll get back to you soon.")
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 px-6 bg-[#0B0C10] text-white overflow-hidden">
      {/* Decorative elements */}
      <div
        ref={decorationRef}
        className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-gradient-to-r from-[#00FF9C]/10 to-transparent blur-3xl"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold inline-block relative">
            Get In Touch
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#00FF9C]/50 rounded-full"></span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact form */}
          <div ref={formRef} className="lg:w-1/2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white/80 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#00FF9C]/50 transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-white/80 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#00FF9C]/50 transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white/80 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#00FF9C]/50 transition-colors resize-none"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-[#00FF9C]/80 hover:bg-[#00FF9C] text-[#0B0C10] font-bold px-6 py-3 rounded-lg transition-colors duration-300"
              >
                <Send className="h-4 w-4" />
                Send Message
              </button>
            </form>
          </div>

          {/* Contact info */}
          <div ref={infoRef} className="lg:w-1/2 space-y-8">
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 text-[#00FF9C]">Contact Information</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Mail className="h-5 w-5 text-[#00FF9C] mt-1" />
                  <div>
                    <div className="font-medium">Email</div>
                    <a href="mailto:hello@tekuvo.com" className="text-white/70 hover:text-white transition-colors">
                      eajejohnson@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="h-5 w-5 text-[#00FF9C] mt-1" />
                  <div>
                    <div className="font-medium">Phone</div>
                    <a href="tel:+11234567890" className="text-white/70 hover:text-white transition-colors">
                      +234-90-7661-8975
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 text-[#00FF9C]">Office Hours</h3>
              <p className="text-white/70 mb-2">Monday - Friday: 9:00 AM - 6:00 PM WAT</p>
              <p className="text-white/70">We typically respond to inquiries within 24 hours.</p>
            </div>

            {/* Social media links */}
            <div ref={socialRef} className="pt-4">
              <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
              <div className="flex gap-4">
                <a
                  href="https://github.com/e-xxxxl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors duration-300"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/ajejohnson-emmanuel-8929902a0/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://x.com/Tekuvo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors duration-300"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="https://www.instagram.com/tekuvoo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactUs
