import React from 'react'
import { useTranslation } from 'react-i18next'
import { CSSTransition } from 'react-transition-group'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
type SuccessMessageProps = {
    showSuccessMessage: boolean
}

export default function SuccessMessage(props: SuccessMessageProps) {
    const { t } = useTranslation()
    return (
        <CSSTransition
            in={props.showSuccessMessage}
            timeout={10000}
            classNames="default"
            unmountOnExit
        >

            <div className='fixed bottom-5 left-5 z-20 md:w-1/2 w-4/5 ltr:lg:w-1/4 rtl:lg:w-2/5 flex justify-between bg-green-500 ltr:py-3.5 rtl:py-5 px-2 text-white rounded-md items-center'>
                <div className='flex gap-2 items-center'>
                    <CheckCircleOutlineIcon />
                    <span className='text-xs font-semibold'>{t("productAddedToCart")}</span>
                </div>
                <Link to={'/checkout'}><span className='text-xs p-2 hover:bg-green-600 rounded-lg font-semibold transition-all'>{t("checkout")}</span></Link>
            </div>
        </CSSTransition>
    )
}
