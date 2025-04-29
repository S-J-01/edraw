"use client"

import { AnimatePresence, motion } from "motion/react"
import { useEffect, useState } from "react"
 
export function RotateWordsAnimation({
  text ,
  words  
}: {
  text: string
  words: string[]
}) {
  const [index, setIndex] = useState(0)
 
useEffect(() => {
const interval = setInterval(() => {
setIndex((prevIndex) => (prevIndex + 1) % words.length)
}, 5000)

return () => clearInterval(interval)
}, [])
const lineHeight = "h-[4.6rem]"
return (
 
<div className="text-7xl font-semibold -tracking-4 text-black dark:text-white leading-tight">
  
  <div className={`inline-block align-top ${lineHeight} overflow-hidden`}>

    <span className="inline-block text-right min-w-[28.5rem]">
  <AnimatePresence mode="wait">
    <motion.span
    className="inline-block"
      key={words[index]}
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 2.0 }}
    >
      {words[index]}
    </motion.span>
  </AnimatePresence>
  </span>
  </div>
  {' '}{text}
</div>
) }