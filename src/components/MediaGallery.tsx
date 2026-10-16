import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, X } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { mediaGalleryContent, type GalleryLayout, type GalleryMediaItem } from '../data/mediaGalleryContent'

const mosaicLayoutClasses: Record<GalleryLayout | 'featured', string> = {
  featured:
    'col-span-2 aspect-[1.3] sm:col-span-6 sm:aspect-[1.65] lg:col-span-7 lg:row-span-2 lg:aspect-auto lg:min-h-[34rem]',
  wide: 'col-span-2 aspect-[1.65] sm:col-span-6 sm:aspect-[1.8] lg:col-span-5 lg:aspect-auto lg:min-h-56',
  square: 'col-span-1 aspect-[0.88] sm:col-span-3 sm:aspect-square lg:col-span-2 lg:aspect-auto lg:min-h-56',
  landscape:
    'col-span-1 aspect-[0.88] sm:col-span-3 sm:aspect-square lg:col-span-3 lg:aspect-auto lg:min-h-56',
}

interface GalleryTileProps {
  media: GalleryMediaItem
  reduceMotion: boolean | null
  onOpen: (media: GalleryMediaItem) => void
}

function GalleryTile({ media, reduceMotion, onOpen }: GalleryTileProps) {
  const [imageUnavailable, setImageUnavailable] = useState(false)
  const layout = media.featured ? 'featured' : media.layout

  return (
    <motion.article
      className={`min-w-0 ${mosaicLayoutClasses[layout]}`}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: reduceMotion ? 0.12 : 0.45, ease: 'easeOut' }}
    >
      <button
        type="button"
        className="group relative isolate flex h-full min-h-56 w-full items-end overflow-hidden bg-cricket-graphite text-left text-cricket-warm-white focus-visible:outline-offset-4 motion-reduce:transition-none"
        onClick={() => onOpen(media)}
        aria-label={`Open gallery image: ${media.title}`}
        aria-haspopup="dialog"
      >
        {imageUnavailable ? (
          <span className="absolute inset-0 flex items-end bg-cricket-graphite p-5 font-display text-2xl font-bold">
            NVAS / Cricket
          </span>
        ) : (
          <img
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035] group-focus-visible:scale-[1.035] motion-reduce:transition-none"
            src={media.thumbnailUrl}
            alt={media.altText}
            width={media.width}
            height={media.height}
            loading="lazy"
            decoding="async"
            onError={() => setImageUnavailable(true)}
          />
        )}
        <span
          className="absolute inset-0 bg-linear-to-t from-cricket-graphite/90 via-cricket-graphite/12 to-transparent"
          aria-hidden="true"
        />
        <span className="absolute right-4 top-4 grid size-10 place-items-center border border-cricket-warm-white/70 bg-cricket-graphite/25 text-cricket-warm-white transition-colors duration-200 group-hover:border-cricket-orange group-hover:bg-cricket-orange group-hover:text-cricket-graphite sm:right-5 sm:top-5">
          <ArrowUpRight
            className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 motion-reduce:transition-none"
            size={17}
            strokeWidth={2}
            aria-hidden="true"
          />
        </span>
        <span className="relative z-10 block w-full p-4 sm:p-5 lg:p-6">
          <span className="mb-2 block text-[9px] font-bold uppercase tracking-[0.15em] text-cricket-orange sm:text-[10px]">
            {media.category}
          </span>
          <span className={`block font-display font-bold tracking-[-0.02em] leading-[1.05] ${media.featured ? 'text-2xl sm:text-3xl lg:text-4xl' : 'text-lg sm:text-xl'}`}>
            {media.title}
          </span>
          <span className={`mt-2 block max-w-xl leading-5 text-cricket-warm-white/85 ${media.featured ? 'text-xs sm:text-sm sm:leading-6' : 'text-[11px] sm:text-xs'}`}>
            {media.caption}
          </span>
        </span>
      </button>
    </motion.article>
  )
}

