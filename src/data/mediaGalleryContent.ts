export type GalleryMediaType = 'image' | 'video'
export type GalleryLayout = 'wide' | 'square' | 'landscape'

export interface GalleryMediaItem {
  id: string
  title: string
  category: string
  mediaType: GalleryMediaType
  imageUrl: string
  thumbnailUrl: string
  altText: string
  caption: string
  videoUrl?: string
  featured: boolean
  published: boolean
  sortOrder: number
  layout: GalleryLayout
  demoAsset: boolean
  sourcePageUrl: string
  width: number
  height: number
}

interface MediaGalleryContent {
  id: string
  publicationStatus: 'draft' | 'published'
  displayOrder: number
  eyebrow: [string, string]
  heading: string
  description: string
  demoDisclosure: string
  message: string
  allGalleryHref: string
  media: GalleryMediaItem[]
}

export const mediaGalleryContent: MediaGalleryContent = {
  id: 'gallery',
  publicationStatus: 'published',
  displayOrder: 6,
  eyebrow: ['Life at NVAS', '07'],
  heading: 'Inside the game.',
  description: 'Every session. Every challenge. Every moment of growth.',
  demoDisclosure:
    'Illustrative stock photography for preview only. Images do not depict NVAS students, staff or events.',
  message: 'The game is made of more than the score.',
  allGalleryHref: '/gallery',
  media: [
    {
      id: 'demo-practice-group',
      title: 'Practice, in rhythm',
      category: 'Cricket practice',
      mediaType: 'image',
      imageUrl:
        'https://images.pexels.com/photos/31712541/pexels-photo-31712541.jpeg?auto=compress&cs=tinysrgb&w=1800',
      thumbnailUrl:
        'https://images.pexels.com/photos/31712541/pexels-photo-31712541.jpeg?auto=compress&cs=tinysrgb&w=1000',
      altText:
        'Illustrative stock photo of cricketers practicing bowling on a dusty open ground; not an NVAS session.',
      caption: 'Players work through a bowling practice session on an open ground.',
      featured: true,
      published: true,
      sortOrder: 1,
      layout: 'wide',
      demoAsset: true,
      sourcePageUrl:
        'https://www.pexels.com/photo/youth-cricketers-practicing-in-mumbai-playground-31712541/',
      width: 1800,
      height: 1200,
    },
    {
      id: 'demo-batting-action',
      title: 'Read the delivery',
      category: 'Batting',
      mediaType: 'image',
      imageUrl:
        'https://images.pexels.com/photos/13509965/pexels-photo-13509965.jpeg?auto=compress&cs=tinysrgb&w=1500',
      thumbnailUrl:
        'https://images.pexels.com/photos/13509965/pexels-photo-13509965.jpeg?auto=compress&cs=tinysrgb&w=900',
      altText:
        'Illustrative stock photograph of a batter playing a delivery on an open cricket field.',
      caption: 'A batter prepares to play a delivery on an open field.',
      featured: false,
      published: true,
      sortOrder: 2,
      layout: 'wide',
      demoAsset: true,
      sourcePageUrl:
        'https://www.pexels.com/photo/a-man-playing-cricket-on-the-grass-field-13509965/',
      width: 1500,
      height: 1000,
    },
    {
      id: 'demo-net-practice',
      title: 'In the nets',
      category: 'Practice',
      mediaType: 'image',
      imageUrl:
        'https://images.pexels.com/photos/9559761/pexels-photo-9559761.jpeg?auto=compress&cs=tinysrgb&w=1100',
      thumbnailUrl:
        'https://images.pexels.com/photos/9559761/pexels-photo-9559761.jpeg?auto=compress&cs=tinysrgb&w=700',
      altText:
        'Illustrative stock photograph of a batter practicing a shot inside cricket nets.',
      caption: 'A batter works on a shot inside a practice net.',
      featured: false,
      published: true,
      sortOrder: 3,
      layout: 'square',
      demoAsset: true,
      sourcePageUrl:
        'https://www.pexels.com/photo/a-man-in-white-shirt-playing-cricket-9559761/',
      width: 1100,
      height: 1650,
    },
    {
      id: 'demo-batting-drill',
      title: 'One more repetition',
      category: 'Batting practice',
      mediaType: 'image',
      imageUrl:
        'https://images.pexels.com/photos/37144640/pexels-photo-37144640.jpeg?auto=compress&cs=tinysrgb&w=1100',
      thumbnailUrl:
        'https://images.pexels.com/photos/37144640/pexels-photo-37144640.jpeg?auto=compress&cs=tinysrgb&w=700',
      altText:
        'Illustrative stock photograph of a young cricketer practicing a batting drill outdoors.',
      caption: 'A young cricketer focuses on a batting drill.',
      featured: false,
      published: true,
      sortOrder: 4,
      layout: 'landscape',
      demoAsset: true,
      sourcePageUrl:
        'https://www.pexels.com/photo/cricketer-practicing-batting-technique-in-gear-37144640/',
      width: 1100,
      height: 1650,
    },
  ],
}