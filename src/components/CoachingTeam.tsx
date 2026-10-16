import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { coachContent, type CoachProfile } from '../data/coachContent'

const portraitAspectByLayout = {
  'featured-details': 'aspect-[1.08] sm:aspect-[1.35] lg:aspect-[0.88]',
  'featured-preview': 'aspect-[1.08] sm:aspect-[1.35] xl:aspect-[0.84]',
  'supporting-details': 'aspect-[0.84]',
  'supporting-preview': 'aspect-[1.15] sm:aspect-[1.2]',
} as const

const profileLayoutByState = {
  'featured-details': 'grid items-center gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(15rem,0.95fr)] lg:gap-7',
  'featured-preview': '',
  'supporting-details': 'grid min-w-0 grid-cols-[minmax(7rem,0.8fr)_minmax(0,1.2fr)] items-start gap-4',
  'supporting-preview': '',
} as const

interface CoachPortraitProps {
  coach: CoachProfile
  featured: boolean
  hasProfileDetails: boolean
  reduceMotion: boolean | null
}

function CoachPortrait({ coach, featured, hasProfileDetails, reduceMotion }: CoachPortraitProps) {
  const [activePortrait, setActivePortrait] = useState(coach.portrait)
  const [imageUnavailable, setImageUnavailable] = useState(false)
  const layoutKey = `${featured ? 'featured' : 'supporting'}-${hasProfileDetails ? 'details' : 'preview'}` as keyof typeof portraitAspectByLayout

  const handleImageError = () => {
    if (coach.portraitFallback && activePortrait !== coach.portraitFallback) {
      setActivePortrait(coach.portraitFallback)
      return
    }
    setImageUnavailable(true)
  }

  return (
    <div
      className={`group/portrait relative isolate w-full overflow-hidden bg-cricket-graphite ${portraitAspectByLayout[layoutKey]}`}
    >
      {activePortrait && !imageUnavailable ? (
        <motion.img
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover/portrait:scale-[1.035] motion-reduce:transition-none"
          src={activePortrait}
          alt={coach.portraitAlt ?? 'Illustrative cricket coaching photograph.'}
          width={coach.portraitWidth ?? 1200}
          height={coach.portraitHeight ?? 1600}
          loading="lazy"
          decoding="async"
          style={{ objectPosition: `${coach.portraitFocusX ?? 50}% ${coach.portraitFocusY ?? 35}%` }}
          initial={reduceMotion ? false : { scale: 1.025 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: reduceMotion ? 0.12 : 0.7, ease: 'easeOut' }}
          onError={handleImageError}
        />
      ) : (
        <div
          className="absolute inset-0 flex items-end bg-cricket-graphite p-5 text-cricket-warm-white sm:p-6"
          role="img"
          aria-label={coach.portraitAlt ?? coachContent.illustrativeDisclosure}
        >
          <span className="font-display text-xl font-bold uppercase sm:text-2xl">
            Portrait unavailable
          </span>
        </div>
      )}
    </div>
  )
}

interface CoachProfileViewProps {
  coach: CoachProfile
  featured: boolean
  reduceMotion: boolean | null
}

function CoachProfileView({ coach, featured, reduceMotion }: CoachProfileViewProps) {
  const specialties = coach.specialties?.filter(Boolean) ?? []
  const hasProfileDetails = Boolean(
    coach.fullName || coach.role || coach.shortBio || specialties.length > 0,
  )
  const layoutKey = `${featured ? 'featured' : 'supporting'}-${hasProfileDetails ? 'details' : 'preview'}` as keyof typeof profileLayoutByState

  return (
    <motion.article
      className="min-w-0"
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: reduceMotion ? 0.12 : 0.48, ease: 'easeOut' }}
    >
      <div className={profileLayoutByState[layoutKey]}>
        <CoachPortrait
          coach={coach}
          featured={featured}
          hasProfileDetails={hasProfileDetails}
          reduceMotion={reduceMotion}
        />
        {hasProfileDetails && (
          <div className="min-w-0 pt-1">
            {coach.role && (
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-cricket-graphite/60">
                {coach.role}
              </p>
            )}
            {coach.fullName && (
              <h3 className={`font-display font-bold tracking-[-0.025em] leading-[1.05] text-cricket-graphite ${featured ? 'text-3xl sm:text-[2rem] xl:text-[2.5rem]' : 'text-xl sm:text-2xl'}`}>
                {coach.fullName}
              </h3>
            )}
            {coach.shortBio && (
              <p className={`mt-3 max-w-xl text-cricket-graphite/75 ${featured ? 'text-sm leading-6 sm:text-base sm:leading-7' : 'text-xs leading-5 sm:text-sm sm:leading-6'}`}>
                {coach.shortBio}
              </p>
            )}
            {specialties.length > 0 && (
              <p className="mt-3 text-xs leading-5 text-cricket-graphite/70 sm:text-sm">
                {specialties.join(' · ')}
              </p>
            )}
          </div>
        )}
      </div>
    </motion.article>
  )
}

