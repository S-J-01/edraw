import { cva, VariantProps } from 'class-variance-authority';
import { cn } from './utils'

import { ButtonHTMLAttributes, ReactNode } from "react";

const buttonVariants = cva("inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-full border-2 gap-2 shadow-sm hover:shadow active:shadow-inner",{
  variants:{
    variant:{
      primary:" bg-white border-gray-300 text-black hover:bg-gray-100 hover:border-gray-400 active:bg-gray-200 focus:ring-gray-300",
      secondary:"bg-black border-gray-600  text-white hover:bg-gray-900 hover:border-gray-400 active:bg-gray-700 focus:ring-gray-600"
    },
    size:{
      small:" h-9 px-3 py-2 text-sm min-w-24",
      large:"h-11 px-5 py-2.5 text-base min-w-32"
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