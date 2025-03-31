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
    const [avatarForm, setAvatarForm] = useState({ image: '', price: null, video: '',endDate:'' })
    const [errorData, setErrorData] = useState({ image: '', price: '' })
    const { id } = useParams()
    const { t } = useTranslation()
    const navigate = useNavigate()

    useEffect(() => {
        getAvatar()
    }, [])

    const addAvatar = () => {
        setLoading(true)
        axiosInstance.post('avatars', avatarForm).then(response => {
            navigate('/avatars')
        }).catch(err => {
            setErrorData(err.response.data)
        }).finally(() => {
            setLoading(false)
        })
    }

    const getAvatar = () => {
        setPageLoading(true)
        if (id) {
            axiosInstance.get(`avatars/${id}`).then((response: any) => {
                setAvatarForm(response.data)
            }).catch(err => {
                setErrorData(err.response.data)
            }).finally(() => {
                setPageLoading(false)
            })
        } else {
            setPageLoading(false)
        }
    }

    const editAvatar = () => {
        setLoading(true)
        axiosInstance.put(`avatars/${id}`, avatarForm).then(response => {
            navigate('/avatars')
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
                    <h2 className='text-xl'>{id ? t("editAvatar") : t("addAvatar")}</h2>
                    <div className='flex flex-col gap-1'>
                        <div>
                            <UploadImage imageError={errorData.image} imageUploaded={(value: any) => setAvatarForm({ ...avatarForm, image: value })} imageNotUploaded={(error: any) => setImageError(error)} />
                            {avatarForm.image && <div className='relative'>
                                <img src={avatarForm.image} className={`w-full object-cover rounded-lg ${errorData.image ? '' : 'mt-5'}`} />
                                <div className='absolute top-5 ltr:right-5 rtl:left-5 cursor-pointer' onClick={() => setAvatarForm({ ...avatarForm, image: '' })}>
                                    <Delete color='error' />
                                </div>
                            </div>}
                        </div>
                        <div>
                            <UploadImage imageUploaded={(value: any) => setAvatarForm({ ...avatarForm, video: value })} />
                            {avatarForm.video && <div className='relative'>
                                <video src={avatarForm.video} autoPlay className={`w-full object-cover rounded-lg`} />
                                <div className='absolute top-5 ltr:right-5 rtl:left-5 cursor-pointer' onClick={() => setAvatarForm({ ...avatarForm, video: '' })}>
                                    <Delete color='error' />
                                </div>
                            </div>}
                        </div>
                        <div className='flex gap-3 items-center'>
                            <Input inputType='number' value={avatarForm.price} label={t('price')} inputValue={(value: any) => setAvatarForm({ ...avatarForm, price: value })} width="w-full" disabled={loading} errorMessage={t(errorData.price)} />
                        </div>
                        <div className='border-gray-300 border rounded-md p-3 w-full'>
                            <input value={avatarForm.endDate || ''} className='outline-none focus:border-none w-full' type="date" id="endDate" name="endDate" onChange={(e) => setAvatarForm({ ...avatarForm, endDate: e.target.value })}></input>
                        </div>
                        <button className={`w-full h-12 bg-primaryColor mt-7 text-white rounded-md`} onClick={id ? editAvatar : addAvatar}>
                            {loading ? <ButtonLoading loading={loading} /> : <span>{id ? t('editAvatar') : t('addAvatar')}</span>}
                        </button>
                    </div>
                </div>
            </CSSTransition>
        </>
    )
}
