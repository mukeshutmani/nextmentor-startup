import React, { forwardRef, InputHTMLAttributes } from 'react'


type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string,
  error?: string,
  icon?: React.ReactNode
}


const Input = 
  forwardRef<HTMLInputElement, InputProps> (({label, error, icon,className, ...props}, ref) => {
  return (

    <div>
       <input
            ref={ref}  
            {...props}
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-gray-800 placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-slate-500"
          /> 
    </div>
  )
}
);
Input.displayName = 'Input'
export default Input