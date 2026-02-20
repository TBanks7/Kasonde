'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    console.log('Form submitted:', formData)
    setSubmitStatus('success')
    setFormData({ name: '', email: '', subject: '', message: '' })
    setIsSubmitting(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h1 className="font-serif text-7xl lg:text-9xl font-bold text-cream mb-6">
            Contact
          </h1>
          <p className="text-cream/60 text-xl font-serif italic">
            Let's make something.
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-8 mb-16"
        >
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-cream/70 text-sm mb-2 tracking-wide uppercase">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-6 py-4 bg-surface/50 border border-cream/10 rounded-lg text-cream placeholder-cream/30 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-all duration-300"
              placeholder="Your name"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-cream/70 text-sm mb-2 tracking-wide uppercase">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-6 py-4 bg-surface/50 border border-cream/10 rounded-lg text-cream placeholder-cream/30 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-all duration-300"
              placeholder="your@email.com"
            />
          </div>

          {/* Subject */}
          <div>
            <label htmlFor="subject" className="block text-cream/70 text-sm mb-2 tracking-wide uppercase">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              required
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-6 py-4 bg-surface/50 border border-cream/10 rounded-lg text-cream placeholder-cream/30 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-all duration-300"
              placeholder="What's this about?"
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-cream/70 text-sm mb-2 tracking-wide uppercase">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={8}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-6 py-4 bg-surface/50 border border-cream/10 rounded-lg text-cream placeholder-cream/30 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-all duration-300 resize-none"
              placeholder="Tell me more..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-8 py-5 bg-gold text-background rounded-lg font-semibold text-lg hover:bg-gold/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-gold/10 border border-gold/30 rounded-lg text-gold text-center"
            >
              Message sent! I'll get back to you soon.
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-primary/10 border border-primary/30 rounded-lg text-primary text-center"
            >
              Something went wrong. Please try again or email me directly.
            </motion.div>
          )}
        </motion.form>

        {/* Direct Email */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center pt-8 border-t border-cream/10"
        >
          <p className="text-cream/50 text-sm mb-2 tracking-wide uppercase">
            Or email directly
          </p>
          <a
            href="mailto:hello@kasonde.com"
            className="text-gold hover:text-gold/80 font-serif text-2xl transition-colors duration-300"
          >
            hello@kasonde.com
          </a>
        </motion.div>
      </div>
    </div>
  )
}
