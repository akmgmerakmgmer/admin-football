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
    const challengeTypes = ['playersChallenge', 'nationalTeamsChallenge','teamsChallenge']
    const [imageError, setImageError] = useState('')
    const [challengeForm, setChallengeForm] = useState({ image: '', nameEn: '', nameAr: '', type: '' })
    const [errorData, setErrorData] = useState({ image: '', nameEn: '', nameAr: '', type: '' })
    const { id } = useParams()
    const { t } = useTranslation()
    const navigate = useNavigate()

    useEffect(() => {
        getChallengeDetails()
    }, [])

    const addChallenge = () => {
        setLoading(true)
        axiosInstance.post('challenges', challengeForm).then(response => {
            navigate('/challenges')
        }).catch(err => {
            setErrorData(err.response.data)
        }).finally(() => {
            setLoading(false)
        })
    }

    const getChallengeDetails = () => {
        setPageLoading(true)
        if (id) {
            axiosInstance.get(`challenges/${id}`).then((response: any) => {
                setChallengeForm(response.data)
            }).catch(err => {
                setErrorData(err.response.data)
            }).finally(() => {
                setPageLoading(false)
            })
        } else {
            setPageLoading(false)
        }
    }

    const editChallenge = () => {
        setLoading(true)
        axiosInstance.put(`challenges/${id}`, challengeForm).then(response => {
            navigate('/challenges')
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
                    <h2 className='text-xl'>{id ? t("editChallenge") : t("addChallenge")}</h2>
                    <div className='flex flex-col gap-1'>
                        <div>
                            <UploadImage imageError={errorData.image} imageUploaded={(value: any) => setChallengeForm({ ...challengeForm, image: value })} imageNotUploaded={(error: any) => setImageError(error)} />
                            {challengeForm.image && <div className='relative'>
                                <img src={challengeForm.image} className={`w-full object-cover rounded-lg ${errorData.image ? '' : 'mt-5'}`} />
                                <div className='absolute top-5 ltr:right-5 rtl:left-5 cursor-pointer' onClick={() => setChallengeForm({ ...challengeForm, image: '' })}>
                                    <Delete color='error' />
                                </div>
                            </div>}
                        </div>
                        <div className='flex gap-3 items-center'>
                            <Input value={challengeForm.nameEn} label={t('nameEn')} inputValue={(value: string) => setChallengeForm({ ...challengeForm, nameEn: value })} width="w-full" disabled={loading} errorMessage={t(errorData.nameEn)} />
                        </div>
                        <div className='flex gap-3 items-center'>
                            <Input value={challengeForm.nameAr} label={t('nameAr')} inputValue={(value: string) => setChallengeForm({ ...challengeForm, nameAr:value })} width="w-full" disabled={loading} errorMessage={t(errorData.nameAr)} />
                        </div>
                        <div className="mt-5 flex items-center gap-3">
                            <div className='flex-1 self-start'>
                                <SelectedComponent disabled={loading} uppercase={true} translation={true} callbackValue={(value) => setChallengeForm({ ...challengeForm, type: value })} defaultValue={challengeForm.type} items={challengeTypes} label={t("challengeType")} errorMessage={errorData.type ? true : false} />
                            </div>
                        </div>
                        <button className={`w-full h-12 bg-primaryColor mt-7 text-white rounded-md`} onClick={id ? editChallenge : addChallenge}>
                            {loading ? <ButtonLoading loading={loading} /> : <span>{id ? t('editChallenge') : t('addChallenge')}</span>}
                        </button>
                    </div>
                </div>
            </CSSTransition>
        </>
    )
}
