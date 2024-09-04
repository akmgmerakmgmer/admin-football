import React, { useEffect, useState } from 'react'
import ApiLoading from '../../Loadings/ApiLoading'
import { CSSTransition } from 'react-transition-group'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import UploadImage from '../../GeneralComponents/UploadImage'
import { Delete } from '@material-ui/icons'
import Input from '../../TextFields/Input'
import ButtonLoading from '../../Loadings/ButtonLoading'
import axiosInstance from '../../../utilities/axiosInstance'

export default function AddAndEdit() {
    const [pageLoading, setPageLoading] = useState(true)
    const [loading, setLoading] = useState(false)
    const [generalError, setGeneralError] = useState({ en: '', ar: '' })
    const [imageError, setImageError] = useState('')
    const [perkForm, setPerkForm] = useState({ image: '', backgroundImage: '', price: 1, title: { en: "", ar: "" }, description: { en: "", ar: "" } })
    const [errorData, setErrorData] = useState({ image: '', backgroundImage: '', 'title.en': '', 'title.ar': '' })
    const { id } = useParams()
    const { i18n, t } = useTranslation()
    const navigate = useNavigate()

    useEffect(() => {
        getQuestionDetails()
    }, [])

    const addPerk = () => {
        setLoading(true)
        axiosInstance.post('perks', perkForm).then(response => {
            navigate('/perks')
        }).catch(err => {
            setErrorData(err.response.data)
            if (err.response.data.message) {
                setGeneralError(err.response.data.message)
            }
        }).finally(() => {
            setLoading(false)
        })
    }

    const getQuestionDetails = () => {
        setPageLoading(true)
        if (id) {
            axiosInstance.get(`perks/${id}`).then((response: any) => {
                setPerkForm(response.data)
            }).catch(err => {
                setErrorData(err.response.data)
                if (err.response.data.message) {
                    setGeneralError(err.response.data.message)
                }
            }).finally(() => {
                setPageLoading(false)
            })
        } else {
            setPageLoading(false)
        }
    }

    const editPerk = () => {
        setLoading(true)
        axiosInstance.put(`perks/${id}`, perkForm).then(response => {
            navigate('/perks')
        }).catch(err => {
            setErrorData(err.response.data)
            if (err.response.data.message) {
                setGeneralError(err.response.data.message)
            }
        }).finally(() => {
            setLoading(false)
        })
    }
    return (
        <>
            <ApiLoading loading={pageLoading} />
            <CSSTransition
                in={!pageLoading}
                timeout={300}
                classNames="default"
                unmountOnExit
            >
                <div>
                    <h2 className='text-xl'>{id ? t("editPerk") : t("addPerk")}</h2>
                    <div className='flex flex-col gap-1'>
                        <div className='mt-5'>
                            <span>{t('mainImage')}</span>
                            <UploadImage imageError={errorData.image} imageUploaded={(value: any) => setPerkForm({ ...perkForm, image: value })} imageNotUploaded={(error: any) => setImageError(error)} />
                            {perkForm.image && <div className='relative'>
                                <img src={perkForm.image} className={`w-full object-cover rounded-lg ${errorData.image ? '' : 'mt-5'}`} />
                                <div className='absolute top-5 ltr:right-5 rtl:left-5 cursor-pointer' onClick={() => setPerkForm({ ...perkForm, image: '' })}>
                                    <Delete color='error' />
                                </div>
                            </div>}
                        </div>
                        <div className='mt-5'>
                            <span>{t('backgroundImage')}</span>
                            <UploadImage imageError={errorData.image} imageUploaded={(value: any) => setPerkForm({ ...perkForm, backgroundImage: value })} imageNotUploaded={(error: any) => setImageError(error)} />
                            {perkForm.backgroundImage && <div className='relative'>
                                <img src={perkForm.backgroundImage} className={`w-full object-cover rounded-lg ${errorData.backgroundImage ? '' : 'mt-5'}`} />
                                <div className='absolute top-5 ltr:right-5 rtl:left-5 cursor-pointer' onClick={() => setPerkForm({ ...perkForm, backgroundImage: '' })}>
                                    <Delete color='error' />
                                </div>
                            </div>}
                        </div>
                        <div className='flex gap-3 items-center'>
                            <Input required value={perkForm.title.en} label={t('nameEn')} inputValue={(value: string) => setPerkForm({ ...perkForm, title: { ...perkForm.title, en: value } })} width="w-full" disabled={loading} errorMessage={t(errorData['title.en'])} />
                        </div>
                        <div className='flex gap-3 items-center'>
                            <Input required value={perkForm.title.ar} label={t('nameAr')} inputValue={(value: string) => setPerkForm({ ...perkForm, title: { ...perkForm.title, ar: value } })} width="w-full" disabled={loading} errorMessage={t(errorData['title.ar'])} />
                        </div>
                        <div className='flex gap-3 items-center'>
                            <Input textarea value={perkForm.description?.en || ''} label={t('descriptionEn')} inputValue={(value: string) => setPerkForm({ ...perkForm, description: { ...perkForm.description, en: value } })} width="w-full" disabled={loading} />
                        </div>
                        <div className='flex gap-3 items-center'>
                            <Input textarea value={perkForm.description?.ar || ''} label={t('descriptionAr')} inputValue={(value: string) => setPerkForm({ ...perkForm, description: { ...perkForm.description, ar: value } })} width="w-full" disabled={loading} />
                        </div>
                        <div className='flex gap-3 items-center'>
                            <Input inputType='number' value={perkForm.price} label={t('price')} inputValue={(value: number) => setPerkForm({ ...perkForm, price: value })} width="w-full" disabled={loading} />
                        </div>
                        <button className={`w-full h-12 bg-primaryColor mt-7 text-white rounded-md`} onClick={id ? editPerk : addPerk}>
                            {loading ? <ButtonLoading loading={loading} /> : <span>{id ? t('editPerk') : t('addPerk')}</span>}
                        </button>
                        <span className='text-red-500 text-xs mt-1 block'>{i18n.language == 'en' ? generalError.en : generalError.ar}</span>
                    </div>
                </div>
            </CSSTransition>
        </>
    )
}
