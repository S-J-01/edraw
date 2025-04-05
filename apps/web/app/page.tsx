'use client'
import { Button } from "@repo/ui/button";




export default function Home() {
  return (
    <div className ="border-red-100 border-4">
     <Button text={"First Button"} onClick={()=>alert('button clicked')}></Button>
    </div>
  );
}
