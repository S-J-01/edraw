import { ReactNode } from "react"

interface ButtonProps{
  variant:"primary" | "secondary" | "outline";
  size:"small" | "large";
  text: string;
  icon?:ReactNode;
  onClick : ()=>void
}
const variantStyles ={
  "primary": "bg-white text-black rounded-full",
  "secondary":"bg-black text-white rounded-full",
  "outline" :"bg-black text-white rounded-full border-white"
}

export const Button = (props:ButtonProps)=>{
  return(
    <button className={`${variantStyles[props.variant]}`}>
     {props.text}
    </button>
  )
}
