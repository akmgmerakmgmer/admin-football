import React from 'react'
import PageContainer from '../../components/Containers/PageContainer'
import AddIconComponent from '../../components/GeneralComponents/AddIcon'
import MainAvatars from '../../components/Pages/Avatars/MainAvatars'

export default function Avatars() {
    return (
        <PageContainer>
            <AddIconComponent route='/add-avatar' />
            <MainAvatars />
        </PageContainer>
    )
}
