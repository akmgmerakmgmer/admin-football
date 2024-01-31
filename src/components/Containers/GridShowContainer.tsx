import React from 'react'

type GridShowContainerProps={
    children:any,
}
export default function GridShowContainer(props:GridShowContainerProps) {
  return (
    <div className={`grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mt-5`}>
        {props.children}
    </div>
  )
}
