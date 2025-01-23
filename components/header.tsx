'use client'

import { Moirai_One } from 'next/font/google'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import React, { useState } from 'react'

const moiraiOne = Moirai_One({
  weight: '400',
  subsets: ['latin'],
})

export const Header = () => {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState<boolean>(false)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious()
    if (latest > previous!) {
      setHidden(true)
    } else {
      setHidden(false)
    }
  })

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: '-100%' },
      }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duraction: 0.35, ease: 'easeInOut' }}
    >
      <div className="p-2 sticky top-0 flex w-full z-10 bg-yellow-400">
        <h1 className={`${moiraiOne.className} text-white text-6xl font-bold`}>
          Yello
        </h1>
      </div>
    </motion.nav>
  )
}
