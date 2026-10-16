export type PublicationStatus = 'draft' | 'published'
export type ApprovalStatus = 'pending' | 'approved'

export interface OrderedContent {
  id: string
  publicationStatus: PublicationStatus
  displayOrder: number
}

export interface SnapshotStatistic extends OrderedContent {
  approvalStatus: ApprovalStatus
  isVisible: boolean
  label: string
  value: string
}

export interface SnapshotHighlight extends OrderedContent {
  title: string
  description: string
}

export interface AcademyImage {
  src: string
  alt: string
  objectPosition: string
  width: number
  height: number
  sourceLabel: string
  sourceHref: string
}

export interface HomeSectionsContent {
  snapshot: OrderedContent & {
    eyebrow: string
    heading: [string, string]
    description: string
    statistics: SnapshotStatistic[]
    highlights: SnapshotHighlight[]
  }
  about: OrderedContent & {
    eyebrow: string
    heading: string
    description: string
    principles: (OrderedContent & { title: string; description: string })[]
    action: { label: string; href: string }
    image: AcademyImage
  }
}

export const homeSections: HomeSectionsContent = {
  snapshot: {
    id: 'snapshot',
    publicationStatus: 'published',
    displayOrder: 1,
    eyebrow: 'Academy snapshot',
    heading: ['A place to build', 'your game.'],
    description:
      'Cricket development at NVAS in Indore brings purposeful practice and room to grow together.',
    statistics: [
      {
        id: 'students',
        publicationStatus: 'published',
        displayOrder: 1,
        approvalStatus: 'pending',
        isVisible: true,
        label: 'Students',
        value: '60+',
      },
    ],
    highlights: [
      {
        id: 'training',
        publicationStatus: 'published',
        displayOrder: 1,
        title: 'Training',
        description:
          'Practice centered on cricket fundamentals, skill and steady development.',
      },
      {
        id: 'location',
        publicationStatus: 'published',
        displayOrder: 2,
        title: 'Location',
        description: 'A cricket academy rooted in Indore, Madhya Pradesh.',
      },
    ],
  },
  about: {
    id: 'about',
    publicationStatus: 'published',
    displayOrder: 2,
    eyebrow: 'The academy',
    heading: 'More than a place to practise.',
    description:
      'At NVAS in Indore, cricket development starts with the fundamentals: purposeful practice, discipline and room for every player to grow.',
    principles: [
      {
        id: 'skill',
        publicationStatus: 'published',
        displayOrder: 1,
        title: 'Skill',
        description: 'Build a strong foundation in the craft of cricket.',
      },
      {
        id: 'discipline',
        publicationStatus: 'published',
        displayOrder: 2,
        title: 'Discipline',
        description: 'Bring focus and intent to every practice.',
      },
      {
        id: 'growth',
        publicationStatus: 'published',
        displayOrder: 3,
        title: 'Growth',
        description: 'Keep moving forward, one session at a time.',
      },
    ],
    action: { label: 'Discover NVAS', href: '#about' },
    image: {
      src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/03/Benalla_Distric_Cricket_players_practise.jpg/1280px-Benalla_Distric_Cricket_players_practise.jpg',
      alt: 'Cricket players training beside practice nets on an outdoor field.',
      objectPosition: '52% 50%',
      width: 1280,
      height: 849,
      sourceLabel: 'Wikimedia Commons · CC0',
      sourceHref:
        'https://commons.wikimedia.org/wiki/File:Benalla_Distric_Cricket_players_practise.jpg',
    },
  },
}