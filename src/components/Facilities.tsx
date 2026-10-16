import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { facilityContent, type FacilityPreview } from '../data/facilityContent'

interface FacilityFigureProps {
  facility: FacilityPreview
  featured: boolean
  reduceMotion: boolean | null
}

function FacilityFigure({ facility, featured, reduceMotion }: FacilityFigureProps) {
  const [imageUnavailable, setImageUnavailable] = useState(false)

  return (
    <motion.figure
      className="min-w-0"
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: reduceMotion ? 0.12 : 0.5, ease: 'easeOut' }}
    >
      <div
        className={`group relative isolate w-full overflow-hidden bg-cricket-graphite text-cricket-warm-white ${featured ? 'aspect-[1.35] min-h-72 sm:aspect-[1.8] xl:aspect-auto xl:min-h-144' : 'aspect-[1.35] min-h-64 xl:aspect-auto xl:min-h-64'}`}
      >
        {imageUnavailable ? (
          <div
            className="absolute inset-0 flex items-end bg-cricket-graphite p-6 sm:p-8"
            role="img"
            aria-label={facility.imageAlt}
          >
            <span className="font-display text-3xl font-bold">NVAS / Cricket</span>
          </div>
        ) : (
          <motion.img
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035] motion-reduce:transition-none"
            src={facility.imageUrl}
            alt={facility.imageAlt}
            width={facility.imageWidth}
            height={facility.imageHeight}
            loading="lazy"
            decoding="async"
            style={{ objectPosition: `${facility.imageFocusX}% ${facility.imageFocusY}%` }}
            initial={reduceMotion ? false : { scale: 1.025 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, amount: 0.16 }}
            transition={{ duration: reduceMotion ? 0.12 : 0.7, ease: 'easeOut' }}
            onError={() => setImageUnavailable(true)}
          />
        )}
        <span
          aria-hidden="true"
          className={`absolute inset-0 ${featured ? 'bg-linear-to-t from-cricket-graphite/90 via-cricket-graphite/18 to-transparent' : 'bg-linear-to-t from-cricket-graphite/90 via-cricket-graphite/20 to-transparent'}`}
        />
        <div className={`absolute inset-x-0 bottom-0 p-5 sm:p-7 ${featured ? 'xl:p-9' : ''}`}>
          <div className="mb-3 flex flex-wrap items-center gap-2">

            <span className="text-[10px] font-semibold uppercase tracking-[0.13em] text-cricket-warm-white/80">
              {facility.category}
            </span>
          </div>
          <h3 className={`font-display font-bold tracking-[-0.025em] leading-[1.05] ${featured ? 'text-3xl sm:text-4xl xl:text-[2.75rem]' : 'text-2xl sm:text-3xl'}`}>
            {facility.name}
          </h3>
          <p className={`mt-2 max-w-lg text-xs leading-5 text-cricket-warm-white/90 sm:text-sm sm:leading-6 ${featured ? 'xl:max-w-2xl xl:text-base' : ''}`}>
            {facility.description}
          </p>
        </div>
        <span
          className="absolute right-4 top-4 grid size-10 place-items-center border border-cricket-warm-white/75 bg-cricket-graphite/35 text-cricket-warm-white transition-colors duration-200 group-hover:border-cricket-orange group-hover:bg-cricket-orange group-hover:text-cricket-graphite sm:right-6 sm:top-6"
          aria-hidden="true"
        >
          <ArrowUpRight
            className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 motion-reduce:transition-none"
            size={17}
            strokeWidth={2}
          />
        </span>
      </div>
      {/* <figcaption className="mt-2 flex flex-wrap gap-x-1 text-[10px] leading-5 text-cricket-light-gray/85">
        <span>Photo by</span>
        <a
          className="underline underline-offset-2 focus-visible:outline-offset-2"
          href={facility.imageCredit.sourceHref}
          target="_blank"
          rel="noreferrer"
        >
          {facility.imageCredit.creator}
        </a>
        <span>·</span>
        <a
          className="underline underline-offset-2 focus-visible:outline-offset-2"
          href={facility.imageCredit.licenseHref}
          target="_blank"
          rel="noreferrer"
        >
          {facility.imageCredit.license}
        </a>
      </figcaption> */}
    </motion.figure>
  )
}

