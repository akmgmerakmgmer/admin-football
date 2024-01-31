import React from 'react'

type AnalyticsCardProps = {
    background:string,
    value:any,
    title:string,
    icon:any
}
export default function AnalyticsCard(props:AnalyticsCardProps) {
  return (
    <div className={`p-5 flex flex-col text-xs font-semibold gap-3 bg-gradient-to-tr ${props.background} rounded-xl shadow-lg text-white`}>
        <div className='flex justify-between items-center'>
            <span className='text-sm'>{props.value}</span>
            {props.icon}
        </div>
        <div className='relative h-2'>
            <div className='w-full h-full rounded-lg bg-black bg-opacity-20 absolute top-0 left-0'></div>
            <div className='w-2/3 h-full rounded-lg bg-white absolute top-0 left-0'></div>
        </div>
        <span className='text-sm'>{props.title}</span>
    </div>
  )
}
