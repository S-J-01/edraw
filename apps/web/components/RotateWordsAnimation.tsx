"use client"

import { AnimatePresence, motion } from "motion/react"
import { useEffect, useState } from "react"
 
export function RotateWordsAnimation({
  text = "Rotate",
  words = ["Word 1", "Word 2", "Word 3"],
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
return (
 
<div className="text-7xl font-semibold -tracking-4 bg-gradient-to-b from-zinc-200 via-zinc-200 via-[25%] to-zinc-400 inline-block text-transparent bg-clip-text">
  
  <AnimatePresence mode="wait">
    <motion.p
      key={words[index]}
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.5 }}
    >
      {words[index]}
    </motion.p>
  </AnimatePresence>
  {' '}{text}
</div>
) }