import React from 'react'
import { useSelector } from 'react-redux'

export default function useShipping(props: any) {
    const shipping = useSelector((state: any) => state.shipping)
    const {
        items,
        cart
    } = props
    return {
        shippingValue: () => {
            const sellers = []
            let shippingFees = 0
            for (let i in items) {
                if (!items[i].product.user || typeof (items[i].product.user) === 'string') {
                    return cart.shipping_fees
                }
                if (sellers.indexOf(items[i].product.sellerName) > -1) {
                } else {
                    if (items[i].product.user.shipping.free_delivery) {
                        shippingFees += 0
                    } else {
                        shippingFees += items[i].product.user.shipping.shipping_fees
                    }
                }
                sellers.push(items[i].product.sellerName)
            }
            // if (shipping.free_delivery) {
            //     return 0
            // }
            // if (shipping.minimum_order_free_delivery && shipping.minimum_order_free_delivery <= total_price) {
            //     return 0
            // }
            return shippingFees.toString()
        }
    }
}
