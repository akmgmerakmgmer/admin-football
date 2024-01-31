import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ButtonLoading from '../../Loadings/ButtonLoading'
import Input from '../../TextFields/Input'
import UploadImage from '../../GeneralComponents/UploadImage'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SelectedComponentById from '../../GeneralComponents/SelectedComponentById'
import IconLinks from '../../Navbar/NavComponents/IconLinks'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import axiosInstance from '../../../utilities/axiosInstance'

export default function Add() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const categories = useSelector((state: any) => state.categories)
    const [subcategoryForm, setSubcategoryForm] = useState({
        name: "",
        nameAr: "",
        category: '',
        image: "",
    })
    const [errorData, setErrorData] = useState({ name: '', nameAr: '', category: '', image: '' })
    const [loading, setLoading] = useState(false)

    const addSubcategory = () => {
        setLoading(true)
        axiosInstance.post('subcategories', subcategoryForm).then(response => {
            navigate('/subcategories')
        }).catch(err => {
            setErrorData(err.response.data)
        }).finally(() => {
            setLoading(false)
        })
    }
    return (
        <div>
            
            <h2 className='text-xl'>{t("addSubcategory")}</h2>
            <div className='flex flex-col gap-1'>
                <Input label={t('englishName')} inputValue={(value: string) => setSubcategoryForm({ ...subcategoryForm, name: value })} width="lg:w-1/3 md:w-96 w-full" disabled={loading} errorMessage={t(errorData.name)} />
                <Input label={t('arabicName')} inputValue={(value: string) => setSubcategoryForm({ ...subcategoryForm, nameAr: value })} width="lg:w-1/3 md:w-96 w-full" disabled={loading} errorMessage={t(errorData.nameAr)} />
                <div className='mt-5 lg:w-1/3 md:w-96 w-full'>
                    <SelectedComponentById disabled={loading} defaultValue={""} label={t('categories')} items={categories} callbackValue={(value) => setSubcategoryForm({ ...subcategoryForm, category: value })} errorMessage={errorData.category ? true : false} />
                </div>
                <div className='mt-5 relative'>
                    {subcategoryForm.image && <div className='absolute top-0 ltr:left-0 rtl:right-0'>
                        <IconLinks delete={true} title={t("delete")} iconAction={() => {
                            setSubcategoryForm({ ...subcategoryForm, image: '' })
                        }}><RemoveCircleIcon /></IconLinks>
                    </div>}
                    {subcategoryForm.image && <img src={subcategoryForm.image} alt={subcategoryForm.name} className="h-36 w-36 rounded-md object-cover" />}
                    {!subcategoryForm.image && <UploadImage imageError={errorData.image} imageUploaded={(value: any) => { setSubcategoryForm({ ...subcategoryForm, image: value }) }} imageNotUploaded={(error: any) => { setErrorData({ ...errorData, image: error }) }} />}
                </div>
                <button className={`w-full h-12 bg-primaryColor mt-7 text-white rounded-md`} onClick={addSubcategory}>
                    {loading ? <ButtonLoading loading={loading} /> : <span>{t('addSubcategory')}</span>}
                </button>
            </div>
        </div>
    )
}
