import React from 'react'

type StepCircleProps = {
    status: boolean,
}
export default function StepCircle(props: StepCircleProps) {
    return (
        <div className={`border-2 ${props.status ? "border-primaryColor" : "border-gray-400"} rounded-full p-0.5`}>
            <div className={`w-3 h-3 rounded-full ${props.status ? "bg-primaryColor" : "bg-gray-400"}`}></div>
        </div>
    )
}

StepCircle.defaultProps = {
    status: false
}