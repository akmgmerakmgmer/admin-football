import React from 'react'
import { useSelector } from 'react-redux'
import PageContainer from '../../components/Containers/PageContainer'
import AddIconComponent from '../../components/GeneralComponents/AddIcon'
import MainUsers from '../../components/Pages/Users/MainUsers'

export default function Users() {
  const user = useSelector((state: any) => state.user)

  return (
    <PageContainer childrenClasses=''>
      {/* {user.role === "Super Admin" && <AddIconComponent route='/add-user' />} */}
      <MainUsers />
    </PageContainer>
  )
}
