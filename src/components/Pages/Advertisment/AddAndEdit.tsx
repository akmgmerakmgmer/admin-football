import React, { useEffect, useState } from 'react'
import ApiLoading from '../../Loadings/ApiLoading'
import { CSSTransition } from 'react-transition-group'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import UploadImage from '../../GeneralComponents/UploadImage'
import { Delete } from '@material-ui/icons'
import Input from '../../TextFields/Input'
import SelectedComponent from '../../GeneralComponents/SelectComponent'
import ButtonLoading from '../../Loadings/ButtonLoading'
import axiosInstance from '../../../utilities/axiosInstance'

export default function AddAndEdit() {
    const [pageLoading, setPageLoading] = useState(true)
    const [loading, setLoading] = useState(false)
    const advertisePages = ['gamePage', 'websitePages', 'bestOffers']
    const priorities = [1, 2, 3, 4]
    const [generalError, setGeneralError] = useState({ en: '', ar: '' })
    const [imageError, setImageError] = useState('')
    const [advertismentForm, setAdvertismentForm] = useState({ image: '', company: '', advertiseAt: 'gamePage', priority: 1, status: 'active', directionLink: '', headline: { en: "", ar: "" }, description: { en: "", ar: "" } })
    const [errorData, setErrorData] = useState({ company: '', advertiseAt: '', directionLink: '', image: '', 'headline.en': '', 'headline.ar': '' })
    const { id } = useParams()
    const { i18n, t } = useTranslation()
    const navigate = useNavigate()

    useEffect(() => {
        getQuestionDetails()
    }, [])

    const addAdvertisment = () => {
        setLoading(true)
        axiosInstance.post('advertisments', advertismentForm).then(response => {
            navigate('/advertisments')
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
            axiosInstance.get(`advertisments/${id}`).then((response: any) => {
                setAdvertismentForm(response.data)
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

    const editAdvertisment = () => {
        setLoading(true)
        axiosInstance.put(`advertisments/${id}`, advertismentForm).then(response => {
            navigate('/advertisments')
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
                    <h2 className='text-xl'>{id ? t("editAdvertisment") : t("addAdvertisment")}</h2>
                    <div className='flex flex-col gap-1'>
                        <div>
                            <UploadImage imageError={errorData.image} imageUploaded={(value: any) => setAdvertismentForm({ ...advertismentForm, image: value })} imageNotUploaded={(error: any) => setImageError(error)} />
                            {advertismentForm.image && <div className='relative'>
                                <img src={advertismentForm.image} className={`w-full object-cover rounded-lg ${errorData.image ? '' : 'mt-5'}`} />
                                <div className='absolute top-5 ltr:right-5 rtl:left-5 cursor-pointer' onClick={() => setAdvertismentForm({ ...advertismentForm, image: '' })}>
                                    <Delete color='error' />
                                </div>
                            </div>}
                        </div>
                        <div className='flex gap-3 items-center'>
                            <Input required value={advertismentForm.company} label={t('companyName')} inputValue={(value: string) => setAdvertismentForm({ ...advertismentForm, company: value })} width="w-full" disabled={loading} errorMessage={t(errorData.company)} />
                        </div>
                        <div className='flex gap-3 items-center'>
                            <Input required value={advertismentForm.headline.en} label={t('englishHeadline')} inputValue={(value: string) => setAdvertismentForm({ ...advertismentForm, headline: { ...advertismentForm.headline, en: value } })} width="w-full" disabled={loading} errorMessage={t(errorData['headline.en'])} />
                        </div>
                        <div className='flex gap-3 items-center'>
                            <Input required value={advertismentForm.headline.ar} label={t('arabicHeadline')} inputValue={(value: string) => setAdvertismentForm({ ...advertismentForm, headline: { ...advertismentForm.headline, ar: value } })} width="w-full" disabled={loading} errorMessage={t(errorData['headline.ar'])} />
                        </div>
                        <div className='flex gap-3 items-center'>
                            <Input textarea value={advertismentForm.description?.en || ''} label={t('descriptionEn')} inputValue={(value: string) => setAdvertismentForm({ ...advertismentForm, description: { ...advertismentForm.description, en: value } })} width="w-full" disabled={loading} />
                        </div>
                        <div className='flex gap-3 items-center'>
                            <Input textarea value={advertismentForm.description?.ar || ''} label={t('descriptionAr')} inputValue={(value: string) => setAdvertismentForm({ ...advertismentForm, description: { ...advertismentForm.description, ar: value } })} width="w-full" disabled={loading} />
                        </div>
                        <div className="mt-5 flex items-center gap-3">
                            <div className='flex-1 self-start'>
                                <SelectedComponent required disabled={loading} uppercase={true} translation={true} callbackValue={(value) => setAdvertismentForm({ ...advertismentForm, advertiseAt: value })} defaultValue={advertismentForm.advertiseAt} items={advertisePages} label={t("advertiseAt")} errorMessage={errorData.advertiseAt ? true : false} />
                            </div>
                        </div>
                        {/* <div className="mt-5 flex items-center gap-3">
                            <div className='flex-1 self-start'>
                                <SelectedComponent disabled={loading} uppercase={true} translation={true} callbackValue={(value) => setAdvertismentForm({ ...advertismentForm, priority: value })} defaultValue={advertismentForm.priority} items={priorities} label={t("priority")} />
                            </div>
                        </div> */}
                        <div className='flex gap-3 items-center'>
                            <Input required value={advertismentForm.directionLink} label={t('link')} inputValue={(value: string) => setAdvertismentForm({ ...advertismentForm, directionLink: value })} width="w-full" disabled={loading} errorMessage={t(errorData.directionLink)} />
                        </div>
                        <button className={`w-full h-12 bg-primaryColor mt-7 text-white rounded-md`} onClick={id ? editAdvertisment : addAdvertisment}>
                            {loading ? <ButtonLoading loading={loading} /> : <span>{id ? t('editAdvertisment') : t('addAdvertisment')}</span>}
                        </button>
                        <span className='text-red-500 text-xs mt-1 block'>{i18n.language == 'en' ? generalError.en : generalError.ar}</span>
                    </div>
                </div>
            </CSSTransition>
        </>
    )
}
