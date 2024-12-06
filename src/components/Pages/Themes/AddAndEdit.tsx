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
    const [imageError, setImageError] = useState('')
    const [themeForm, setThemeForm] = useState({ image: '', price: null })
    const [errorData, setErrorData] = useState({ image: '', price: '' })
    const { id } = useParams()
    const { t } = useTranslation()
    const navigate = useNavigate()

    useEffect(() => {
        getTheme()
    }, [])

    const addTheme = () => {
        setLoading(true)
        axiosInstance.post('themes', themeForm).then(response => {
            navigate('/themes')
        }).catch(err => {
            setErrorData(err.response.data)
        }).finally(() => {
            setLoading(false)
        })
    }

    const getTheme = () => {
        setPageLoading(true)
        if (id) {
            axiosInstance.get(`themes/${id}`).then((response: any) => {
                setThemeForm(response.data)
            }).catch(err => {
                setErrorData(err.response.data)
            }).finally(() => {
                setPageLoading(false)
            })
        } else {
            setPageLoading(false)
        }
    }

    const editTheme = () => {
        setLoading(true)
        axiosInstance.put(`themes/${id}`, themeForm).then(response => {
            navigate('/themes')
        }).catch(err => {
            setErrorData(err.response.data)
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
                    <h2 className='text-xl'>{id ? t("editTheme") : t("addTheme")}</h2>
                    <div className='flex flex-col gap-1'>
                        <div>
                            <UploadImage imageError={errorData.image} imageUploaded={(value: any) => setThemeForm({ ...themeForm, image: value })} imageNotUploaded={(error: any) => setImageError(error)} />
                            {themeForm.image && <div className='relative'>
                                <img src={themeForm.image} className={`w-full object-cover rounded-lg ${errorData.image ? '' : 'mt-5'}`} />
                                <div className='absolute top-5 ltr:right-5 rtl:left-5 cursor-pointer' onClick={() => setThemeForm({ ...themeForm, image: '' })}>
                                    <Delete color='error' />
                                </div>
                            </div>}
                        </div>
                        <div className='flex gap-3 items-center'>
                            <Input inputType='number' value={themeForm.price} label={t('price')} inputValue={(value: any) => setThemeForm({ ...themeForm, price: value })} width="w-full" disabled={loading} errorMessage={t(errorData.price)} />
                        </div>
                        <button className={`w-full h-12 bg-primaryColor mt-7 text-white rounded-md`} onClick={id ? editTheme : addTheme}>
                            {loading ? <ButtonLoading loading={loading} /> : <span>{id ? t('editTheme') : t('addTheme')}</span>}
                        </button>
                    </div>
                </div>
            </CSSTransition>
        </>
    )
}
