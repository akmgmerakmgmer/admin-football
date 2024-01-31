import { Checkbox, FormControlLabel } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import ButtonLoading from '../../Loadings/ButtonLoading'
import Input from '../../TextFields/Input'
import { CSSTransition } from 'react-transition-group'
import ApiLoading from '../../Loadings/ApiLoading'
import axiosInstance from '../../../utilities/axiosInstance'
import ProductSearch from '../HotDeals/ProductSearch'

export default function Edit() {
  const { t } = useTranslation()
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)
  const [promoCodeForm, setPromoCodeForm] = useState<any>({ code: '', discount: '', isPercentage: false, oneTimeUsage: true, product: null })
  const [errorData, setErrorData] = useState<any>({})

  useEffect(() => {
    getPromoCode()
  }, [])
  const getPromoCode = () => {
    axiosInstance.get(`promo-code/${id}`).then(response => {
      setPromoCodeForm({
        code: response.data.code,
        discount: response.data.discount,
        isPercentage: response.data.isPercentage,
        oneTimeUsage: response.data.oneTimeUsage,
        maxDiscount: response.data.maxDiscount,
        minimumOrder: response.data.minimumOrder,
        product: response.data.product
      })
    }).finally(() => {
      setPageLoading(false)
    })
  }

  const editPromoCode = () => {
    if (promoCodeForm.isPercentage && parseFloat(promoCodeForm.discount) > 100) {
      setErrorData({ ...errorData, discount: t('discount_more_than_100') })
      return;
    }
    setLoading(true)
    axiosInstance.put(`promo-code/${id}`, promoCodeForm).then(response => {
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
      <ApiLoading loading={pageLoading} />
      <CSSTransition
        in={!pageLoading}
        timeout={300}
        classNames="default"
        unmountOnExit
      >
        <div>
          <h2 className='text-xl'>{t("editPromoCode")}</h2>
          <div className='flex flex-col gap-1'>
            <Input value={promoCodeForm.code} label={t('code')} inputValue={(value: string) => setPromoCodeForm({ ...promoCodeForm, code: value })} width="lg:w-1/3 md:w-96 w-full" disabled={loading} errorMessage={t(errorData.code)} />
            <div className='flex gap-3 items-center'>
              <Input value={promoCodeForm.discount} inputType='number' label={t('discount')} inputValue={(value: string) => setPromoCodeForm({ ...promoCodeForm, discount: value })} width="lg:w-1/3 md:w-96 w-full" disabled={loading} errorMessage={t(errorData.discount)} />
              <FormControlLabel control={<Checkbox checked={promoCodeForm.isPercentage} />} label={t('isPercentage')} onChange={(e: any) => setPromoCodeForm({ ...promoCodeForm, isPercentage: e.target.checked })} />
            </div>
            <Input value={promoCodeForm.minimumOrder} inputType='number' label={t('minimumOrder')} inputValue={(value: string) => setPromoCodeForm({ ...promoCodeForm, minimumOrder: value })} width="lg:w-1/3 md:w-96 w-full" disabled={loading || promoCodeForm.product} required={false} />
            {promoCodeForm.isPercentage && <Input required={false} value={promoCodeForm.maxDiscount} inputType='number' label={t('maxDiscount')} inputValue={(value: string) => setPromoCodeForm({ ...promoCodeForm, maxDiscount: value })} width="lg:w-1/3 md:w-96 w-full" disabled={loading} />}
            <ProductSearch defaultValue={promoCodeForm.product} disabled={loading || promoCodeForm.minimumOrder} multiChoice={false} productCallback={addProduct} />
            <div className='inline-block'>
              <FormControlLabel control={<Checkbox checked={promoCodeForm.oneTimeUsage} />} label={t('oneTimeUsage')} onChange={(e: any) => setPromoCodeForm({ ...promoCodeForm, oneTimeUsage: e.target.checked })} />
            </div>
            <button className={`w-full h-12 bg-primaryColor mt-7 text-white rounded-md`} onClick={editPromoCode}>
              {loading ? <ButtonLoading loading={loading} /> : <span>{t('editPromoCode')}</span>}
            </button>
          </div>
        </div>
      </CSSTransition>
    </div>
  )
}
