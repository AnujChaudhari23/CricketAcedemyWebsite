import { useState } from 'react'
import { ArrowRight, CircleDot } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { homeContent } from '../data/homeContent'

const contentReveal = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
}

export function Hero() {
  const [imageIndex, setImageIndex] = useState(0)
  const [imageUnavailable, setImageUnavailable] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const { hero } = homeContent
  const activeImage = hero.images[imageIndex]

  const handleImageError = () => {
    if (imageIndex < hero.images.length - 1) {
      setImageIndex((currentIndex) => currentIndex + 1)
      return
    }
    setImageUnavailable(true)
  }

  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero__photo" aria-hidden="true">
        {!imageUnavailable ? (
          <motion.img
            key={activeImage.src}
            className="hero__photo-image"
            src={activeImage.src}
            srcSet={activeImage.srcSet}
            sizes="(max-width: 700px) 100vw, 65vw"
            alt={activeImage.alt}
            width="1900"
            height="2850"
            fetchPriority="high"
            decoding="async"
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 1.035 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: shouldReduceMotion ? 0.12 : 0.8, ease: 'easeOut' }}
            onError={handleImageError}
          />
        ) : (
          <div className="hero__photo-fallback" role="img" aria-label="Cricket ground at NVAS">
            <CircleDot size={42} strokeWidth={1.2} aria-hidden="true" />
            <span>A new innings starts here</span>
          </div>
        )}
        <span className="hero__photo-rule" />
        <span className="hero__photo-caption">BUILT FOR THE LONG GAME</span>
      </div>

      <div className="hero__inner">
        <motion.div
          className="hero__content"
          initial={shouldReduceMotion ? false : 'hidden'}
          animate="visible"
          transition={{ staggerChildren: shouldReduceMotion ? 0 : 0.09, delayChildren: shouldReduceMotion ? 0 : 0.08 }}
        >
          <motion.p className="hero__eyebrow" variants={contentReveal}>
            {hero.eyebrow.map((word, index) => (
              <span key={word}>
                {index > 0 && <span className="hero__eyebrow-divider" aria-hidden="true">·</span>}
                {word}
              </span>
            ))}
          </motion.p>

          <motion.h1 className="hero__title" id="hero-title" variants={contentReveal}>
            <span>{hero.headline[0]}</span>
            <span className="hero__title-accent">{hero.headline[1]}</span>
          </motion.h1>

          <motion.p className="hero__description" variants={contentReveal}>
            {hero.description}
          </motion.p>

          <motion.div className="hero__actions" variants={contentReveal}>
            <motion.a
              className="button button--primary"
              href={hero.primaryAction.href}
              whileHover={shouldReduceMotion ? undefined : { y: -2 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
            >
              <span>{hero.primaryAction.label}</span>
              <ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" />
            </motion.a>
            <motion.a
              className="button button--secondary"
              href={hero.secondaryAction.href}
              whileHover={shouldReduceMotion ? undefined : { y: -2 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
            >
              {hero.secondaryAction.label}
            </motion.a>
          </motion.div>

          <motion.p className="hero__location" variants={contentReveal}>
            <span className="hero__location-mark" aria-hidden="true" />
            {homeContent.brand.location}
          </motion.p>
        </motion.div>
      </div>

    </section>
  )
}