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
import axiosInstance from '../../../utilities/axiosInstance'
export default function Edit() {
    const { t } = useTranslation()
    const { id } = useParams()
    const navigate = useNavigate()
    const [categoryForm, setCategoryForm] = useState({
        name: "",
        nameAr: "",
        image: ""
    })
    const [errorData, setErrorData] = useState({ name: '', nameAr: '', image: '' })
    const [pageLoading, setPageLoading] = useState(true)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getCategory()
    }, [])

    const editCategory = () => {
        setLoading(true)
        axiosInstance.put(`categories/${id}`, categoryForm).then(response => {
            navigate('/categories')
        }).catch(err => {
            setErrorData(err.response.data)
        }).finally(() => {
            setLoading(false)
        })
    }

    const getCategory = () => {
        axiosInstance.get(`/categories/${id}`).then(response => {
            setCategoryForm({ name: response.data.name, nameAr: response.data.nameAr, image: response.data.image })
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
                    <h2 className='text-xl'>{t("editCategory")}</h2>
                    <div className='flex flex-col gap-1'>
                        <Input value={categoryForm.name} label={t('englishName')} inputValue={(value: string) => setCategoryForm({ ...categoryForm, name: value })} width="lg:w-1/3 w-96" disabled={loading} errorMessage={t(errorData.name)} />
                        <Input value={categoryForm.nameAr} label={t('arabicName')} inputValue={(value: string) => setCategoryForm({ ...categoryForm, nameAr: value })} width="lg:w-1/3 w-96" disabled={loading} errorMessage={t(errorData.nameAr)} />
                        <div className='mt-5 relative'>
                            {categoryForm.image && <div className='absolute top-0 ltr:left-0 rtl:right-0'>
                                <IconLinks delete={true} title={t("delete")} iconAction={() => {
                                    setCategoryForm({ ...categoryForm, image: '' })
                                }}><RemoveCircleIcon /></IconLinks>
                            </div>}
                            {categoryForm.image && <img src={categoryForm.image} alt={categoryForm.name} className="h-36 w-36 rounded-md object-cover" />}
                            {!categoryForm.image && <UploadImage imageError={errorData.image} imageUploaded={(value: any) => { setCategoryForm({ ...categoryForm, image: value }) }} imageNotUploaded={(error: any) => { setErrorData({ ...errorData, image: error }) }} />}
                        </div>
                        <button className={`w-full h-12 bg-primaryColor mt-7 text-white rounded-md`} onClick={editCategory}>
                            {loading ? <ButtonLoading loading={loading} /> : <span>{t('editCategory')}</span>}
                        </button>
                    </div>
                </div>
            </CSSTransition>

        </div>
    )
}
