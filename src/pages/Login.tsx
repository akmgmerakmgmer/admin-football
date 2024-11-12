import { useState } from "react"
import Input from "../components/TextFields/Input"
import { useTranslation } from "react-i18next";
import AuthButton from "../components/Buttons/AuthButton";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { fetchUserDone } from "../redux/user";
import axiosInstance from "../utilities/axiosInstance";

const Login = () => {
    //Data
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { t } = useTranslation()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [errorData, setErrorData] = useState({ email: '', password: '' })
    const [userError, setUserError] = useState('')

    //Methods
    const Login = () => {
        setLoading(true)
        const userData = {
            'username': username,
            'password': password,
        }
        axiosInstance.post('login', userData).then(res => {
            setErrorData({ email: '', password: '' })
            localStorage.setItem('token', res.data.accessToken)
            axiosInstance.post('current-user', { data: { 'token': res.data.accessToken } }).then(response => {
                dispatch(fetchUserDone(response.data.user))
                navigate('/users')
            })
        }).catch(err => {
            if (err.response.data.message) {
                setUserError(err.response.data.message)
                setLoading(false)
                return
            }
            setErrorData(err.response.data)
            setLoading(false)
        })
    }


    return (
        <main className="flex flex-col items-center justify-center w-full min-h-screen h-full">
            <Input label={t('username')} inputValue={(value: string) => setUsername(value)} width="lg:w-1/3 w-96" disabled={loading} errorMessage={t(errorData.email)} />
            <Input label={t('password')} inputType="password" inputValue={(value: string) => setPassword(value)} width="lg:w-1/3 w-96" disabled={loading} errorMessage={t(userError) || t(errorData.password)} />
            <AuthButton text={t('login')} additionalClasses="mt-4" width="lg:w-1/3 w-96" click={Login} loading={loading} />
        </main>
    )
}

export default Login