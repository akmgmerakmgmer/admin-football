import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

type PageContainersProps = {
  children: any,
  childrenClasses?: string,
  deleteAddIcon: boolean,
  route: string
}
export default function PageContainer(props: PageContainersProps) {

  const navigate = useNavigate()
  const user = useSelector((state: any) => state.user)
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (location.pathname === '/') navigate('/questions')
    const token = localStorage.getItem('token')
    if (!token) return navigate('/login')
    if (user && user.roles.length && (user.roles.indexOf('developer') === -1 && user.roles.indexOf('admin') === -1 && user.roles.indexOf('superAdmin') === -1)) return navigate('/login')
  }, [])

  return (
    <div className='overflow-hidden'>
      <div className={`w-full pt-10 flex flex-col gap-7 pb-5 ${props.childrenClasses}`}>
        {props.children}
      </div>
    </div>
  )
}

PageContainer.defaultProps = {
  childrenClasses: "px-5",
  deleteAddIcon: false,
  route: '/'
}
