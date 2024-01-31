import React from 'react'
import './index.css'

type MainLoaderProps = {
    loading: boolean,
    height:string,
    width:string,
}
export default function MainLoader(props: MainLoaderProps) {
    return (
        <>
            {props.loading && <div className={`lds-ellipsis ${props.height} ${props.width} scale-50`}><div></div><div></div><div></div><div></div></div>}
        </>
    )
}

MainLoader.defaultProps = {
    loading: false,
    height:'h-6',
    width:"w-20"
}
