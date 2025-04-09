import { cva, VariantProps } from 'class-variance-authority';
import { cn } from './utils'

import { ButtonHTMLAttributes, ReactNode } from "react";

const buttonVariants = cva("rounded-full border-2",{
  variants:{
    variant:{
      primary:" bg-slate-300 border-slate-300 text-black",
      secondary:"bg-black border-slate-300 text-slate-300"
    },
    size:{
      small:"p-3 text-md",
      large:"p-6 text-lg"
    }
  },
  defaultVariants:{
    variant:"primary",
    size:"large"
  }
})

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants>{
  text: string;
  startIcon?:ReactNode;
  endIcon?:ReactNode
}


export const Button = ({text,startIcon,endIcon,variant,size,className,...props}:ButtonProps)=>{
  return(
    <button {...props} className={cn(buttonVariants({variant,size,className}))}>
{startIcon}{text}{endIcon}
    </button>
  )
}