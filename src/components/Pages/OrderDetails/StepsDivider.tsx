import { Divider } from '@material-ui/core'
import React from 'react'

type StepsDividerProps = {
    status: boolean
}
export default function StepsDivider(props:StepsDividerProps) {
    return (
        <div className={`lg:w-64 md:w-44 sm:w-28 w-24 h-0.5 ${props.status?"bg-primaryColor":"bg-gray-400"}`}>
            
        </div>
    )
}

StepsDivider.defaultProps = {
    status: false
}