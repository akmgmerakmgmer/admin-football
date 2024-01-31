import React from 'react'

export default function CancellationPercentage() {
  return (
    <div className='p-5 shadow-xl rounded-xl from-red-700 to-red-600 bg-gradient-to-tr text-white w-full flex gap-3 items-center'>
        <div className='border-4 border-white rounded-full text-lg px-3 py-4  font-semibold'>
            30%
        </div>
        <p className='text-xl font-semibold'>Of your orders are cancelled</p>
    </div>
  )
}
