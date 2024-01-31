import React from 'react'
import PageContainer from '../../components/Containers/PageContainer'
import AddIconComponent from '../../components/GeneralComponents/AddIcon'
import MainBrands from '../../components/Pages/Brands/MainBrands'

export default function Brands() {
    return (
        <PageContainer childrenClasses=''>
            <AddIconComponent route='/add-brand' />
            <MainBrands />
        </PageContainer>
    )
}
