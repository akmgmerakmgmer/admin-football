import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ButtonLoading from '../../Loadings/ButtonLoading'
import Input from '../../TextFields/Input'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../../utilities/axiosInstance'
import ProductSearch from './ProductSearch'
import { Delete } from '@material-ui/icons'
import PublishIcon from '@mui/icons-material/Publish';

export default function Add() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [hotDealForm, setHotDealForm] = useState<any>({ titleEn: '', titleAr: '', products: [] })
  const [errorData, setErrorData] = useState({ titleEn: '', titleAr: '', products: '' })
  const [loading, setLoading] = useState(false)
  const addHotDeal = () => {
    setLoading(true)
    axiosInstance.post('create-hot-deals', hotDealForm).then(response => {
      navigate('/hot-deals')
    }).catch(err => {
      setErrorData(err.response.data)
    }).finally(() => {
      setLoading(false)
    })
  }
  const addProduct = (product: any) => {
    setHotDealForm({ ...hotDealForm, products: [...hotDealForm.products, product] })
  }
  const deleteProduct = (index: any) => {
    hotDealForm.products.splice(index, 1)
    setHotDealForm({ ...hotDealForm, products: [...hotDealForm.products] })
  }
  const productUp = (index: any) => {
    const previousIndexProduct = hotDealForm.products[index - 1]
    hotDealForm.products[index - 1] = hotDealForm.products[index]
    hotDealForm.products[index] = previousIndexProduct
    setHotDealForm({ ...hotDealForm, products: [...hotDealForm.products] })
  }
  return (
    <div>
      <h2 className='text-xl'>{t("addHotDeal")}</h2>
      <div className='flex flex-col gap-1'>
        <Input label={t('englishName')} inputValue={(value: string) => setHotDealForm({ ...hotDealForm, titleEn: value })} width="lg:w-1/3 w-96" disabled={loading} errorMessage={t(errorData.titleEn)} />
        <Input label={t('arabicName')} inputValue={(value: string) => setHotDealForm({ ...hotDealForm, titleAr: value })} width="lg:w-1/3 w-96" disabled={loading} errorMessage={t(errorData.titleAr)} />
        <ProductSearch disabled={loading} multiChoice={true} productCallback={addProduct} />
        <div className='mt-5 gap-5 flex flex-col items-center font-semibold text-gray-800 text-xs'>
          {hotDealForm.products.map((product: any, index: any) => (
            <div className='flex items-center justify-between w-full bg-gray-200 p-3 rounded-lg shadow-md'>
              <div className='flex gap-5 items-center'>
                <img className='rounded-full w-10 h-10 object-cover' src={product.images[0]} />
                <span>{product.name}</span>
              </div>
              <div className='flex items-center gap-3'>
                {index !== 0 && <div className='cursor-pointer' onClick={() => productUp(index)}>
                  <PublishIcon fontSize='small' color='primary' />
                </div>}
                <div className='cursor-pointer' onClick={() => deleteProduct(index)}>
                  <Delete fontSize='small' color='error' />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className={`w-full h-12 bg-primaryColor mt-7 text-white rounded-md`} onClick={addHotDeal}>
          {loading ? <ButtonLoading loading={loading} /> : <span>{t('addHotDeal')}</span>}
        </button>
      </div>
    </div>
  )
}
