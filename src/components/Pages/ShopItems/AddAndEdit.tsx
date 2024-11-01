import React, { useEffect, useRef, useState } from 'react'
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
import DynamicSelect from '../../GeneralComponents/DynamicSelect'
import { Button } from '@material-ui/core'
import AddIcon from '@mui/icons-material/Add';

export default function AddAndEdit() {
    const [pageLoading, setPageLoading] = useState(true)
    const [loading, setLoading] = useState(false)
    const [perks, setPerks] = useState([])
    const [avatars, setAvatars] = useState([])
    const types = ['coins', 'bundles']
    const [generalError, setGeneralError] = useState({ en: '', ar: '' })
    const [shopItemForm, setShopItemForm] = useState<any>({ image: '', backgroundImage: '', itemType: 'coins', numberOfCoins: null, perks: [], avatars: [], price: null, title: { en: "", ar: "" }, description: { en: "", ar: "" } })
    const [errorData, setErrorData] = useState({ image: '', backgroundImage: '', 'title.en': '', 'title.ar': '' })
    const { id } = useParams()
    const { i18n, t } = useTranslation()
    const [rerender, setRerender] = useState(false)
    const effectRan = useRef(false)
    const navigate = useNavigate()
    const [showAvatarsArray, setShowAvatarsArray] = useState<any>([])
    useEffect(() => {
        getInitialData()
    }, [])

    useEffect(() => { }, [rerender])

    const getInitialData = async () => {
        if (!effectRan.current) {
            effectRan.current = true
            setPageLoading(true)
            await getPerks()
            await getAvatars()
            getShopItemDetails()
        }
    }

    const addShopItem = () => {
        setLoading(true)
        axiosInstance.post('shopItems', shopItemForm).then(response => {
            navigate('/shop-items')
        }).catch(err => {
            setErrorData(err.response.data)
            if (err.response.data.message) {
                setGeneralError(err.response.data.message)
            }
        }).finally(() => {
            setLoading(false)
        })
    }

    const getShopItemDetails = () => {
        setPageLoading(true)
        if (id) {
            axiosInstance.get(`shopItems/${id}`).then((response: any) => {
                setShopItemForm(response.data)
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

    const editShopItem = () => {
        setLoading(true)
        axiosInstance.put(`shopItems/${id}`, shopItemForm).then(response => {
            navigate('/shop-items')
        }).catch(err => {
            setErrorData(err.response.data)
            if (err.response.data.message) {
                setGeneralError(err.response.data.message)
            }
        }).finally(() => {
            setLoading(false)
        })
    }

    const getPerks = async () => {
        await axiosInstance.get('perks').then(response => {
            setPerks(response.data.perks)
        })
    }
    const getAvatars = async () => {
        await axiosInstance.get('avatars?page=1&per_page=100').then(response => {
            setAvatars(response.data.avatars)
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
                    <h2 className='text-xl'>{id ? t("editShopItem") : t("addShopItem")}</h2>
                    <div className='flex flex-col gap-1'>
                        <div className='mt-5'>
                            <span>{t('mainImage')}</span>
                            <UploadImage imageError={errorData.image} imageUploaded={(value: any) => setShopItemForm({ ...shopItemForm, image: value })} imageNotUploaded={(error: any) => { }} />
                            {shopItemForm.image && <div className='relative'>
                                <img src={shopItemForm.image} className={`w-full object-cover rounded-lg ${errorData.image ? '' : 'mt-5'}`} />
                                <div className='absolute top-5 ltr:right-5 rtl:left-5 cursor-pointer' onClick={() => setShopItemForm({ ...shopItemForm, image: '' })}>
                                    <Delete color='error' />
                                </div>
                            </div>}
                        </div>
                        <div className='mt-5'>
                            <span>{t('backgroundImage')}</span>
                            <UploadImage imageError={errorData.image} imageUploaded={(value: any) => setShopItemForm({ ...shopItemForm, backgroundImage: value })} imageNotUploaded={(error: any) => { }} />
                            {shopItemForm.backgroundImage && <div className='relative'>
                                <img src={shopItemForm.backgroundImage} className={`w-full object-cover rounded-lg ${errorData.backgroundImage ? '' : 'mt-5'}`} />
                                <div className='absolute top-5 ltr:right-5 rtl:left-5 cursor-pointer' onClick={() => setShopItemForm({ ...shopItemForm, backgroundImage: '' })}>
                                    <Delete color='error' />
                                </div>
                            </div>}
                        </div>
                        <div className='flex gap-3 items-center'>
                            <Input required value={shopItemForm.title.en} label={t('nameEn')} inputValue={(value: string) => setShopItemForm({ ...shopItemForm, title: { ...shopItemForm.title, en: value } })} width="w-full" disabled={loading} errorMessage={t(errorData['title.en'])} />
                        </div>
                        <div className='flex gap-3 items-center'>
                            <Input required value={shopItemForm.title.ar} label={t('nameAr')} inputValue={(value: string) => setShopItemForm({ ...shopItemForm, title: { ...shopItemForm.title, ar: value } })} width="w-full" disabled={loading} errorMessage={t(errorData['title.ar'])} />
                        </div>
                        <div className='flex gap-3 items-center'>
                            <Input required={false} textarea value={shopItemForm.description?.en || ''} label={t('descriptionEn')} inputValue={(value: string) => setShopItemForm({ ...shopItemForm, description: { ...shopItemForm.description, en: value } })} width="w-full" disabled={loading} />
                        </div>
                        <div className='flex gap-3 items-center'>
                            <Input required={false} textarea value={shopItemForm.description?.ar || ''} label={t('descriptionAr')} inputValue={(value: string) => setShopItemForm({ ...shopItemForm, description: { ...shopItemForm.description, ar: value } })} width="w-full" disabled={loading} />
                        </div>
                        <div className="mt-5 flex items-center gap-3">
                            <div className='flex-1 self-start'>
                                <SelectedComponent required disabled={loading} uppercase={true} translation={true} callbackValue={(value) => setShopItemForm({ ...shopItemForm, itemType: value })} defaultValue={shopItemForm.itemType} items={types} label={t("type")} errorMessage={false} />
                            </div>
                        </div>
                        {shopItemForm.itemType === 'bundles' && <div className='w-auto mt-5 text-white'>
                            <Button variant="contained" color='primary' endIcon={<AddIcon color='inherit' />} onClick={() => {
                                shopItemForm.perks.push({ id: '', quantity: null })
                                setRerender(!rerender)
                            }}>
                                {t("addPerk")}
                            </Button>
                        </div>}
                        {shopItemForm.perks.length ? shopItemForm.perks.map((perk: any, index: number) => (
                            <div className="flex items-start gap-3 w-full">
                                <DynamicSelect label={t('addPerk')} items={perks} selectCallback={(value: any) => {
                                    perk.id = value._id
                                }} />
                                <Input inputType='number' value={shopItemForm.perks[index]?.quantity || null} label={t('quantity')} inputValue={(value: number) => {
                                    perk.quantity = value
                                }} width="w-full" disabled={loading} />
                            </div>
                        )) : <div></div>}
                        {shopItemForm.itemType === 'bundles' && <div className='w-auto mt-5 text-white'>
                            <Button variant="contained" color='primary' endIcon={<AddIcon color='inherit' />} onClick={() => {
                                setShowAvatarsArray([...showAvatarsArray, ''])
                                setRerender(!rerender)
                            }}>
                                {t("addAvatar")}
                            </Button>
                        </div>}
                        {showAvatarsArray.length ? showAvatarsArray.map((avatar: any, index: number) => (
                            <div className="flex items-center gap-3 w-full">
                                <DynamicSelect label={t('addAvatar')} items={avatars} selectCallback={(value: any) => {
                                    shopItemForm.avatars[index] = value.image
                                    setShopItemForm({ ...shopItemForm })
                                    console.log(shopItemForm)
                                }} />
                            </div>
                        )) : <div></div>}
                        {shopItemForm.itemType === 'coins' && <div className='flex gap-3 items-center'>
                            <Input inputType='number' value={shopItemForm.numberOfCoins} label={t('numberOfCoins')} inputValue={(value: number) => setShopItemForm({ ...shopItemForm, numberOfCoins: value })} width="w-full" disabled={loading} />
                        </div>}
                        <div className='flex gap-3 items-center'>
                            <Input inputType='number' value={shopItemForm.price} label={t('price')} inputValue={(value: number) => setShopItemForm({ ...shopItemForm, price: value })} width="w-full" disabled={loading} />
                        </div>
                        <button className={`w-full h-12 bg-primaryColor mt-7 text-white rounded-md`} onClick={id ? editShopItem : addShopItem}>
                            {loading ? <ButtonLoading loading={loading} /> : <span>{id ? t('editShopItem') : t('addShopItem')}</span>}
                        </button>
                        <span className='text-red-500 text-xs mt-1 block'>{i18n.language == 'en' ? generalError.en : generalError.ar}</span>
                    </div>
                </div>
            </CSSTransition>
        </>
    )
}
