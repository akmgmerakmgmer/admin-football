import React, { useEffect, useState } from 'react'
import ApiLoading from '../../Loadings/ApiLoading'
import { CSSTransition } from 'react-transition-group'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import UploadImage from '../../GeneralComponents/UploadImage'
import { Delete } from '@material-ui/icons'
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Input from '../../TextFields/Input'
import ButtonLoading from '../../Loadings/ButtonLoading'
import axiosInstance from '../../../utilities/axiosInstance'
import SelectedComponent from '../../GeneralComponents/SelectComponent'
import Prizes from '../../GeneralComponents/Prizes'

export default function AddAndEdit() {
    const [pageLoading, setPageLoading] = useState(true)
    const [loading, setLoading] = useState(false)
    const [generalError, setGeneralError] = useState({ en: '', ar: '' })
    const [imageError, setImageError] = useState('')
    const [eventForm, setEventForm] = useState<any>({ image: '', eventName: { en: "", ar: "" }, sides: [], prizes: [], endDate: '', price: 0 })
    const [eventSides, setEventSides] = useState([{ nameEn: '', nameAr: "" }, { nameEn: '', nameAr: "" }])
    const [errorData, setErrorData] = useState({ image: '', 'eventName.en': '', 'eventName.ar': '', price: '' })
    const { id } = useParams()
    const { i18n, t } = useTranslation()
    const navigate = useNavigate()

    useEffect(() => {
        getEventDetails()
    }, [])



    const addEvent = () => {
        eventForm.sides = eventSides
        setLoading(true)
        axiosInstance.post('events', eventForm).then(response => {
            navigate('/events')
        }).catch(err => {
            setErrorData(err.response.data)
            if (err.response.data.message) {
                setGeneralError(err.response.data.message)
            }
        }).finally(() => {
            setLoading(false)
        })
    }

    const getEventDetails = () => {
        setPageLoading(true)
        if (id) {
            axiosInstance.get(`events/${id}`).then((response: any) => {
                setEventForm(response.data)
                setEventSides(response.data.sides)
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

    const editEvent = () => {
        eventForm.sides = eventSides
        setLoading(true)
        axiosInstance.put(`events/${id}`, eventForm).then(response => {
            navigate('/events')
        }).catch(err => {
            setErrorData(err.response.data)
            if (err.response.data.message) {
                setGeneralError(err.response.data.message)
            }
        }).finally(() => {
            setLoading(false)
        })
    }
    const addSide = () => {
        setEventSides([...eventSides, { nameEn: '', nameAr: "" }])
    }
    const deleteSide = (index: number) => {
        const updatedSides = eventSides.filter((_, i) => i !== index);
        setEventSides(updatedSides);
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
                    <h2 className='text-xl'>{id ? t("editEvent") : t("addEvent")}</h2>
                    <div className='flex flex-col gap-1'>
                        <div className='mt-5'>
                            <span>{t('mainImage')}</span>
                            <UploadImage imageError={errorData.image} imageUploaded={(value: any) => setEventForm({ ...eventForm, image: value })} imageNotUploaded={(error: any) => setImageError(error)} />
                            {eventForm.image && <div className='relative'>
                                <img src={eventForm.image} className={`w-full object-cover rounded-lg ${errorData.image ? '' : 'mt-5'}`} />
                                <div className='absolute top-5 ltr:right-5 rtl:left-5 cursor-pointer' onClick={() => setEventForm({ ...eventForm, image: '' })}>
                                    <Delete color='error' />
                                </div>
                            </div>}
                        </div>
                        <div className='flex gap-3 items-center'>
                            <Input required value={eventForm.eventName.en} label={t('nameEn')} inputValue={(value: string) => setEventForm({ ...eventForm, eventName: { ...eventForm.eventName, en: value } })} width="w-full" disabled={loading} errorMessage={t(errorData['eventName.en'])} />
                        </div>
                        <div className='flex gap-3 items-center'>
                            <Input required value={eventForm.eventName.ar} label={t('nameAr')} inputValue={(value: string) => setEventForm({ ...eventForm, eventName: { ...eventForm.eventName, ar: value } })} width="w-full" disabled={loading} errorMessage={t(errorData['eventName.ar'])} />
                        </div>
                        <span className='mt-5 -mb-4'>{t('sides')}</span>
                        <div className='flex flex-col items-center gap-1'>
                            {eventSides.map((side: any, index: any) => (
                                <div className='flex items-center gap-3 w-full'>
                                    <Input required value={side.nameEn || ''} label={t('nameEn')} inputValue={(value: string) => eventSides[index].nameEn = value} width="w-full" disabled={loading} />
                                    <Input required value={side.nameAr || ''} label={t('nameAr')} inputValue={(value: string) => eventSides[index].nameAr = value} width="w-full" disabled={loading} />
                                    {index > 1 ? <div onClick={() => deleteSide(index)} className='cursor-pointer'>
                                        <Delete color='error' />
                                    </div> : <DoneAllIcon color='success' />}
                                </div>
                            ))}
                        </div>
                        <button className="bg-primaryColor px-5 py-2.5 text-white text-sm rounded-md h-full mt-1.5" onClick={addSide}>{t('addSide')}</button>
                        <Prizes loading={loading} mainForm={eventForm} />
                        <div className='flex gap-3 items-center mt-3'>
                            <Input required value={eventForm.price} label={t('price')} inputValue={(value: number) => setEventForm({ ...eventForm, price: value })} width="w-full" disabled={loading} errorMessage={t(errorData.price)} />
                        </div>
                        <div className='border-gray-300 border rounded-md p-3 w-full'>
                            <input value={eventForm.endDate || ''} className='outline-none focus:border-none w-full' type="date" id="endDate" name="endDate" onChange={(e) => setEventForm({ ...eventForm, endDate: e.target.value })}></input>
                        </div>

                        <button className={`w-full h-12 bg-primaryColor mt-7 text-white rounded-md`} onClick={id ? editEvent : addEvent}>
                            {loading ? <ButtonLoading loading={loading} /> : <span>{id ? t('editEvent') : t('addEvent')}</span>}
                        </button>
                        <span className='text-red-500 text-xs mt-1 block'>{i18n.language == 'en' ? generalError.en : generalError.ar}</span>
                    </div>
                </div>
            </CSSTransition>
        </>
    )
}
