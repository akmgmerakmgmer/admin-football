import React from 'react'

export default function Status(props: any) {
    return (
        <div className='flex gap-1.5 items-center'>
            <div className={`w-2 h-2 rounded-full ${props.color}`}></div>
            <span>{props.title}</span>
        </div>
    )
}
