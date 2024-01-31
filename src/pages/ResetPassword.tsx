import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate, useParams } from 'react-router-dom'
import AuthButton from '../components/Buttons/AuthButton'
import Input from '../components/TextFields/Input'
import { CSSTransition } from 'react-transition-group'
import axiosInstance from '../utilities/axiosInstance'

export default function ResetPassword() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [passwordChanged, setPasswordChanged] = useState(false)
    const password = useRef('')
    const confirmPassword = useRef('')
    const { t } = useTranslation()
    const { token } = useParams()
    const navigate = useNavigate()

    const resetPassword = () => {
        setError('')
        if (password.current.length < 6) {
            setPasswordError(t('password_min_length'))
            return;
        }
        if (confirmPassword.current !== password.current) {
            setError(t('paswordsDontMatch'))
            return;
        }
        if (!password.current) {
            setError(t('password_required'))
            return;
        }
        setLoading(true)
        axiosInstance.post(`reset-password/${token}`, { "password": password.current }).then(response => {
            setPasswordChanged(true)
            setTimeout(() => {
                navigate('/login')
            }, 3000)
        }).finally(() => {
            setLoading(false)
        })
    }
    return (
        <main className="flex flex-col items-center justify-center w-full min-h-screen h-full">
            <Input label={t('newPassword')} inputType="password" inputValue={(value: string) => password.current = value} width="lg:w-1/3 w-96" disabled={loading} errorMessage={passwordError || error} />
            <Input label={t('confirmPassword')} inputType="password" inputValue={(value: string) => confirmPassword.current = value} width="lg:w-1/3 w-96" disabled={loading} errorMessage={error} />
            <AuthButton text={t('resetPassword')} additionalClasses="mt-4" width="lg:w-1/3 w-96" click={resetPassword} loading={loading} />
            <div className="flex justify-between items-center text-primaryColor lg:w-1/3 w-96 mt-2 text-sm">
                <Link to={'/signup'}>{t("createAnAccount")}</Link>
                <Link to={'/login'}>{t("haveAnAccount")}</Link>
            </div>
            <CSSTransition
                in={passwordChanged}
                timeout={300}
                classNames="default"
                unmountOnExit

            >
                <div className='bg-green-500 text-white rounded-md shadow-md px-10 py-4 mt-5 text-center '>
                    <p>{t('passwordChanged')}</p>
                </div>
            </CSSTransition>

        </main>
    )
}
