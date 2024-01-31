import React from 'react'
import { useTranslation } from 'react-i18next'
import useShipping from '../../../customHooks/useShipping'

type CheckoutFeesProps = {
    cart: {
        total_discount: number,
        total_price: number,
        total_profit: number,
        shipping_fees: number,
        promoDiscount: number,
        items: []
    },
    paymentType: string
}
export default function CheckoutFees(props: CheckoutFeesProps) {
    const { t } = useTranslation()
    const { items } = props.cart
    const { cart } = props
    const hooksProps = {
        items,
        cart
    }
    const shipping = useShipping(hooksProps)
    const calculatePrice = () => {
        const cart = props.cart
        if (cart.promoDiscount) return (cart.total_price + parseFloat(shipping.shippingValue()) - cart.promoDiscount).toFixed(2)
        return (cart.total_price + parseFloat(shipping.shippingValue())).toFixed(2)
    }
    return (
        <div className='flex flex-col gap-5 mt-7 '>
            {props.paymentType && <div className="flex justify-between items-center font-semibold">
                <h4>{t("paymentMethod")}</h4>
                <span className='font-bold text-xs'>{t(props.paymentType)}</span>
            </div>}
            <div className='flex flex-col gap-2'>
                <div className='flex justify-between items-center text-xs pb-2'>
                    <span>{t("subtotal")}</span>
                    <span className='font-bold'>{(props.cart.total_discount + props.cart.total_price).toFixed(2)} {t("currency")}</span>
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                <div className='flex justify-between items-center text-xs pb-2'>
                    <span>{t("shippingEstimate")}</span>
                    <span className='font-bold'>{parseFloat(shipping.shippingValue()).toFixed(2)} {t("currency")}</span>
                </div>
            </div>
            {props.cart.total_profit && props.cart.total_profit > 0 ? <div>
                <div className='flex justify-between items-center text-xs pb-2'>
                    <span>{t("totalProfit")}</span>
                    <span className='font-bold'>{(props.cart.total_profit).toFixed(2)} {t("currency")}</span>
                </div>
            </div> : <></>}
            {props.cart.total_discount > 0 && props.cart.total_profit === 0 && <div className='flex flex-col gap-2'>
                <div className='flex justify-between items-center text-xs pb-2'>
                    <span>{t("discount")}</span>
                    <span className='font-bold'>{props.cart.total_discount.toFixed(2)} {t("currency")}</span>
                </div>
            </div>}
            {props.cart.promoDiscount > 0 && <div>
                <div className='flex justify-between items-center text-xs pb-2'>
                    <span>{t("promoCodeDiscount")}</span>
                    <span className='font-bold'>{props.cart.promoDiscount.toFixed(2)} {t("currency")}</span>
                </div>
            </div>}
            <div className="flex justify-between items-center font-semibold">
                <h4>{t("orderTotal")}</h4>
                <span className='font-bold'>{calculatePrice()} {t("currency")}</span>
            </div>
        </div>
    )
}
