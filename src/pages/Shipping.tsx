import React, { useEffect, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import PageContainer from '../components/Containers/PageContainer'
import ApiLoading from '../components/Loadings/ApiLoading'
import { CSSTransition } from 'react-transition-group'
import Input from '../components/TextFields/Input'
import { Checkbox, FormControlLabel } from '@mui/material'
import ButtonLoading from '../components/Loadings/ButtonLoading'
import AlertComponent from '../components/GeneralComponents/Alert'
import axiosInstance from '../utilities/axiosInstance'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserDone } from '../redux/user'

export default function Shipping() {
    const { t } = useTranslation()
    const user = useSelector((state: any) => state.user)
    const dispatch = useDispatch()
    const [shippingLoading, setShippingLoading] = useState(true)
    const [shippingData, setShippingData] = useState<any>({})
    const [shippingFeesError, setShippingFeesError] = useState('')
    const [editLoading, setEditLoading] = useState(false)
    const [editSuccess, setEditSuccess] = useState(false)

    useEffect(() => {
        getShipping()
    }, [])
    const getShipping = () => {
        if (user?.role === 'Seller') {
            setShippingLoading(false)
            setShippingData(user.shipping)
            return
        }
        axiosInstance.get('shipping').then(response => {
            setShippingData(response.data)
        }).finally(() => {
            setShippingLoading(false)
        })
    }

    const editShipping = () => {
        if (!shippingData.shipping_fees) {
            setShippingFeesError('field_required')
            return;
        }
        setEditLoading(true)
        axiosInstance.put(`${user.role === 'Seller' ? `users/${user._id}` : `shipping/${shippingData._id}`}`, user.role === 'Seller' ? { shipping: shippingData } : shippingData).then(response => {
            dispatch(fetchUserDone(response.data))
            setEditSuccess(true)
            setTimeout(() => {
                setEditSuccess(false)
            }, 3000)
        }).finally(() => {
            setEditLoading(false)
        })
    }
    return (
        <PageContainer>
            <ApiLoading loading={shippingLoading} />
            <CSSTransition
                in={!shippingLoading}
                timeout={300}
                classNames="default"
                unmountOnExit
            >
                <div>
                    <h2 className='text-xl'>{t("shipping")}</h2>
                    <div className='flex flex-col gap-1'>
                        <Input inputType='number' value={shippingData.shipping_fees} label={t('shippingFees')} inputValue={(value: string) => setShippingData({ ...shippingData, shipping_fees: value })} width="lg:w-1/3 w-96" disabled={shippingData.free_delivery || shippingLoading} errorMessage={t(shippingFeesError)} />
                        {user.role !== 'Seller' && <Input inputType='number' value={shippingData.minimum_order_free_delivery} label={t('minimumOrderForFreeShipping')} inputValue={(value: string) => setShippingData({ ...shippingData, minimum_order_free_delivery: value })} width="lg:w-1/3 w-96" disabled={shippingData.free_delivery || shippingLoading} />}
                        <div className='inline-block mt-5'>
                            <FormControlLabel value={shippingData.free_delivery} control={<Checkbox color='primary' defaultChecked={shippingData.free_delivery} />} label={t('freeShipping')} onChange={(e: any) => setShippingData({ ...shippingData, free_delivery: e.target.checked })} />
                        </div>
                        <button className={`w-full h-12 bg-primaryColor mt-7 text-white rounded-md`} onClick={editShipping}>
                            {editLoading ? <ButtonLoading loading={editLoading} /> : <span>{t('editShippingData')}</span>}
                        </button>
                    </div>
                </div>
            </CSSTransition>
            <AlertComponent message={t('shippingEdited')} open={editSuccess} />
        </PageContainer>
    )
}
