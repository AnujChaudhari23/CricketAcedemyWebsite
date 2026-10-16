import { homeContent } from './homeContent'
import { homeSections } from './homeSections'

export interface TrainingProgram {
  id: string
  slug: string
  title: string
  shortDescription: string
  coverImage: string
  fallbackImage?: string
  imageAlt: string
  fallbackImageAlt?: string
  imagePosition?: string
  imageWidth: number
  imageHeight: number
  imageCredit?: {
    creator: string
    sourceHref: string
    license: string
    licenseHref: string
  }
  ageGroup?: string
  skillLevel?: string
  featured: boolean
  published: boolean
  sortOrder: number
  ctaLabel: string
  ctaUrl: string
  isDevelopmentPlaceholder?: boolean
}

interface TrainingProgramsContent {
  id: string
  publicationStatus: 'draft' | 'published'
  displayOrder: number
  eyebrow: [string, string]
  heading: string
  description: string
  enquiry: { label: string; href: string }
  emptyState: {
    eyebrow: string
    heading: string
    description: string
    coverImage: string
    imageAlt: string
    imageWidth: number
    imageHeight: number
  }
  programs: TrainingProgram[]
}

export const trainingProgramsContent: TrainingProgramsContent = {
  id: 'programs',
  publicationStatus: 'published',
  displayOrder: 3,
  eyebrow: ['Training programs', 'Find your game'],
  heading: 'Built around the player.',
  description:
    'Explore the training opportunities available at NVAS and find the right starting point for your cricket journey.',
  enquiry: {
    label: 'Enquire about training',
    href: homeContent.admissionsHref,
  },
  emptyState: {
    eyebrow: 'Program information',
    heading: 'Training details are being prepared.',
    description:
      'Contact NVAS to ask about current training opportunities and find out what may suit your cricket journey.',
    coverImage: homeContent.hero.images[1].src,
    imageAlt: homeContent.hero.images[1].alt,
    imageWidth: 1900,
    imageHeight: 1272,
  },
  programs: [
    {
      id: 'placeholder-featured-program',
      slug: 'development-placeholder-featured',
      title: 'Featured program example',
      shortDescription: 'Demo content only. Replace with NVAS-approved program information.',
      coverImage: homeContent.hero.images[0].src,
      fallbackImage: homeSections.about.image.src,
      imageAlt: homeContent.hero.images[0].alt,
      fallbackImageAlt: homeSections.about.image.alt,
      imagePosition: '58% 42%',
      imageWidth: 1900,
      imageHeight: 2850,
      featured: true,
      published: true,
      sortOrder: 1,
      ctaLabel: 'Enquire about training',
      ctaUrl: homeContent.admissionsHref,
      isDevelopmentPlaceholder: true,
    },
    {
      id: 'placeholder-supporting-program-one',
      slug: 'development-placeholder-one',
      title: 'Supporting program example',
      shortDescription: 'Demo content only. Replace with NVAS-approved program information.',
      coverImage: homeSections.about.image.src,
      fallbackImage: homeContent.hero.images[0].src,
      imageAlt: homeSections.about.image.alt,
      fallbackImageAlt: homeContent.hero.images[0].alt,
      imagePosition: homeSections.about.image.objectPosition,
      imageWidth: homeSections.about.image.width,
      imageHeight: homeSections.about.image.height,
      featured: false,
      published: true,
      sortOrder: 2,
      ctaLabel: 'Enquire about training',
      ctaUrl: homeContent.admissionsHref,
      isDevelopmentPlaceholder: true,
    },
    {
      id: 'placeholder-supporting-program-two',
      slug: 'development-placeholder-two',
      title: 'Supporting program example',
      shortDescription: 'Demo content only. Replace with NVAS-approved program information.',
      coverImage: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Nets%2C_Colwall_cricket_pitch_-_geograph.org.uk_-_1540210.jpg',
      fallbackImage: homeContent.hero.images[0].src,
      imageAlt: 'Practice nets beside a cricket pitch at Colwall cricket ground.',
      fallbackImageAlt: homeContent.hero.images[0].alt,
      imagePosition: '48% 50%',
      imageWidth: 1280,
      imageHeight: 812,
      imageCredit: {
        creator: 'Bob Embleton',
        sourceHref: 'https://www.geograph.org.uk/photo/1540210',
        license: 'CC BY-SA 2.0',
        licenseHref: 'https://creativecommons.org/licenses/by-sa/2.0/',
      },
      featured: false,
      published: true,
      sortOrder: 3,
      ctaLabel: 'Enquire about training',
      ctaUrl: homeContent.admissionsHref,
      isDevelopmentPlaceholder: true,
    },
  ],
}