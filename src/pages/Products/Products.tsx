import React from 'react'
import PageContainer from '../../components/Containers/PageContainer'
import AddIconComponent from '../../components/GeneralComponents/AddIcon'
import MainProducts from '../../components/Pages/Products/MainProducts'

export default function Products() {
  return (
    <PageContainer childrenClasses=''>
      <AddIconComponent route='/add-product' />
      <MainProducts url='products-admin' />
    </PageContainer>
  )
}
