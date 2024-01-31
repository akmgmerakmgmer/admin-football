import React from 'react'
import { CSSTransition } from 'react-transition-group'
import Modal from './Modal'
import { useTranslation } from 'react-i18next'

type AreYouSureModalProps = {
    show: boolean,
    hideModal: () => any
    deleteItem: () => any,
    enable?: boolean,
    disable?: boolean,
    text: string
}
export default function AreYouSureModal(props: AreYouSureModalProps) {
    const { t } = useTranslation()
    return (
        <CSSTransition
            in={props.show}
            timeout={300}
            classNames="default"
            unmountOnExit

        >
            <>
                <div className='absolute bottom-16 z-50 h-auto '>
                    <div className='items-center ltr:-left-56 rtl:-right-56 bg-white shadow-md rounded-md px-5 py-2.5 flex flex-col gap-3 absolute'>
                        <span className="text-xs font-semibold">{props.text}</span>
                        <div className='flex gap-5'>
                            <span className={`${props.enable ? 'text-white bg-orange-500 hover:bg-orange-600' : 'text-red-900 bg-red-100 hover:bg-red-300'} py-2 px-5 rounded-full text-xs font-semibold transition-all`} onClick={props.deleteItem}>{t("yes")}</span>
                            <span className="text-indigo-900 bg-indigo-100 text-xs py-2 px-5 rounded-full font-semibold transition-all hover:bg-indigo-300" onClick={props.hideModal}>{t("no")}</span>
                        </div>
                    </div>
                </div>
                <Modal show={props.show} hideModal={props.hideModal} />
            </>
        </CSSTransition>

    )
}

