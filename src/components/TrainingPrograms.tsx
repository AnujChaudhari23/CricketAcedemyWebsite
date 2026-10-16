import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { homeContent } from '../data/homeContent'
import { trainingProgramsContent, type TrainingProgram } from '../data/trainingPrograms'

interface ProgramImageProps {
  src: string
  fallbackSrc?: string
  alt: string
  fallbackAlt?: string
  width: number
  height: number
  imagePosition?: string
  className: string
}

function ProgramImage({
  src,
  fallbackSrc,
  alt,
  fallbackAlt,
  width,
  height,
  imagePosition,
  className,
}: ProgramImageProps) {
  const [currentSource, setCurrentSource] = useState(src)
  const [currentAlt, setCurrentAlt] = useState(alt)
  const [imageUnavailable, setImageUnavailable] = useState(false)

  const handleImageError = () => {
    if (fallbackSrc && currentSource !== fallbackSrc) {
      setCurrentSource(fallbackSrc)
      setCurrentAlt(fallbackAlt ?? alt)
      return
    }
    setImageUnavailable(true)
  }

  if (imageUnavailable) {
    return (
      <div
        className={`${className} flex items-end bg-cricket-graphite p-6 text-cricket-warm-white`}
        role="img"
        aria-label={alt}
      >
        <span className="font-display text-2xl font-bold">NVAS / Cricket</span>
      </div>
    )
  }

  return (
    <img
      className={className}
      src={currentSource}
      alt={currentAlt}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      style={imagePosition ? { objectPosition: imagePosition } : undefined}
      onError={handleImageError}
    />
  )
}

interface ProgramCardProps {
  program: TrainingProgram
  featured?: boolean
  reduceMotion: boolean | null
}

function ProgramCard({ program, featured = false, reduceMotion }: ProgramCardProps) {
  const details = [program.ageGroup, program.skillLevel].filter(Boolean).join(' · ')

  return (
    <motion.article
      className="min-w-0"
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: reduceMotion ? 0.12 : 0.5, ease: 'easeOut' }}
    >
      <a
        className={`group relative isolate flex min-h-84 items-end overflow-hidden bg-cricket-graphite text-cricket-warm-white focus-visible:outline-offset-4 motion-reduce:transition-none ${featured ? 'h-120 sm:h-144 lg:h-168' : 'h-84 sm:h-96'}`}
        href={program.ctaUrl}
        aria-label={`${program.isDevelopmentPlaceholder ? 'Demo content, not a confirmed offering. ' : ''}${program.ctaLabel}: ${program.title}`}
      >
        <ProgramImage
          key={program.coverImage}
          src={program.coverImage}
          fallbackSrc={program.fallbackImage}
          alt={program.imageAlt}
          fallbackAlt={program.fallbackImageAlt}
          width={program.imageWidth}
          height={program.imageHeight}
          imagePosition={program.imagePosition}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035] group-focus-visible:scale-[1.035] motion-reduce:transition-none"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-cricket-graphite/95 via-cricket-graphite/35 to-transparent"
        />
        <span
          aria-hidden="true"
          className="absolute left-6 top-6 h-8 w-1 bg-cricket-orange sm:left-8 sm:top-8"
        />
        <span
          aria-hidden="true"
          className="absolute right-6 top-6 grid size-10 place-items-center border border-cricket-warm-white/50 text-cricket-warm-white transition-colors duration-200 group-hover:border-cricket-orange group-hover:bg-cricket-orange group-hover:text-cricket-graphite sm:right-8 sm:top-8"
        >
          <ArrowUpRight size={18} strokeWidth={2} />
        </span>
        <span className={`relative z-10 block w-full p-6 sm:p-8 ${featured ? 'max-w-2xl' : 'max-w-xl'}`}>
    
          {details && (
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.14em] text-cricket-warm-white/80">
              {details}
            </span>
          )}
          <span
            className={`block font-display font-bold tracking-[-0.025em] leading-[1.05] ${featured ? 'text-4xl sm:text-5xl lg:text-[3.25rem]' : 'text-3xl sm:text-4xl'}`}
          >
            {program.title}
          </span>
          <span className={`mt-3 block max-w-xl leading-relaxed text-cricket-warm-white/85 ${featured ? 'text-sm sm:text-base' : 'text-sm'}`}>
            {program.shortDescription}
          </span>
          <span className="mt-5 inline-flex min-h-11 items-center gap-3 text-sm font-bold text-cricket-warm-white">
            {program.ctaLabel}
            <ArrowUpRight
              className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 group-focus-visible:translate-x-1 group-focus-visible:-translate-y-1 motion-reduce:transition-none"
              size={17}
              strokeWidth={2}
              aria-hidden="true"
            />
          </span>
        </span>
      </a>
      {program.imageCredit && (
        <p className="mt-2 flex flex-wrap gap-x-1 text-[10px] leading-5 text-cricket-graphite/70">
          <span>Photo by</span>
          <a
            className="underline underline-offset-2 focus-visible:outline-offset-2"
            href={program.imageCredit.sourceHref}
            target="_blank"
            rel="noreferrer"
          >
            {program.imageCredit.creator}
          </a>
          <span>·</span>
          <a
            className="underline underline-offset-2 focus-visible:outline-offset-2"
            href={program.imageCredit.licenseHref}
            target="_blank"
            rel="noreferrer"
          >
            {program.imageCredit.license}
          </a>
        </p>
      )}
    </motion.article>
  )
}

