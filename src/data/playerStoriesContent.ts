import { homeContent } from './homeContent'

export interface PlayerStory {
  id: string
  quote: string
  contributorName: string
  contributorRole?: string
  portrait?: string
  portraitAlt?: string
  portraitFocusX?: number
  portraitFocusY?: number
  portraitWidth?: number
  portraitHeight?: number
  context?: string
  storyUrl?: string
  featured: boolean
  approvedForPublication: boolean
  published: boolean
  permissionsConfirmed: boolean
  sortOrder: number
  developmentOnly?: boolean
}

interface PlayerStoriesContent {
  id: string
  publicationStatus: 'draft' | 'published'
  displayOrder: number
  eyebrow: string
  heading: string
  description: string
  stories: PlayerStory[]
  developmentPreview?: PlayerStory
  action: { label: string; href: string }
}

const storiesEnquiry = new URL(homeContent.admissionsHref)
storiesEnquiry.searchParams.set('subject', 'Player Stories Enquiry')

export const playerStoriesContent: PlayerStoriesContent = {
  id: 'player-stories',
  publicationStatus: 'published',
  displayOrder: 7,
  eyebrow: 'Voices of NVAS',
  heading: 'Every player has a story.',
  description:
    'The moments that shape a player are often the ones that happen between the boundaries.',
  stories: [],
  developmentPreview: {
    id: 'development-preview-story',
    quote: 'Design preview quote. Replace with contributor-approved words.',
    contributorName: 'Sample contributor',
    contributorRole: undefined,
    portrait:
      'https://images.pexels.com/photos/11277598/pexels-photo-11277598.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1500&fit=crop',
    portraitAlt:
      'Illustrative stock portrait of an adult cricketer holding a ball outdoors; not an NVAS contributor.',
    portraitFocusX: 52,
    portraitFocusY: 37,
    portraitWidth: 1200,
    portraitHeight: 1500,
    context: undefined,
    featured: true,
    approvedForPublication: false,
    published: false,
    permissionsConfirmed: false,
    sortOrder: 0,
    developmentOnly: true,
  },
  action: {
    label: 'Explore Player Stories',
    href: storiesEnquiry.toString(),
  },
}