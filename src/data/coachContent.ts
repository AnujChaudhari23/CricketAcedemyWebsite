export interface CoachProfile {
  id: string
  slug: string
  fullName?: string
  role?: string
  portrait?: string
  portraitFallback?: string
  portraitAlt?: string
  portraitFocusX?: number
  portraitFocusY?: number
  portraitWidth?: number
  portraitHeight?: number
  portraitSourceUrl?: string
  shortBio?: string
  fullBio?: string
  qualifications?: string[]
  specialties?: string[]
  yearsExperience?: number
  featured: boolean
  published: boolean
  sortOrder: number
  isDevelopmentPlaceholder: boolean
}

interface CoachContent {
  id: string
  publicationStatus: 'draft' | 'published'
  displayOrder: number
  eyebrow: string
  heading: string
  description: string
  illustrativeDisclosure: string
  action: { label: string; href: string }
  coaches: CoachProfile[]
}

export const coachContent: CoachContent = {
  id: 'coaches',
  publicationStatus: 'published',
  displayOrder: 5,
  eyebrow: 'The people behind the progress',
  heading: 'Experience that shapes the game.',
  description:
    'Coaching brings skill development, discipline and player growth together, helping every practice move the game forward.',
  illustrativeDisclosure:
    'Illustrative coaching photographs only; these people are not NVAS coaches.',
  action: {
    label: 'Meet the Coaching Team',
    href: '/coaches',
  },
  coaches: [
    {
      id: 'coach-profile-featured-placeholder',
      slug: 'coach-profile-placeholder-featured',
      portrait:
        'https://images.pexels.com/photos/37145697/pexels-photo-37145697.jpeg?auto=compress&cs=tinysrgb&w=1400&h=1800&fit=crop',
      portraitFallback:
        'https://images.pexels.com/photos/13509630/pexels-photo-13509630.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1500&fit=crop',
      portraitAlt:
        'Illustrative cricket coaching scene of a coach gesturing to a player during practice; not an NVAS coach.',
      portraitFocusX: 52,
      portraitFocusY: 34,
      portraitWidth: 1400,
      portraitHeight: 1800,
      portraitSourceUrl:
        'https://www.pexels.com/photo/cricket-coach-guiding-player-on-sunny-day-37145697/',
      featured: true,
      published: true,
      sortOrder: 1,
      isDevelopmentPlaceholder: true,
    },
    {
      id: 'coach-profile-placeholder-two',
      slug: 'coach-profile-placeholder-two',
      portrait:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvZtLL9Aw9d7ToEsayg8JFNjLp-1mhFLy4kgnGV7qcCVjpgbhqcIK-pTw&s=10',
      portraitFallback:
        'https://images.pexels.com/photos/37144726/pexels-photo-37144726.jpeg?auto=compress&cs=tinysrgb&w=1000&h=1250&fit=crop',
      portraitAlt:
        'Illustrative scene of two young cricketers discussing on a field; they are not NVAS coaches.',
      portraitFocusX: 52,
      portraitFocusY: 42,
      portraitWidth: 1000,
      portraitHeight: 1250,
      portraitSourceUrl: 'https://www.pexels.com/photo/cricket-players-talking-on-field-13509630/',
      featured: false,
      published: true,
      sortOrder: 2,
      isDevelopmentPlaceholder: true,
    },
    {
      id: 'coach-profile-placeholder-three',
      slug: 'coach-profile-placeholder-three',
      portrait:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5q4CldMP9y7QsS5W8B6KLf8CEmIqFAWqfPLNKeekeuMBq5oEkbHcszjdP&s=10',
      portraitFallback:
        'https://images.pexels.com/photos/37145697/pexels-photo-37145697.jpeg?auto=compress&cs=tinysrgb&w=1000&h=1250&fit=crop',
      portraitAlt:
        'Illustrative scene of young cricketers practicing bowling drills outdoors; not NVAS staff.',
      portraitFocusX: 50,
      portraitFocusY: 40,
      portraitWidth: 1000,
      portraitHeight: 1250,
      portraitSourceUrl:
        'https://www.pexels.com/photo/young-cricketers-practicing-bowling-outdoors-37144726/',
      featured: false,
      published: true,
      sortOrder: 3,
      isDevelopmentPlaceholder: true,
    },
  ],
}