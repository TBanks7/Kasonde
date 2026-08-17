import type { Payload } from 'payload'
import { uploadLocalCached, uploadRemoteCached } from './assets'

export async function runSeed(payload: Payload) {
  const log: string[] = []
  const say = (msg: string) => {
    console.log(`[seed] ${msg}`)
    log.push(msg)
  }

  // ── Guard: don't double-seed ──────────────────────────────────────────
  const existingArt = await payload.count({ collection: 'art' })
  if (existingArt.totalDocs > 0) {
    say('Art collection already has documents — seed appears to have run before. Aborting to avoid duplicates.')
    return { aborted: true, log }
  }

  // ── Homepage hero images ──────────────────────────────────────────────
  say('Uploading hero images...')
  const heroFiles = Array.from({ length: 11 }, (_, i) => (i === 0 ? 'kas' : `kas${i}`))
  const heroImages: { image: number | string; alt: string }[] = []
  for (const name of heroFiles) {
    const media = await uploadLocalCached(payload, `/hero/${name}.webp`, 'Kasonde')
    if (media) heroImages.push({ image: media.id, alt: 'Kasonde' })
  }

  // ── Art: galleries ────────────────────────────────────────────────────
  say('Seeding art gallery...')
  const galleryItems = [
    {
      file: '/Poker With Life.JPG',
      title: 'Poker With Life',
      date: 'August 2020',
      style: 'Chalk on paper 33.1 x 46.8 in',
      about:
        'We get told that in life we get handed certain cards and it’s “what we do with them”. We are given life, but who hands the cards? Who’s hands control the cards? The game is rigged for majority of the minority and sometimes even when you think you are about to beat the dealer win the house - it goes up in flames. And you watch it fall into pieces and all you can do is smile. Poker with life becomes a reminder that there is nothing promised and only one thing that is sure.',
    },
    {
      file: '/I Hope what you did to me haunts you.JPG',
      title: 'I Hope what you did to me haunts you',
      date: 'October 2020',
      style: 'Mixed media 33.1 x 46.8 in',
      about:
        'What happens when your world is plagued, conflicted and abused. What obligations do you have? Do you see that it is warped? That it is made. Do you stay stuck in a fictional land and a paused future? I hope what you did to me haunts you invites the viewer to reflect on what this phrase brings up for them, to explore whether they think of someone, something or some system. To asks themselves what haunts them.',
    },
    {
      file: '/Seeing in Black and White .JPG',
      title: 'Seeing in Black and White',
      date: 'February 2021',
      style: 'Mixed media 33.1 x 46.8 in',
      about:
        'Every single thing influences, every single thing creates the whole. There’s black and there’s white all entangled, all relational. Seeing in black and white positions itself within relations to whiteness as a controlling and extractive concept that is essentially attached to being Black. It examines the ways in which ideas of Blackness can be shaped by white spaces and attachment to them. It evokes the uncomfort of those realizations by feeling incomplete, like a part is missing. That there is a part that must be rediscovered.',
    },
    {
      file: '/Deconstructed Self.JPG',
      title: 'Deconstructed Self',
      date: 'June 2023',
      style: 'Mixed media 33.1 x 46.8 in',
      about:
        'The process of deconstruction is a continuation of the Black radical experience to liberate oneself not only physically but mentally too. It calls for an identification of who’s conversation is happening internally. The colonial project\'s aim is to capture one\'s thoughts, to erase experience and plague knowledge systems. Epistemic justice is a concern with fairness in knowledge making, practising and prioritising, its about whose thoughts get to matter. Deconstructed self is a document of decolonizing the idea of self and shifting/aligning to one that inspires to be an authentic, evolving entity that is actively created and nurtured through self-love, critical awareness, and resistance to oppresive, dominator culture.',
    },
    {
      file: '/Red.JPG',
      title: 'Do you know what they say about Black bodies in the moonlight?',
      date: 'December 2025',
      style: 'Acrylic 20 x 20 in',
      about: 'They glow',
    },
  ]
  for (let i = 0; i < galleryItems.length; i++) {
    const item = galleryItems[i]
    const media = await uploadLocalCached(payload, item.file, item.title)
    if (!media) continue
    await payload.create({
      collection: 'art',
      data: {
        category: 'gallery',
        title: item.title,
        image: media.id,
        date: item.date,
        style: item.style,
        about: item.about,
        order: i,
      },
    })
  }

  // ── Art: drag (currently hotlinked from Unsplash — re-hosted into Blob) ─
  say('Seeding drag photos (re-hosting from Unsplash)...')
  const dragUrls = [
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=1200&fit=crop',
    'https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?w=1000&h=800&fit=crop',
    'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=1000&fit=crop',
  ]
  for (let i = 0; i < dragUrls.length; i++) {
    const media = await uploadRemoteCached(payload, dragUrls[i], `drag-${i + 1}.jpg`, 'Drag performance')
    if (!media) continue
    await payload.create({
      collection: 'art',
      data: { category: 'drag', image: media.id, order: i },
    })
  }

  // ── Radio episodes ────────────────────────────────────────────────────
  say('Seeding radio episodes...')
  const episodes = [
    {
      title: 'All the Wins',
      description:
        'A conversation about the small victories in the creative process and how they fuel our passion and perseverance.',
      duration: '18:26',
      audio: '/audio/All the Winss.mp3',
      poster: '/All the wins.webp',
    },
    {
      title: 'Celebrities',
      description:
        'Today, we’re diving deep into a topic that’s both fascinating and complex: the influence of celebrities in our lives. Why do we find ourselves so captivated by these figures who are, in many ways, famous for simply being famous? What does our admiration say about our values and desires?',
      duration: '30:16',
      audio: '/audio/Celebrities.mp3',
      poster: '/Celebrities.webp',
    },
    {
      title: 'I Like To Think with Tapchinn - Part 1',
      description: 'How performance artists are using their bodies as sites of resistance and reclamation.',
      duration: '28:04',
      audio: '/audio/ILiketoThinkwithTapspt1.mp3',
      poster: '/Tapchin.webp',
    },
    {
      title: 'I Like To Think with Tapchinn - Part 2',
      description: 'How performance artists are using their bodies as sites of resistance and reclamation.',
      duration: '30:24',
      // Original data referenced "ILike2ThinkwithTapspt2.mp3" (capital T) — the real file
      // on disk is cased differently. resolvePublicFile() matches it case-insensitively.
      audio: '/audio/ILike2ThinkwithTapspt2.mp3',
      poster: '/Tapchin.webp',
    },
    {
      title: 'I Like To Think with Audrey',
      description:
        'I like to think with my friend Audrey Gwiza. Audrey is a speaker, writer, and youth advocate. On this episode we reflect on digital consumerism and asking, is there pressure to perform for this machine we call the algorithm? We talk about everything from monetizing your gift, to whether that sacrifice is worth it and at what point you do recognize that gift. Come sit with us and think all these big questions through. A fan favourite episode, enjoy folks.',
      duration: '25:42',
      // Genuinely missing from public/audio/ — seeded without audio; re-upload via /admin.
      audio: '/audio/ILiketoThinkwithAudrey.mp3',
      poster: '/Audrey.webp',
    },
    {
      title: 'I Like To Think with Patricia & Amal',
      description: '',
      duration: '28:04',
      audio: '/audio/I like to think with Kasonde - Patricia & Amal - Jeff Leal.mp3',
      poster: '/Celebrities.webp',
    },
    {
      title: 'I Like To Think with Sunny Malik',
      description: '',
      duration: '30:24',
      // Genuinely missing from public/audio/ — seeded without audio; re-upload via /admin.
      audio: '/audio/I like to think with Kasonde - Sunny Malik.mp3',
      poster: '/Sunny.webp',
    },
  ]
  for (let i = 0; i < episodes.length; i++) {
    const ep = episodes[i]
    const audioMedia = await uploadLocalCached(payload, ep.audio, ep.title)
    const posterMedia = await uploadLocalCached(payload, ep.poster, ep.title)
    await payload.create({
      collection: 'radio-episodes',
      data: {
        title: ep.title,
        description: ep.description,
        duration: ep.duration,
        audio: audioMedia?.id,
        poster: posterMedia?.id,
        order: i,
      },
    })
  }

  // ── Events ────────────────────────────────────────────────────────────
  say('Seeding events...')
  const events = [
    {
      title: 'BIPOC Gallery Day',
      description:
        'A day dedicated to showcasing the work of BIPOC artists, with gallery tours, artist talks, and networking opportunities.',
      location: 'Art Space, 378 Alymer St N, Peterborough',
      date: 'July 19, 2025',
      time: '2:00 PM - 6:00 PM',
    },
    {
      title: 'Paint it Black',
      description:
        'A workshop designed for co-creation, arts and crafts in a closed Black space. This workshop was hosted in support of Community Race Relations Committee Peterborough, Trent Center for Gender and Social Justice, BLMNogo, TCSA, OPIRIG and Artspace ptbo.',
      location: 'Art Space, 378 Alymer St N, Peterborough',
      date: 'February 28, 2026',
      time: '2:00 PM - 6:00 PM',
    },
    {
      title: 'EXPLOITATION OF IMMIGRANTS: A COUNTER PUBLIC CONVERSATION',
      description:
        'A series of workshops designed to counter public dominated discourse that centers topics important to marginalized groups that seeks to activate public spaces, critical dialogue and decolonise knowledge making to center oral tradition. The topic of this conversation explored the exploitation of immigrants in so called Canada. Opened by Mauricio Interiano and Dr Kate Norlock TPS Coffee House, Philosophy Department.',
      location: 'TPS Coffee House.',
      date: 'March 13, 2025',
      time: '2:00 PM - 6:00 PM',
    },
    {
      title: 'Gender Affirming Care: A Counter Public Conversation',
      description:
        'A series of workshops designed to counter public dominated discourse that centers topics important to marginalized groups that seeks to activate public spaces, critical dialogue and decolonise knowledge making to center oral tradition. The topic of this conversation explored what gender affirming care is and how necessary free and low barrier access to services of gender affirming care remain. Opened by Dr. Byron Stoyles and Dr. Nicole Fice TPS Coffee House, Philosophy Department.',
      location: 'TPS Coffee House.',
      date: 'March 15, 2025',
      time: '2:00 PM - 6:00 PM',
    },
    {
      title:
        'Intersections of Indigenous Sovereignty, Black Liberation, Reparations and Allyship: A Counter Public Conversation',
      description:
        'A series of workshops designed to counter public dominated discourse that centers topics important to marginalized groups that seeks to activate public spaces, critical dialogue and decolonise knowledge making to center oral tradition. The topic of this conversation explored Intersections of Indigenous Sovereignty, Black Liberation, reparations and allyship. This exposed the interstices of oppression that are connected under racial capitalism that calls for repair and reimaging. Opened by Mshkiki Gitigaan Kwe TPS Coffee House, Philosophy Department.',
      location: 'TPS Coffee House.',
      date: 'March 17, 2026',
      time: '2:00 PM - 6:00 PM',
    },
  ]
  for (const event of events) {
    await payload.create({
      collection: 'events',
      data: {
        title: event.title,
        description: event.description,
        location: event.location,
        date: new Date(event.date).toISOString(),
        time: event.time,
      },
    })
  }

  // ── Essays (static/PDF only — Medium essays stay a live feed) ──────────
  say('Seeding static essays...')
  const echoChambersPdf = await uploadLocalCached(payload, '/Echo Chambers.pdf', 'Echo Chambers essay PDF')
  if (echoChambersPdf) {
    await payload.create({
      collection: 'essays',
      data: {
        title:
          'Echo Chambers, Systemic Distrust, and Misinformation: A Critical Examination of Black Twitter as a Digital Counterpublic',
        group: 'academia',
        tags: ['social media', 'digital counterpublics', 'misinformation'],
        excerpt:
          'This paper reconceptualizes Black Twitter as an epistemically virtuous echo chamber and digital counterpublic. While echo chambers are often seen as isolating and harmful, Black Twitter fosters critical engagement, collective verification, and the amplification of marginalized voices.',
        date: new Date('January 15, 2024').toISOString(),
        readTime: '15 min',
        linkType: 'pdf',
        file: echoChambersPdf.id,
      },
    })
  }

  // ── Instagram grid (8 real entries: 4 IG-specific + 4 reused art photos) ─
  say('Seeding Instagram grid...')
  const instagramFiles = [
    '/IG1.webp',
    '/Red.jpg', // case-mismatch on disk (Red.JPG) — resolved case-insensitively
    '/IG4.webp',
    '/Poker With Life.JPG',
    '/IG3.webp',
    '/Seeing in Black and White .JPG',
    '/IG2.webp',
    '/I Hope what you did to me haunts you.JPG',
  ]
  for (let i = 0; i < instagramFiles.length; i++) {
    const media = await uploadLocalCached(payload, instagramFiles[i], 'Instagram post')
    if (!media) continue
    await payload.create({
      collection: 'instagram-posts',
      data: { image: media.id, order: i },
    })
  }

  // ── Homepage global ───────────────────────────────────────────────────
  say('Setting homepage global...')
  await payload.updateGlobal({
    slug: 'homepage',
    data: {
      heroName: 'Kasonde Mutale',
      heroTagline: 'Artist · Philosopher · Storyteller',
      heroImages,
      aboutParagraphs: [
        {
          text: 'Kasonde Mutale is a Bemba artist, philosopher and storyteller from Zambia. A multidisciplinary artist working across audio, visual, and performance art, her practice is grounded in Black radical existentialism. Her work unfolds through visual storytelling, embodied performance, and philosophical inquiry, asking what it means to live, refuse, and become in the wake of Black negation.',
        },
        {
          text: 'Resisting erasure, Mutale insists on presence, memory, and radical possibility, using palettes, whimsical distortions, and meticulous detail to explore the tensions of Black existence, self-fashioning, survival, and joy. She holds an Honours degree in Philosophy and draws from Black existential and feminist thinkers such as bell hooks, Frantz Fanon, and other radical theorists to inform both her conceptual frameworks and aesthetic choices. Her primary visual mediums include oil and acrylic painting, mixed-media collage, pen, and pencil.',
        },
        {
          text: 'Her storytelling includes hosting the radio show I Like To Think, an ongoing platform for collective and personal reflection spanning social, political, and intimate terrains. Through laughing, listening, and critique, she explores what it means to exist, extending an ubuntu-influenced lens that recognizes the self through others. She invites friends and community to think and share alongside her.',
        },
        {
          text: 'In performance, she explores identity through drag, curating the persona PuSsay—a destabilizing figure that disrupts gender norms while honoring Black digital creators who shaped her imagination. As a community engagement specialist, Mutale is committed to collective practice and facilitates community workshops centred on shared making, anti-consumerist values, and art as trade, dialogue, and connection.',
        },
        {
          text: 'Loyal to being "a jack of all trades," she offers everything from service, research, and transformational development to volunteering, consulting, programming, and creative vision. A small universe with many suns.',
        },
      ],
    },
  })

  // ── Site settings global ──────────────────────────────────────────────
  say('Setting site-settings global...')
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      contactEmail: 'kasonde.mutale@hotmail.com',
      socialLinks: [
        { platform: 'instagram', handle: '@kasonde_m', url: 'https://www.instagram.com/kasonde_m' },
        { platform: 'instagram', handle: '@ilike.tothink', url: 'https://www.instagram.com/ilike.tothink' },
        { platform: 'youtube', handle: 'Kasonde', url: 'https://youtube.com/@breakingviews1on1?si=T3Fl-CmFz58ukep9' },
        { platform: 'medium', handle: 'Kasonde', url: 'https://medium.com/@kasonde.mutale' },
      ],
    },
  })

  say('Done.')
  return { aborted: false, log }
}
