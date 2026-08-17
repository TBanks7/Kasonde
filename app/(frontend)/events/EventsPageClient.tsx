'use client'

import { motion } from 'framer-motion'

interface EventItem {
  id: string | number
  title: string
  description: string
  location: string
  date: string
  time: string
}

function parseEventDate(dateStr: string): Date {
  // Parse the date and set time to end of day (23:59:59)
  const parsed = new Date(dateStr)
  parsed.setHours(23, 59, 59, 999)
  return parsed
}

const PinIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

export default function EventsPageClient({ events }: { events: EventItem[] }) {
  const today = new Date()

  const upcomingEvents = events
    .filter((w) => parseEventDate(w.date) >= today)
    .sort((a, b) => parseEventDate(a.date).getTime() - parseEventDate(b.date).getTime())

  const pastEvents = events
    .filter((w) => parseEventDate(w.date) < today)
    .sort((a, b) => parseEventDate(b.date).getTime() - parseEventDate(a.date).getTime())

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
      {upcomingEvents.length > 0 && (
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
                      <PinIcon />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <button className="flex-shrink-0 px-8 py-3 bg-gold text-background rounded-full font-semibold hover:bg-gold/90 transition-all duration-300 text-center">
                    Book a Spot
                  </button>
                </div>
                <p className="text-cream/70 leading-relaxed text-justify">
                  {event.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-serif text-4xl font-bold text-cream/50 mb-8"
          >
            Past Events
          </motion.h2>

          <div className="space-y-6">
            {pastEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.07 }}
                className="bg-surface/30 border border-cream/5 rounded-lg p-8 hover:border-cream/10 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                  <h3 className="font-serif text-xl text-cream/70 font-bold">
                    {event.title}
                  </h3>
                  <span className="flex-shrink-0 text-cream/30 text-sm">{event.date}</span>
                </div>
                <p className="text-cream/50 text-sm mb-3 text-justify leading-relaxed">
                  {event.description}
                </p>
                <div className="flex items-center gap-2 text-cream/30 text-xs">
                  <PinIcon />
                  <span>{event.location}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
