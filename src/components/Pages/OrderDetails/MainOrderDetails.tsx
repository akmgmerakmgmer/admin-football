import { Divider } from '@material-ui/core'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { fetchSystemData } from '../../../redux/user'
import SelectedComponent from '../../GeneralComponents/SelectComponent'
import ApiLoading from '../../Loadings/ApiLoading'
import ButtonLoading from '../../Loadings/ButtonLoading'
import CheckoutFees from '../Checkout/CheckoutFees'
import CheckoutProduct from '../Checkout/CheckoutProduct'
import axiosInstance from '../../../utilities/axiosInstance'
import Input from '../../TextFields/Input'

export default function MainOrderDetails() {
    const { t } = useTranslation()
    const user = useSelector((state: any) => state.user)
    const navigate = useNavigate()
    const [items, setItems] = useState([])
    const [cart, setCart] = useState<any>([])
    const [loading, setLoading] = useState(true)
    const [status, setStatus] = useState("")
    const { id } = useParams()
    const [editLoading, setEditLoading] = useState(false)
    const [userInfo, setUserInfo] = useState<any>({})
    const [paymentType, setPaymentType] = useState('')
    const [returnReason, setReturnReason] = useState('')
    const [commentError, setCommentError] = useState('')
    const comment = useRef('')
    const dispatch = useDispatch()
    const statusItems = ["pending", "confirmed", "shipped", "delivered", "canceled", "returnRequested", "returnApproved", "returnOrderPicked", "returnDone"]
    useEffect(() => {
        getCart()
    }, [])
    const getCart = () => {
        setLoading(true)
        axiosInstance.get(`orders/${id}`).then(response => {
            setCart(response.data.cart)
            setItems(response.data.cart.items)
            setStatus(response.data.status)
            setUserInfo(response.data.userInfo)
            setPaymentType(response.data.paymentType)
            if (response.data.returnReason) {
                setReturnReason(response.data.returnReason)
            }
        }).finally(() => {
            setLoading(false)
        })
    }
    const editOrder = async () => {
        if (user.role === 'Affiliate' && !comment.current) return setCommentError(t('field_required'))
        setEditLoading(true)
        await axiosInstance.put(`orders/${id}`, { status: status, comment: comment.current, user: user._id }).then(response => {
        }).catch((err) => {
            setEditLoading(false)
        })
        axiosInstance.get('system').then(response => {
            dispatch(fetchSystemData(response.data))
            setEditLoading(false)
            navigate('/orders')
        })
    }
    return (
        <div className='flex items-center flex-col justify-center'>
            <div className='w-full'>
                <ApiLoading loading={loading} />
                <CSSTransition
                    in={!loading}
                    timeout={300}
                    classNames="default"
                    unmountOnExit
                >
                    <div>
                        <div className='text-gray-800 shadow-md p-5 rounded-md'>
                            <SelectedComponent disabled={loading || user?.role === 'Affiliate'} uppercase={true} translation={true} callbackValue={(value) => setStatus(value)} defaultValue={status} items={statusItems} label={t("status")} />
                            <Input label={t('addComment')} inputValue={(value: any) => { comment.current = value }} width='w-full' textarea={true} required={true} minRows={10} errorMessage={commentError} />
                            <button className={`w-full h-12 bg-primaryColor mt-5 text-white rounded-md`} onClick={editOrder}>
                                {editLoading ? <ButtonLoading loading={editLoading} /> : <span>{user?.role === 'Affiliate' ? t('addComment') : t('editOrder')}</span>}
                            </button>
                            <div className='flex flex-col gap-3 my-5  ltr:tracking-wider'>
                                {userInfo.note && <p>{t('notes')} : {userInfo.note} </p>}
                                <p>{t('detailedAddress')} : {userInfo.city?.name_ar} {userInfo.governorate?.name_ar} {userInfo.detailedAddress}</p>
                                <p>{t('number')} : {userInfo?.number}</p>
                                {status.includes('return') && returnReason && <p>{t('returnReason')}: {returnReason}</p>}
                            </div>
                            <Divider />
                            <h2 className='text-lg  mb-5 ltr:tracking-wider mt-5'>{t("orderSummary")}</h2>
                            <div className='flex flex-col gap-7'>
                                {items.map((item: any) => {
                                    return (
                                        <CheckoutProduct item={item} deleteProduct={() => { }} key={item._id} />
                                    )
                                })}
                                <Divider />
                            </div>
                            <CheckoutFees cart={cart} paymentType={paymentType} />
                        </div>
                    </div>
                </CSSTransition>
            </div>
        </div>
    )
}
