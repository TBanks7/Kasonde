'use client'

import { motion } from 'framer-motion'

const upcomingEvents = [
  {
    id: 1,
    title: 'Solo Exhibition: "Reclamation"',
    date: 'March 22, 2024',
    time: '6:00 PM - 9:00 PM',
    location: 'Gallery Modern, Downtown',
    description: 'A collection of new works exploring themes of identity, power, and belonging. Opening reception with artist talk at 7:00 PM.',
    ticketLink: '#',
  },
  {
    id: 2,
    title: 'Panel Discussion: Art & Activism',
    date: 'April 5, 2024',
    time: '7:00 PM - 9:00 PM',
    location: 'Community Arts Center',
    description: 'Join me and fellow artists for a conversation about the role of art in social movements and community organizing.',
    ticketLink: '#',
  },
  {
    id: 3,
    title: 'Workshop: Abstract Expression',
    date: 'April 22, 2024',
    time: '10:00 AM - 4:00 PM',
    location: 'Studio Kasonde',
    description: 'A full-day intensive exploring abstract techniques, color theory, and finding your unique artistic voice.',
    ticketLink: '#',
  },
]

const pastEvents = [
  {
    id: 1,
    title: 'Group Show: "Voices Rising"',
    date: 'January 15, 2024',
    location: 'The Warehouse Gallery',
  },
  {
    id: 2,
    title: 'Artist Residency: Creative Retreat',
    date: 'December 2023',
    location: 'Mountain Arts Center',
  },
  {
    id: 3,
    title: 'Radio Live Recording',
    date: 'November 10, 2023',
    location: 'CKUT 90.3 FM Studio',
  },
  {
    id: 4,
    title: 'Workshop: Color Theory Fundamentals',
    date: 'October 28, 2023',
    location: 'Studio Kasonde',
  },
]

export default function EventsPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto mb-16"
      >
        <h1 className="font-serif text-7xl lg:text-9xl font-bold text-cream mb-6">
          Events
        </h1>
        <p className="text-cream/60 text-lg max-w-2xl">
          Exhibitions, workshops, talks, and gatherings. Come connect, create, 
          and be part of the conversation.
        </p>
      </motion.div>

      {/* Upcoming Events */}
      <div className="max-w-5xl mx-auto mb-20">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="font-serif text-4xl font-bold text-gold mb-8"
        >
          Upcoming
        </motion.h2>

        <div className="space-y-8">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-surface/50 border-l-4 border-gold rounded-lg p-8 hover:bg-surface/80 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-serif text-3xl text-cream font-bold mb-2">
                    {event.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-cream/60 text-sm">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{event.date}</span>
                    </div>
                    <span>·</span>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{event.time}</span>
                    </div>
                    <span>·</span>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
                <a
                  href={event.ticketLink}
                  className="flex-shrink-0 px-8 py-3 bg-gold text-background rounded-full font-semibold hover:bg-gold/90 transition-all duration-300 text-center"
                >
                  Get Tickets
                </a>
              </div>
              <p className="text-cream/70 leading-relaxed">
                {event.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Past Events */}
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-serif text-4xl font-bold text-cream/50 mb-8"
        >
          Past Events
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-4">
          {pastEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.05 }}
              className="bg-surface/30 border border-cream/5 rounded-lg p-6 hover:border-cream/10 transition-all duration-300"
            >
              <h3 className="font-serif text-xl text-cream/70 font-bold mb-2">
                {event.title}
              </h3>
              <div className="flex items-center gap-3 text-cream/40 text-sm">
                <span>{event.date}</span>
                <span>·</span>
                <span>{event.location}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
