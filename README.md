# Kasonde — Personal Brand Website

A distinctive, editorial personal brand website for multidisciplinary creative Kasonde. Built with Next.js, TypeScript, and Tailwind CSS.

## 🎨 Design Philosophy

This website blends **art-book aesthetics with music magazine editorial style** — creating a dark, sophisticated, and feminine (but not overtly so) experience. The design prioritizes:

- **Bold typography** with high-contrast serif headings (Playfair Display)
- **Asymmetric layouts** that feel curated and intentional
- **Subtle animations** that enhance without overwhelming
- **Dark elegance** with a navy-black background and grain texture
- **Strategic color use** — electric blue and warm gold as accents

## 🎯 Features

### Core Pages
- **Homepage** — Split-screen with photo + asymmetric tile grid navigation
- **Art** — Galleries, Workshops, and Drag sections with masonry layouts
- **Essays** — Editorial blog with Think Pieces and Academia
- **Radio** — Audio episodes and video content
- **Vlogs** — Casual lifestyle video grid
- **Events** — Upcoming and past events showcase
- **Socials** — Link-in-bio style social media hub
- **Contact** — Minimal, elegant contact form

### Unique Features
- **Spotify Widget** — Persistent "Now Playing" widget (bottom-left)
- **Grain Texture** — Subtle CSS-based noise overlay
- **Tile Navigation** — Asymmetric masonry grid (no traditional nav bar)
- **Smooth Transitions** — Framer Motion page animations
- **Lightbox Gallery** — Full-screen image viewing
- **Video Modals** — In-page video playback

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 🎨 Color Palette

```css
--primary: #4f70ff       /* Electric Blue — highlights, hovers */
--background: #0a0e1a    /* Deep Navy-Black */
--surface: #111827       /* Card/Surface backgrounds */
--cream: #f5f0eb         /* Warm off-white text */
--gold: #e8b86d          /* Warm gold — accents, active states */
```

**Usage Philosophy:**
- Blue: Sparingly, for highlights and interactive elements
- Gold: Hover states, active tiles, underlines, small details
- Cream: Primary text and content
- Background: Deep navy-black throughout

## 📁 Project Structure

```
kasonde/
├── app/
│   ├── art/                 # Art page with sections
│   ├── essays/              # Essays listing + detail pages
│   ├── radio/               # Audio & video content
│   ├── vlogs/               # Lifestyle video grid
│   ├── events/              # Upcoming & past events
│   ├── socials/             # Social media links
│   ├── contact/             # Contact form
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   └── globals.css          # Global styles
├── components/
│   ├── SpotifyWidget.tsx    # Now Playing widget
│   └── BackToHome.tsx       # Navigation element
└── public/                  # Static assets
```

## 🎵 Spotify Integration

The Spotify "Now Playing" widget is ready to connect to the Spotify Web API.

### Setup Instructions

1. **Create a Spotify App**
   - Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
   - Create a new app
   - Note your Client ID and Client Secret

2. **Get Access Token**
   - Use the [Spotify Authorization Guide](https://developer.spotify.com/documentation/web-api/tutorials/getting-started)
   - Request the `user-read-recently-played` scope

3. **Update the Widget**
   - Open `components/SpotifyWidget.tsx`
   - Find the commented API call around line 24
   - Replace `YOUR_ACCESS_TOKEN_HERE` with your token
   - Uncomment the fetch code

The widget shows:
- Album art thumbnail
- Track name
- Artist name
- Animated equalizer bars when playing
- "Last Played" fallback when nothing is active

## 🖼️ Customization

### Replace Placeholder Images

All images use Unsplash placeholders. Replace with your own:

1. Add images to `/public/images/`
2. Update image URLs in each page component
3. Use Next.js `<Image>` component for optimization

### Update Content

Content is hardcoded in each page component:

- **Homepage tiles**: `app/page.tsx` — Update `tiles` array
- **Gallery images**: `app/art/page.tsx` — Update `galleryImages` array
- **Essays**: `app/essays/page.tsx` — Update `essays` array
- **Events**: `app/events/page.tsx` — Update `upcomingEvents` and `pastEvents`

### Modify Colors

Edit `tailwind.config.js` to change the color scheme:

```js
theme: {
  extend: {
    colors: {
      primary: '#4f70ff',    // Change this
      background: '#0a0e1a', // And this
      // etc.
    },
  },
},
```

## 📱 Responsive Design

The site is mobile-first and fully responsive:

- **Desktop**: Split-screen homepage, multi-column grids
- **Tablet**: Adapted layouts, responsive tile grid
- **Mobile**: Stacked layouts, 2-column tile grid, touch-optimized

Test on actual devices for best results.

## 🎭 Animations

All animations use Framer Motion for smooth, performant transitions:

- **Page transitions**: Fade + slide on route changes
- **Tile hovers**: Scale + color overlay
- **Content reveals**: Staggered animations on scroll
- **Modals**: Scale + fade for lightboxes

Reduce motion preferences are respected via CSS `prefers-reduced-motion`.

## 🔧 Technical Details

### Built With
- **Next.js 14** — App Router
- **TypeScript** — Type safety
- **Tailwind CSS** — Utility-first styling
- **Framer Motion** — Animations
- **React** — UI framework

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Performance
- Image optimization via Next.js `<Image>`
- Code splitting via Next.js routing
- CSS purging via Tailwind
- Lazy loading for images and videos

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Deploy automatically
4. Connect custom domain

### Deploy to Netlify

1. Push code to GitHub
2. Import to [Netlify](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `.next`

### Environment Variables

If using Spotify API or contact form backend:

```env
SPOTIFY_ACCESS_TOKEN=your_token_here
CONTACT_FORM_ENDPOINT=your_endpoint_here
```

## 📝 To-Do / Future Enhancements

- [ ] Connect Spotify API for real "Now Playing" data
- [ ] Add CMS integration (Sanity/Contentful) for easier content updates
- [ ] Implement actual contact form backend (Resend/SendGrid)
- [ ] Add blog post pagination on Essays page
- [ ] Create more essay detail pages
- [ ] Add search functionality
- [ ] Implement analytics (Vercel Analytics/Google Analytics)
- [ ] Add newsletter signup
- [ ] Create custom 404 and error pages

## 🎨 Design Credits

**Typography:**
- Headings: Playfair Display (Google Fonts)
- Body: DM Sans (Google Fonts)

**Images:**
- Placeholder images from Unsplash
- Replace with your own professional photography

**Inspiration:**
- Art book editorial layouts
- Music magazine aesthetics
- Contemporary portfolio sites

## 📄 License

This project is proprietary and confidential.

---

**Built for Kasonde** — Multidisciplinary creative, artist, writer, and broadcaster.
