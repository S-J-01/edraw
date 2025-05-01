import TryNowButton from "./TryNowButton"
import { RotateWordsAnimation } from "./RotateWordsAnimation"

const HeroSection = ()=>{
return (
    <div className="px-4 flex flex-col items-center justify-center text-center min-h-[92vh] bg-stone-100 dark:bg-neutral-900 border-2 border-red-600">
        <RotateWordsAnimation  words={["Create", "Collaborate", "Communicate"]}/>
        <div className=" text-3xl md:text-7xl font-semibold -tracking-4 md:-mt-1 bg-gradient-to-b from-zinc-200 via-zinc-200 via-[25%] to-zinc-400 inline-block text-transparent bg-clip-text">
        with your peers in real-time
        </div>
        
        <div className=" text-base md:text-2xl font-thin mt-5 bg-gradient-to-b from-zinc-200 via-zinc-200 via-[25%] to-zinc-400 inline-block text-transparent bg-clip-text">
        A real-time collaborative canvas for Engineers, Designers and Teachers <br />
        </div>
        
        <TryNowButton/>
    </div>
)
}

export default HeroSection