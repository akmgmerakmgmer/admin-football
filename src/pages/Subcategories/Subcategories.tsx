import React from 'react'
import PageContainer from '../../components/Containers/PageContainer'
import AddIconComponent from '../../components/GeneralComponents/AddIcon'
import MainSubcategories from '../../components/Pages/Subcategories/MainSubcategories'

export default function Subcategories() {
  return (
    <PageContainer childrenClasses=''>
      <AddIconComponent route='/add-subcategory' />
      <MainSubcategories />
    </PageContainer>
  )
}
