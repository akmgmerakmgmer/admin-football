import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ButtonLoading from '../../Loadings/ButtonLoading'
import Input from '../../TextFields/Input'
import UploadImage from '../../GeneralComponents/UploadImage'
import { useNavigate } from 'react-router-dom'
import IconLinks from '../../Navbar/NavComponents/IconLinks'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { fetchCategoriesDone } from '../../../redux/user'
import { useDispatch, useSelector } from 'react-redux'
import axiosInstance from '../../../utilities/axiosInstance'

export default function Add() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const categories = useSelector((state: any) => state.categories)
    const [categoryForm, setCategoryForm] = useState({
        name: "",
        nameAr: "",
        image: ""
    })
    const [errorData, setErrorData] = useState({ name: '', nameAr: '', image: '' })
    const [loading, setLoading] = useState(false)
    const addCategory = () => {
        setLoading(true)
        axiosInstance.post('categories', categoryForm).then(response => {
            const updatedCategories = [...categories, response.data]
            dispatch(fetchCategoriesDone(updatedCategories))
            navigate('/categories')
        }).catch(err => {
            setErrorData(err.response.data)
        }).finally(() => {
            setLoading(false)
        })
    }
    return (
        <div>
            <h2 className='text-xl'>{t("addCategory")}</h2>
            <div className='flex flex-col gap-1'>
                <Input label={t('englishName')} inputValue={(value: string) => setCategoryForm({ ...categoryForm, name: value })} width="lg:w-1/3 w-96" disabled={loading} errorMessage={t(errorData.name)} />
                <Input label={t('arabicName')} inputValue={(value: string) => setCategoryForm({ ...categoryForm, nameAr: value })} width="lg:w-1/3 w-96" disabled={loading} errorMessage={t(errorData.nameAr)} />
                <div className='mt-5 relative'>
                    {categoryForm.image && <div className='absolute top-0 ltr:left-0 rtl:right-0'>
                        <IconLinks delete={true} title={t("delete")} iconAction={() => {
                            setCategoryForm({ ...categoryForm, image: '' })
                        }}><RemoveCircleIcon /></IconLinks>
                    </div>}
                    {categoryForm.image && <img src={categoryForm.image} alt={categoryForm.name} className="h-36 w-36 rounded-md object-cover" />}
                    {!categoryForm.image && <UploadImage imageError={errorData.image} imageUploaded={(value: any) => { setCategoryForm({ ...categoryForm, image: value }) }} imageNotUploaded={(error: any) => { setErrorData({ ...errorData, image: error }) }} />}
                </div>
                <button className={`w-full h-12 bg-primaryColor mt-7 text-white rounded-md`} onClick={addCategory}>
                    {loading ? <ButtonLoading loading={loading} /> : <span>{t('addCategory')}</span>}
                </button>
            </div>
        </div>
    )
}
