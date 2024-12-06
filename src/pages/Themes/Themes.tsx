import React from 'react'
import PageContainer from '../../components/Containers/PageContainer'
import AddIconComponent from '../../components/GeneralComponents/AddIcon'
import MainThemes from '../../components/Pages/Themes/MainThemes'

export default function Themes() {
    return (
        <PageContainer>
            <AddIconComponent route='/add-theme' />
            <MainThemes />
        </PageContainer>
    )
}
