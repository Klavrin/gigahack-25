import { motion } from 'motion/react'
import type React from 'react'

interface FlipTextProps {
  children: React.ReactNode
  className?: string
}

const FlipText = ({ children, className }: FlipTextProps) => {
  return (
    <motion.div
      initial="initial"
      whileHover="hovered"
      className={`relative block overflow-hidden whitespace-nowrap ${className}`}
    >
      <motion.div
        className="block"
        variants={{
          initial: { y: 0 },
          hovered: { y: '-100%' }
        }}
      >
        {children}
      </motion.div>
      <motion.div
        className="absolute top-full left-0"
        variants={{
          initial: { y: 0 },
          hovered: { y: '-100%' }
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

export default FlipText
