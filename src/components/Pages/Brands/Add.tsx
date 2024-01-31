import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ButtonLoading from '../../Loadings/ButtonLoading'
import Input from '../../TextFields/Input'
import UploadImage from '../../GeneralComponents/UploadImage'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SelectedComponentById from '../../GeneralComponents/SelectedComponentById'
import IconLinks from '../../Navbar/NavComponents/IconLinks'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { CSSTransition } from 'react-transition-group'
import ApiLoadingNotFixed from '../../Loadings/ApiLoadingNotFixed'
import MultipleSelect from '../../GeneralComponents/MultipleSelect'
import axiosInstance from '../../../utilities/axiosInstance'

export default function Add() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [categories, setCategories] = useState<any>([])
    const [initialLoading, setInitialLoading] = useState(true)
    const [subcategories, setSubcategories] = useState([])
    const [brandForm, setBrandForm] = useState<any>({
        name: "",
        nameAr: "",
        category: [],
        subcategory: [],
        image: "",
    })
    const [errorData, setErrorData] = useState({ name: '', nameAr: '', category: '', subcategory: '', image: '' })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getCategories()
    }, [])

    const getCategories = () => {
        axiosInstance.get('admin-categories').then(response => {
            setCategories(response.data)
        }).finally(() => {
            setInitialLoading(false)
        })
    }

    const addBrand = () => {
        setLoading(true)
        axiosInstance.post('brands', brandForm).then(response => {
            navigate('/brands')
        }).catch(err => {
            setErrorData(err.response.data)
        }).finally(() => {
            setLoading(false)
        })
    }

    const chooseCategory = (value: any) => {
        let currentSubcategories: any = []
        let brandFormSubcategories: any = []
        for (let i in value) {
            categories.filter((category: any) => category._id === value[i])[0].subcategory.forEach((value: any) => {
                if (brandForm.subcategory.includes(value._id)) {
                    brandFormSubcategories.push(value._id)
                }
            });
            setBrandForm({ ...brandForm, subcategory: brandFormSubcategories, category: typeof value === 'string' ? value.split(',') : value })
            currentSubcategories.push(...categories.filter((category: any) => category._id === value[i])[0].subcategory)
        }
        setSubcategories(currentSubcategories)
    }
    const chooseSubcategory = (value: any) => {
        setBrandForm({ ...brandForm, subcategory: typeof value === 'string' ? value.split(',') : value })
    }

    return (
        <div>
            <ApiLoadingNotFixed loading={initialLoading} />
            <CSSTransition
                in={!initialLoading}
                timeout={300}
                classNames="default"
                unmountOnExit
            >
                <div>

                    <h2 className='text-xl'>{t("addBrand")}</h2>
                    <div className='flex flex-col gap-1'>
                        <Input label={t('englishName')} inputValue={(value: string) => setBrandForm({ ...brandForm, name: value })} width="lg:w-1/3 md:w-96 w-full" disabled={loading} errorMessage={t(errorData.name)} />
                        <Input label={t('arabicName')} inputValue={(value: string) => setBrandForm({ ...brandForm, nameAr: value })} width="lg:w-1/3 md:w-96 w-full" disabled={loading} errorMessage={t(errorData.nameAr)} />
                        <div className='mt-5 lg:w-1/3 md:w-96 w-full'>
                            <MultipleSelect errorMessage={errorData.category ? true : false} disabled={loading} title={t('categories')} items={categories} value={brandForm.category} callbackValue={chooseCategory} />
                        </div>
                        <div className='mt-5 lg:w-1/3 md:w-96 w-full'>
                            <MultipleSelect errorMessage={errorData.subcategory ? true : false} disabled={loading} title={t('subcategories')} items={subcategories} value={brandForm.subcategory} callbackValue={chooseSubcategory} />
                        </div>
                        <div className='mt-5 relative'>
                            {brandForm.image && <div className='absolute top-0 ltr:left-0 rtl:right-0'>
                                <IconLinks delete={true} title={t("delete")} iconAction={() => {
                                    setBrandForm({ ...brandForm, image: '' })
                                }}><RemoveCircleIcon /></IconLinks>
                            </div>}
                            {brandForm.image && <img src={brandForm.image} alt={brandForm.name} className="h-36 w-36 rounded-md object-cover" />}
                            {!brandForm.image && <UploadImage imageError={errorData.image} imageUploaded={(value: any) => { setBrandForm({ ...brandForm, image: value }) }} imageNotUploaded={(error: any) => { setErrorData({ ...errorData, image: error }) }} />}
                        </div>
                        <button className={`w-full h-12 bg-primaryColor mt-7 text-white rounded-md`} onClick={addBrand}>
                            {loading ? <ButtonLoading loading={loading} /> : <span>{t('addBrand')}</span>}
                        </button>
                    </div>
                </div>
            </CSSTransition>
        </div>

    )
}
