"use client"

import { AnimatePresence, motion } from "motion/react"
import { useEffect, useState } from "react"
 
export function RotateWordsAnimation({
  
  words  
}: {
  
  words: string[]
}) {
  const [index, setIndex] = useState(0)
 
useEffect(() => {
const interval = setInterval(() => {
setIndex((prevIndex) => (prevIndex + 1) % words.length)
}, 3000)

return () => clearInterval(interval)
}, [])
const lineHeight = "h-[6.1rem]"
const lineHeightMobile = "h-[3.1rem]"
return (
 
<div className="text-5xl md:text-8xl font-semibold -tracking-4 text-black dark:text-white ">
  
  <div className={`inline-block align-top h-[3.1rem] md:h-[6.1rem] overflow-hidden`}>

    
  <AnimatePresence mode="wait">
    <motion.span
    className="inline-block"
      key={words[index]}
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.3, ease:"easeInOut" }}
    >
      {words[index]}
    </motion.span>
  </AnimatePresence>
  
  </div>
  
</div>
) }