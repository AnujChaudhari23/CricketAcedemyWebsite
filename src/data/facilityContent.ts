import { homeContent } from './homeContent'

export interface FacilityImageCredit {
  creator: string
  sourceHref: string
  license: string
  licenseHref: string
}

export interface FacilityPreview {
  id: string
  slug: string
  name: string
  category: string
  description: string
  imageUrl: string
  imageAlt: string
  imageFocusX: number
  imageFocusY: number
  imageWidth: number
  imageHeight: number
  featured: boolean
  published: boolean
  sortOrder: number
  demoContent: boolean
  imageCredit: FacilityImageCredit
}

interface FacilityContent {
  id: string
  publicationStatus: 'draft' | 'published'
  displayOrder: number
  eyebrow: string
  heading: string
  description: string
  demoNotice: string
  verifiedDetails: { id: string; label: string; value: string }[]
  action: { label: string; href: string }
  facilities: FacilityPreview[]
}

const facilitiesEnquiryUrl = new URL(homeContent.admissionsHref)
facilitiesEnquiryUrl.searchParams.set('subject', 'Facilities Enquiry')

export const facilityContent: FacilityContent = {
  id: 'facilities',
  publicationStatus: 'published',
  displayOrder: 4,
  eyebrow: 'The environment',
  heading: 'Built for the game.',
  description:
    'Explore the spaces where players practise, develop their skills and grow through cricket.',
  demoNotice: 'Illustrative photographs only. These images do not depict confirmed NVAS facilities.',
  verifiedDetails: [
    { id: 'location', label: 'Academy location', value: homeContent.brand.location },
    
  ],
  action: {
    label: 'Explore All Facilities',
    href: facilitiesEnquiryUrl.toString(),
  },
  facilities: [
    {
      id: 'demo-ground-view',
      slug: 'illustrative-ground-view',
      name: 'Ground view',
      category: '',
      description: 'A demo image, not a photograph of the NVAS ground.',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/5/5f/Headingley_Cricket_Ground%2C_view_from_the_Carnegie_Pavilion_-_geograph.org.uk_-_1996051.jpg',
      imageAlt:
        'Illustrative view of a cricket match at Headingley; this is not the NVAS ground.',
      imageFocusX: 52,
      imageFocusY: 57,
      imageWidth: 1024,
      imageHeight: 768,
      featured: true,
      published: true,
      sortOrder: 1,
      demoContent: true,
      imageCredit: {
        creator: 'John Sutton',
        sourceHref: 'https://www.geograph.org.uk/photo/1996051',
        license: 'CC BY-SA 2.0',
        licenseHref: 'https://creativecommons.org/licenses/by-sa/2.0/',
      },
    },
    {
      id: 'demo-practice-nets',
      slug: 'illustrative-practice-nets',
      name: 'Practice nets',
      category: '',
      description: 'A demo image; nets shown are not confirmed NVAS equipment.',
      imageUrl:
        'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d3/Nets_at_Southgate_Adelaide_Cricket_Club.jpg/1280px-Nets_at_Southgate_Adelaide_Cricket_Club.jpg',
      imageAlt:
        'Illustrative cricket practice nets at Southgate Adelaide Cricket Club; not an NVAS facility.',
      imageFocusX: 52,
      imageFocusY: 48,
      imageWidth: 1280,
      imageHeight: 720,
      featured: false,
      published: true,
      sortOrder: 2,
      demoContent: true,
      imageCredit: {
        creator: 'Acabashi',
        sourceHref:
          'https://commons.wikimedia.org/wiki/File:Nets_at_Southgate_Adelaide_Cricket_Club.jpg',
        license: 'CC BY-SA 4.0',
        licenseHref: 'https://creativecommons.org/licenses/by-sa/4.0/',
      },
    },
    {
      id: 'demo-cover-frames',
      slug: 'illustrative-practice-ground',
      name: 'Practice ground',
      category: '',
      description: 'A demo image only; this is not a confirmed NVAS training area.',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/5/57/Cricket_practice_nets_and_the_cover_frames_-_geograph.org.uk_-_6712290.jpg',
      imageAlt:
        'Illustrative cricket practice nets and cover frames at an independent ground; not an NVAS facility.',
      imageFocusX: 54,
      imageFocusY: 48,
      imageWidth: 1958,
      imageHeight: 1469,
      featured: false,
      published: true,
      sortOrder: 3,
      demoContent: true,
      imageCredit: {
        creator: 'Richard Law',
        sourceHref: 'https://www.geograph.org.uk/photo/6712290',
        license: 'CC BY-SA 2.0',
        licenseHref: 'https://creativecommons.org/licenses/by-sa/2.0/',
      },
    },
  ],
}