import { Checkbox, FormControlLabel } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import ButtonLoading from '../../Loadings/ButtonLoading'
import Input from '../../TextFields/Input'
import axiosInstance from '../../../utilities/axiosInstance'
import ProductSearch from '../HotDeals/ProductSearch'

export default function Add() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [promoCodeForm, setPromoCodeForm] = useState<any>({ code: '', discount: '', isPercentage: false, oneTimeUsage: true, product: null })
    const [errorData, setErrorData] = useState<any>({})

    const addPromoCode = () => {
        if (promoCodeForm.isPercentage && parseFloat(promoCodeForm.discount) > 100) {
            setErrorData({ ...errorData, discount: t('discount_more_than_100') })
            return;
        }
        setLoading(true)
        axiosInstance.post('promo-code', promoCodeForm).then(response => {
            navigate('/promo-codes')
        }).catch(err => {
            setErrorData(err.response.data)
        }).finally(() => {
            setLoading(false)
        })
    }
    const addProduct = (value: any) => {
        if (value) {
            setPromoCodeForm({ ...promoCodeForm, product: value._id })
        } else {
            setPromoCodeForm({ ...promoCodeForm, product: value })
        }
    }
    return (
        <div>
            <h2 className='text-xl'>{t("addPromoCode")}</h2>
            <div className='flex flex-col gap-1'>
                <Input label={t('code')} inputValue={(value: string) => setPromoCodeForm({ ...promoCodeForm, code: value })} width="lg:w-1/3 md:w-96 w-full" disabled={loading} errorMessage={t(errorData.code)} />
                <div className='flex gap-3 items-center'>
                    <Input inputType='number' label={t('discount')} inputValue={(value: string) => setPromoCodeForm({ ...promoCodeForm, discount: value })} width="lg:w-1/3 md:w-96 w-full" disabled={loading} errorMessage={t(errorData.discount)} />
                    <FormControlLabel control={<Checkbox />} label={t('isPercentage')} onChange={(e: any) => setPromoCodeForm({ ...promoCodeForm, isPercentage: e.target.checked })} />
                </div>
                <Input inputType='number' label={t('minimumOrder')} inputValue={(value: string) => setPromoCodeForm({ ...promoCodeForm, minimumOrder: value })} width="lg:w-1/3 md:w-96 w-full" disabled={loading || promoCodeForm.product} required={false} />
                {promoCodeForm.isPercentage && <Input inputType='number' label={t('maxDiscount')} inputValue={(value: string) => setPromoCodeForm({ ...promoCodeForm, maxDiscount: value })} width="lg:w-1/3 md:w-96 w-full" disabled={loading} required={false} />}
                <ProductSearch disabled={loading || promoCodeForm.minimumOrder} multiChoice={false} productCallback={addProduct} />
                <div className='inline-block'>
                    <FormControlLabel control={<Checkbox defaultChecked />} label={t('oneTimeUsage')} onChange={(e: any) => setPromoCodeForm({ ...promoCodeForm, oneTimeUsage: e.target.checked })} />
                </div>
                <button className={`w-full h-12 bg-primaryColor mt-7 text-white rounded-md`} onClick={addPromoCode}>
                    {loading ? <ButtonLoading loading={loading} /> : <span>{t('addPromoCode')}</span>}
                </button>
            </div>
        </div>
    )
}
