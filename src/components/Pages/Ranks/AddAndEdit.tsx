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
import Prizes from '../../GeneralComponents/Prizes'
import DynamicSelect from '../../GeneralComponents/DynamicSelect'

export default function AddAndEdit() {
    const [pageLoading, setPageLoading] = useState(true)
    const [loading, setLoading] = useState(false)
    const [generalError, setGeneralError] = useState({ en: '', ar: '' })
    const [imageError, setImageError] = useState('')
    const [rankForm, setRankForm] = useState({ image: '', bgImage: '', title: { en: "", ar: "" }, prizes: [], next_rank: '', prev_rank: '', wins_to_promote: 0, loses_to_demote: 0, rank_banner: { en: "", ar: "" } })
    const [ranks, setRanks] = useState([])
    const [errorData, setErrorData] = useState({ bgImage: '', image: '', 'title.en': '', 'title.ar': '', 'rank_banner.en': '', 'rank_banner.ar': '' })
    const { id } = useParams()
    const { i18n, t } = useTranslation()
    const navigate = useNavigate()

    useEffect(() => {
        initalData()
    }, [])

    const initalData = async () => {
        setPageLoading(true)
        await getRanks()
        await getRankDetails()
        setPageLoading(false)
    }

    const addRank = () => {
        setLoading(true)
        axiosInstance.post('ranks', rankForm).then(response => {
            navigate('/ranks')
        }).catch(err => {
            setErrorData(err.response.data)
            if (err.response.data.message) {
                setGeneralError(err.response.data.message)
            }
        }).finally(() => {
            setLoading(false)
        })
    }

    const getRankDetails = async () => {
        if (id) {
            await axiosInstance.get(`ranks/${id}`).then((response: any) => {
                setRankForm(response.data)
            }).catch(err => {
                setErrorData(err.response.data)
                if (err.response.data.message) {
                    setGeneralError(err.response.data.message)
                }
            })
        }
    }

    const editRank = () => {
        setLoading(true)
        axiosInstance.put(`ranks/${id}`, rankForm).then(response => {
            navigate('/ranks')
        }).catch(err => {
            setErrorData(err.response.data)
            if (err.response.data.message) {
                setGeneralError(err.response.data.message)
            }
        }).finally(() => {
            setLoading(false)
        })
    }

    const getRanks = async () => {
        await axiosInstance.get('ranks').then(response => {
            setRanks(response.data.ranks)
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
                    <h2 className='text-xl'>{id ? t("editRank") : t("addRank")}</h2>
                    <div className='flex flex-col gap-1'>
                        <div className='mt-5'>
                            <span>{t('backgroundImage')}</span>
                            <UploadImage imageError={errorData.bgImage} imageUploaded={(value: any) => setRankForm({ ...rankForm, bgImage: value })} imageNotUploaded={(error: any) => setImageError(error)} />
                            {rankForm.bgImage && <div className='relative'>
                                <img src={rankForm.bgImage} className={`w-full object-cover rounded-lg ${errorData.bgImage ? '' : 'mt-5'}`} />
                                <div className='absolute top-5 ltr:right-5 rtl:left-5 cursor-pointer' onClick={() => setRankForm({ ...rankForm, bgImage: '' })}>
                                    <Delete color='error' />
                                </div>
                            </div>}
                        </div>
                        <div className='mt-5'>
                            <span>{t('mainImage')}</span>
                            <UploadImage imageError={errorData.image} imageUploaded={(value: any) => setRankForm({ ...rankForm, image: value })} imageNotUploaded={(error: any) => setImageError(error)} />
                            {rankForm.image && <div className='relative'>
                                <img src={rankForm.image} className={`w-full object-cover rounded-lg ${errorData.image ? '' : 'mt-5'}`} />
                                <div className='absolute top-5 ltr:right-5 rtl:left-5 cursor-pointer' onClick={() => setRankForm({ ...rankForm, image: '' })}>
                                    <Delete color='error' />
                                </div>
                            </div>}
                        </div>
                        <div className='mt-5'>
                            <span>{t('bannerImageEnglish')}</span>
                            <UploadImage imageError={errorData.image} imageUploaded={(value: any) => setRankForm({ ...rankForm, rank_banner: { ...rankForm.rank_banner, en: value } })} imageNotUploaded={(error: any) => setImageError(error)} />
                            {rankForm.image && <div className='relative'>
                                <img src={rankForm.rank_banner?.en} className={`w-full object-cover rounded-lg ${errorData.image ? '' : 'mt-5'}`} />
                                <div className='absolute top-5 ltr:right-5 rtl:left-5 cursor-pointer' onClick={() => setRankForm({ ...rankForm, rank_banner: { ...rankForm.rank_banner, en: '' } })}>
                                    <Delete color='error' />
                                </div>
                            </div>}
                        </div>
                        <div className='mt-5'>
                            <span>{t('bannerImageArabic')}</span>
                            <UploadImage imageError={errorData.image} imageUploaded={(value: any) => setRankForm({ ...rankForm, rank_banner: { ...rankForm.rank_banner, ar: value } })} imageNotUploaded={(error: any) => setImageError(error)} />
                            {rankForm.image && <div className='relative'>
                                <img src={rankForm.rank_banner?.ar} className={`w-full object-cover rounded-lg ${errorData.image ? '' : 'mt-5'}`} />
                                <div className='absolute top-5 ltr:right-5 rtl:left-5 cursor-pointer' onClick={() => setRankForm({ ...rankForm, rank_banner: { ...rankForm.rank_banner, ar: '' } })}>
                                    <Delete color='error' />
                                </div>
                            </div>}
                        </div>
                        <div className='flex gap-3 items-center'>
                            <Input required value={rankForm.title.en} label={t('nameEn')} inputValue={(value: string) => setRankForm({ ...rankForm, title: { ...rankForm.title, en: value } })} width="w-full" disabled={loading} errorMessage={t(errorData['title.en'])} />
                        </div>
                        <div className='flex gap-3 items-center'>
                            <Input required value={rankForm.title.ar} label={t('nameAr')} inputValue={(value: string) => setRankForm({ ...rankForm, title: { ...rankForm.title, ar: value } })} width="w-full" disabled={loading} errorMessage={t(errorData['title.ar'])} />
                        </div>
                        <div className='flex gap-3 items-center'>
                            <Input inputType='number' required value={rankForm.wins_to_promote} label={t('winsToPromote')} inputValue={(value: number) => setRankForm({ ...rankForm, wins_to_promote: value })} width="w-full" disabled={loading} />
                        </div>
                        <div className='flex gap-3 items-center'>
                            <Input inputType='numbe' required value={rankForm.loses_to_demote} label={t('losesToDemote')} inputValue={(value: number) => setRankForm({ ...rankForm, loses_to_demote: value })} width="w-full" disabled={loading} />
                        </div>
                        <DynamicSelect value={rankForm.next_rank} label={t('nextRank')} items={ranks} selectCallback={(value: any) => {
                            rankForm.next_rank = value._id
                            setRankForm({ ...rankForm })
                        }} />
                        <DynamicSelect value={rankForm.prev_rank} label={t('prevRank')} items={ranks} selectCallback={(value: any) => {
                            rankForm.prev_rank = value._id
                            setRankForm({ ...rankForm })
                        }} />
                        <Prizes loading={loading} mainForm={rankForm} />
                        <button className={`w-full h-12 bg-primaryColor mt-7 text-white rounded-md`} onClick={id ? editRank : addRank}>
                            {loading ? <ButtonLoading loading={loading} /> : <span>{id ? t('editRank') : t('addRank')}</span>}
                        </button>
                        <span className='text-red-500 text-xs mt-1 block'>{i18n.language == 'en' ? generalError.en : generalError.ar}</span>
                    </div>
                </div>
            </CSSTransition>
        </>
    )
}
