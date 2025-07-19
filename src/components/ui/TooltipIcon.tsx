import React from 'react'

export default function TooltipIcon({Icon, label}: {Icon: any, label: string }) {
  return (
    <div className='relative group inline-block'>
      <Icon className='w-5 h-5' />
    <div className='absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-gray-500 text-white text-xs rounded px-1 py-1 whitespace-nowrap z-10 '>
         {label}
    </div>
    </div>
  )
}

