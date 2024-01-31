import { Divider } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import Input from '../../TextFields/Input'
import { motion } from 'framer-motion'
import ButtonLoading from '../../Loadings/ButtonLoading'
import AlertComponent from '../../GeneralComponents/Alert'
import { CSSTransition } from 'react-transition-group'
import ApiLoading from '../../Loadings/ApiLoading'
import axiosInstance from '../../../utilities/axiosInstance'

export default function MainProfile() {
    const { t } = useTranslation()
    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<any>({})
    const [username, setUsername] = useState('')
    const [number, setNumber] = useState('')
    const [usernameLoading, setUsernameLoading] = useState(false)
    const [numberLoading, setNumberLoading] = useState(false)
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [numberError, setNumberError] = useState('')
    const [verifyLoading, setVerifyLoading] = useState(false)
    useEffect(() => {
        getUser()
    }, [])

    const getUser = () => {
        axiosInstance.get(`users/${id}`).then(response => {
            setUser(response.data)
            setUsername(response.data.username)
            setNumber(response.data.number)
        }).finally(() => {
            setLoading(false)
        })
    }

    const editNumber = () => {
        if (number.length !== 11) {
            setNumberError(t('number_min_length'))
            return;
        }
        setNumberError('')
        setNumberLoading(true)
        axiosInstance.put(`users/${user._id}`, { number: number }).then(response => {
            setSuccessMessage(t('numberEdited'))
            setShowSuccessMessage(true)
            setTimeout(() => {
                setShowSuccessMessage(false)
            }, 3000)
        }).finally(() => {
            setNumberLoading(false)
        })
    }

    const editUsername = () => {
        if (!username) {
            setUsernameError(t('field_required'))
            return;
        }
        setUsernameError('')
        setUsernameLoading(true)
        axiosInstance.put(`users/${id}`, { username: username }).then(response => {
            setSuccessMessage(t('usernameEdited'))
            setShowSuccessMessage(true)
            setTimeout(() => {
                setShowSuccessMessage(false)
            }, 3000)
        }).finally(() => {
            setUsernameLoading(false)
        })
    }

    const verifyAccount = () => {
        setVerifyLoading(true)
        axiosInstance.put(`users/${id}`, { verified: true }).then(response => {
            setSuccessMessage(t('accountVerified'))
            setShowSuccessMessage(true)
            setTimeout(() => {
                setShowSuccessMessage(false)
            }, 3000)
        }).finally(() => {
            setVerifyLoading(false)
        })
    }

    return (
        <div>
            <ApiLoading loading={loading} />
            <CSSTransition
                in={!loading}
                timeout={300}
                classNames="default"
                unmountOnExit
            >
                <div>
                    <h2 className="font-bold text-3xl mb-5">{t("profile")}</h2>
                    <Divider />
                    <div className='flex flex-col gap-1 mt-5'>
                        <Input label={t('email')} value={user.email} inputValue={(value: string) => { }} width="lg:w-1/3 w-full" disabled={true} />
                        <div className='flex gap-5 items-center'>
                            <Input label={t('password')} inputType="password" value={user.password} inputValue={(value: string) => { }} width="lg:w-1/3 w-full" disabled={true} />
                            <div className='mt-6'>
                                <Link to={'/forgot-password'}><span className='text-white bg-primaryColor py-3 px-6 rounded-md shadow-md whitespace-nowrap'>{t('resetPassword')}</span></Link>
                            </div>
                        </div>
                        <div className='flex gap-5 items-center '>
                            <Input label={t('username')} value={user.username} inputValue={(value: string) => { setUsername(value) }} width="lg:w-1/3 w-full" disabled={usernameLoading} errorMessage={usernameError} />
                            {username !== user.username && <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={editUsername} className='text-white bg-primaryColor py-3 px-6 rounded-md shadow-md mt-6 whitespace-nowrap'>{usernameLoading ? <ButtonLoading loading={usernameLoading} /> : <span>{t('editUsername')}</span>}</motion.button>}
                        </div>
                        <div className='flex gap-5 items-center'>
                            <Input label={t('number')} inputType='number' value={user.number} inputValue={(value: string) => { setNumber(value) }} width="lg:w-1/3 w-full" disabled={numberLoading} errorMessage={numberError} />
                            {number !== user.number && <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={editNumber} className='text-white bg-primaryColor py-3 px-6 rounded-md shadow-md mt-6 whitespace-nowrap'>{numberLoading ? <ButtonLoading loading={numberLoading} /> : <span>{t('editNumber')}</span>}</motion.button>}
                        </div>
                        {!user.verified && <button className={`w-full h-12 bg-primaryColor mt-7 text-white rounded-md`} onClick={verifyAccount}>
                            {loading ? <ButtonLoading loading={verifyLoading} /> : <span>{t('verifyAccount')}</span>}
                        </button>}
                    </div>
                </div>
            </CSSTransition>
            <AlertComponent open={showSuccessMessage} message={successMessage} />
        </div>
    )
}