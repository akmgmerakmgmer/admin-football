import React, { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import EditAndDelete from '../../GeneralComponents/EditAndDelete'
import moment from 'moment'
import SingleCheckboxes from '../../GeneralComponents/SingleCheckboxes'
import Status from '../../GeneralComponents/Status'
import useShipping from '../../../customHooks/useShipping'
import axiosInstance from '../../../utilities/axiosInstance'
type SingleSubcategoryProps = {
    getOrders: () => void,
    checkBoxItems: any[],
    user: {
        role: string,
        _id: string,
    }
    value: {
        _id: string,
        status: string,
        createdAt: string,
        userInfo: {
            name: string,
            number: string,
            city: {
                name_ar: string
            },
            governorate: {
                name_ar: string
            },
            detailedAddress: string,
        },
        cart: {
            total_price: number,
            shipping_fees: any,
            promoDiscount: number,
            total_profit: number
            items: []
        },
        affiliateSellerId: any,
        comments: any,
        sellerId: {
            email: string
        }
    },
    deleteFunc: (id: string) => void
}
export default function SingleOrder(props: SingleSubcategoryProps) {
    const { t, i18n } = useTranslation()
    const { items } = props.value.cart
    const { cart } = props.value
    const [showCommentPopUp, setShowCommentPopUp] = useState(false)
    const [commentLoading, setCommentLoading] = useState(false)
    const [commentError, setCommentError] = useState('')
    const comment = useRef('')
    const hooksProps = {
        items,
        cart
    }
    const addComment = () => {
        if (comment.current.trim() === '') {
            setCommentError(t('field_required'))
            return
        }
        setCommentLoading(true)
        axiosInstance.put(`orders/${props.value._id}`, { status: props.value.status, comment: comment.current, user: props.user._id }).then(response => {
            setCommentLoading(false)
            setShowCommentPopUp(false)
            props.getOrders()
        }).catch((err) => {
            setCommentLoading(false)
        })
    }
    const shipping = useShipping(hooksProps)
    const calculatePrice = () => {
        const cart = props.value.cart
        if (cart.promoDiscount) return (cart.total_price + parseFloat(shipping.shippingValue()) - cart.promoDiscount).toFixed(2)
        return (cart.total_price + parseFloat(shipping.shippingValue())).toFixed(2)
    }
    const getStatus = () => {
        switch (props.value.status) {
            case "pending":
                return <Status title={t(props.value.status)} color="bg-orange-500" />
            case "delivered":
                return <Status title={t(props.value.status)} color="bg-green-500" />
            case "canceled":
                return <Status title={t(props.value.status)} color="bg-red-500" />
            default:
                return <Status title={t(props.value.status)} color="bg-indigo-500" />
        }
    }
    return (
        <tr key={props.value._id}>
            <SingleCheckboxes checkBoxItems={props.checkBoxItems} value={props.value} />
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div>
                    <div className="font-medium text-gray-900">{props.value.userInfo.name}</div>
                </div>
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div>
                    <div className="font-medium text-gray-900">{props.value.userInfo.number}</div>
                </div>
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div>
                    <div className="font-medium text-gray-900">{calculatePrice()}</div>
                </div>
            </td>
            {props.user.role === 'Affiliate' && < td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div>
                    <div className="font-medium text-gray-900">{props.value.cart.total_profit?.toFixed(2)}</div>
                </div>
            </td>}
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div>
                    <div className="font-medium text-gray-900">{props.value.userInfo.city.name_ar} {props.value.userInfo.governorate.name_ar} {props.value.userInfo.detailedAddress}</div>
                </div>
            </td>
            {props.user.role !== 'Affiliate' && <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div>
                    <div className="font-medium text-gray-900">{props.value.sellerId?.email || 'Admin'}</div>
                </div>
            </td>}
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div>
                    <div className="font-medium text-gray-900">{getStatus()}</div>
                </div>
            </td>
            {(props.user?.role === 'Admin' || props.user?.role === 'Super Admin') && <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div>
                    <div className="font-medium text-gray-900">{props.value.affiliateSellerId ? t('yes') : t('no')}</div>
                </div>
            </td>}
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div>
                    <div className="font-medium text-gray-900">{moment(props.value.createdAt).format('MMMM Do YYYY, h:mm A')}</div>
                </div>
            </td>
            <EditAndDelete addComment={addComment} comments={props.value.comments} commentsError={t(commentError)} commentsLoading={commentLoading} showCommentsPopup={showCommentPopUp} handleCommentsClose={() => setShowCommentPopUp(false)} handleCommentsOpen={() => setShowCommentPopUp(true)} callbackComment={(value) => comment.current = value} showComments={true} hideDelete={(props.user.role === 'Affiliate' || props.user.role === 'Seller') ? true : false} detailsText={props.user.role === 'Affiliate' ? 'viewDetails' : 'edit'} route={`/orders/${props.value._id}`} deleteFunc={() => props.deleteFunc(props.value._id)} />
        </tr >

    )
}
