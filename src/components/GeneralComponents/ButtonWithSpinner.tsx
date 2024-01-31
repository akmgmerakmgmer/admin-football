import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { CircularProgress } from '@material-ui/core'

export default function ButtonWithSpinner(props: any) {
    return (
        <button disabled={props.disabled} className={` ${props.height} ${props.inputMargin ? 'mt-5' : ''} bg-primaryColor rounded-md text-white whitespace-nowrap shadow-md font-semibold ${props.width} ${props.size}`} onClick={props.click}>
            {!props.loading ? <span>{props.text}</span> :
                <CSSTransition
                    in={props.loading}
                    timeout={300}
                    classNames="default"
                    unmountOnExit
                >
                    <div className='mt-1.5'>
                        <CircularProgress color="inherit" size={20} />
                    </div>
                </CSSTransition>
            }
        </button>
    )
}


ButtonWithSpinner.defaultProps = {
    height: 'h-12',
    width: 'w-full',
    inputMargin: true,
    size:''
}