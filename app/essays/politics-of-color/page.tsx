'use client'

import { motion } from 'framer-motion'

export default function EssayDetailPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <article className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs px-3 py-1 rounded-full uppercase tracking-wide bg-primary/20 text-primary">
              Think Piece
            </span>
            <span className="text-cream/40 text-sm">·</span>
            <span className="text-cream/40 text-sm">February 10, 2024</span>
            <span className="text-cream/40 text-sm">·</span>
            <span className="text-cream/40 text-sm">8 min read</span>
          </div>

          <h1 className="font-serif text-5xl lg:text-7xl font-bold text-cream leading-tight mb-8">
            The Politics of Color in Contemporary Art
          </h1>

          <p className="text-xl text-cream/60 leading-relaxed italic border-l-2 border-gold pl-6">
            An exploration of how color choices in modern art reflect and challenge social hierarchies, 
            identity politics, and cultural narratives.
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="prose prose-invert prose-lg max-w-none"
        >
          <div className="space-y-8 text-cream/80 leading-relaxed">
            <p className="text-xl first-letter:text-7xl first-letter:font-serif first-letter:text-gold first-letter:mr-3 first-letter:float-left first-letter:leading-none">
              Color is never neutral. In the hands of an artist, it becomes a language—one that speaks 
              of power, resistance, identity, and belonging. As we navigate the landscape of contemporary 
              art, we must ask ourselves: whose stories are told through color, and whose are systematically 
              erased?
            </p>

            <p>
              The Western canon has long privileged certain color palettes over others, associating 
              "refined" taste with muted tones and restraint. This aesthetic hierarchy is not accidental—it 
              reflects and reinforces broader systems of cultural dominance. When artists of color reclaim 
              vibrant hues, they're not simply making aesthetic choices; they're engaging in an act of 
              cultural assertion.
            </p>

            <h2 className="font-serif text-3xl font-bold text-cream mt-12 mb-6">
              The Legacy of Colonialism
            </h2>

            <p>
              Colonial powers didn't just extract resources and labor from the Global South—they also 
              appropriated and commodified color itself. Indigo, cochineal, and ochre were harvested 
              through systems of exploitation, their origins often obscured in the finished works of 
              European masters.
            </p>

            <p>
              Today's artists are excavating these histories, making visible what was hidden. They use 
              color not as decoration but as testimony, as evidence, as resistance. Each pigment carries 
              a story of extraction, labor, and survival.
            </p>

            <h2 className="font-serif text-3xl font-bold text-cream mt-12 mb-6">
              Reclaiming the Palette
            </h2>

            <p>
              Contemporary artists are expanding what we consider "appropriate" or "sophisticated" in 
              the use of color. They refuse the Western art world's subtle policing of their palettes, 
              instead drawing from cultural traditions that celebrate boldness, contrast, and sensory 
              richness.
            </p>

            <p>
              This reclamation extends beyond individual artistic practice. It challenges institutions 
              to reconsider their own aesthetic values, to question why certain color combinations read 
              as "too much" or "garish" while others are celebrated as restrained and elegant.
            </p>

            <blockquote className="border-l-4 border-gold pl-6 italic text-cream/60 my-8">
              "To paint in the colors of my ancestors is not nostalgia—it's an act of refusal. 
              I refuse to disappear into palettes that were never meant for me."
            </blockquote>

            <h2 className="font-serif text-3xl font-bold text-cream mt-12 mb-6">
              Beyond Representation
            </h2>

            <p>
              The politics of color extends beyond representation to questions of access and resources. 
              Who can afford certain pigments? Which materials are readily available, and to whom? These 
              practical considerations shape artistic production in ways that are often invisible to 
              viewers but deeply felt by creators.
            </p>

            <p>
              As we look to the future of art-making, we must consider not just who gets to make art, 
              but who gets to decide what counts as beautiful, what reads as sophisticated, what deserves 
              space in our galleries and museums. Color is one site of this ongoing negotiation—a 
              battleground where aesthetic choices become political statements.
            </p>

            <div className="mt-16 pt-8 border-t border-cream/10">
              <p className="text-sm text-cream/40">
                This essay is part of an ongoing series exploring the intersection of aesthetics and power 
                in contemporary art practice.
              </p>
            </div>
          </div>
        </motion.div>
      </article>
    </div>
  )
}
