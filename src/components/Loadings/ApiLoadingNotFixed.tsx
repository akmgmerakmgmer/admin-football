import { CircularProgress } from '@material-ui/core'
import React from 'react'

type ApiLoadingNotFixedProps = {
    loading: boolean,
}
export default function ApiLoadingNotFixed(props: ApiLoadingNotFixedProps) {
    return (
        <>
            {props.loading && <div className='flex items-center justify-center mt-10'>
                <CircularProgress color="primary" />
            </div>}
        </>

    )
}


ApiLoadingNotFixed.defaultProps = {
    loading: false
}