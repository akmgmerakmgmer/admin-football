import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import AlertComponent from '../../GeneralComponents/Alert'
import { useTranslation } from 'react-i18next'
type LinkTextProps = {
  text: string,
  route: string,
}
export default function LinkText(props: LinkTextProps) {
  const [loginError, setLoginError] = useState(false)
  const navigate = useNavigate()
  const user = useSelector((state: any) => state.user)
  const { t } = useTranslation()
  const navigateRoute = () => {
    const token = localStorage.getItem('token')
    if ((user.role !== 'Admin' && user.role !== 'Super Admin' && user.role !== 'Seller' && user.role !== 'Affiliate') || !token) {
      setLoginError(true)
      setTimeout(() => {
        setLoginError(false)
      }, 3000)
      return
    }
    navigate(props.route)
  }
  return (
    <div>
      <span className='whitespace-nowrap text-xs font-semibold cursor-pointer' onClick={navigateRoute}>{props.text}</span>
      <AlertComponent message={t('errorLogin')} open={loginError} error={true} />
    </div>
  )
}
