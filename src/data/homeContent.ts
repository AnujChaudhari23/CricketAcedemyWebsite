export const homeContent = {
  brand: {
    acronym: 'NVAS',
    name: 'Neena Vinod Agarwal Stadium',
    location: 'Indore, Madhya Pradesh',
  },
  navigation: [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Programs', id: 'programs' },
    { label: 'Coaches', id: 'coaches' },
    { label: 'Facilities', id: 'facilities' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Contact', id: 'contact' },
  ],
  admissionsHref: 'mailto:admissions@nvas.in?subject=Admissions%20Enquiry',
  hero: {
    eyebrow: ['Discipline', 'Skill', 'Growth'],
    headline: ['Your game.', 'Your next level.'],
    description:
      'Purpose-built coaching for the next generation of cricketers. Train with intent, build your fundamentals, and find your game at NVAS in Indore.',
    primaryAction: { label: 'Explore Training', href: '#programs' },
    secondaryAction: { label: 'Meet Our Coaches', href: '#coaches' },
    images: [
      {
        src: 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?auto=format&fit=crop&w=1900&q=85',
        srcSet: 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?auto=format&fit=crop&w=720&q=80 720w, https://images.unsplash.com/photo-1593341646782-e0b495cff86d?auto=format&fit=crop&w=1200&q=82 1200w, https://images.unsplash.com/photo-1593341646782-e0b495cff86d?auto=format&fit=crop&w=1900&q=85 1900w',
        alt: 'Cricket batter striking the ball during play',
      },
      {
        src: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1900&q=85',
        srcSet: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=720&q=80 720w, https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1200&q=82 1200w, https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1900&q=85 1900w',
        alt: 'Cricket ball resting on the grass of an open ground',
      },
    ],
  },
} as const