export function TrainingPrograms() {
  const reduceMotion = useReducedMotion()
  const { emptyState, programs } = trainingProgramsContent
  const publishedPrograms = programs
    .filter((program) => program.published)
    .sort((first, second) => first.sortOrder - second.sortOrder)
  const featuredProgram = publishedPrograms.find((program) => program.featured)
  const supportingPrograms = publishedPrograms.filter(
    (program) => program.id !== featuredProgram?.id,
  )

  return (
    <motion.section
      id={trainingProgramsContent.id}
      aria-labelledby="training-programs-heading"
      className="scroll-mt-24 bg-cricket-warm-white px-5 py-16 text-cricket-graphite sm:px-7 sm:py-20 lg:px-10 lg:py-24"
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: reduceMotion ? 0.12 : 0.55, ease: 'easeOut' }}
    >
      <div className="mx-auto w-full max-w-350">
        <header className="grid items-end gap-5 md:grid-cols-[minmax(0,1.2fr)_minmax(16rem,0.8fr)] md:gap-8 lg:gap-16">
          <div>
            <p className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-bold uppercase tracking-[0.18em] text-cricket-graphite sm:text-xs">
              <span>{trainingProgramsContent.eyebrow[0]}</span>
              <span className="text-cricket-orange" aria-hidden="true">/</span>
              <span>{trainingProgramsContent.eyebrow[1]}</span>
            </p>
            <h2
              className="max-w-[14ch] font-display text-[clamp(2.5rem,4.6vw,4rem)] font-bold leading-[1.05] tracking-[-0.025em]"
              id="training-programs-heading"
            >
              {trainingProgramsContent.heading}
            </h2>
          </div>
          <p className="max-w-xl pb-1 text-sm leading-7 text-cricket-graphite/75 sm:text-base sm:leading-7">
            {trainingProgramsContent.description}
          </p>
        </header>

        {featuredProgram ? (
          <div className="mt-10 grid gap-5 lg:mt-14 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)]">
            <ProgramCard program={featuredProgram} featured reduceMotion={reduceMotion} />
            <div className="grid content-start gap-5 sm:grid-cols-2 lg:grid-cols-1">
              {supportingPrograms.map((program) => (
                <ProgramCard key={program.id} program={program} reduceMotion={reduceMotion} />
              ))}
              {supportingPrograms.length === 0 && (
                <div className="flex min-h-52 flex-col justify-between border-t border-cricket-light-gray py-6 lg:min-h-0">
                  <p className="max-w-xs text-sm leading-6 text-cricket-graphite/75">
                    Ask NVAS about other training opportunities.
                  </p>
                  <a
                    className="mt-5 inline-flex min-h-11 items-center gap-3 text-sm font-bold text-cricket-graphite focus-visible:outline-offset-4"
                    href={trainingProgramsContent.enquiry.href}
                  >
                    {trainingProgramsContent.enquiry.label}
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </a>
                </div>
              )}
            </div>
          </div>
        ) : publishedPrograms.length > 0 ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
            {publishedPrograms.map((program) => (
              <ProgramCard key={program.id} program={program} reduceMotion={reduceMotion} />
            ))}
          </div>
        ) : (
          <div className="mt-10 grid overflow-hidden bg-cricket-graphite text-cricket-warm-white lg:mt-14 lg:grid-cols-12">
            <div className="flex flex-col items-start justify-center px-6 py-10 sm:px-9 sm:py-12 lg:col-span-5 lg:px-12 lg:py-14">
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em] text-cricket-orange sm:text-xs">
                {emptyState.eyebrow}
              </p>
              <h3 className="max-w-[14ch] font-display text-3xl font-bold leading-[1.05] tracking-[-0.02em] sm:text-4xl">
                {emptyState.heading}
              </h3>
              <p className="mt-5 max-w-md text-sm leading-6 text-cricket-warm-white/80 sm:text-base sm:leading-7">
                {emptyState.description}
              </p>
              <a
                className="mt-6 inline-flex min-h-12 items-center gap-3 bg-cricket-orange px-5 text-sm font-bold text-cricket-graphite transition-colors duration-200 hover:bg-cricket-warm-white focus-visible:outline-offset-4 motion-reduce:transition-none"
                href={trainingProgramsContent.enquiry.href}
              >
                {trainingProgramsContent.enquiry.label}
                <ArrowUpRight size={17} strokeWidth={2} aria-hidden="true" />
              </a>
            </div>
            <div className="relative min-h-64 sm:min-h-80 lg:col-span-7 lg:min-h-136">
              <ProgramImage
                src={emptyState.coverImage}
                fallbackSrc={homeContent.hero.images[0].src}
                alt={emptyState.imageAlt}
                fallbackAlt={homeContent.hero.images[0].alt}
                width={emptyState.imageWidth}
                height={emptyState.imageHeight}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <span
                className="absolute inset-0 bg-linear-to-r from-cricket-graphite/35 via-transparent to-transparent lg:bg-linear-to-l"
                aria-hidden="true"
              />
            </div>
          </div>
        )}
      </div>
    </motion.section>
  )
}