import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { AcademySnapshot } from './components/AcademySnapshot'
import { AboutNvas } from './components/AboutNvas'
import { TrainingPrograms } from './components/TrainingPrograms'
import { Facilities } from './components/Facilities'
import { CoachingTeam } from './components/CoachingTeam'
import { MediaGallery } from './components/MediaGallery'
import { PlayerStories } from './components/PlayerStories'
import { homeSections } from './data/homeSections'
import { trainingProgramsContent } from './data/trainingPrograms'
import { facilityContent } from './data/facilityContent'
import { coachContent } from './data/coachContent'
import { mediaGalleryContent } from './data/mediaGalleryContent'
import { playerStoriesContent } from './data/playerStoriesContent'

const orderedSections = [
  { content: homeSections.snapshot, Component: AcademySnapshot },
  { content: homeSections.about, Component: AboutNvas },
  { content: trainingProgramsContent, Component: TrainingPrograms },
  { content: facilityContent, Component: Facilities },
  { content: coachContent, Component: CoachingTeam },
  { content: mediaGalleryContent, Component: MediaGallery },
  { content: playerStoriesContent, Component: PlayerStories },
]
  .filter(({ content }) => content.publicationStatus === 'published')
  .sort((first, second) => first.content.displayOrder - second.content.displayOrder)

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        {orderedSections.map(({ content, Component }) => (
          <Component key={content.id} />
        ))}
      </main>
    </>
  )
}

export default App