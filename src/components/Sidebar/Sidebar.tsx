import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import SidebarLink from './SidebarLink'
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { useDispatch, useSelector } from 'react-redux';
import LanguageIcon from '@mui/icons-material/Language';
import LogoutIcon from '@mui/icons-material/Logout';
import SidebarAction from './SidebarAction';
import { useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import { fetchUserDone } from '../../redux/user';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import QuizIcon from '@mui/icons-material/Quiz';
import FeaturedVideoIcon from '@mui/icons-material/FeaturedVideo';

type SidebarProps = {
    closeDrawer: () => void,
    addBackgroundClasses: boolean
}
export default function Sidebar(props: SidebarProps) {
    const { t, i18n } = useTranslation()
    const user = useSelector((state: any) => state.user)
    const [links, setLinks] = useState<any>([])
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = localStorage.getItem('token')
    const Logout = () => {
        localStorage.setItem('token', '')
        dispatch(fetchUserDone({}))
        navigate('/login')
    }
    const defaultLinks = [
        {
            name: 'users',
            route: '/users',
            icon: <PersonIcon />
        },
        {
            name: 'players',
            route: '/players',
            icon: <DirectionsRunIcon />
        },
        {
            name: 'questions',
            route: '/questions',
            icon: <QuizIcon />
        },
        {
            name: 'advertisments',
            route: '/advertisments',
            icon: <FeaturedVideoIcon />
        },
        {
            name: 'profile',
            route: `/edit-admin-user/${user._id}`,
            icon: <PersonOutlineOutlinedIcon />
        },
        // {
        //     name: 'contactUs',
        //     route: '/contact-us',
        //     icon: <ContactMailIcon />
        // },
        {
            name: token ? 'logout' : 'login',
            action: token ? Logout : () => navigate('/login'),
            icon: token ? <LogoutIcon /> : <LoginIcon />
        },
        {
            name: 'English',
            action: () => i18n.changeLanguage('en'),
            icon: <LanguageIcon />
        },
        {
            name: 'Arabic',
            action: () => i18n.changeLanguage('ar'),
            icon: <LanguageIcon />
        },
    ]
    const noTokenList = [
        {
            name: token ? 'logout' : 'login',
            action: token ? Logout : () => navigate('/login'),
            icon: token ? <LogoutIcon /> : <LoginIcon />
        },
        // {
        //     name: 'contactUs',
        //     route: '/contact-us',
        //     icon: <ContactMailIcon />
        // },
        {
            name: 'English',
            action: () => i18n.changeLanguage('en'),
            icon: <LanguageIcon />
        },
        {
            name: 'Arabic',
            action: () => i18n.changeLanguage('ar'),
            icon: <LanguageIcon />
        },
    ]
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token || user?.roles?.indexOf('client') > -1) return setLinks(noTokenList)
        return setLinks(defaultLinks)
    }, [user])

    return (
        <div className={`text-white pt-5 flex flex-col gap-3 w-full ${props.addBackgroundClasses ? 'bg-gradient-to-bl from-blue-800 via-blue-700 to-blue-600' : ''} min-h-full z-40`}>
            {links.map((link: any) => {
                return (
                    <div onClick={props.closeDrawer}>
                        {link.action ? <SidebarAction route={link.route} name={t(link.name)} icon={link.icon} action={link.action} /> : <SidebarLink route={link.route} name={t(link.name)} icon={link.icon} />}
                    </div>
                )
            })}
        </div>
    )
}
