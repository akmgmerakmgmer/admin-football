import { useRef, useState } from "react"
import Input from "../components/TextFields/Input"
import { useTranslation } from "react-i18next";
import AuthButton from "../components/Buttons/AuthButton";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUserDone } from "../redux/user";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import useSignup from "../customHooks/useSignup";
import useVerifyEmail from "../customHooks/useVerifyEmail";
import axiosInstance from '../utilities/axiosInstance'

const Signup = () => {
    //Data
    const { t } = useTranslation()
    const username = useRef('')
    const email = useRef("")
    const password = useRef("")
    const number = useRef("")
    const facebookLink = useRef("")
    const instagramLink = useRef("")
    const [instagramError, setInstagramError] = useState('')
    const [facebookError, setFacebookError] = useState('')
    const [errorData, setErrorData] = useState({ username: '', email: '', password: '', number: '' })
    const [loading, setLoading] = useState(false)
    const [codeError, setCodeError] = useState('')
    const [showVerification, setShowVerification] = useState(false)
    const code = useRef('')
    const userId = useRef('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const hooksProps = {
        setLoading,
        username,
        email,
        password,
        number,
        userId,
        setErrorData,
        dispatch,
        fetchUserDone,
        axiosInstance,
        code,
        setShowVerification,
        setCodeError,
        t,
        navigate,
        facebookLink,
        instagramLink,
        setFacebookError,
        setInstagramError
    }
    const signup = useSignup(hooksProps)
    const verifyEmail = useVerifyEmail(hooksProps)

    return (
        <main className="">
            {showVerification ?
                <div className="flex flex-col items-center justify-center w-full min-h-screen h-full">
                    <div className="bg-green-500 bg-opacity-80 px-5 py-5 rounded-md shadow-sm text-white flex gap-2 items-center">
                        <p className="">{t("verificationMessage")}</p>
                        <CheckCircleOutlineIcon fontSize="small" />
                    </div>
                    <Input label={t('verificationCode')} inputType="number" inputValue={(value: string) => code.current = value} width="lg:w-1/3 w-96" disabled={loading} errorMessage={codeError} />
                    <AuthButton text={t('verifyAccount')} additionalClasses="mt-4" width="lg:w-1/3 w-96" click={verifyEmail.verifyEmail} loading={loading} />
                </div>
                :
                <div className="flex flex-col items-center justify-center w-full min-h-screen h-full">
                    <Input label={window.location.href.includes('seller') ? t('sellerName') : t('affiliateName')} inputValue={(value: string) => username.current = value} width="lg:w-1/3 w-96" disabled={loading} errorMessage={t(errorData.username)} />
                    <Input label={t('email')} inputType="email" inputValue={(value: string) => email.current = value} width="lg:w-1/3 w-96" disabled={loading} errorMessage={t(errorData.email)} />
                    <Input label={t('password')} inputType="password" inputValue={(value: string) => password.current = value} width="lg:w-1/3 w-96" disabled={loading} errorMessage={t(errorData.password)} />
                    <Input label={t('number')} inputType="number" inputValue={(value: string) => number.current = value} width="lg:w-1/3 w-96" disabled={loading} errorMessage={t(errorData.number)} />
                    <Input required={false} label={t('facebookLink')} inputValue={(value: string) => facebookLink.current = value} width="lg:w-1/3 w-96" disabled={loading} errorMessage={facebookError} />
                    <Input required={false} label={t('instagramLink')} inputValue={(value: string) => instagramLink.current = value} width="lg:w-1/3 w-96" disabled={loading} errorMessage={instagramError} />
                    <AuthButton text={t('signup')} additionalClasses="mt-4" width="lg:w-1/3 w-96" click={signup.Signup} loading={loading} />
                    <div className="flex justify-between items-center text-primaryColor lg:w-1/3 w-96 mt-2">
                        <Link to={'/login'}><span className="text-sm">{t('haveAnAccount')}</span></Link>
                        {!window.location.href.includes('seller') ? <Link to={'/seller-signup'}><span className="text-sm">{t("signupSeller")}</span></Link> : <Link to={'/affiliate-signup'}><span className="text-sm">{t('signupAffiliate')}</span></Link>}
                    </div>
                </div>}
        </main>
    )
}

export default Signup