import React, { useEffect, useRef, useState } from 'react'
import Select from './NavComponents/Select'

import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux"
import { fetchCategoriesDone, fetchLastOrders, fetchSystemData, fetchUserDone } from '../../redux/user';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Avatar from './NavComponents/Avatar';
import NavDrawer from './NavDrawer';
import FullScreenLoading from '../Loadings/FullScreenLoading';
import { CSSTransition } from 'react-transition-group';
import axiosInstance from '../../utilities/axiosInstance';
export default function TopBar() {
    //Data
    const effectRan = useRef<any>(false)
    const { t, i18n } = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state: any) => state.user)
    const categories = useSelector((state: any) => state.categories)
    const [loading, setLoading] = useState(true)
    const token: any = localStorage.getItem('token')
    const langs = [
        { name: 'English', action: () => { changeLanguage('en') } },
        { name: 'عربي', action: () => { changeLanguage('ar') } }
    ]
    const accountProfileLogout = [
        { name: t('logout'), action: () => { Logout() }, icon: <LogoutIcon /> },
        { name: t('profile'), route: `/edit-user/${user._id}`, icon: <PersonOutlineOutlinedIcon /> },
    ]
    const accountProfileLogin = [
        { name: t('login'), route: '/login', icon: <LoginIcon /> },
        { name: t('profile'), route: `/edit-user/${user._id}`, icon: <PersonOutlineOutlinedIcon /> },
    ]


    const getStoreItems = async () => {
        if (token) {
            await axiosInstance.post('current-user', { data: { 'token': token } }).then(async response => {
                dispatch(fetchUserDone(response.data))
            }).finally(() => {
                setLoading(false)
            })
        }
        setLoading(false)
    }
    useEffect(() => {
        if (effectRan.current === false) {
            // if (i18n.language !== 'ar' && i18n.language !== 'en') {
            //     i18n.changeLanguage('ar');
            // }
            getStoreItems()
            effectRan.current = true
        }

    }, [])
    //Methods
    const Logout = () => {
        localStorage.setItem('token', '')
        window.location.replace('/login')
    }
    const changeLanguage = (lng: any) => {
        i18n.changeLanguage(lng);
    };
    return (
        <div className='flex w-full justify-between items-center bg-gradient-to-br from-blue-800 via-blue-700 to-blue-600 text-white shadow-md py-3.5 md:px-5 px-3'>
            <CSSTransition
                in={loading}
                timeout={300}
                classNames="default"
                unmountOnExit
            >
                <FullScreenLoading />
            </CSSTransition>
            <div className='lg:flex hidden items-center gap-2.5 w-full justify-end'>
                <Select buttonName={i18n.language === 'en' ? 'English' : 'عربي'} menuItems={langs} />
                {!user.username ? <Link to={'/login'}><LoginIcon /></Link> : <Select buttonName={<Avatar />} menuItems={!user.username ? accountProfileLogin : accountProfileLogout} divide={true} />}
            </div>
            <NavDrawer />
        </div>
    )
}