export function Facilities() {
  const reduceMotion = useReducedMotion()
  const facilities = facilityContent.facilities
    .filter((facility) => facility.published)
    .sort((first, second) => first.sortOrder - second.sortOrder)
  const featuredFacility = facilities.find((facility) => facility.featured)
  const supportingFacilities = facilities.filter(
    (facility) => facility.id !== featuredFacility?.id,
  )

  return (
    <motion.section
      id={facilityContent.id}
      aria-labelledby="facilities-heading"
      className="scroll-mt-24 bg-cricket-graphite px-5 py-16 text-cricket-warm-white sm:px-7 sm:py-20 lg:px-10 lg:py-24"
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: reduceMotion ? 0.12 : 0.55, ease: 'easeOut' }}
    >
      <div className="mx-auto w-full max-w-350">
        <header className="grid items-end gap-5 md:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.85fr)] md:gap-8 lg:gap-16">
          <div>
            <p className="mb-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.18em] text-cricket-orange sm:text-xs">
              <span className="h-px w-7 bg-cricket-orange" aria-hidden="true" />
              {facilityContent.eyebrow}
            </p>
            <h2
              className="max-w-[14ch] font-display text-[clamp(2.5rem,4.6vw,4rem)] font-bold leading-[1.05] tracking-[-0.025em]"
              id="facilities-heading"
            >
              {facilityContent.heading}
            </h2>
          </div>
          <div className="max-w-xl pb-1">
            <p className="text-sm leading-7 text-cricket-warm-white/80 sm:text-base sm:leading-7">
              {facilityContent.description}
            </p>
            <p className="mt-3 text-xs leading-5 text-cricket-light-gray/75">
              {facilityContent.demoNotice}
            </p>
          </div>
        </header>

        {featuredFacility ? (
          <div className="mt-9 grid grid-cols-1 gap-x-5 gap-y-6 md:grid-cols-2 xl:mt-12 xl:grid-cols-12">
            <div className="md:col-span-2 xl:col-span-8">
              <FacilityFigure facility={featuredFacility} featured reduceMotion={reduceMotion} />
            </div>
            <div className="grid content-start gap-5 md:col-span-2 md:grid-cols-2 xl:col-span-4 xl:grid-cols-1">
              {supportingFacilities.map((facility) => (
                <FacilityFigure
                  key={facility.id}
                  facility={facility}
                  reduceMotion={reduceMotion}
                  featured={false}
                />
              ))}
            </div>
          </div>
        ) : facilities.length > 0 ? (
          <div className="mt-9 grid gap-5 md:grid-cols-2 xl:mt-12 xl:grid-cols-3">
            {facilities.map((facility) => (
              <FacilityFigure
                key={facility.id}
                facility={facility}
                reduceMotion={reduceMotion}
                featured={false}
              />
            ))}
          </div>
        ) : (
          <div className="mt-9 border-y border-cricket-warm-white/20 py-8 xl:mt-12">
            <p className="max-w-2xl text-sm leading-6 text-cricket-warm-white/80">
              Facility photography is being prepared. Contact NVAS for current facility information.
            </p>
          </div>
        )}

        <div className="mt-8 grid gap-6 border-y border-cricket-warm-white/20 py-5 sm:grid-cols-[1fr_auto] sm:items-center">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-8">
            {facilityContent.verifiedDetails.map((detail) => (
              <p key={detail.id} className="text-xs leading-5">
                <span className="block font-semibold uppercase tracking-[0.12em] text-cricket-light-gray/70">
                  {detail.label}
                </span>
                <span className="mt-1 block text-cricket-warm-white">{detail.value}</span>
              </p>
            ))}
          </div>
          <a
            className="inline-flex min-h-12 items-center justify-between gap-5 border border-cricket-orange px-5 text-sm font-bold text-cricket-warm-white transition-colors duration-200 hover:bg-cricket-orange hover:text-cricket-graphite focus-visible:outline-offset-4 motion-reduce:transition-none sm:justify-center"
            href={facilityContent.action.href}
          >
            {facilityContent.action.label}
            <ArrowUpRight size={17} strokeWidth={2} aria-hidden="true" />
          </a>
        </div>
      </div>
    </motion.section>
  )
}