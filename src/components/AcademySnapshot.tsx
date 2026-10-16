import { motion, useReducedMotion } from 'motion/react'
import { homeSections } from '../data/homeSections'

const reveal = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
}

export function AcademySnapshot() {
  const shouldReduceMotion = useReducedMotion()
  const { snapshot } = homeSections
  const statistics = snapshot.statistics
    .filter((item) => item.publicationStatus === 'published' && item.isVisible)
    .sort((first, second) => first.displayOrder - second.displayOrder)
  const highlights = snapshot.highlights
    .filter((item) => item.publicationStatus === 'published')
    .sort((first, second) => first.displayOrder - second.displayOrder)

  return (
    <section className="academy-snapshot" id={snapshot.id} aria-labelledby="snapshot-heading">
      <div className="academy-snapshot__inner">
        <motion.header
          className="academy-snapshot__intro"
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: shouldReduceMotion ? 0.12 : 0.55, ease: 'easeOut' }}
          variants={reveal}
        >
          <div className="academy-snapshot__title-copy">
            <p className="academy-snapshot__eyebrow">{snapshot.eyebrow}</p>
            <h2
              className="academy-snapshot__heading"
              id="snapshot-heading"
              aria-label={snapshot.heading.join(' ')}
            >
              {snapshot.heading.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h2>
          </div>
          <p className="academy-snapshot__description">{snapshot.description}</p>
        </motion.header>

        <motion.dl
          className={`academy-snapshot__metrics${statistics.length === 0 ? ' academy-snapshot__metrics--support-only' : ''}`}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: shouldReduceMotion ? 0 : 0.07 }}
        >
          {statistics.map((statistic) => (
            <motion.div
              className="academy-snapshot__metric academy-snapshot__metric--stat"
              key={statistic.id}
              variants={reveal}
              transition={{ duration: shouldReduceMotion ? 0.12 : 0.45, ease: 'easeOut' }}
            >
              <dt className="academy-snapshot__metric-label">{statistic.label}</dt>
              <dd className="academy-snapshot__metric-value">{statistic.value}</dd>
            </motion.div>
          ))}
          {highlights.map((highlight) => (
            <motion.div
              className="academy-snapshot__metric"
              key={highlight.id}
              variants={reveal}
              transition={{ duration: shouldReduceMotion ? 0.12 : 0.45, ease: 'easeOut' }}
            >
              <dt className="academy-snapshot__metric-label">{highlight.title}</dt>
              <dd className="academy-snapshot__metric-description">{highlight.description}</dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}