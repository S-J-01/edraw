import TryNowButton from "./TryNowButton"
import { RotateWordsAnimation } from "./RotateWordsAnimation"

const HeroSection = ()=>{
return (
    <div className="flex flex-col items-center justify-center text-center min-h-[92vh] bg-stone-100 dark:bg-neutral-900 border-2 border-red-600">
        <RotateWordsAnimation text="with your peers" words={["Create", "Collaborate", "Communicate"]}/>
        <div className="text-7xl font-semibold -tracking-4 bg-gradient-to-b from-zinc-200 via-zinc-200 via-[25%] to-zinc-400 inline-block text-transparent bg-clip-text">
        in real-time
        </div>
        
        <div>
        A real-time collaborative canvas for teams, creators and teachers <br />
        </div>
        
        <TryNowButton/>
    </div>
)
}

export default HeroSection