import React from 'react'
import './fullLoading.css'
export default function FullScreenLoading() {
  return (
    <div className='flex justify-center items-center bg-primaryColor w-full h-full fixed top-0 left-0 z-50'>
      <div className="wave md:text-3xl text-2xl flex ltr:flex-row rtl:flex-row-reverse">
        <span className='spanLoading delay-100' style={{ animationDelay: "0.1s" }}>D</span>
        <span className='spanLoading' style={{ animationDelay: "0.2s" }}>I</span>
        <span className='spanLoading' style={{ animationDelay: "0.3s" }}>S</span>
        <span className='spanLoading' style={{ animationDelay: "0.4s" }}>C</span>
        <span className='spanLoading' style={{ animationDelay: "0.5s" }}>O</span>
        <span className='spanLoading' style={{ animationDelay: "0.6s" }}>U</span>
        <span className='spanLoading' style={{ animationDelay: "0.7s" }}>N</span>
        <span className='spanLoading' style={{ animationDelay: "0.8s" }}>T</span>
        <span className='spanLoading' style={{ animationDelay: "0.9s" }}>A</span>
        <span className='spanLoading' style={{ animationDelay: "1s" }}>T</span>
        <span className='spanLoading' style={{ animationDelay: "1.1s" }}>Y</span>
        <span className='spanLoading' style={{ animationDelay: "1.2s" }}>.</span>
      </div>
    </div>
  )
}
