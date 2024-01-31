import React from 'react'
import { useTranslation } from 'react-i18next'
import emptyCart from '../../../assets/images/cart_svg.svg'

type EmptyProductProps = {
    text:string
}
export default function EmptyProduct(props:EmptyProductProps) {
    const { t } = useTranslation()
    return (
        <div className='flex items-center flex-col justify-center'>
            <div className='flex flex-col items-center justify-center gap-10 mt-20'>
                <img src={emptyCart} alt="Cart Discountaty" className='w-96' />
                <h2 className='ltr:tracking-widest text-xl capitalize'>{props.text}</h2>
            </div>
        </div>
    )
}
