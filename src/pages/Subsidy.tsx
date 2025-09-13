import Layout from '@/components/Layout'
import { Star } from 'lucide-react'
import { motion, useAnimation } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { useEffect } from 'react'

const typeSubsidies = [
  { name: 'Land Subsidy', starred: true },
  { name: 'Tax Incentives', starred: false },
  { name: 'Grants', starred: false },
  { name: 'Low-Interest Loans', starred: false },
  { name: 'Training Programs', starred: false },
  { name: 'Infrastructure Support', starred: false }
]

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 }
  }
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 100, damping: 20 }
  }
}

// Shake + scale animation
const shakeAnimation = {
  rotate: [0, -20, 20, -20, 20, 0],
  scale: [1, 1.4, 1.4, 1.4, 1.4, 1],
  transition: { duration: 1 }
}

const Subsidy = () => {
  const controls = useAnimation()

  useEffect(() => {
    const timer = setTimeout(() => {
      controls.start(shakeAnimation)
    }, 800)

    return () => clearTimeout(timer)
  }, [controls])

  return (
    <Layout>
      <div className="text-4xl pt-6 font-bold">Recommended Subsidies</div>

      <motion.div
        className="mt-4"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {typeSubsidies.map((item) => (
          <motion.div
            key={item.name}
            className="p-4 mt-4 border border-border rounded-lg hover:shadow-lg transition-shadow cursor-pointer"
            variants={cardVariants}
          >
            <div className="flex gap-2 items-center">
              {item.starred && (
                <motion.div animate={controls} className="inline-block">
                  <Star color="#fcba03" fill="#fcba03" />
                </motion.div>
              )}
              <div className="text-2xl font-semibold">{item.name}</div>
            </div>
            <div className="mt-2 text-md md:text-sm text-muted-foreground">
              Detailed information about {item.name} including eligibility criteria,
              application process, and benefits.
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Layout>
  )
}

export default Subsidy
