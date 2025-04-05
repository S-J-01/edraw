'use client'

import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  text: string;
  startIcon?:ReactNode;
  endIcon?:ReactNode
}


export const Button = ({text,startIcon,endIcon,...props}:ButtonProps)=>{
  return(
    <button {...props}>
{startIcon}{text}{endIcon}
    </button>
  )
}