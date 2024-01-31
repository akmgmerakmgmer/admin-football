import React from 'react'
import { CSSTransition } from 'react-transition-group'

type ModalProps = {
    show: boolean,
    hideModal?: () => void,
    background: string
}
export default function Modal(props: ModalProps) {
    return (
        <>
            <CSSTransition
                in={props.show}
                timeout={300}
                classNames="default"
                unmountOnExit

            >
                <div className={`fixed transition-all w-full h-full top-0 left-0 ${props.background} z-10`} onClick={props.hideModal}>

                </div>
            </CSSTransition>

        </>

    )
}

Modal.defaultProps = {
    background: 'bg-transparent'
}
