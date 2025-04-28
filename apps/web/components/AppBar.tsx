 'use client'
 import { Button } from "@repo/ui/button"
import ThemeToggle from "./ThemeToggle"
 
 const AppBar = () => {
    return(
        <div className="flex flex-row justify-between items-center min-h-[8vh] px-4 bg-stone-100 dark:bg-neutral-900 border-2 border-red-500">
            <h1 className="text-3xl/[2rem] font-semibold -tracking-4 bg-gradient-to-b from-zinc-200 via-zinc-200 via-[25%] to-zinc-400  inline-block text-transparent bg-clip-text drop-shadow-2xl border-2 border-red-500">
                EDRAW
            </h1>

            <div className="flex items-center justify-around gap-4 border-2 border-red-500 ">
                <ThemeToggle/>
                <Button text={"Log In"} variant={"secondary"} size={"large"} onClick={()=>alert("login button clicked")} ></Button>
                <Button text={"Sign Up"} variant={"primary"} size={"large"} onClick={()=>alert("signup button clicked")} ></Button>
            </div>
        </div>
    )
}

export default AppBar