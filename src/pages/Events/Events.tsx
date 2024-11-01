import React from 'react'
import PageContainer from '../../components/Containers/PageContainer'
import AddIconComponent from '../../components/GeneralComponents/AddIcon'
import MainEvents from '../../components/Pages/Events/MainEvents'

export default function Avatars() {
    return (
        <PageContainer>
            <AddIconComponent route='/add-event' />
            <MainEvents />
        </PageContainer>
    )
}