export function CoachingTeam() {
  const reduceMotion = useReducedMotion()
  const coaches = coachContent.coaches
    .filter((coach) => coach.published)
    .sort((first, second) => first.sortOrder - second.sortOrder)
  const featuredCoach = coaches.find((coach) => coach.featured)
  const supportingCoaches = coaches.filter((coach) => coach.id !== featuredCoach?.id)

  return (
    <motion.section
      id={coachContent.id}
      aria-labelledby="coaching-team-heading"
      className="scroll-mt-24 bg-cricket-warm-white px-5 pt-16 pb-8 text-cricket-graphite sm:px-7 sm:pt-20 sm:pb-8 lg:px-10 lg:pt-24 lg:pb-10"
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: reduceMotion ? 0.12 : 0.5, ease: 'easeOut' }}
    >
      <div className="mx-auto w-full max-w-350">
        <header className="grid items-end gap-4 md:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.85fr)] md:gap-8 lg:gap-12">
          <div>
            <p className="mb-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.18em] text-cricket-graphite sm:text-xs">
              <span className="h-px w-7 bg-cricket-orange" aria-hidden="true" />
              {coachContent.eyebrow}
            </p>
            <h2
              className="max-w-[14ch] font-display text-[clamp(2.5rem,4.6vw,4rem)] font-bold leading-[1.05] tracking-[-0.025em]"
              id="coaching-team-heading"
            >
              {coachContent.heading}
            </h2>
          </div>
          <div className="max-w-xl pb-1">
            <p className="text-sm leading-7 text-cricket-graphite/75 sm:text-base sm:leading-7">
              {coachContent.description}
            </p>
            {coaches.some((coach) => coach.isDevelopmentPlaceholder) && (
              <p className="mt-3 text-xs leading-5 text-cricket-graphite/65">
                {coachContent.illustrativeDisclosure}
              </p>
            )}
          </div>
        </header>

        {featuredCoach ? (
          <div className="mt-9 grid gap-8 lg:mt-12 xl:grid-cols-12 xl:gap-10">
            <div className="min-w-0 xl:col-span-7">
              <CoachProfileView coach={featuredCoach} featured reduceMotion={reduceMotion} />
            </div>
            <div className="grid min-w-0 gap-6 sm:grid-cols-2 xl:col-span-5 xl:grid-cols-1 xl:gap-7">
              {supportingCoaches.map((coach) => (
                <CoachProfileView
                  key={coach.id}
                  coach={coach}
                  featured={false}
                  reduceMotion={reduceMotion}
                />
              ))}
            </div>
          </div>
        ) : coaches.length > 0 ? (
          <div className="mt-9 grid gap-8 md:grid-cols-2 lg:mt-12 lg:grid-cols-3">
            {coaches.map((coach) => (
              <CoachProfileView key={coach.id} coach={coach} featured={false} reduceMotion={reduceMotion} />
            ))}
          </div>
        ) : (
          <div className="mt-9 border-t border-cricket-graphite/15 pt-6 lg:mt-12">
            <p className="max-w-2xl text-sm leading-6 text-cricket-graphite/75">
              Contact NVAS for information about the coaching team.
            </p>
          </div>
        )}

        <div className="mt-8 flex justify-start border-t border-cricket-graphite/15 pt-5 sm:justify-end">
          <a
            className="group/link inline-flex min-h-12 items-center gap-3 text-sm font-bold text-cricket-graphite outline-offset-4 focus-visible:outline-offset-4 sm:text-base"
            href={coachContent.action.href}
          >
            {coachContent.action.label}
            <ArrowUpRight
              className="transition-transform duration-200 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 motion-reduce:transition-none"
              size={18}
              strokeWidth={2}
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </motion.section>
  )
}