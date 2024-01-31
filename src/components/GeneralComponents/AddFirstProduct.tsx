import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export default function AddFirstProduct() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    return (
        <div className='flex items-center flex-col justify-center'>
            <h2 className='capitalize cursor-pointer bg-gradient font-semibold text-lg p-4 rounded-md text-white' onClick={() => { navigate('/add-product') }}>{t('addFirstProduct')}</h2>
        </div>
    )
}
