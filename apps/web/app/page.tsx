'use client'
import { Button } from "@repo/ui/button";




export default function Home() {
  return (
    <div className ="border-red-100 border-4 bg-black h-28 p-2">
     <Button text={"Sign Up"} variant={"primary"} onClick={()=>alert('button clicked')}></Button>
     <Button text={"Log In"} variant={"secondary"} onClick={()=>alert('button clicked')}></Button>
     <Button text={"Third Button"} variant={"primary"} size={"small"} onClick={()=>alert('button clicked')}></Button>
     <Button text={"Fourth Button"} variant={"secondary"} size={"small"} onClick={()=>alert('button clicked')}></Button>
    </div>
  );
}
