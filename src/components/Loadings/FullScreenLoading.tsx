import React from 'react'
import { CircularProgress } from '@material-ui/core'
export default function FullScreenLoading() {
  return (
    <div className='flex justify-center items-center bg-primaryColor w-full h-full fixed top-0 left-0 z-50'>
      <CircularProgress color='secondary'/>
    </div>
  )
}
