import { CircularProgress } from '@material-ui/core'
import React from 'react'

type ApiLoadingProps = {
    loading: boolean,
}
export default function ApiLoading(props: ApiLoadingProps) {
    return (
        <>
            {props.loading && <div className='flex items-center justify-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-10'>
                <CircularProgress color="primary" />
            </div>}
        </>

    )
}


ApiLoading.defaultProps = {
    loading: false
}