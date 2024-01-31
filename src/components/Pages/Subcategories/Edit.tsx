import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ButtonLoading from '../../Loadings/ButtonLoading'
import Input from '../../TextFields/Input'
import UploadImage from '../../GeneralComponents/UploadImage'
import { useNavigate, useParams } from 'react-router-dom'
import ApiLoading from '../../Loadings/ApiLoading'
import { CSSTransition } from 'react-transition-group'
import IconLinks from '../../Navbar/NavComponents/IconLinks'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useSelector } from 'react-redux'
import SelectedComponentById from '../../GeneralComponents/SelectedComponentById'
import axiosInstance from '../../../utilities/axiosInstance'
export default function Edit() {
    const { t } = useTranslation()
    const { id } = useParams()
    const categories = useSelector((state: any) => state.categories)
    const navigate = useNavigate()
    const [subcategoryForm, setSubcategoryForm] = useState({
        name: "",
        nameAr: "",
        category: "",
        image: ""
    })
    const [errorData, setErrorData] = useState({ name: '', nameAr: '', category: '', image: '' })
    const [pageLoading, setPageLoading] = useState(true)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getCategory()
    }, [])

    const editSubcategory = () => {
        setLoading(true)
        axiosInstance.put(`subcategories/${id}`, subcategoryForm).then(response => {
            navigate('/subcategories')
        }).catch(err => {
            setErrorData(err.response.data)
        }).finally(() => {
            setLoading(false)
        })
    }

    const getCategory = () => {
        axiosInstance.get(`/subcategories/${id}`).then(response => {
            setSubcategoryForm({ name: response.data.name, nameAr: response.data.nameAr, category: response.data.category, image: response.data.image })
        }).finally(() => {
            setPageLoading(false)
        })
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
                    <h2 className='text-xl'>{t("editSubcategory")}</h2>
                    <div className='flex flex-col gap-1'>
                        <Input value={subcategoryForm.name} label={t('englishName')} inputValue={(value: string) => setSubcategoryForm({ ...subcategoryForm, name: value })} width="lg:w-1/3 w-96" disabled={loading} errorMessage={t(errorData.name)} />
                        <Input value={subcategoryForm.nameAr} label={t('arabicName')} inputValue={(value: string) => setSubcategoryForm({ ...subcategoryForm, nameAr: value })} width="lg:w-1/3 w-96" disabled={loading} errorMessage={t(errorData.nameAr)} />
                        <div className='mt-5 lg:w-1/3 md:w-96 w-full'>
                            <SelectedComponentById disabled={loading} defaultValue={subcategoryForm.category} label={t('categories')} items={categories} callbackValue={(value) => setSubcategoryForm({ ...subcategoryForm, category: value })} errorMessage={errorData.category ? true : false} />
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
                        <button className={`w-full h-12 bg-primaryColor mt-7 text-white rounded-md`} onClick={editSubcategory}>
                            {loading ? <ButtonLoading loading={loading} /> : <span>{t('editSubcategory')}</span>}
                        </button>
                    </div>
                </div>
            </CSSTransition>

        </div>
    )
}
