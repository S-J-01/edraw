import { Button } from "@repo/ui/button";



export default function Home() {
  return (
    <div className ="border-red-100 border-4">
      Hello from the web app
      <div>
        <Button variant="secondary" size="large" text="Hello" onClick={()=>{}}/>
      </div>
    </div>
  );
}
