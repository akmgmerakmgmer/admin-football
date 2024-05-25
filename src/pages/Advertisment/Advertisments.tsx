import React from 'react'
import PageContainer from '../../components/Containers/PageContainer'
import MainAdvertisment from '../../components/Pages/Advertisment/MainAdvertisments'
import AddIconComponent from '../../components/GeneralComponents/AddIcon'

export default function Advertisments() {
    return (
        <PageContainer>
            <AddIconComponent route='/add-advertisment' />
            <MainAdvertisment />
        </PageContainer>
    )
}
