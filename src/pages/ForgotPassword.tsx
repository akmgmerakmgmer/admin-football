import { useRef, useState } from "react"
import Input from "../components/TextFields/Input"
import { useTranslation } from "react-i18next";
import AuthButton from "../components/Buttons/AuthButton";
import { Link } from "react-router-dom";
import { CSSTransition } from 'react-transition-group'
import axiosInstance from "../utilities/axiosInstance";

const ForgotPassword = () => {
    const { t } = useTranslation()
    const email = useRef('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [emailSent, setEmailSent] = useState(false)
    const resetPasswordToken = () => {
        setLoading(true)
        setEmailSent(false)
        axiosInstance.post('reset-password-token', {'email': email.current }).then(response => {
        setError("")
        setEmailSent(true)
        }).catch(err => {
            setError(t("email_not_correct"))
        }).finally(()=>{
            setLoading(false)
        })
    }
    return (
        <main className="flex flex-col items-center justify-center w-full min-h-screen h-full">
            <Input label={t('email')} inputType="email" inputValue={(value: string) => email.current = value} width="lg:w-1/3 w-96" disabled={loading} errorMessage={error} />
            <AuthButton text={t('resetPassword')} additionalClasses="mt-4" width="lg:w-1/3 w-96" click={resetPasswordToken} loading={loading} />
            <div className="flex justify-between items-center text-primaryColor lg:w-1/3 w-96 mt-2 text-sm">
                <Link to={'/signup'}>{t("createAnAccount")}</Link>
                <Link to={'/login'}>{t("haveAnAccount")}</Link>
            </div>
            <CSSTransition
                in={emailSent}
                timeout={300}
                classNames="default"
                unmountOnExit

            >
                <div className='bg-green-500 text-white rounded-md shadow-md px-10 py-4 mt-5 text-center '>
                    <p>{t('checkYourEmail')}</p>
                </div>
            </CSSTransition>
        </main>
    )
}

export default ForgotPassword