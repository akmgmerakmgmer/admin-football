import { CircularProgress } from '@material-ui/core'
import React from 'react'
import { CSSTransition } from 'react-transition-group'

type ButtonLoadingProps = {
    loading: boolean,
}
export default function ButtonLoading(props: ButtonLoadingProps) {
    return (
        <div className='mt-1.5'>
            <CSSTransition
                in={props.loading}
                timeout={300}
                classNames="default"
                unmountOnExit
            >
                <CircularProgress color="inherit" size={22} />
            </CSSTransition>
        </div>
    )
}

ButtonLoading.defaultProps = {
    loading: false
}