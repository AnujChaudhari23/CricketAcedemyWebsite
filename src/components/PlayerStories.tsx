import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { playerStoriesContent, type PlayerStory } from '../data/playerStoriesContent'

interface StoryPortraitProps {
  story: PlayerStory
  reduceMotion: boolean | null
}

function StoryPortrait({ story, reduceMotion }: StoryPortraitProps) {
  const [portraitUnavailable, setPortraitUnavailable] = useState(false)

  return (
    <div className="relative aspect-[0.9] w-full overflow-hidden bg-cricket-graphite sm:aspect-[1.02] md:aspect-[0.88] lg:aspect-[0.82]">
      {story.portrait && !portraitUnavailable ? (
        <motion.img
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover/story:scale-[1.025] motion-reduce:transition-none"
          src={story.portrait}
          alt={story.portraitAlt ?? ''}
          width={story.portraitWidth ?? 1200}
          height={story.portraitHeight ?? 1500}
          loading="lazy"
          decoding="async"
          style={{ objectPosition: `${story.portraitFocusX ?? 50}% ${story.portraitFocusY ?? 35}%` }}
          initial={reduceMotion ? false : { opacity: 0.75, scale: 1.02 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: reduceMotion ? 0.12 : 0.65, ease: 'easeOut' }}
          onError={() => setPortraitUnavailable(true)}
        />
      ) : (
        <div
          className="absolute inset-0 flex items-end bg-cricket-graphite p-6 text-cricket-warm-white"
          role="img"
          aria-label={story.portraitAlt ?? 'Portrait not available'}
        >
          <span className="font-display text-2xl font-bold">Portrait unavailable</span>
        </div>
      )}
    </div>
  )
}

export function PlayerStories() {
  const reduceMotion = useReducedMotion()
  const approvedStories = playerStoriesContent.stories
    .filter(
      (story) =>
        story.published && story.approvedForPublication && story.permissionsConfirmed,
    )
    .sort((first, second) => first.sortOrder - second.sortOrder)
  const featuredStory = approvedStories.find((story) => story.featured)
  const developmentPreview = import.meta.env.DEV
    ? playerStoriesContent.developmentPreview
    : undefined
  const story = featuredStory ?? developmentPreview
  const isDevelopmentPreview = story?.developmentOnly === true

  return (
    <motion.section
      id={playerStoriesContent.id}
      aria-labelledby="player-stories-heading"
      className="scroll-mt-24 bg-cricket-warm-white px-5 py-14 text-cricket-graphite sm:px-7 sm:py-16 lg:px-10 lg:py-20"
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: reduceMotion ? 0.12 : 0.5, ease: 'easeOut' }}
    >
      <div className="mx-auto w-full max-w-350">
        <header className="grid items-end gap-5 md:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.85fr)] md:gap-8 lg:gap-12">
          <div>
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em] text-cricket-graphite sm:text-xs">
              {playerStoriesContent.eyebrow}
            </p>
            <h2
              className="max-w-[14ch] font-display text-[clamp(2.5rem,4.6vw,4rem)] font-bold leading-[1.05] tracking-[-0.025em]"
              id="player-stories-heading"
            >
              {playerStoriesContent.heading}
            </h2>
          </div>
          <p className="max-w-xl pb-1 text-sm leading-7 text-cricket-graphite/75 sm:text-base sm:leading-7">
            {playerStoriesContent.description}
          </p>
        </header>

        {story ? (
          <div className="mt-8 grid items-center gap-7 sm:grid-cols-[minmax(0,1.08fr)_minmax(15rem,0.92fr)] sm:gap-8 lg:mt-10 lg:grid-cols-[minmax(0,1.12fr)_minmax(19rem,0.78fr)] lg:gap-14">
            <motion.div
              className="relative min-w-0 py-3 sm:py-5 lg:py-8"
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: reduceMotion ? 0.12 : 0.5, ease: 'easeOut' }}
            >
              {isDevelopmentPreview && (
                <p className="mb-5 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-cricket-graphite/60">
                  <span className="h-2 w-2 bg-cricket-orange" aria-hidden="true" />
                  Development preview · not a testimonial
                </p>
              )}
              <span
                className="mb-1 block h-16 font-display text-7xl font-bold leading-[0.75] text-cricket-orange sm:h-20 sm:text-8xl"
                aria-hidden="true"
              >
                “
              </span>
              <blockquote className="max-w-4xl font-display text-[clamp(1.5rem,3vw,2.75rem)] font-bold leading-[1.12] tracking-[-0.02em] text-cricket-graphite">
                {story.quote}
              </blockquote>
              <span className="mt-7 block h-1 w-14 bg-cricket-orange" aria-hidden="true" />
              <footer className="mt-5">
                <p className="font-display text-xl font-bold leading-[1.1] tracking-[-0.02em] sm:text-2xl">
                  {story.contributorName}
                </p>
                {story.contributorRole && (
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-cricket-graphite/60 sm:text-sm">
                    {story.contributorRole}
                  </p>
                )}
                {story.context && (
                  <p className="mt-3 max-w-xl text-sm leading-6 text-cricket-graphite/70">
                    {story.context}
                  </p>
                )}
                {story.storyUrl && !isDevelopmentPreview && (
                  <a
                    className="group/story-link mt-4 inline-flex min-h-11 items-center gap-3 text-sm font-bold text-cricket-graphite outline-offset-4 focus-visible:outline-offset-4"
                    href={story.storyUrl}
                  >
                    Read the story
                    <ArrowUpRight
                      className="transition-transform duration-200 group-hover/story-link:translate-x-1 group-hover/story-link:-translate-y-1 motion-reduce:transition-none"
                      size={16}
                      aria-hidden="true"
                    />
                  </a>
                )}
              </footer>
            </motion.div>

            <motion.figure
              className="group/story relative aspect-[0.9] min-w-0 overflow-hidden bg-cricket-graphite sm:aspect-[1.02] md:aspect-[0.88] lg:aspect-[0.82]"
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: reduceMotion ? 0.12 : 0.6, ease: 'easeOut' }}
            >
              <StoryPortrait story={story} reduceMotion={reduceMotion} />
              {isDevelopmentPreview && (
                <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-cricket-graphite/80 to-transparent px-4 pb-4 pt-10 text-[10px] leading-5 text-cricket-warm-white/85 sm:px-5 sm:pb-5">
                  Illustrative stock portrait · not the contributor
                </figcaption>
              )}
            </motion.figure>
          </div>
        ) : (
          <div className="mt-9 border-t border-cricket-graphite/15 pt-6 lg:mt-12">
            <p className="max-w-2xl text-sm leading-6 text-cricket-graphite/75">
              Player stories will appear here when a contributor-approved quote and portrait are available.
            </p>
          </div>
        )}

        <div className="mt-8 flex justify-start border-t border-cricket-graphite/15 pt-5 sm:justify-end">
          <a
            className="group/stories-link inline-flex min-h-11 items-center gap-3 text-sm font-bold text-cricket-graphite outline-offset-4 focus-visible:outline-offset-4 sm:text-base"
            href={playerStoriesContent.action.href}
          >
            {playerStoriesContent.action.label}
            <ArrowUpRight
              className="transition-transform duration-200 group-hover/stories-link:translate-x-1 group-hover/stories-link:-translate-y-1 motion-reduce:transition-none"
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