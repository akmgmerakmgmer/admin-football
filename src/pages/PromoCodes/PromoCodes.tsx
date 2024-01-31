import React from 'react'
import PageContainer from '../../components/Containers/PageContainer'
import AddIconComponent from '../../components/GeneralComponents/AddIcon'
import MainPromoCodes from '../../components/Pages/PromoCodes/MainPromoCodes'

export default function PromoCodes() {
  return (
    <PageContainer childrenClasses=''>
      <AddIconComponent route='/add-promo-codes' />
      <MainPromoCodes/>
    </PageContainer>
  )
}