export function MediaGallery() {
  const reduceMotion = useReducedMotion()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [activeMedia, setActiveMedia] = useState<GalleryMediaItem | null>(null)
  const publishedMedia = mediaGalleryContent.media
    .filter((media) => media.published)
    .sort((first, second) => first.sortOrder - second.sortOrder)
  const featuredMedia = publishedMedia.find((media) => media.featured)
  const supportingMedia = publishedMedia.filter((media) => media.id !== featuredMedia?.id)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (activeMedia && !dialog.open) dialog.showModal()
    if (!activeMedia && dialog.open) dialog.close()
  }, [activeMedia])

  const closeLightbox = () => setActiveMedia(null)

  return (
    <motion.section
      id={mediaGalleryContent.id}
      aria-labelledby="media-gallery-heading"
      className="scroll-mt-24 border-t border-cricket-graphite/25 bg-cricket-warm-white px-5 pt-10 pb-16 text-cricket-graphite sm:px-7 sm:pt-10 sm:pb-20 lg:px-10 lg:pt-12 lg:pb-24"
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: reduceMotion ? 0.12 : 0.5, ease: 'easeOut' }}
    >
      <div className="mx-auto w-full max-w-350">
        <header className="grid items-end gap-5 md:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.85fr)] md:gap-8 lg:gap-12">
          <div>
            <p className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-bold uppercase tracking-[0.18em] sm:text-xs">
              <span>{mediaGalleryContent.eyebrow[0]}</span>
              <span className="text-cricket-orange" aria-hidden="true">/</span>
              <span>{mediaGalleryContent.eyebrow[1]}</span>
            </p>
            <h2
              className="max-w-[14ch] font-display text-[clamp(2.5rem,4.6vw,4rem)] font-bold leading-[1.05] tracking-[-0.025em]"
              id="media-gallery-heading"
            >
              {mediaGalleryContent.heading}
            </h2>
          </div>
          <div className="max-w-xl pb-1">
            <p className="text-sm leading-7 text-cricket-graphite/75 sm:text-base sm:leading-7">
              {mediaGalleryContent.description}
            </p>
            {publishedMedia.some((media) => media.demoAsset) && (
              <p className="mt-3 text-xs leading-5 text-cricket-graphite/65">
                {mediaGalleryContent.demoDisclosure}
              </p>
            )}
          </div>
        </header>

        {featuredMedia ? (
          <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-6 sm:gap-4 lg:mt-12 lg:grid-cols-12 lg:auto-rows-64 lg:gap-5">
            <GalleryTile media={featuredMedia} reduceMotion={reduceMotion} onOpen={setActiveMedia} />
            {supportingMedia.map((media) => (
              <GalleryTile key={media.id} media={media} reduceMotion={reduceMotion} onOpen={setActiveMedia} />
            ))}
          </div>
        ) : publishedMedia.length > 0 ? (
          <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-6 sm:gap-4 lg:mt-12 lg:grid-cols-12 lg:gap-5">
            {publishedMedia.map((media) => (
              <GalleryTile key={media.id} media={media} reduceMotion={reduceMotion} onOpen={setActiveMedia} />
            ))}
          </div>
        ) : (
          <p className="mt-9 border-t border-cricket-graphite/15 pt-6 text-sm leading-6 text-cricket-graphite/75 lg:mt-12">
            Gallery moments will appear here as approved media becomes available.
          </p>
        )}

        <div className="mt-4 flex flex-col gap-4 bg-cricket-orange p-5 text-cricket-graphite sm:flex-row sm:items-center sm:justify-between sm:px-7 sm:py-5">
          <p className="font-display text-xl font-bold leading-[1.1] tracking-[-0.02em] sm:text-2xl">
            {mediaGalleryContent.message}
          </p>
          <a
            className="group/gallery-link inline-flex min-h-11 shrink-0 items-center gap-3 text-sm font-bold outline-offset-4 focus-visible:outline-offset-4 sm:text-base"
            href={mediaGalleryContent.allGalleryHref}
          >
            View All Gallery
            <ArrowUpRight
              className="transition-transform duration-200 group-hover/gallery-link:translate-x-1 group-hover/gallery-link:-translate-y-1 motion-reduce:transition-none"
              size={18}
              strokeWidth={2}
              aria-hidden="true"
            />
          </a>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="m-auto max-h-[calc(100dvh-2rem)] w-[min(92vw,80rem)] max-w-none overflow-hidden border-0 bg-cricket-graphite p-0 text-cricket-warm-white backdrop:bg-cricket-graphite/90"
        aria-labelledby="gallery-lightbox-heading"
        onClose={closeLightbox}
        onKeyDown={(event) => {
          if (event.key !== 'Escape') return
          event.preventDefault()
          closeLightbox()
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeLightbox()
        }}
      >
        {activeMedia && (
          <div className="relative grid max-h-[calc(100dvh-2rem)] grid-rows-[auto_minmax(0,1fr)_auto]">
            <div className="flex items-start justify-between gap-5 p-4 sm:p-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-cricket-orange">
                  {activeMedia.category}
                </p>
                <h2 className="mt-1 font-display text-xl font-bold leading-[1.1] tracking-[-0.02em] sm:text-2xl" id="gallery-lightbox-heading">
                  {activeMedia.title}
                </h2>
              </div>
              <button
                type="button"
                autoFocus
                className="grid size-11 shrink-0 place-items-center border border-cricket-warm-white/40 text-cricket-warm-white hover:border-cricket-orange hover:text-cricket-orange focus-visible:outline-offset-4"
                onClick={closeLightbox}
                aria-label="Close media viewer"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            <div className="flex min-h-0 items-center justify-center bg-cricket-graphite px-3 sm:px-6">
              {activeMedia.mediaType === 'video' && activeMedia.videoUrl ? (
                <video
                  className="max-h-[min(72dvh,54rem)] w-full object-contain"
                  src={activeMedia.videoUrl}
                  poster={activeMedia.thumbnailUrl}
                  controls
                  preload="metadata"
                  aria-label={activeMedia.altText}
                />
              ) : (
                <img
                  className="max-h-[min(72dvh,54rem)] w-full object-contain"
                  src={activeMedia.imageUrl}
                  alt={activeMedia.altText}
                  width={activeMedia.width}
                  height={activeMedia.height}
                  decoding="async"
                />
              )}
            </div>
            <p className="p-4 text-sm leading-6 text-cricket-warm-white/80 sm:px-6 sm:py-5">
              {activeMedia.caption}
            </p>
          </div>
        )}
      </dialog>
    </motion.section>
  )
}