import { Divider } from '@material-ui/core'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../TextFields/Input'
import { motion } from 'framer-motion'
import ButtonLoading from '../../Loadings/ButtonLoading'
import axiosInstance from '../../../utilities/axiosInstance'
import AlertComponent from '../../GeneralComponents/Alert'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { fetchUserDone } from '../../../redux/user'
import orderDone from '../../../assets/images/confirmed_order.svg'
import useEditUser from '../../../customHooks/profile/useEditUser'
import useEmails from '../../../customHooks/profile/useEmails'

export default function AdminProfile() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state: any) => state.user)
    const [username, setUsername] = useState('')
    const [number, setNumber] = useState('')
    const [usernameLoading, setUsernameLoading] = useState(false)
    const [numberLoading, setNumberLoading] = useState(false)
    const [verificationLoading, setVerificationLoading] = useState(false)
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [numberError, setNumberError] = useState('')
    const [codeError, setCodeError] = useState('')
    const [showVerification, setShowVerification] = useState(false)
    const [accountVerified, setAccountVerified] = useState(false)
    const code = useRef('')
    useEffect(() => {
        if (!user.username) {
            navigate('/')
            return;
        }
        setUsername(user.username)
        setNumber(user.number)
    }, [user])
    const hooksProps = {
        setNumberError,
        number,
        axiosInstance,
        setNumberLoading,
        user,
        setSuccessMessage,
        setShowSuccessMessage,
        dispatch,
        fetchUserDone,
        t,
        username,
        setUsernameError,
        setUsernameLoading,
        setVerificationLoading,
        setShowVerification,
        setCodeError,
        code,
        setAccountVerified,
    }

    const editUser = useEditUser(hooksProps)
    const emailsHook = useEmails(hooksProps)
    return (
        <div>
            {user && user.email?.includes('guest') ?
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className='absolute -translate-x-1/2 -translate-y-1/2 w-full h-60 top-1/2 left-1/2 flex items-center flex-col justify-center px-10'>
                    <div className='flex flex-col items-center justify-center gap-20'>
                        <h2 className='text-2xl ltr:tracking-widest'>{t("guestAccount")}</h2>
                        <img src={orderDone} alt="Order Done Discountaty" className='w-96' />
                        <div className='flex gap-5 text-white'>
                            <Link to={'/signup'}><button className='bg-primaryColor py-3 px-10 rounded-md'>{t('signup')}</button></Link>
                            <Link to={'/login'}><button className='bg-primaryColor py-3 px-10 rounded-md'>{t('login')}</button></Link>
                        </div>
                    </div>
                </motion.div>

                :
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                    <h2 className="font-bold text-3xl mb-5">{t("profile")}</h2>
                    <Divider />
                    <div className='flex flex-col gap-1 mt-5'>
                        {/* <Input label={t('email')} value={user?.email} inputValue={(value: string) => { }} width="lg:w-1/3 w-full" disabled={true} />
                        <div className='flex gap-5 items-center'>
                            <Input label={t('password')} inputType="password" value={user?.password} inputValue={(value: string) => { }} width="lg:w-1/3 w-full" disabled={true} />
                            <div className='mt-6'>
                                <Link to={'/forgot-password'}><span className='text-white bg-primaryColor py-3 px-6 rounded-md shadow-md whitespace-nowrap text-sm'>{t('resetPassword')}</span></Link>
                            </div>
                        </div> */}
                        <div className='flex gap-5 items-center '>
                            <Input label={t('username')} value={user?.username} inputValue={(value: string) => { setUsername(value) }} width="lg:w-1/3 w-full" disabled={usernameLoading} errorMessage={usernameError} />
                            {username !== user?.username && <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={editUser.editUsername} className='text-white bg-primaryColor py-3 px-6 rounded-md shadow-md mt-6 whitespace-nowrap text-sm'>{usernameLoading ? <ButtonLoading loading={usernameLoading} /> : <span>{t('editUsername')}</span>}</motion.button>}
                        </div>
                        <div className='flex gap-5 items-center'>
                            <Input label={t('number')} inputType='number' value={user?.number} inputValue={(value: string) => { setNumber(value) }} width="lg:w-1/3 w-full" disabled={numberLoading} errorMessage={numberError} />
                            {number !== user?.number && <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={editUser.editNumber} className='text-white bg-primaryColor py-3 px-6 rounded-md shadow-md mt-6 whitespace-nowrap text-sm'>{numberLoading ? <ButtonLoading loading={numberLoading} /> : <span>{t('editNumber')}</span>}</motion.button>}
                        </div>
                        {user?.facebookLink && <Input label={t('facebookLink')} value={user?.facebookLink} inputValue={(value: string) => { }} width="lg:w-1/3 w-full" disabled={true} />}
                        {user?.instagramLink && <Input label={t('instagramLink')} value={user?.instagramLink} inputValue={(value: string) => { }} width="lg:w-1/3 w-full" disabled={true} />}
                        {/* {!user?.verified && !showVerification && !accountVerified && < button onClick={emailsHook.sendEmail} className='h-12 w-full bg-red-600 text-white rounded-md mt-4'>{verificationLoading ? <ButtonLoading loading={verificationLoading} /> : <span>{t('verifyAccount')}</span>}</button>} */}
                        {/* {showVerification && !accountVerified &&
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-5">
                                <div className="bg-green-500 bg-opacity-80 px-5 py-5 rounded-md shadow-sm text-white flex gap-2 items-center justify-center">
                                    <p className="text-center">{t("verificationMessage")}</p>
                                    <CheckCircleOutlineIcon fontSize="small" />
                                </div>
                                <Input label={t('verificationCode')} inputType="number" inputValue={(value: string) => code.current = value} width="w-full" disabled={verificationLoading} errorMessage={codeError} />
                                <button onClick={emailsHook.verifyEmail} className='h-12 w-full bg-primaryColor text-white rounded-md mt-4'>{verificationLoading ? <ButtonLoading loading={verificationLoading} /> : <span>{t('verifyAccount')}</span>}</button>
                            </motion.div>} */}
                    </div>
                </motion.div>
            }
            <AlertComponent open={showSuccessMessage} message={successMessage} />

        </div>
    )
}
