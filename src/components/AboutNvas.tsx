import { ArrowUpRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { homeSections } from '../data/homeSections'

const reveal = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
}

export function AboutNvas() {
  const shouldReduceMotion = useReducedMotion()
  const { about } = homeSections
  const principles = about.principles
    .filter((item) => item.publicationStatus === 'published')
    .sort((first, second) => first.displayOrder - second.displayOrder)

  return (
    <section className="about-nvas" id={about.id} aria-labelledby="about-heading">
      <div className="about-nvas__inner">
        <motion.header
          className="about-nvas__heading-group"
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: shouldReduceMotion ? 0.12 : 0.55, ease: 'easeOut' }}
          variants={reveal}
        >
          <p className="about-nvas__eyebrow">{about.eyebrow}</p>
          <h2 className="about-nvas__heading" id="about-heading">
            {about.heading}
          </h2>
        </motion.header>

        <motion.figure
          className="about-nvas__figure"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: shouldReduceMotion ? 0.12 : 0.65, ease: 'easeOut' }}
        >
          <div className="about-nvas__image-frame">
            <motion.img
              className="about-nvas__image"
              src={about.image.src}
              alt={about.image.alt}
              width={about.image.width}
              height={about.image.height}
              loading="lazy"
              decoding="async"
              style={{ objectPosition: about.image.objectPosition }}
              initial={shouldReduceMotion ? false : { scale: 1.035 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: shouldReduceMotion ? 0.12 : 0.8, ease: 'easeOut' }}
            />
          </div>
          <figcaption className="about-nvas__image-credit">
            <a href={about.image.sourceHref} target="_blank" rel="noreferrer">
              {about.image.sourceLabel}
            </a>
          </figcaption>
        </motion.figure>

        <motion.div
          className="about-nvas__details"
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          transition={{ staggerChildren: shouldReduceMotion ? 0 : 0.07 }}
        >
          <motion.p className="about-nvas__description" variants={reveal}>
            {about.description}
          </motion.p>

          <ul className="about-nvas__principles">
            {principles.map((principle) => (
              <motion.li className="about-nvas__principle" key={principle.id} variants={reveal}>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </motion.li>
            ))}
          </ul>

          <motion.a className="about-nvas__link" href={about.action.href} variants={reveal}>
            <span>{about.action.label}</span>
            <ArrowUpRight size={18} strokeWidth={2} aria-hidden="true" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}