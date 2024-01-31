import React from 'react'
import { useSelector } from 'react-redux'

export default function Avatar() {
    const user = useSelector((state: any) => state.user)
  return (
    <div className='w-10 py-2 rounded-full shadow-lg bg-gradient-to-bl from-blue-700  to-blue-600'>
        <span className='pt-1 uppercase font-semibold'>{user.username[0]}</span>
    </div>
  )
}
