import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchUserDone } from '../../../redux/user'
import SelectedComponent from '../../GeneralComponents/SelectComponent'
import ButtonLoading from '../../Loadings/ButtonLoading'
import Input from '../../TextFields/Input'
import axiosInstance from '../../../utilities/axiosInstance'

export default function Add() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const roles = ['Admin', 'Super Admin']
    const user = useSelector((state: any) => state.user)
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        number: '',
        role: '',
        verified: true,
    })
    const [errorData, setErrorData] = useState({ username: '', email: '', password: '', number: '' })

    useEffect(() => {
        if (user.role !== "Super Admin") {
            navigate('/login')
        }

    }, [])
    const Signup = () => {
        setLoading(true)
        axiosInstance.post('signup', userData).then(res => {
            axiosInstance.post('current-user', { data: { 'token': res.data.accessToken } }).then(response => {
                dispatch(fetchUserDone(response.data.user))
            }).finally(() => {
                setLoading(false)
                navigate('/')
            })
        }).catch(err => {
            setErrorData(err.response.data)
            setLoading(false)
        })
    }
    return (
        <div className='flex flex-col gap-1'>
            <Input label={t('username')} inputValue={(value: string) => setUserData({ ...userData, username: value })} width="lg:w-1/3 md:w-96 w-full" disabled={loading} errorMessage={t(errorData.username)} />
            <Input label={t('email')} inputType='email' inputValue={(value: string) => setUserData({ ...userData, email: value })} width="lg:w-1/3 md:w-96 w-full" disabled={loading} errorMessage={t(errorData.email)} />
            <Input label={t('password')} inputType='password' inputValue={(value: string) => setUserData({ ...userData, password: value })} width="lg:w-1/3 md:w-96 w-full" disabled={loading} errorMessage={t(errorData.password)} />
            <Input label={t('number')} inputType='number' inputValue={(value: string) => setUserData({ ...userData, number: value })} width="lg:w-1/3 md:w-96 w-full" disabled={loading} errorMessage={t(errorData.number)} />
            <div className='mt-5 lg:w-1/3 md:w-96 w-full'>
                <SelectedComponent defaultValue={userData.role} label={t("status")} disabled={loading} items={roles} key={userData.role} callbackValue={(value: string) => setUserData({ ...userData, role: value })} />
            </div>
            <button className={`w-full h-12 bg-primaryColor mt-7 text-white rounded-md`} onClick={Signup}>
                {loading ? <ButtonLoading loading={loading} /> : <span>{t('addUser')}</span>}
            </button>
        </div>
    )
}
