import React from 'react'
import PageContainer from '../../components/Containers/PageContainer'
import AddIconComponent from '../../components/GeneralComponents/AddIcon'
import MainCategories from '../../components/Pages/Categories/MainCategories'

export default function Categories() {
  return (
    <PageContainer childrenClasses=''>
        <AddIconComponent route='/add-category'/>
        <MainCategories/>
    </PageContainer>
  )
}
