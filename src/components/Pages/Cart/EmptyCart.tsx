import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import emptyCart from '../../../assets/images/cart_svg.svg'

export default function EmptyCart() {
    const { t } = useTranslation()
    return (
        <div className='absolute -translate-x-1/2 -translate-y-1/2 w-full h-60 top-1/2 left-1/2 flex items-center flex-col justify-center'>
            <div className='flex flex-col items-center justify-center gap-20'>
                <img src={emptyCart} alt="Cart Discountaty" className='w-96'/>
                <Link to={'/'}><span className='sm:px-20 px-16 py-4 text-white bg-primaryColor rounded-md'>{t("continueShopping")}</span></Link>
            </div>
        </div>
    )
}
