 'use client'
 import { Button } from "@repo/ui/button"
 
 const AppBar = () => {
    return(
        <div className="flex flex-row justify-between items-center min-h-[10vh] bg-black">
            <div className="flex items-center text-white">
                EDRAW
            </div>

            <div className="flex items-center justify-around ">
                <Button text={"Log In"} variant={"secondary"} size={"large"} onClick={()=>alert("login button clicked")} ></Button>
                <Button text={"Signup"} variant={"primary"} size={"large"} onClick={()=>alert("signup button clicked")} ></Button>
            </div>
        </div>
    )
}

export default AppBar